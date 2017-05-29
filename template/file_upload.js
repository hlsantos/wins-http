var uploadProgressBarName = "uploadProgressBar";
var uploadIESelectBox     = "";  // uncomment to not hide

//-------  START OF PROGRESS STUFF -------------
var DHTML = (document.getElementById || document.all || document.layers);
function ap_getObj(name)
{
   if (document.getElementById) {
       var ele = document.getElementById(name);
       if (ele) return ele.style;
       return "";
   } else if (document.all) {
       return document.all[name].style;
   } else if (document.layers) {
       return document.layers[name];
   }
}
function wcShowProgressBar(flag)
{
   if (!DHTML) return;
   //-------------------------------------------
   // Fixes IE Select Box "always on top" bug
   if (uploadIESelectBox != "") {
      var sb = ap_getObj(uploadIESelectBox);
      if (sb) {
          sb.visibility = (!flag) ? "visible":"hidden";
      }
   }
   //-------------------------------------------
   var x = ap_getObj(uploadProgressBarName);
   if (x) {
       x.visibility = (flag) ? "visible":"hidden";
       x.display    = (flag) ? "":"none";
   }
   if (!document.getElementById) {
       if(document.layers) x.left=280/2;
   }
   return true;
}
//-------  END OF PROGRESS STUFF -------------

function wcFileAreaChange()
{
   //format of option element value is:
   //  area# pwd=1|0 pvt=1|0

   var frm =  document.inputForm
   var opt = frm.area.options[frm.area.selectedIndex].value;
   frm.password.disabled    = (opt.indexOf('pwd=1') == -1);
   frm.pvtusername.disabled = (opt.indexOf("pvt=1") == -1);
   if (frm.password.disabled) {
       frm.password.value = "";
       document.getElementById("password").style.display = "none";
       document.getElementById("lpassword").style.display = "none";
   } else {
       document.getElementById("password").style.display = "";
       document.getElementById("lpassword").style.display = "";
   }
   if (frm.pvtusername.disabled) {
       frm.pvtusername.value = "";
       document.getElementById("pvtusername").style.display = "none";
       document.getElementById("lpvtusername").style.display = "none";
   } else {
       document.getElementById("pvtusername").style.display =  "";
       document.getElementById("lpvtusername").style.display = "";
   }

   return;
}

function wcLongDesc()
{
   var frm = document.inputForm;
   if (frm && frm.longdesc) {
      frm.longdesc.disabled = !frm.longdesc.disabled;
      frm.longdesc.value = "";
      frm.longdesc.style.display = frm.longdesc.disabled?"none":"";
   }
   return;
}

function trim(s)
{
  while(''+s.charAt(s.length-1)==' ') {
     s=s.substring(0,s.length-1);
  }
  return s;
}

function submitFile()
{
   var dbf = document.inputForm;
   var fname  = trim(dbf.file.value)
   if (fname.length == 0) {
      alert("Please provide a file to upload.")
      dbf.file.focus()
      return false;
   }

   // IE needs the catch. FF will just continue.
   // Wildcat! will catch any error.

   try
   {
     dbf.submit();
   }
   catch(err)
   {
      txt="There was a problem with the file you are attempting to upload.\n\n"
      txt+="Error description: " + err.description + "\n"
      txt+="Click OK to continue.\n"
      alert(txt)
      return false;
   }
   wcShowProgressBar(true);
   return true;
}

