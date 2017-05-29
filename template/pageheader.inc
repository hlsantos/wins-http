@COMMENT@
----------------------------------------------------------------------

  File: pageheader.inc
  Date: 02/04/07, v6.2.452.1

  History:
  --------

  453.3 12/09/09

      - option to do dynamic Idle Timeout Checking

  453.3f 12/29/09 03:46 pm

      - made it work for non-sessions

----------------------------------------------------------------------
@ENDCOMMENT@

@include "Globalopts.inc"@
@ExistInclude "CheckRemainingTime.inc"@

@if HelpEnabled@
@if HelpPage = ""@@set HelpPage=CurrentPage@@endif@
<script language="JavaScript">
function WildcatHelp(src) {
    var daLink = "/public/code/html-help?page=@sub HelpPage@";
    var e = document.getElementById("idHelp");
    if (e) {
       e.target = "_top";
       e.href   = daLink;
    } else {
       if (typeof(src) == 'string') daLink = src;
       var attrs = "width=350,height=400,scrollbars=yes,dependent=yes";
       var helpWnd=window.open(daLink, "Help", attrs);
       helpWnd.focus()
    }
}
</script>
@endif@

@COMMENT@

TechNote: Getting Frame Mode

Problem:  URL passing is not reliable (quaranteed)

Solution: If QUERY.FRAMES not defined then check the user's
          USER.HTMLFRAMES varible

          NOPE! Can't do this because then it won't show for
          personal, etc which don't run in frame mode.

@ENDCOMMENT@

@if PageHeaderTopBar || !query.iframe && !FrameMode@

@//@ Start: Page Header Timer 
@if UsePageHeader.Timer@
<script language="JavaScript">
var phTimer = null;
var phUser = {enable: false, timeleft:"@TIMELEFT@"};

@if PageHeader.CheckTimeLeft@
if (phUser.timeleft != "unlimited") {
    phUser.enable = true;
    phUser.timeleft = phUser.timeleft*60 + 1;
}
@endif@

function pageHeaderTimer() {
   if (!phTimer) phTimer = document.getElementById("pageheadertime");
   if (phTimer) phTimer.innerHTML= getCurrentTime();
}
function padTime(i) { if (i<10) {i="0" + i} return i;}
function getCurrentTime()
{
   if (phUser.enable) {
      phUser.timeleft--;
      if (phUser.timeleft <= 0) {
         phUser.enable = false;
         alert("No Time Remaining");
      }
   }
   var today=new Date();
   var dd=padTime(today.getDate());
   var dm=padTime(today.getMonth()+1);
   var dy=today.getFullYear();
   var th=today.getHours();
   var tm=padTime(today.getMinutes());
   var ts=padTime(today.getSeconds());
   var am="AM";
   if (th >= 12) {
       if (th > 12) th = th - 12;
       am = "PM";
   }
   var th=padTime(th);
   return dm+"/"+dd+"/"+dy+" "+th+":"+tm+":"+ts+" "+am;
}
function startTime() { pageHeaderTimer();setTimeout('startTime()',1000);}
startTime();
</script>
@endif@
@//@ End: Page Header Timer

<table class="pageheaderBar"
       width="100%"
       border="0"
       cellspacing="0"
       cellpadding="0">
  <tr class="pageheaderTitle" >
    <td class="pageheaderTitle">@SYSTEM.BBSNAME@</td>

@if PageHeader.UserInfo@
    <td align="right" class="pageheaderUserInfo" >@get PageHeader.UserInfo@</td>
@endif@

@if AddMenu.GotoCLient@
@existinclude "pageheadermenu.inc"@
@endif@

    <td align="right" id="pageheadertime" class="pageheaderTime" >
@if UsePageHeader.Timer@
    <script> document.write(getCurrentTime());</script>
@else@
    @DATE@ @TIME@
@endif@
    </td>
    @if UseBack@
    <td width="1%" align="right" class="pageheaderButton">
      <a style="cursor:hand" OnClick="history.back()" class="pageheaderButton">&nbsp;Back&nbsp;</a>
    </td>
    @endif@
    @if UseLogoff@
    <td width="1%" align="right" class="pageheaderButton">
    @if Node@
    <a href="/logout" target="_top" class="pageheaderButton" title="Sign off the system.">&nbsp;Logoff&nbsp;</a>
    @else@
    <a href="/login" target="_top" class="pageheaderButton" title="Sign into system.">&nbsp;Login&nbsp;</a>
    @endif@
    </td>
    @endif@
    @if HelpEnabled@
     <td width="1%" align="right" class="pageheaderButton">
       <script>document.writeln('<a href="@sub JavaHelpUrl@" class="pageheaderButton" title="@sub JavaHelpTitle@">&nbsp;Help&nbsp;</a>');</script>
       <noscript><a href="/public/code/html-help?page=@sub helppage@" target="Help" class="pageheaderButton" title="@sub JavaHelpTitle@">&nbsp;Help&nbsp;</a></noscript>
     </td>
    @endif@
    <td width="1%" align="right" class="pageheaderButton">
      <a href="/" target="_top" class="pageheaderButton" title="Return to home page.">&nbsp;Home&nbsp;</a>
    </td>
  </tr>
  @if SystemEvent@
  <tr class="pageheaderEvent"><td colspan=10>System Event: @GET SystemEvent@</td></tr>
  @endif@
</table>
<br id="pageheaderBreak">
@endif@

@if Exist "wc:\http\warning.htm"@
<div id="WarningDisplay">@include "wc:\http\warning.htm"@</div>
@endif@

@if Exist "wc:\http\template\YourBizHeader.htm"@
<div id="YourBizHeader">@include "wc:\http\template\YourBizHeader.htm"@</div>
@endif@

@//@------------------------------------------------------------------------------
@IF 0 && Wildcat.Debug && HelpPage = ""@@SHOWVARS@@ENDIF@
@//@------------------------------------------------------------------------------

