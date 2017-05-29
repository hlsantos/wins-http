function StartWcNavigatorPopup(win)
{
   if (!win) {
       //alert("StartWcNavigatorPopup(): Window not defined.");
       //return false;
       win = window;
   }
   var winattr = "";
   winattr += "left="+(screen.availWidth-350)+",";
   winattr += "top="+(screen.availHeight-260)+",";
   winattr += "width=325,height=180";
   winattr += ",scrollbars=0";
   winattr += ",resizable=no";
   winattr += ",titlebar=no";
   winattr += ",toolbar=0";
   winattr += ",menubar=0";
   winattr += ",status=0";   // FF requires [X] Hide Status permission
   win.open("/code/html-wcnav", "wcNavigator", winattr);
   win.focus();
   return true;
}
