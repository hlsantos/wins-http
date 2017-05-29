/*===============================================================
Wildcat! Interactive Net Server
(c) copyright 2007 Santronics Software, Inc.

sub-system: Wildcat! Web 2.0 Server
wcbuild   : 452.4a
version   : v1.0.1b (jquery.wcAutoSuggest.js.2) (BETA)
date      : 11/22/07 10:23 pm

About:

   wcAutoSuggest is a jQuery plug-in to provide a simple ajax-based auto
   suggestion box using a <SELECT> scroll box for any input field. The
   intent is for simple fast selections where no drawing and reduced
   keyboard emulation of list box or scroll box characteristics is
   required which often can be cross-browser challenged.  There is
   no matching character highlisting feature - by design.

Todo List:

   * Add keyboard accelerator for select box
   * Look at backward caching, browser cache may allevate this.
   * Add auto logic to limit view within browser view port.
   * Add callback function for selection.
   * Clean up code.

Usages:

   - via passing a URL:

    $("#inputBox").wcAutoSuggest("/suggest.wcx?q=");

   - via passing an options object:

    $("#inputBox").wcAutoSuggest({
        suggestUrl : "/suggest.wcx?q=", // REQ: ajax URL
        suggestBox : "",                // OPT: user provided ID
        viewLimit  : 11,                // OPT: number of view items
        autoSelect : true,              // OPT: auto select 1 result
    });

Options:

   The suggestUrl is the url for AJAX GET request. The AJAX result is
   expected to provide a list of strings with a \n delimeter. If no
   items are found, the AJAX call SHOULD return a 404 error (not found).

   If suggestBox id is not provided or empty, a <select> box will be
   dynamically added after the control input box.  If provided, then you
   must add your own select box to the HTML code. You can place it
   anyway. It doesn't have to be beneath the input box, you know?

   viewLimit is the size of the scroll box when the ajax result string
   list length is larger than the viewLimit.  The default is 11. If
   set at zero, the entire suggest list is shown.  Note,this can overflow
   your browser page making it really ugly for the user. So you should
   use a limit, or leave it at default. 11 was selected because if
   numbers are involved in a list, then for a single digit you have
   11 possibilities, ie, 5, 50, 51 ..... 59.

   autoSelect is neat. If there is only one item found, it will
   immediately filled in the input box. No suggestBox is shown. This is
   very useful when a input box must contain a string that is
   restricted.  It can not be anything else.  A good example is a list
   of titles or list of people's names. If autoSelect is false, then the
   single item suggest box  will be shown but it will not be auto
   selected.  This is useful too if the user wants to see what comes up
   but doesn't necessarily wish to select it.

CSS consideration:

   The auto-generated <SELECT> box has a class name and id of
   "suggestBox". This allows you to create a style for this class
   or id.

Special Ergonomics Highlights:

   - 100% cross-browser list box scrolling support for large list.

   - ESC key allows you to escape (hide) the suggestion box and also
     escape (clear) the input box.  This allows user to try other
     initial strings without having to backspace.

   - Auto selection when single item is found.  This is where the
     ESC key comes in handle too if the single item is not the
     desire result.

   - Cache ahead support where typing more characters will use
     the existing list box items to further reduce it.  If the
     list is reduced to nothing, the AJAX call is made.

History:

   v1.01a 11/22/07 10:23 pm
   - initial BETA version

   v1.01b 11/23/07 06:36 am
   - massive fixes and new features - still BETA

===============================================================*/

(function($) {

   $.fn.wcAutoSuggest = function(url) {

     var KEY_RET =  13;
     var KEY_ESC =  27;
     var KEY_LT  =  37;
     var KEY_UP  =  38;
     var KEY_RT  =  39;
     var KEY_DN  =  40;
     var KEY_BS  =  8;
     var KEY_TAB =  9;

     //--------------------------------------
     // prepare default options
     //--------------------------------------

     var opts = {
        suggestUrl : "",      // ajax URL
        viewLimit  : 11,      // number of viewable items
        suggestBox : "",      // user provided id
        autoSelect : true,    // if true, one item is auto selected.
        onSelect   : null,
        keyDelay   : 200,     // keyBoard delay
        lowerCase  : true,    // lower case result
        dummy      : ""
     };

     switch (typeof url) {
       case "object":
          opts = $.extend(opts, url);
          break;
       case "string":
          opts.suggestUrl = url;
          break;
     };

     //--------------------------------------
     // if opt.suggestBox tag id is not provided,
     // add <select> element after inbox box
     //--------------------------------------

     var $inputBox   = this;
     if (!opts.suggestBox || opts.suggestBox == "") {
        opts.suggestBox = "suggestBox";
        var boxHtml = "";
        boxHtml += "<br><select id='"+opts.suggestBox+"'";
        boxHtml += " class='suggestBox'></select>";
        $inputBox.after(boxHtml);
     }
     var $suggestBox = $("#"+opts.suggestBox);
     $suggestBox.hide().css({"position": "absolute", "z-index": 99});

     //--------------------------------------
     // system state variables
     //--------------------------------------

     var state = {
        aTimer: 0,
        lastLen: 0,
        lastTime: 0,
        input:0,
        suggest:0,
        tabbing: false,
        focusingSuggest: false,
        mousingSuggest: false
     };

     //--------------------------------------
     // internal helper functions
     //--------------------------------------

     function makeOptions(sList)
     // - split string list into <option> strings
     {
         var items = sList.split("\n");
         sList = "";
         var vlen = $inputBox.val().length;
         for (var i = 0; i < items.length; i++) {
           var item = $.trim(items[i]);
           if (item) {
              if (opts.lowerCase) item = item.toLowerCase();
              var cs = item;
              // Highlight Support
              //var cs = "<b>"+item.substr(0,vlen)+"</b>"+item.substr(vlen);
              //
              sList += "<option value='"+item+"'>";
              sList += cs+"</option>";
              sList += "\n";
           }
        }
        return sList;
     }

     function makeSuggestBox(slist)
     // - create/show the select box
     {
        // shouldn't happen
        if (slist == "") {
           $suggestBox.html("").hide();
           return;
        }
        // split result into option strings
        slist = makeOptions(slist);
        if (slist != "") $suggestBox.html(slist);

        // select first item, size view port
        var sb = $suggestBox[0];
        sb.selectedIndex = 0;
        if (opts.viewLimit && sb.length > opts.viewLimit) {
           sb.size = opts.viewLimit;
        } else {
           sb.size = sb.length;
        }

        // if one item, select/hide otherwise show
        if (opts.autoSelect && sb.length == 1) {
          $inputBox.val(sb.options[0].text);
          $suggestBox.html("").hide();
          if (opts.onSelect) opts.onSelect($inputBox.val());
        } else {
          $suggestBox.show();
        }
     }

     function doAjax(v)
     // - perform ajax call
     {
       $.ajax({
         url: opts.suggestUrl+escape(v),
         success: function(msg) { makeSuggestBox(msg); },
         error:   function()    { $suggestBox.html("").hide(); }
       });
     }

     function doAjaxEvent()
     // - perform pending ajax call (from keyboard delay)
     {
        if (state.aTimer > 0) {
           //console.log("* skipping ajax pending (2)");
           return;
        }
        //console.log("* ajax event!");
        clearTimeout(state.aTimer);
        state.aTimer = 0;
        doAjaxEvent($inputBox.val());
     }

     function selectItem(v)
     // - select suggest item and hide
     {
        $inputBox.val(v)[0].focus();
        $suggestBox.html("").hide();
        if (opts.onSelect) opts.onSelect($inputBox.val());
     }

     //--------------------------------------
     // control the input box
     //--------------------------------------

     $inputBox
        .attr("autocomplete", "off")

        .keydown(function(event) {
           switch (event.keyCode) {
             case KEY_TAB: // select current suggest box item
                state.tabbing = true;
                return;
           }
        })
        .keyup(function(event) {
           if (opts.keyDelay){
              var tdiff = event.timeStamp-state.lastTime;
              //console.log("key time: ",tdiff);
              state.lastTime = event.timeStamp;
              if (tdiff < opts.keyDelay) {
                 if (state.aTimer == 0) {
                    //console.log("* key skipping schedule ajax");
                    state.aTimer = setTimeout(doAjaxEvent,75);
                 } else {
                    //console.log("* key skipping ajax pending (1)");
                 }
                 return;
              }
           }
           switch (event.keyCode) {
             case KEY_RET: // select current suggest box item
                if (!$suggestBox.is(":hidden")) {
                   selectItem($suggestBox.val());
                   return;
                }
             case KEY_ESC: // quick clear, avoids KEY_BS
                if ($suggestBox.is(":hidden")) this.value = "";
                $suggestBox.html("").hide();
                return;
             case KEY_LT:
             case KEY_UP:
             case KEY_RT:
             case KEY_DN:
                state.focusingSuggest = true;
                $suggestBox[0].focus();
                return;
           }
           if (this.value) {
             if (this.value.length > state.lastLen) {
                // check current list matches
                state.lastLen = this.value.length;
                if (!$suggestBox.is(":hidden")) {
                  var t = this.value.toLowerCase();
                  var fl = [];
                  var sb = $suggestBox[0];
                  for (var i = 0; i < sb.length; i++) {
                     var s = sb.options[i].text.toLowerCase();
                     if (s.indexOf(t) == 0) {
                        fl.push(sb.options[i].text);
                     }
                  }
                  if (fl.length > 0) {
                      // create new list, no ajax needed
                      makeSuggestBox(fl.join("\n"));
                      return;
                  }
                }
             }
             state.lastLen = this.value.length;
             doAjax(this.value);
           } else {
             $suggestBox.html("").hide();
           }
        })
        .focus(function() {
           state.input++;
           return;
        })
        .blur(function() {
           state.input--;
           if (state.input == 0 && state.suggest == 0) {
              if (!state.focusingSuggest && !state.tabbing && !state.mousingSuggest) {
                 $suggestBox.html("").hide();
              }
           }
           return;
        });

     //--------------------------------------
     // control the suggestion box
     //--------------------------------------

     $suggestBox
        .focus(function() {
           state.suggest++;
           state.focusingSuggest = false;
           state.tabbing         = false;
           return;
         })
        .blur(function() {
           state.suggest--;
           if (state.input == 0 && state.suggest == 0) {
              $suggestBox.html("").hide();
           }
           return;
         })
        .keyup(function(event) {
           switch (event.keyCode) {
             case KEY_RET:
               selectItem(this.value);
               return;
             case KEY_ESC:
               $inputBox[0].focus();
               $suggestBox.html("").hide();
               return;
           }
         })
        .mouseover(function(){ state.mousingSuggest = true; })
        .mouseout(function(){  state.mousingSuggest = false; })
        .dblclick(function(){  selectItem(this.value); });

     return this;
   };
})(jQuery);
