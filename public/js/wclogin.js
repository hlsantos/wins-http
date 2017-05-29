//-----------------------------------------------------------------
// File: wclogin.js
// Version: v6.3.453.3f
// Date: 12/29/2009
// (c) Copyright 2005-2010 Santronics Software, Inc.
//-----------------------------------------------------------------

var EnableSavePassword     = true;
var EnableSignup           = true;
var EnableForgotPassword   = true;
var EnableSecuredMode      = false;
var EnableWcNavMode        = true;
var LoginPageTarget        = "_top";
var SystemHostName         = "";
var SiteLoginTitle         = "";
var RequireSecuredAuth     = false;
var RequireSecuredConnect  = false;

//--------------------------------------------------------------------------
// InitWcLoginOptions()
//--------------------------------------------------------------------------

var wcLoginOptionsDefault = {
   About:            { version: "6.3.453.3", date: "2009-12-29"},
   BoxColor:         { secured: "#FFFFCC", normal: "#CEE0CE"},
   BoxClass:         { enable: true,   secured: "boxSecured", normal: "boxNormal"},
   SplashWindow:     { enable: false,  src: "/public/graphics/wcLogoTop.bmp"},
   WebDomains:       { enable: true,   nonsecured: "", secured: ""},
   ErrorWindow:      { enable: true },
   PCI:              { enable: false, usepost: false },
   reserved: null
};

//--------------------------------------------------------------------------
// Language
//--------------------------------------------------------------------------

var wcLoginLanguage = {
    prmSite:               "Site:&nbsp;",
    prmHome:               "&nbsp;Home&nbsp;",
    prmUserName:           "Username:",
    prmPassword:           "Password:",
    prmLogin:              "&nbsp;Login&nbsp;&raquo;",
    prmMode:               "Mode:",
    prmModeHtml:           "Use Web Browser",
    prmModeHtmlHelp:       "Use this option to use your browser to display HTML pages",
    prmModeClient:         "Use WcNavigator",
    prmModeClientHelp:     "Use this option to use wcNavigator to display GUI clients",
    prmSavePassword:       "Remember password?",
    prmSavePasswordHelp:   "Unchecked if you don't wish to remember the password at this site.",
    prmSecuredLink:        "This is a SECURED Link",
    prmSwitchToSSL:        "Switch to Secured Mode",
    prmSwitchToNonSSL:     "Switch to Unsecured Mode",
    prmSSLRequired:        "Secured Authentication Required",
    prmAlertUserName:      "Please enter your user name",
    prmAlertPassword:      "Please enter your password",
    prmForgotPassword:     "Forgot your password?",
    prmForgotPasswordHelp: "Click to obtain forgotten password via email.",
    prmSignup:             "Not registered? Create new account",
    prmReserved:           ""
};


function ele(o)          { return document.getElementById(o); }
function element(o) { return document.getElementById(o); }
function GetWcLoginCSS() { return element("wcLoginCSS"); }

function wcLoadScript(sURL) {
  var oS = document.createElement('script');
  oS.type = 'text/javascript';
  oS.src = sURL;
  document.getElementsByTagName('head')[0].appendChild(oS);
}

function InitWcLoginOptions()
{
  DeleteCookie("wcpci");
  DeleteCookie("wcauth");
  if (typeof(wcLoginOptions) == "undefined") {
     wcLoginOptions = wcLoginOptionsDefault;
     var css = GetWcLoginCSS();
     if (!css || (css.sheet && !css.sheet.cssRules.length)) wcLoginOptions.BoxClass.enable = false;
  }
}

function wcMergeLoginOptions(o2)
{
  var o1 = wcLoginOptions;
  if (typeof o2 == "object") for (var k in o2){o1[k] = o2[k];}
  return o1;
}

function CheckWcLoginStyles()
{
  var css = GetWcLoginCSS();
  if (!css || (css.sheet && !css.sheet.cssRules.length))
  {
     document.writeln('<style>');
     document.writeln('.btnGrey    { background-color:#ccc; border-width:1px; border-style:solid; border-color:#000000; font:bold 10.5px Verdana,Arial,Helvetica,sans-serif;cursor: pointer; }');
     document.writeln('.btnGreyOn  { background-color:#666; border-width:1px; border-style:solid; border-color:#000000; color:#fff; font:bold 10.5px Verdana,Arial,Helvetica,sans-serif;cursor: pointer; }');
     document.writeln('.btnGreen   { background-color:#9c6; border-width:1px; border-style:solid; border-color:#000000; font:bold 10.5px Verdana,Arial,Helvetica,sans-serif;cursor: pointer; }');
     document.writeln('.btnGreenOn { background-color:#693; border-width:1px; border-style:solid; border-color:#000000; color:#fff; font:bold 10.5px Verdana,Arial,Helvetica,sans-serif;cursor: pointer; }');
     document.writeln('</style>');
  }
}

function onSecureSwitch(o, ssl)
{
   if (ssl) {
      if (!confirm("Switch to secure mode?")) return false;
   } else {
      if (!confirm("Switch to unsecure mode?")) return false;
   }
   var sProto  = (ssl?"https":"http") + "://";
   var sDomain = document.domain;
   if (ssl) {
      if (typeof(wcLoginOptions) != "undefined" && wcLoginOptions.WebDomains.secured) {
         sDomain = wcLoginOptions.WebDomains.secured;
      }
   } else {
      if (typeof(wcLoginOptions) != "undefined" && wcLoginOptions.WebDomains.nonsecured) {
         sDomain = wcLoginOptions.WebDomains.nonsecured;
      }
   }
   var href = sProto+sDomain+document.location.pathname+document.location.search;
   // opera has a problem when switching back and forth the 2nd time, neither method
   // below fixes it.  All other browser work fine.
   document.location = href;
   //window.location.assign(href);
   return true;
}

function doSyncAjax(url)
{
   if (document.getElementById) {
      var x = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
   }
   if (x) {
      x.open("GET", url, false);
      x.send(null);
      if (x.status != 200)    {
         return false;
      }
      return true;
   }
}

function SetEntryStatus(msg)
{
   el = element("divInputError");
   if (el) {
      el.innerHTML = msg;
      el.style.display  = "";
      return;
   }
   if (msg != "" && msg != "&nbsp;") alert(msg);
}

function CancelBubble(e)
{
  e.cancelBubble = true;
  return true;
}

function doClearStatus(e)
{
  CancelBubble(e);
  SetEntryStatus("&nbsp;");
  return true;
}

function doWcAlert(s)
{
   SetEntryStatus(s);
}

//**************************************************************************
//**************************************************************************

function doWcValidate()
{
   var uid = document.entry.username.value;
   var pwd = document.entry.password.value;
   if (uid == "") {
      SetEntryStatus(wcLoginLanguage.prmAlertUserName);
      document.entry.username.focus();
      return false;
   }
   if (pwd == "") {
      SetEntryStatus(wcLoginLanguage.prmAlertPassword);
      document.entry.password.focus();
      return false;
   }
   return true;
}

function getLoginMode()
{
   var mode = document.login.mode.value;
   if (mode == "") mode = "html";
   var frm = document.entry;
   if (frm.mode) {
      if (frm.mode.type == "checkbox") {
          return frm.mode.checked?"client":"html";
      }
      if ((frm.mode.length == 2) && (frm.mode[0].type == "radio")) {
         mode = frm.mode[0].checked?frm.mode[0].value:frm.mode[1].value;
      }
   }
   return mode;
}

function doWcGenerateUserHash(uid, pwd, pcase)
{
   if (typeof(uid) == "undefined") {
      uid   = document.entry.username.value;
      pwd   = document.entry.password.value;
      pcase = false;
   }
   // calculate the hash
   if (!pcase && pcase == 0) pwd = pwd.toLowerCase();
   var hash = "";
   if (wcLoginOptions.PCI.enable) {
      var wcsid = GetCookie("wcsid");
      DeleteCookie("wcsid");
      hash = uid+":"+hex_md5(wcsid+":"+uid+":"+hex_md5(pwd));
   } else {
      hash = uid+":"+hex_md5(uid+":"+hex_md5(pwd));
   }
   return hash;
}

function doWcLoginAction(pcase)
{
   if (doWcValidate())  {
      var pwd  = document.entry.password.value;
      var uid  = document.entry.username.value;
      var hash = doWcGenerateUserHash(uid,pwd,pcase)

      var cname = "wcauth";
      if (wcLoginOptions.PCI.enable) cname = "wcpci";

      var secured = document.location.protocol == "https:";
      SetCookie(cname, hash, 0, "/", 0, secured);

      if (document.login.mode) {
         document.login.mode.value   = getLoginMode();
         SetCookie("mode",document.login.mode.value, 0, "/", 0, secured);
      }
      document.login.submit();
      return true;
   }
   return false;
}

//**************************************************************************

function goHome(o)
{
   DeleteCookie("directurl");
   document.location = o.href;
}

//**************************************************************************

function PrintCookieWarning()
{
   document.write("<center>");
   document.write("<iframe name='nocookie' src='/public/warning-no-cookie.wct' frameborder=0 width=100% scrolling=NO>");
   document.write("<font color='red'>No cookie support.</font>");
   document.write("</iframe>");
   document.writeln("</center>");
}

//--------------------------------------------------------------------------
// PrintLoginForm()
//
// This is the default cookie-based login form displayed when logic.wct
// is called and there is no macro Login.CustomForm defining a custom
// "printloginform-xxx.wct" file.
//
//--------------------------------------------------------------------------

function PrintLoginForm(title, defUserName, defCase)
{

  if (!CheckForCookies()) {
     PrintCookieWarning();
     return false;
  }

  if (typeof(title) == "undefined") {
      title       = "Site Login: "+SystemHostName;
      if (SystemHostName == "") title = "Member Login:";
      defUserName = "";
      defCase     = false;
  }

  InitWcLoginOptions();
  CheckWcLoginStyles();

  var uname    = defUserName?defUserName:"";
  var pcase    = defCase?defCase:0;
  var secured  = document.location.protocol == "https:"
  var ihtml    = "";
  var tmp      = "";

  //------------------------------------------
  // Add form
  //------------------------------------------

  var formtag = "";
  formtag += '<form name="entry" id="formEntry" ';
  if (EnableSavePassword) {
     formtag += 'autocomplete="on" ';
     formtag += 'onSubmit="return doWcValidate();" ';
     formtag += 'action="javascript:doWcLoginAction('+pcase+');" ';
  } else {
     formtag += 'autocomplete="off" ';
     formtag += 'onSubmit="doWcLoginAction('+pcase+'); return false;"';
  }
  formtag += '>';
  document.writeln(formtag);

  //------------------------------------------
  // Add div container
  //------------------------------------------

  document.writeln('<div id="loginWindow" align="center">');

  //------------------------------------------
  // Add outer table
  //------------------------------------------

  var attrs   = ' border="0" cellspacing="1" cellpadding="1"';
  if (wcLoginOptions.BoxClass.enable) {
    attrs += ' class="' + (secured?wcLoginOptions.BoxClass.secured:wcLoginOptions.BoxClass.normal) + '"';
  } else {
    var bc = secured?wcLoginOptions.BoxColor.secured:wcLoginOptions.BoxColor.normal;
    attrs += ' style="';
    attrs += 'border: 2px solid black; ';
    attrs += 'background-color:'+bc+';';
    attrs += '"';
  }

  document.writeln('<table id="loginTable"'+attrs+'>');
  document.writeln('<thead id="loginTitleBar">');
  document.writeln('<tr>');
  document.writeln('<td id="loginTitle" colspan="2" align="left"><b>'+title+'</b></td>');
  document.writeln('<td id="loginHomeBtn" align="right"><a href="/" onClick="goHome(this);" target="_top" class="btnGrey" onmouseover="this.className=\'btnGreyOn\'" onmouseout="this.className=\'btnGrey\'" >'+wcLoginLanguage.prmHome+'</a>');
  document.writeln('</td>');
  document.writeln('</tr>');
  document.writeln('</thead>');

  //------------------------------------------
  // Add splash image
  //------------------------------------------

  if (wcLoginOptions.SplashWindow.enable) {
     document.writeln('<tr id="SplashCellRow">');
     document.writeln('<td id="SplashCell" colspan="3" align="center">');
     document.writeln('<div id="SplashWindow" class="SplashWindow">');
     document.writeln('<img id="SplashImage" class="SplashWindow" src="'+wcLoginOptions.SplashWindow.src+'" alt=""/>');
     document.writeln('</div');
     document.writeln('</td>');
     document.writeln('</tr>');
  }

  //------------------------------------------
  // Add error/status row window
  //------------------------------------------

  var blur = "";
  if (wcLoginOptions.ErrorWindow.enable) {
     document.writeln('<tr id="divInputErrorRow">');
     document.writeln('<td colspan="3" align="center"><div id="divInputError" class="InputError"><br></div></td>');
     document.writeln('</tr>');
     blur = " onBlur='doClearStatus(event);'";
  }

  //------------------------------------------
  // Add username/password fields
  //------------------------------------------

  document.writeln('<tr valign="top" align="left">');
  document.writeln(' <td id="loginUserPrm">&nbsp;'+wcLoginLanguage.prmUserName+'&nbsp;</td>');
  document.writeln(' <td><input type="text" name="username" id="username" value="'+uname+'" size="24" maxlength="32"'+blur+'/></td>');
  document.writeln(' <td>&nbsp;</td>');
  document.writeln('</tr>');

  document.writeln('<tr valign=top align=left>');
  document.writeln(' <td id="loginPassPrm">&nbsp;'+wcLoginLanguage.prmPassword+'&nbsp;</td>');
  document.writeln(' <td><input type="password" name="password" id="password" value="" size="24" maxlength="32"'+blur+'/></td>');
  document.writeln(' <td><input type="submit"  value="'+wcLoginLanguage.prmLogin+'" class="btnGreen" onmouseover="this.className=\'btnGreenOn\'" onmouseout="this.className=\'btnGreen\'"></td>');
  document.writeln('</tr>');

  //------------------------------------------
  // Add mode html/client checkbox
  //------------------------------------------

  var args = document.location.search;
  var webmode = "checked";
  var navmode = "";
  if (args.toLowerCase().match("mode=client") || (GetCookie("mode") == "client")) {
     webmode = "";
     navmode = "checked";
  }

  if (EnableWcNavMode) {
     document.writeln('<tr>');
     document.writeln(' <td valign="top" id="loginModePrm">&nbsp;'+wcLoginLanguage.prmMode+'&nbsp;</td>');
     document.writeln(' <td><input type="radio" name="mode" value="html" '+webmode+'>&nbsp;'+wcLoginLanguage.prmModeHtml+'<br>');
     document.writeln('     <input type="radio" name="mode" value="client" '+navmode+'>&nbsp;'+wcLoginLanguage.prmModeClient+'&nbsp;</td>');
     document.writeln(' <td align=right> </td>');
     document.writeln('</tr>');
  }

  if (EnableSecuredMode && wcLoginOptions.WebDomains.enable && !RequireSecuredAuth) {
     document.write('<tr>');
     document.write('<td colspan=3 align="center">');
     if (RequireSecuredConnect && document.location.protocol == "https:") {
        var sTxt    = wcLoginLanguage.prmSecuredLink;
        var sImage  = "lock.gif";
        document.write('<img src="/public/graphics/'+sImage+'" border="0">&nbsp;<b>'+sTxt+'</b>');
     } else {
        var sProto  = "http://";
        var sTxt    = wcLoginLanguage.prmSwitchToNonSSL;
        var sImage  = "unlock.gif";
        var sDomain = document.domain;
        if (document.location.protocol == "http:") {
           sProto = "https://";
           sTxt   = wcLoginLanguage.prmSwitchToSSL;
           sImage = "lock.gif";
           if (wcLoginOptions.WebDomains.secured) {
              sDomain = wcLoginOptions.WebDomains.secured;
           }
        } else {
           if (wcLoginOptions.WebDomains.nonsecured) {
              sDomain = wcLoginOptions.WebDomains.nonsecured;
           }
        }
        var href = sProto+sDomain+document.location.pathname+document.location.search;
        document.write('<a href="'+href+'">');
        document.write('<img src="/public/graphics/'+sImage+'" border="0">&nbsp;<b>'+sTxt+'</b>');
        document.write('</a>');
     }
     document.write('</td>');
     document.writeln('</tr>');
  }

  if (EnableForgotPassword) {
     document.write('<tr>');
     document.write('<td colspan=3 align="center">');
     document.write('<a href="/public/forgotpassword.wct">'+wcLoginLanguage.prmForgotPassword+'</a>');
     document.write('</td>');
     document.writeln('</tr>');
  }
  if (EnableSignup) {
     document.write('<tr>');
     document.write('<td colspan=3 align="center">');
     document.write('<a href="/Signup">'+wcLoginLanguage.prmSignup+'</a>');
     document.write('</td>');
     document.writeln('</tr>');
  }

  document.writeln('</table>');
  document.writeln('</div>');
  document.writeln('</form>');

  if (typeof(document.login) == "undefined") {
     var fmethod = "GET";
     if (wcLoginOptions.PCI.enable && wcLoginOptions.PCI.usepost) fmethod = "POST";
     document.writeln('<form name="login" action="/login" method="'+fmethod+'" target="'+LoginPageTarget+'">');
     document.writeln('<input type="hidden" name="js"  value="1">');
     document.writeln('<input type="hidden" name="mode"  value="">');
     document.writeln('</form>');
  }

  document.entry.username.focus();
}

InitWcLoginOptions();

