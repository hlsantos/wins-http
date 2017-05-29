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

function wcTipster(K,J){this.version="1.0.3b";var L={sensitivity:2,interval:100,timeout:0,tipsterId:"tipster",tipsterClass:"default",viewPort:"body",width:350,offsetX:16,offsetY:20,showHow:"fadeIn",showSpeed:200,enableWaitImage:false,waitImage:"wait.gif",allowHTML:false,cacheEnabled:true,cacheMaxSize:50,ajaxSettings:{},onPlacement:Q,onAjaxData:D,onActivate:I,over:M,out:H,dummy:1};L=$.extend(L,J?{over:K,out:J}:K);if(L.sensitivity<=1){L.sensitivity=2}if(typeof L.width=="string"){L.width=+L.width.replace(/px/,"")}var A={"length":0,"data":[]};function N(){var R=A.length;A.data=[];A.length=0;return R}function D(R){if(!L.allowHTML){R="<span>"+R+"</span>";R=$(R).text()}return R}function I(R){return true}function Q(h,e,g,R){var c=h.pageX;var a=h.pageY;var Y=c;var i=a;var o=$(g).offset();o.width=g.offsetWidth;o.height=g.offsetHeight;if(g.tagName.toUpperCase()=="BODY"){o.width=g.clientWidth;o.height=g.clientHeight}var W=(h.pageY-h.clientY)-o.top;var j=(h.pageX-h.clientX)-o.left;if(W<0){W=0}if(j<0){j=0}var d=e.offsetWidth;var Z=e.offsetHeight;var V=Math.ceil(Z/2);var X=Math.ceil(d/2);var m=R?R.x:16;var k=R?R.y:20;var S=$(this).offset();var U=this.offsetWidth;var T=this.offsetHeight;var b=S.left+U-c;Y+=b+m;i-=V;var n=false;if(((Y-o.left)+d)>o.width){Y=o.width-d+o.left;n=true}function l(p){Y=(p?p:c)-X;if(Y<o.left){Y=o.left+m}if(Y<o.left){Y=c}}function f(){if(((S.top+T-o.top)+Z)>o.height){i=a-Z-T}else{i=a+k}}if(((i-W)<o.top)&&(c<Y)){i=o.top+W;if(n){l();f()}}else{if((i-W-o.top+Z)>o.height){i=o.top+W+o.height-Z;if(n){if((Y-c-b-m)<0){i=a-Z-k;l(Y)}}if(i<0){i=0}}else{if(n){l();f()}}}e.style.left=Y;e.style.top=i;return{left:Y,top:i}}function G(R){var S=R.getAttribute("title");if(S&&S!=""){R.setAttribute("title","");R.setAttribute("otitle",S)}}function F(R){var S=R.getAttribute("otitle");if(S&&S!=""){R.setAttribute("otitle","");R.setAttribute("title",S)}}function M(d){if(true||this.id){var W=$("#"+L.tipsterId);var R=this.getAttribute("rel");var X=this.getAttribute("class");var U=this.getAttribute("id");var g=this;var S=this.getAttribute("titleTip");if((!S||S=="")){var e=this.getAttribute("otitle");if(e){S=e}}$("#"+L.tipsterId+"-title").html(S);function T(){if(typeof L.showHow=="string"){W[L.showHow||"show"](L.showSpeed)}else{W.show()}W.get(0).style.visibility="hidden";try{var h={x:L.offsetX,y:L.offsetY};L.onPlacement.apply(g,[d,W.get(0),L.viewPort?$(L.viewPort).get(0):window,h])}catch(i){alert(i.message)}W.get(0).style.visibility="visible"}function b(h){if(L.onAjaxData){h=L.onAjaxData(h)}if(L.cacheEnabled&&U){if(L.cacheMaxSize&&(A.length>=L.cacheMaxSize)){N()}A.length++;A.data[U]=h}$("#"+L.tipsterId+"-inner").html(h);T()}function f(){if(L.enableWaitImage&&V){V.hide()}}if(R&&R!=""&&R.charAt(0)!="#"){if(L.cacheEnabled&&U&&A.data[U]){$("#"+L.tipsterId+"-inner").html(A.data[U]);T()}else{if(L.enableWaitImage){var V=$("#"+L.tipsterId+"-waitimage");if(V){var a=d.pageX+20;var Y=d.pageY;V.css({"top":Y+"px","left":a+"px"});V.show()}}var c={url:R,type:"get",success:b,complete:f};if(L.ajaxSettings){$.extend(c,L.ajaxSettings)}if(c.type.toLowerCase()=="post"){var Z=R.split("?",2);c.url=Z[0];if(!c.data&&Z.length>1){c.data=Z[1]}}$.ajax(c)}}else{if(R.charAt(0)=="#"){$("#"+L.tipsterId+"-title").hide();$("#"+L.tipsterId+"-inner").html($(R).html())}else{$("#"+L.tipsterId+"-title").show();$("#"+L.tipsterId+"-inner").html(this.id)}T()}}}function H(R){$("#"+L.tipsterId).hide();$("#"+L.tipsterId+"-inner").html("")}this.ready=false;this.start=function(R){var S="";if(R&&R!=""){S=R}else{if(L.enableWaitImage){S+=" <img id=\""+L.tipsterId+'-waitimage" src="'+L.waitImage+'" ';S+='     style="position: absolute; z-index: 95; ';S+='     display: none; top: 78px; left: 285px;"/>'}S+="<div id=\""+L.tipsterId+'" class="'+L.tipsterId+"-"+L.tipsterClass+'" ';S+='     style="z-index: 96; display: none; position: absolute; ';S+="     width: "+L.width+'px; left: 10px; top: 10px; background-position: 0pt;">';S+=" <div id=\""+L.tipsterId+'-outer" style="position: relative; z-index: 97;">';S+="   <h3 id=\""+L.tipsterId+'-title"></h3>';S+="   <div id=\""+L.tipsterId+'-inner"></div>';S+=" </div>";S+="</div>"}$("body").prepend(S);this.ready=true};function E(S){if(S.pageX==null&&S.clientX!=null){var T=document.documentElement,R=document.body;S.pageX=S.clientX+(T&&T.scrollLeft||R.scrollLeft||0);S.pageY=S.clientY+(T&&T.scrollTop||R.scrollTop||0)}return S}var P,O,C,B;this.handleHover=function(S,W){if(!this.ready){return false}if(L.onActivate&&!L.onActivate(S)){return false}var R=function(X){P=X.clientX;O=X.clientY};var V=function(Y,X){X.hoverIntent_t=clearTimeout(X.hoverIntent_t);if((Math.abs(C-P)+Math.abs(B-O))<L.sensitivity){$(X).unbind("mousemove",R);X.hoverIntent_s=1;return L.over.apply(X,[Y])}else{C=P;B=O;X.hoverIntent_t=setTimeout(function(){V(Y,X)},L.interval)}};var T=function(Y,X){X.hoverIntent_t=clearTimeout(X.hoverIntent_t);X.hoverIntent_s=0;return L.out.apply(X,[Y])};var U=jQuery.extend({},W);if(U.pageX==null){U=E(U)}if(S.hoverIntent_t){S.hoverIntent_t=clearTimeout(S.hoverIntent_t)}if(U.type=="mouseover"){C=U.clientX;B=U.clientY;G(S);$(S).bind("mousemove",R);if(S.hoverIntent_s!=1){S.hoverIntent_t=setTimeout(function(){V(U,S)},L.interval)}}else{if(U.type=="mouseout"){F(S);$(S).unbind("mousemove",R);if(S.hoverIntent_s==1){S.hoverIntent_t=setTimeout(function(){T(U,S)},L.timeout)}}}}}(function(A){A.fn.wcTipster=function(D,B){var C=new wcTipster(D,B);this.bind("mouseover",function(E){C.handleHover(this,E)});this.bind("mouseout",function(E){C.handleHover(this,E)});C.start();return this}})(jQuery)