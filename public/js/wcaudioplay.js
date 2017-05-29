/*------------------------------------------------------------------
                          wcAudioPlay.js
                           version 2.2
   (c) Copyright 2006-2012 Santronics Software, inc. All Rights Reserved
   Portions Copyright (c) 2007, Scott Schiller. All rights reserved.

Description:

Web-based .MP3, .WAV file audio player

For a .MP3 file, wcAudioPlay usese Scott's excellent SM2 (SoundManager
v2.0) javascript based web-based flash player.

For a .WAV file, wcAudioPlay will fall back to using a WCAUDIOPLAY.JAVA
based player.

To Use:

Step 1: Add the following to your page in the <head> section

<script language="javascript" src="/public/js/SoundManager2.js"></script>
<script language="javascript" src="/public/js/wcAudioPlay.js"></script>

Step 2: Add script code to your HTML

In the html body where you want to play a sound automatically, simply
add the following example scripts:

Example #1: Play an MP3 file

To play an MP3 file, must provide a unique dummy ID for MP3 files

   <script language="JavaScript">
     PlayAudio("/mysongs.mp3","myDummyID");
   </script>

Example #2: Play an WAV file, no id is required

   <script language="JavaScript">
     PlayAudio("/mysongs.wav");
   </script>

Example #3: Play a stock WcNavigator Audio Sound by ID name

   <script language="JavaScript">
     PlayAudioID("NewMail");
   </script>

------------------------------------------------------------------*/

//-----------------------------------------------------------------
// GetAudioFileByID() is an internal function to get
// the MP3 file by ID
//-----------------------------------------------------------------

function GetAudioFileByID(srcid)
{
   var mp3list = [];
   mp3list["AttachRequested"] = "/audio/mattach.mp3";
   mp3list["Blip"]            = "/audio/blip.mp3";
   mp3list["Bye"]             = "/audio/bye.mp3";
   mp3list["CatRoar"]         = "/audio/catroar.mp3";
   mp3list["DownloadOK"]      = "/audio/downok.mp3";
   mp3list["Hellooow"]        = "/audio/hellooow.mp3";
   mp3list["InstantMsg"]      = "/audio/instant.mp3";
   mp3list["MessageForYou"]   = "/audio/readper.mp3";
   mp3list["MsgDeleted"]      = "/audio/msgdel.mp3";
   mp3list["NewMail"]         = "/audio/newmail.mp3";
   mp3list["Oops"]            = "/audio/spellerr.mp3";
   mp3list["OpeningInbox"]    = "/audio/openinbx.mp3";
   mp3list["Replying"]        = "/audio/reply.mp3";
   mp3list["SeeYa"]           = "/audio/see-ya.mp3";
   mp3list["SpellCheckDone"]  = "/audio/speldone.mp3";
   mp3list["TrainWhistle"]    = "/audio/countdn.mp3";
   mp3list["UploadOk"]        = "/audio/upok.mp3";
   mp3list["YouSentIt"]       = "/audio/sentit.mp3";
   mp3list["goodsee"]         = "/audio/goodsee.mp3";
   return mp3list[srcid];
}

//-----------------------------------------------------------------
// PlayMP3() is an internal function to specifically play a
// MP3 file
//-----------------------------------------------------------------

function PlayMP3(src, srcid)
{
   if (soundManager) {
      soundManager.createSound(srcid,src);
      soundManager.play(srcid);
      soundManager.setVolume(srcid,25);
   }
}

//-----------------------------------------------------------------
// PlayAudio() and PlayAudioID() are the functions you
// can you.
//-----------------------------------------------------------------

function PlayAudio(src, srcid)
{
//   // Doesn't work with embedded
//   var nav   = navigator.userAgent;
//   if((nav.indexOf("MSIE")>-1) /*|| (nav.indexOf("Opera")>-1)*/) {
//       var aw = document.getElementById("wcAudioContainer");
//       if (aw) {
//          alert("using MSIE ++");
//          var s = "";
//          s += '<bgsound src="'+src+'" loop=0>';
//          aw.innerHTML = s;
//       }
//       return;
//   }

   // SM only supports .MP3 files.
   if ((src.toLowerCase().indexOf(".mp3") > -1)) {
      if (soundManager) {
         if (!srcid) srcid = src;
         if (soundManager.enabled) {
              PlayMP3(src,srcid);
         } else {
           soundManager.onload = function() {
              PlayMP3(src,srcid);
           }
         }
         return true;
      }
   }

   var aw = document.getElementById("wcAudioContainer");
   if (aw) {
      var s = "";
      // use embed for .mid
      if (src.toLowerCase().indexOf(".mid") > -1) {
         s += "<embed src='"+src+"' hidden='true' autostart='true' loop='false'/>";
         aw.innerHTML = s;
         return true;
      }
      // fallback to wcAudioPlay Java Class
      s += '<applet code="wcAudioPlay.class" width=0 height=0 codebase="/public/js">';
      s += '<param name="src" value="'+src+'">';
      s += '</applet>';
      aw.innerHTML = s;
      return true;
   }
   return false;
}

function PlayAudioID(srcid, src)
{
   if (src == null) {
       src = GetAudioFileByID(srcid);
   }
   if (src != "") {
      PlayAudio(src,srcid);
   }
}

function wcAudioPlayInit()
{
   var oTarget = (document.body?document.body:document.getElementsByTagName('div')[0]);
   if (oTarget) {
     var self = this;
     self.oAW = document.createElement('div');
     self.oAW.className = 'wcAudioContainer';
     self.oAW.setAttribute("id","wcAudioContainer");
     self.oAW.style.position = 'absolute';
     self.oAW.style.left = '-256px';
     self.oAW.style.width = '1px';
     self.oAW.style.height = '1px';
     try {
       oTarget.appendChild(self.oAW);
       self.oAW.innerHTML = "";
     } catch(e) {
       alert(e);
     }
     oTarget = null;
   }
}

// Breaks IE
//wcAudioPlayInit();
