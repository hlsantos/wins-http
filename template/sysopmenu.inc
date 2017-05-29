@COMMENT@

File: SYSOPMENU.INC
Date: 12/26/08 04:33 am

This server-side script is included by SYSOPCLIENT.HTM.  It will handle
the display of the "Sysop Menu" menu.

It uses a "Smart Tabs" method where HTML-SYSOP.WCX will read the
TEMPLATE\SYSOPMENU.INI file to get the buttons and prepare global variables
which this template uses to display.

If UseSmartTabs is FALSE, then the old display is used.

      NOTE: The old way is OBSOLETE as everything is pretty focused
            around the INI file with HTML-SYSOP.WCX setting the
            variable UseSmartTabs=TRUE.

When UseSmartTabs is enabled, the following variables are created by
HTML-SYSOP.WCX for each button (section) defined in SYSOPMENU.INI

 TABS.SECTION  section name in personalmenu.ini file
 TABS.ENABLED  always TRUE because the WCX will not create variables for disabled sections
 TABS.LOCKED   set true to avoid 3rd party menu item override
 TABS.VENDOR   miscellaneous vendor name for applet
 TABS.PAGE     page to display, personal_page_####.htm, however see TABS.HREF
 TABS.NAME     button display name
 TABS.DESC     button long tip description (show when mouse is over button)
 TABS.HREF     the url to run when button to click. If this is not defined,
               then TABS.PAGE will be used to create the url

               /code/html-sysop.wcx?page=####

With the page #### name defined, the template

   template\sysop_page_####.htm

is expected by html-personal.wcx to exist to display the page ####.

See the SYSOPMENU.INI to create the buttons.

@ENDCOMMENT@

<table width="96%" border="0" cellspacing="0" cellpadding="2" id="btnMenuLogo" class="btnMenuLogo">
  <tr><td><img src="/images/c-sysop.gif" width="211" height="50" alt="Sysop Menu" border="0"></td></tr>
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
<table width="95%" border="0" cellspacing="0" cellpadding="2" class="buttontable" id="tbAnch">
<tr>
	<td nowrap><a href="/code/html-sysop?page=general"      class="item">&nbsp;General&nbsp;</a></td>
	<td nowrap><a href="/code/html-sysop?page=usereditor"   class="item">&nbsp;User Editor&nbsp;</a></td>
	<td nowrap><a href="/code/html-sysop?page=fileeditor"   class="item">&nbsp;File Editor&nbsp;</a></td>
	<td nowrap><a href="/code/html-sysop?page=eventmanager" class="item">&nbsp;Event Manager&nbsp;</a></td>
	<td nowrap><a href="/code/html-sysop?page=nodemanager"  class="item">&nbsp;Node Manager&nbsp;</a></td>
   @if query.frames="y"@
      <td nowrap align=right><a href="/" class="item" target="_top">&nbsp;Home&nbsp;</a></td>
   @endif@
   @if system.htmlhelp@
      <td width="60%" nowrap align=right><a href="/code/html-help?properties=sysop" class="item">&nbsp;Help&nbsp;</a></td>
   @else@
      <td width="60%">&nbsp;</td>
   @endif@
</tr>
</table>
@endif@



