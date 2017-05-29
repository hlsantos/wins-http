@COMMENT@

File: PERSONALMENU.INC
Date: 09/30/2008

This server-side script is included by account_info.htm.  It will handle
the display of the "personal properties" menu.

It uses a "Smart Tabs" method where HTML-PERSONAL.WCX will read the
template\personalmenu.ini file to get the buttons and prepare global variables
which this template uses to display.

If UseSmartTabs is FALSE, then the old display is used.

      NOTE: The old way is OBSOLETE as everything is pretty focused
            around the INI file with HTML-PERSONAL.WCX setting the
            variable UseSmartTabs=TRUE.

When UseSmartTabs is enabled, the following variables are created by
HTML-PERSONAL.WCX for each button (section) defined in PERSONALMENU.INI

 TABS.SECTION  section name in personalmenu.ini file
 TABS.ENABLED  always TRUE because the WCX will not create variables for disabled sections
 TABS.LOCKED   set true to avoid 3rd party menu item override
 TABS.VENDOR   miscellaneous vendor name for applet
 TABS.PAGE     page to display, personal_page_####.htm, however see TABS.HREF
 TABS.NAME     button display name
 TABS.DESC     button long tip description (show when mouse is over button)
 TABS.HREF     the url to run when button to click. If this is not defined,
               then TABS.PAGE will be used to create the url

               /code/html-personal.wcx?page=####

With the page #### name defined, the template

   template\personal_page_####.htm

is expected by html-personal.wcx to exist to display the page ####.

See the PERSONALMENU.INI to create the buttons.

@ENDCOMMENT@

<table width="96%" border="0" cellspacing="0" cellpadding="2" id="btnMenuLogo" class="btnMenuLogo">
  <tr><td><img src="/public/graphics/c-per.gif" width="211" height="50" alt="Your Account Information" border="0"></td></tr>
</table>

@if UseSmartTabs@
<ul id="btnMenu" class="btnMenu">
@LOOP MORETABS@
@IF TABS.PAGE = ""@@BREAK@@ENDIF@
@IF TABS.ENABLED@
<li class="btnItem@if query.page=TABS.PAGE@Selected@endif@"><a class="btnItem@if query.page=TABS.PAGE@Selected@endif@" href="@SUB TABS.HREF@" title="@SUB TABS.DESC@"><div class="btnItem">@SUB TABS.NAME@</div></a></li>
@ENDIF@
@ENDLOOP@
</ul>
@else@
<table width="96%" border="0" cellspacing="0" cellpadding="2" class="buttontable" id="tbAnch">
<tr>
	<td nowrap><a href="/code/html-personal?page=general"   class="item">&nbsp;General&nbsp;</a></td>
	<td nowrap><a href="/code/html-personal?page=chgpwd"    class="item">&nbsp;Change Password&nbsp;</a></td>
	<td nowrap><a href="/code/html-personal?page=messaging" class="item">&nbsp;Messaging&nbsp;</a></td>
	<td nowrap><a href="/code/html-personal?page=filing"    class="item">&nbsp;Filing&nbsp;</a></td>
	<td nowrap><a href="/code/html-personal?page=audio"     class="item">&nbsp;Audio&nbsp;</a></td>
	<td nowrap><a href="/code/html-personal?page=skins"     class="item">&nbsp;Skins&nbsp;</a></td>
@if query.frames="y"@
    <td nowrap align=right><a href="/" class="item" target="_top">&nbsp;Home&nbsp;</a></td>
@endif@
@if system.htmlhelp@
    <td width="60%" nowrap align=right><a href="/code/html-help?properties=messaging" class="item">&nbsp;Help&nbsp;</a></td>
@else@
    <td width="60%">&nbsp;</td>
@endif@
</tr>
</table>
@endif@


