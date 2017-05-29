function dimensions(show)
{
   var lc=document.getElementById("lastElement");
   if (lc) {
      var adiv = document.getElementById("areaListDivider");
      if (adiv) {
         var ie5=document.all&&document.getElementById;
         var height = ie5?document.body.clientHeight:window.innerHeight;
         var delta = height-(lc.offsetTop+lc.offsetHeight);
         var newheight = 0;

         if (
             (delta < 0) ||
             ((delta != 0) && (adiv.scrollHeight != adiv.offsetHeight))
            )
         {
            newheight        = adiv.offsetHeight+delta-16;;
            if (show < 2) {
               if (newheight >= 0) {
                  adiv.style.height    = newheight;
                  adiv.style.maxHeight = newheight;
               }
            }
         }
      }
   }
}

function BodyResizer()
{
   dimensions(0);
}

function AreasBodyResizer()
{
    var img = document.getElementById("resizeGif");
    if (img) {
       var s = "["
       var fm = parent.document.getElementById("WildcatFrameTopMenu");
       if (fm) {
          s += "TopRows: "+fm.rows;
          s += " / ";
       }
       fm = parent.document.getElementById("WildcatFrame");
       if (fm) {
          s += "RightCols: "+fm.cols;
       }
       s += "]";
       img.title = s;
    }
    dimensions(0); // resize divider
}

