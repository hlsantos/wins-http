/*
 * File:    wcMsgLib.js
 * Date:    09/01/2005
 * Version: 451.5i
 * History:
 * 452.1g 02/15/07 11:43 pm
 *    - added document.getElementsById() function
 *    - added getElementsById() wrapper function
 *    - added function msgHideButton(idName)
 *    - added function msgTotalDeletable()
 */

document.getElementsByClassName = function(className) {
   var children = document.getElementsByTagName('*') || document.all;
   var elements = new Array();
   for (var i = 0; i < children.length; i++) {
     var child = children[i];
     var classNames = child.className.split(' ');
     for (var j = 0; j < classNames.length; j++) {
       if (classNames[j] == className) {
         elements.push(child);
         break;
       }
     }
   }
   return elements;
}

function getElements(s)
{
   return document.getElementsByClassName(s);
}

document.getElementsById = function(id) {
   var children = document.getElementsByTagName('*') || document.all;
   var elements = new Array();
   for (var i = 0; i < children.length; i++) {
     var child = children[i];
     var ids = child.id.split(' ');
     for (var j = 0; j < ids.length; j++) {
       if (ids[j] == id) {
         elements.push(child);
         break;
       }
     }
   }
   return elements;
}

function getElementsById(s) { return document.getElementsById(s); }


/****************************************************
 Functions specific for message_inbox.htm
 ****************************************************/

function msgToggleAll()
{
  var onoff = document.list.msgall.checked;
  var msgitems = getElements("msgitem");
  for (var i = 0; i < msgitems.length; i++) {
    var e = msgitems[i];
    if (e.type == "checkbox") e.checked = onoff
  }
}


function msgTotalSelected()
{
  var nTotal = 0;
  var msgitems = getElements("msgitem");
  for (var i = 0; i < msgitems.length; i++) {
    var e = msgitems[i];
    if (e.type == "checkbox" && e.checked) nTotal++;
  }
  return nTotal;
}

function msgAction(act)
{
  if (msgTotalSelected() == 0) {
     alert("No messages are selected");
     return true;
  }
  var prm = "";
  if (act == "delete") {
      prm = "Delete selected message(s)?";
  }
  else
  if (act == "markread") {
      prm = "Mark selected message(s) as received?";
  }
  else {
    alert("illegal command - "+act);
    return true;
  }

  if (confirm(prm)) {
     document.list.command.value = act;
     document.list.submit();
     return true;
  }
  return true;
}

//***********************************************
// Logic to disable Message List Button(s).
// example usage:  You can add to the bottom of
// a message_inbox.htm the following script.
//
// <script type="text/javascript">
//   if (msgTotalDeletable()==0)
//      msgHideButton("btnMsgDelete");
// </script>
//
//***********************************************

function msgTotalDeletable()
{
  var nTotal = 0;
  var msgitems = getElements("msgitem");
  for (var i = 0; i < msgitems.length; i++) {
    var e = msgitems[i];
    if (e.type == "checkbox" && e.deletable != "0") nTotal++;
  }
  return nTotal;
}

function msgHideButton(idName)
{
   var items = getElementsById(idName);
   if (items) {
       for (var i = 0; i < items.length; i++) {
           items[i].style.display = "none";
       }
   }
}
