(function(h){h.fn.wcAutoSuggest=function(i){var f,l,p,j,k,m,n,o;function r(a){if(""==a)b.html("").hide();else{var s=a.split("\n"),a="";d.val();for(var g=0;g<s.length;g++){var e=h.trim(s[g]);if(e){c.lowerCase&&(e=e.toLowerCase());var f=e,a=a+("<option value='"+e+"'>"),a=a+(f+"</option>"),a=a+"\n"}}""!=a&&b.html(a);a=b[0];a.selectedIndex=0;a.size=c.viewLimit&&a.length>c.viewLimit?c.viewLimit:a.length;if(c.autoSelect&&1==a.length){if(d.val(a.options[0].text),b.html("").hide(),c.onSelect)c.onSelect(d.val())}else b.show()}}
function u(a){h.ajax({url:c.suggestUrl+escape(a),success:function(a){r(a)},error:function(){b.html("").hide()}})}function t(){0<f||(clearTimeout(f),f=0,t(d.val()))}function q(a){d.val(a)[0].focus();b.html("").hide();if(c.onSelect)c.onSelect(d.val())}var c={suggestUrl:"",viewLimit:11,suggestBox:"",autoSelect:!0,onSelect:null,keyDelay:200,lowerCase:!0,dummy:""};switch(typeof i){case "object":c=h.extend(c,i);break;case "string":c.suggestUrl=i}var d=this;if(!c.suggestBox||""==c.suggestBox)c.suggestBox=
"suggestBox",i=""+("<br><select id='"+c.suggestBox+"'"),d.after(i+" class='suggestBox'></select>");var b=h("#"+c.suggestBox);b.hide().css({position:"absolute","z-index":99});k=j=p=l=f=0;o=n=m=!1;d.attr("autocomplete","off").keydown(function(a){switch(a.keyCode){case 9:m=!0}}).keyup(function(a){if(c.keyDelay){var d=a.timeStamp-p;p=a.timeStamp;if(d<c.keyDelay){0==f&&(f=setTimeout(t,75));return}}switch(a.keyCode){case 13:if(!b.is(":hidden")){q(b.val());return}case 27:b.is(":hidden")&&(this.value="");
b.html("").hide();return;case 37:case 38:case 39:case 40:n=!0;b[0].focus();return}if(this.value){if(this.value.length>l&&(l=this.value.length,!b.is(":hidden"))){for(var a=this.value.toLowerCase(),d=[],g=b[0],e=0;e<g.length;e++)0==g.options[e].text.toLowerCase().indexOf(a)&&d.push(g.options[e].text);if(0<d.length){r(d.join("\n"));return}}l=this.value.length;u(this.value)}else b.html("").hide()}).focus(function(){j++}).blur(function(){j--;0==j&&0==k&&!n&&(!m&&!o)&&b.html("").hide()});b.focus(function(){k++;
m=n=!1}).blur(function(){k--;0==j&&0==k&&b.html("").hide()}).keyup(function(a){switch(a.keyCode){case 13:q(this.value);break;case 27:d[0].focus(),b.html("").hide()}}).mouseover(function(){o=!0}).mouseout(function(){o=!1}).dblclick(function(){q(this.value)});return this}})(jQuery);
