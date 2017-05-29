@COMMENT@
version: 452.1j 03/07/07
version: 452.8  02/06/09 Cleaned up

Below is your pulldown menu for the page header bar.  This is done
via a list array called "phmenu", each menu has 4 items:

 - Title
 - url
 - optional: Client name for security.

   These correspond to the sub-folder names in your \WC6\CLIENTS
   sub-folder.  You give users access via the setup in:

         WCCONFIG | Access Profiles | Clients

 - optional: name of target window, none for current window.
 - optional: window attributes.

@ENDCOMMENT@


@//@--------------------------------------------------------------------
@SET phmenu[]=@
@if Exists "wc:\code\html-sysop.wcx" && Exists "wc:\http\template\sysopclient.htm@
@ADD phmenu[] ["Sysop Menu",    "/client?sysop.wcn",        "Sysop Client"]@
@endif@
@ADD phmenu[] ["Your Settings", "/client?personal.wcn",     "Personal Properties Client"]@
@ADD phmenu[] ["Messaging ",    "/client?message.wcn",      "Message Client"]@
@ADD phmenu[] ["Filing",        "/client?file.wcn",         "File Client"]@
@ADD phmenu[] ["Who's Online",  "/client?who.wcn",          "Who's Online Client"]@
@ADD phmenu[] ["Chat",          "/client?chat.wcn&pop=1",   "Chat Client", "wcJavaChat"]@
@ADD phmenu[] ["Terminal",      "/client?terminal.wcn",     "Terminal Client"]@
@//@--------------------------------------------------------------------

<script language="javascript" src="/template/wcNavigator.js"></script>

<script type="text/javascript">
function GotoClient(ele) {
  if (ele.selectedIndex > -1) {
     var url = ele.options[ele.selectedIndex].value;
     if (url != "") {
         var tar = ele.options[ele.selectedIndex].getAttribute("target");
         if (tar != "") {
             if (tar == "wcJavaChat") {
                 StartWcNavigatorPopup(window);
             } else {
                var winattr = ele.options[ele.selectedIndex].getAttribute("winattr");
                var gotoWnd=window.open(url, tar, winattr?winattr:"");
                gotoWnd.focus();
             }
         } else {
@if PageHeaderTopBar@
           var gotoWnd=window.open(url,"_top");
           gotoWnd.focus();
@else@
           location.href = url;
@endif@
         }
         ele.selectedIndex = 0;
     }
  }
}
</script>

<td align="right" class="pageHeaderGotoMenu" >
<select id="pageGoto"
        class="pageHeaderGotoMenu"
        onchange="GotoClient(this);">
  <option id="pageGotoItem" value="">Goto Client</option>
@FOR I=1 to phMenu.Count@
  @IF phmenu[{i}][3] = "" || EVAL("Access.Client.{phmenu[{i}][3]}")@
  <option value="@SUB phmenu[{i}][2]@"
          target="@SUB phmenu[{i}][4]@"
          winattr="@SUB phmenu[{i}][5]@"
          id="pageGotoItem">@SUB phmenu[{i}][1]@</option>
  @ENDIF@
@NEXT@
</select>
</td>
