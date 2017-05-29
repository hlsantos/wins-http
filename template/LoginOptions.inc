<!---------------------------------------------------------------
@COMMENT@

Version: 6.3.453.3

Login options for cookie-based login forms.  This options are used in
login.wct to prepare some global javascript variables used by wclogin.js
(default login form).

Options you don't have to change:

 Login.AllowSignup          set by Wildcat
 Login.AllowWcNav           set by Wildcat
 Login.CaseSensitive        set by Wildcat (should be FALSE always)
 Login.AllowSecureMode      set by Wildcat
 Login.ForgotPassword       set by optional forgotpassword.wct
 Login.Mode.Client          set below
 Login.BrowserSavePassword  set by HttpAuth.AllowPCISession

Options you can change:

 Login.Target               set to "_top" for frame mode
 Login.UseAjaxCheckName     used by some custom printloginform.wct examples
 Login.CustomForm           name of printloginform.wct custom login page

History:

453.3 12/18/09 02:40 pm

 - reordered some Login.XXXXX options so its usable in non-cookie logins

@ENDCOMMENT@
--------------------------------------------------------------------->

@set Login.AllowSignup           = AllowSignup@
@set Login.AllowWcNav            = HttpAuth.AllowWcNav@
@set Login.AllowSecureMode       = Session.SSL.Capable@
@set Login.NoAuthentication      = 1@
@set Login.Target                = "_top"@
@set Login.Mode.Client           = 0@
@set Login.ForgotPassword        = 0@

@if HttpAuth.AllowCookie || HttpAuth.AllowBasic || HttpAuth.AllowDigest ||  HttpAuth.AllowWcNav@
  @set Login.NoAuthentication = 0@
  @if HttpAuth.AllowBasic || HttpAuth.AllowDigest@
      @set Login.AllowBasicDigest = 1@
  @endif@
  @if exist "wc:\http\public\forgotpassword.wct"@
      @set Login.ForgotPassword=1@
  @endif@
@endif@

@if "mode"?HTTP.URL && "client"?HTTP.URL@
  @set Login.Mode.Client=1@
@endif@

@if HttpAuth.AllowCookie && !Http.UsingBasicDigest@

@set Login.CaseSensitive         = CaseSensitivePasswords@
@set Login.BrowserSavePassword   = 1@
@set Login.UseAjaxCheckName      = 0@

@if HttpAuth.AllowPCISession@
@set Login.BrowserSavePassword   = 0@
@endif@

<!-- Examples of PrintLoginForms: Set login.CustomForm to the
     wct file you want to use. If the file does not exist or
     if this variable is blank, the default login form
     defined in wclogin.js is used.  -->

<!-- Working Examples: Last one is whats used -->
@set Login.CustomForm="wc:\http\public\PrintLoginForm-box.wct"@
@set Login.CustomForm="wc:\http\public\PrintLoginForm-navcb.wct"@
@set Login.CustomForm="wc:\http\public\PrintLoginForm-smallbox.wct"@
@set Login.CustomForm="wc:\http\public\PrintLoginForm-topbar.wct"@
@set Login.CustomForm="wc:\http\public\PrintLoginForm-topbarcat.wct"@
@set Login.CustomForm="wc:\http\public\PrintLoginForm-splash.wct"@
@set Login.CustomForm="wc:\http\public\PrintLoginForm-ajax.wct"@
@set Login.CustomForm="wc:\http\public\PrintLoginForm.wct"@

@endif@

@ExistInclude "wc:\http\template\LoginOptionsCustom.inc"@


