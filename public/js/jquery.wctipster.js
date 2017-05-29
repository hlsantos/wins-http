/*===============================================================
Wildcat! Interactive Net Server
(c) copyright 2007 Santronics Software, Inc. All Rights Reserved
portions copyrighted Brian Cherne <brian@cherne.net> jQuery.hoverintent.js

sub-system: Wildcat! Web Server
wcbuild   : 452.3k
version   : v1.0.3b (jquery.wctipster.js.14)
date      : 10/05/2007
updated   : 10/12/07 08:20 am

About:

   wcTipster provides hovering popup ballon tips via ajax or
   embedded text.

   wcTipster uses a single handler for onMouseOver and onMouseOut which
   offers better performance than binding all elements (as done in
   cluetip). The speed is gain by directly adding onMouseOver and
   onMouseOut events to the HTML tags.

   wcTipters will autofit the tipbox within the viewPort provided.

   wcTipters borrows logic from hoverIntent to provide idle activation
   logic.

Usages:

   see template\recentmail.htm
   see template\message_index.htm
   see template\message_indexthd.htm

History:

   1.0.3b 10/14/07 07:07 pm
   - fixed an IE bug with the viewport client dimensions

===============================================================*/

function wcTipster(f,g) {
   this.version = "1.0.3b";

   //-----------------------------------------
   // default configuration options
   //-----------------------------------------

   var cfg = {

      // options: hover options

      sensitivity: 2,
      interval: 100,
      timeout: 0,

      // options: display related

      tipsterId: "tipster",         // namespace for box
      tipsterClass: "default",      // css name
      viewPort: "body",             // boundary of window
      width: 350,                   // default width of box
      offsetX: 16,                  // offset of box (left)
      offsetY: 20,                  // offset of box (top)
      showHow: "fadeIn",            // default "fadeIn"
      showSpeed: 200,

      // options: ajax related

      enableWaitImage: false,       // if true, show wait "loading" image
      waitImage : "wait.gif",       // src of image, see CSS instead
      allowHTML:  false,            // if true, onAjaxData will not filter
      cacheEnabled: true,           // remembers tag ids
      cacheMaxSize: 50,             // 50 items for cache
      ajaxSettings: {},             // default ajax settings

      // callbacks:

      onPlacement: _onPlacement,    // calculates XY placement of box
      onAjaxData: _onAjaxData,      // AJAX: filter results
      onActivate: _onActivate,      // return false to cancel tip display
      over: _showTipster,           // default show handler, override with f
      out:  _hideTipster,           // default hide handler, override with g

      // dummy
      dummy: 1
   };

   //-----------------------------------------
   // merge default with user options
   //-----------------------------------------

   cfg = $.extend(cfg, g ? { over: f, out: g } : f );

   // make some corrections

   if (cfg.sensitivity <= 1)  cfg.sensitivity = 2;

   // handle passage of width: "###px" string pixel
   if (typeof cfg.width == "string") {
      cfg.width = +cfg.width.replace(/px/,"");
   }

   //-----------------------------------------
   // cache
   //-----------------------------------------

   var cache = { "length": 0, "data": [] };

   function clearCache() {
      var l = cache.length;
      cache.data   = [];
      cache.length = 0;
      return l;
   }

   //-----------------------------------------
   // default ajax data filter
   //-----------------------------------------

   function _onAjaxData(data) {
      if (!cfg.allowHTML) {
        // failsafe - secured
        data = "<span>"+data+"</span>";
        data = $(data).text();
      }
      return data;
   }

   //-----------------------------------------
   // default activation filter
   // return false to cancel tip display
   //-----------------------------------------

   function _onActivate(e) {
      return true;
   }

   //-----------------------------------------
   // default placement function
   //-----------------------------------------

   function _onPlacement(evt, box, view, boxOffset) {

      try {
         // mouse position
         var mouseX    = evt.pageX;
         var mouseY    = evt.pageY;
         var left      = mouseX;
         var top       = mouseY;

         // viewport position and dimensions
         var vp        = $(view).offset();
         vp.width      = view.offsetWidth;
         vp.height     = view.offsetHeight;
         if (view.tagName.toUpperCase() == "BODY") {  // 1.0.3b
             vp.width  = view.clientWidth;
             vp.height = view.clientHeight;
         }

         // scroll difference
         var ydiff     = (evt.pageY - evt.clientY) - vp.top;
         var xdiff     = (evt.pageX - evt.clientX) - vp.left;

         if (ydiff < 0) ydiff = 0;
         if (xdiff < 0) xdiff = 0;

         // tipbox dimensions
         var boxWidth  = box.offsetWidth;
         var boxHeight = box.offsetHeight;
         var halfY     = Math.ceil(boxHeight/2);
         var halfX     = Math.ceil(boxWidth/2);
         var marginX   = boxOffset? boxOffset.x:16;
         var marginY   = boxOffset? boxOffset.y:20;

         // tag position and size
         var tagXY     = $(this).offset();
         var tagWidth  = this.offsetWidth;
         var tagHeight = this.offsetHeight;
         var endTag    = tagXY.left+tagWidth-mouseX;

         //--------------------------------------------------
         // Check to see if the box can be display
         // to the right at mid box section:
         //
         //  <-------------- clientWidth ------------------>
         // +-----------------------------------------------+
         // |                                               |
         // |  +----------------------------------------+   |
         // |  |<------------ vp.width----------------->|   |
         // |  |                                        |   |
         // |  | tag        +---------------------+     |   |
         // |  |    tag     | title               |     |   |
         // |  |  tag       |---------------------|     |   |
         // |  |     tag ---| text                |     |   |
         // |  | tag        |                     |     |   |
         // |  |   tag      |                     |     |   |
         // |  |      tag   +---------------------+     |   |
         // |  | tag         <-----boxWidth------->     |   |
         // |  |                                        |   |
         // |  +----------------------------------------+   |
         // |                                               |
         // +-----------------------------------------------+

         left += endTag + marginX;   // right side of tag end
         top  -= halfY;              // box center at mouse Y position

         //------------------------------------------
         // adjust X
         //------------------------------------------

         // Can it fit on the right?

         var widthAdjusted = false;
         if (((left-vp.left) + boxWidth) > vp.width) {
            //==========================
            // width adjusted
            //==========================
            left = vp.width - boxWidth + vp.left;
            widthAdjusted = true;
         }

         //------------------------------------------
         // adjust Y
         //------------------------------------------

         function moveHalfWayAcross(x)
         {
            left = (x?x:mouseX) - halfX;
            if (left < vp.left) left = vp.left + marginX;
            if (left < vp.left) left = mouseX;
         }

         function moveAboveOrBelow()
         {
            if (((tagXY.top+tagHeight-vp.top) + boxHeight) > vp.height) {
               top = mouseY - boxHeight - tagHeight;
            } else {
               top = mouseY + marginY;
            }
         }

         // If the top above the view port, and the
         // left is still on the right, then
         // adjust the top to match the viewport top.

         if (((top-ydiff) < vp.top) && (mouseX < left)) {
            //==========================
            // place at view top
            //==========================

            top = vp.top + ydiff;

            // if the width was adjusted, then check to see
            // if we need to move the box above or below.

            if (widthAdjusted) {
               moveHalfWayAcross();
               moveAboveOrBelow();
            }
         }
         else
         if ((top-ydiff-vp.top + boxHeight) > vp.height) {
            //==========================
            // place above mouse
            //==========================
            top = vp.top + ydiff + vp.height - boxHeight;
            if (widthAdjusted ) {
                if ((left-mouseX-endTag-marginX) < 0) {
                   top  = mouseY - boxHeight - marginY;
                   moveHalfWayAcross(left);
                }
            }
            if (top < 0) top = 0;
         }
         else {
            //==========================
            // Keep box at initial spot, however,
            // if width adjusted, move above or below
            // and move left half box from mouse.
            //==========================
            if (widthAdjusted) {
               moveHalfWayAcross();
               moveAboveOrBelow();
            }
         }

         // set position of box

         box.style.left = left;
         box.style.top  = top;

         return {'left': left, 'top': top};
      } catch(e) {
         alert("Exception: "+e.message);
      }

   }

   //-----------------------------------------
   // default show handler
   //-----------------------------------------
   function removeTitle(e)
   {
      var title = e.getAttribute('title');
      if (title && title != "") {
         e.setAttribute("title","");
         e.setAttribute("otitle",title);
      }
   }
   function restoreTitle(e)
   {
      var title = e.getAttribute('otitle');
      if (title && title != "") {
         e.setAttribute("otitle","");
         e.setAttribute("title",title);
      }
   }

   function _showTipster(evt) {

     if (true || this.id) {
       var $tip  = $("#"+cfg.tipsterId);
       var url   = this.getAttribute('rel');
       var css   = this.getAttribute('class');
       var tagId = this.getAttribute('id');
       var tag   = this;

       //
       // get the box title
       //

       var boxTitle = this.getAttribute("titleTip");
       if ((!boxTitle || boxTitle == "")) {
           var tagTitle = this.getAttribute("otitle");
           if (tagTitle) boxTitle = tagTitle;
       }
       $("#"+cfg.tipsterId+"-title").html(boxTitle);

       //-----------------------------------------
       // internal: final placment and show
       //-----------------------------------------

       function doShow()
       {
         // This is required logic flow: show it, then make it hidden
         // so that the browser can calculate its dimensions.  This
         // allows the chance to call onPlacement to adjust the XY
         // position. After the adjustment, make it visible.

         if (typeof cfg.showHow == "string") {
            $tip[ cfg.showHow || "show"](cfg.showSpeed);
         } else {
            $tip.show();
         }

         $tip.get(0).style.visibility="hidden";
         try {
            var tipOffset = { x: cfg.offsetX, y: cfg.offsetY };
            cfg.onPlacement.apply(
                 tag,
                 [
                  evt,
                  $tip.get(0),
                  cfg.viewPort?$(cfg.viewPort).get(0):window,
                  tipOffset
                 ]);
         } catch(e) {
            alert(e.message);
         }
         $tip.get(0).style.visibility="visible";
       }

       //-----------------------------------------
       // ajax internal functions
       //-----------------------------------------

       function ajaxSuccessful(data)
       {
         if (cfg.onAjaxData) data = cfg.onAjaxData(data);

         if (cfg.cacheEnabled && tagId) {
            if (cfg.cacheMaxSize && (cache.length >= cfg.cacheMaxSize)) {
               clearCache();
            }
            cache.length++;
            cache.data[tagId] = data;
         }

         $("#"+cfg.tipsterId+"-inner").html(data);
         doShow();
       }

       function ajaxComplete()
       {
         if (cfg.enableWaitImage && $wait) $wait.hide();
       }

       //-----------------------------------------
       // data request
       //-----------------------------------------

       if (url && url != "" && url.charAt(0) != "#") {
          //
          // ajax: rel="url"
          //
          if (cfg.cacheEnabled && tagId && cache.data[tagId]) {
             $("#"+cfg.tipsterId+"-inner").html(cache.data[tagId]);
             doShow();
          } else {

             // show wait image
             if (cfg.enableWaitImage) {
                var $wait = $("#"+cfg.tipsterId+"-waitimage");
                if ($wait) {
                   var imgX = evt.pageX + 20;
                   var imgY = evt.pageY;
                   $wait.css({"top": imgY + 'px', "left": imgX+'px'})
                   $wait.show();
                }
             }

             //
             // perform ajax
             //

             var ajaxSettings = {
                 url: url,
                 type: "get",
                 success: ajaxSuccessful,
                 complete: ajaxComplete
             };

             if (cfg.ajaxSettings) $.extend(ajaxSettings, cfg.ajaxSettings);

             if (ajaxSettings.type.toLowerCase() == "post") {
                var args = url.split("?",2);
                ajaxSettings.url  = args[0];
                if (!ajaxSettings.data && args.length > 1) {
                   ajaxSettings.data = args[1];
                }
             }

             $.ajax(ajaxSettings);

          }
       } else {
          //
          // non-ajax: rel="#id"
          //
          if (url.charAt(0) == "#") {
             $("#"+cfg.tipsterId+"-title").hide();
             $("#"+cfg.tipsterId+"-inner").html($(url).html());
          } else {
             $("#"+cfg.tipsterId+"-title").show();
             $("#"+cfg.tipsterId+"-inner").html(this.id);
          }
          doShow();
       }
     }
   }

   //-----------------------------------------
   // default hide handler
   //-----------------------------------------

   function _hideTipster(evt) {
     $("#"+cfg.tipsterId).hide();
     $("#"+cfg.tipsterId+"-inner").html("");
   }

   //------------------------------------------------------
   // start the tipster
   //------------------------------------------------------

   this.ready = false;
   this.start = function(s) {
      var tipbox = "";
      if (s && s != "") {
         tipbox = s;
      } else {
         if (cfg.enableWaitImage) {
            tipbox += ' <img id="'+cfg.tipsterId+'-waitimage" src="'+cfg.waitImage+'" ';
            tipbox += '     style="position: absolute; z-index: 95; ';
            tipbox += '     display: none; top: 78px; left: 285px;"/>';
         }
         tipbox += '<div id="'+cfg.tipsterId+'" class="'+cfg.tipsterId+'-'+cfg.tipsterClass+'" ';
         tipbox += '     style="z-index: 96; display: none; position: absolute; ';
         tipbox += '     width: '+cfg.width+'px; left: 10px; top: 10px; background-position: 0pt;">';
         tipbox += ' <div id="'+cfg.tipsterId+'-outer" style="position: relative; z-index: 97;">';
         tipbox += '   <h3 id="'+cfg.tipsterId+'-title"></h3>';
         tipbox += '   <div id="'+cfg.tipsterId+'-inner"></div>';
         tipbox += ' </div>'
         tipbox += '</div>';
      }
      try {
         $('body').prepend(tipbox);
         this.ready = true;
      } catch(e) {
         alert("EXCEPTION start: ",e.message);
      }

   }

   //------------------------------------------------------
   // mouse handler: logic borrowed from jquery.hoverintent.js
   //
   // This should be used in tag event. e.g.,
   //
   //   onMouseOver="wctipster.handleHover(this,event);"
   //   onMouseOut="wctipster.handleHover(this,event);"
   //
   //------------------------------------------------------

   function fixEvent(event)
   {
      // Calculate pageX/Y if missing and clientX/Y available
      if ( event.pageX == null && event.clientX != null ) {
         var d = document.documentElement, b = document.body;
         event.pageX = event.clientX + (d && d.scrollLeft || b.scrollLeft || 0);
         event.pageY = event.clientY + (d && d.scrollTop || b.scrollTop || 0);
      }
      return event;
   }

   var cX, cY, pX, pY;
   this.handleHover = function(ob,e) {
      try {
      if (!this.ready) return false;

      if (cfg.onActivate && !cfg.onActivate(ob)) {
         return false;
      }

      // A private function for getting mouse position
      var track = function(ev) {
         cX = ev.clientX;
         cY = ev.clientY;
      };

      // A private function for comparing current and previous mouse position
      var compare = function(ev,ob) {
         ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
         // compare mouse positions to see if they've crossed the threshold
         if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
            $(ob).unbind("mousemove",track);
            // set hoverIntent state to true (so mouseOut can be called)
            ob.hoverIntent_s = 1;
            return cfg.over.apply(ob,[ev]);
         } else {
            // set previous coordinates for next time
            pX = cX; pY = cY;
            // use self-calling timeout, guarantees intervals are spaced out
            // properly (avoids JavaScript timer bugs)
            ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
         }
      };

      // A private function for delaying the mouseOut function
      var delay = function(ev,ob) {
         ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
         ob.hoverIntent_s = 0;
         return cfg.out.apply(ob,[ev]);
      };

      //----------------------------------------------------
      // Main code
      //----------------------------------------------------
      // (required for event object to be passed in IE)
      var ev = jQuery.extend({},e);

      // 1.0.3a - required for IE
      if (ev.pageX == null) {
          ev = fixEvent(ev);
      }

      // cancel hoverIntent timer if it exists
      if (ob.hoverIntent_t) {
          ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      }

      if (ev.type == "mouseover") {
         // set "previous" X and Y position based on initial entry point
         pX = ev.clientX; pY = ev.clientY;

         // 1.0.3b, needed for IE for bleeding tip
         removeTitle(ob);

         // update "current" X and Y position based on mousemove
         $(ob).bind("mousemove",track);

         // start polling interval (self-calling timeout) to compare
         // mouse coordinates over time
         if (ob.hoverIntent_s != 1) {
            ob.hoverIntent_t = setTimeout(function(){compare(ev,ob);},cfg.interval);
         }
      }
      else
      if (ev.type == "mouseout") {
         // 1.0.3b
         restoreTitle(ob);

         // unbind expensive mousemove event
         $(ob).unbind("mousemove",track);

         // if hoverIntent state is true, then call the mouseOut function
         // after the specified delay
         if (ob.hoverIntent_s == 1) {
             ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );
         }
      }
      } catch(e) {
        alert("exception; "+e.message);
      }
   }
}

//===============================================================
// This provides a jQuery wrapper plugin for wcTipster
//===============================================================

(function($) {
   $.fn.wcTipster = function(f,g) {
    var tip = new wcTipster(f,g);
    //// Either of these work with jq 1.2, 1.4
    ///this.bind("mouseover",function(ev) { tip.handleHover(this,ev);})
    ///this.bind("mouseout", function(ev) { tip.handleHover(this,ev);});
    //this.mouseover(function(ev) { tip.handleHover(this,ev);});
    //this.mouseout(function(ev) { tip.handleHover(this,ev);});
    this.mouseover(function(ev) { tip.handleHover(this,ev);});

    this.live("mouseover", function(ev) { tip.handleHover(this,ev);});
    this.live("mouseout", function(ev) { tip.handleHover(this,ev);});

    tip.start();
    return this;
   };
})(jQuery);
