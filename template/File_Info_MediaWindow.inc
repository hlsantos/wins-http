@comment@
version: 453.2 11/23/2009

Use this Include when a GlobalFileRecord has been as established.
It will be shown after the File Info table is shown in a IFRAME

@endcomment@

<!------------------ Display Media Window --------------->

<!-- Start WcFlash -->
@set MP3.Enable=0@
@set MP3.Player="wc:\http\public\wcflash\wcflash.wcx"@
@set MP3.Player.URL="/public/wcflash/wcflash.wcx"@
@if Exists Mp3.Player@@set MP3.Enable=1@@endif@
<!-- End WcFlash -->

@set MediaWindow=""@
@set ImageTypes = [".jpg", ".gif", ".png", ".bmp"]@
@set AudioTypes = [".mp3"]@
@set WavAudioTypes = [".wav"]@
@set VideoTypes = [".wmv", ".avi"]@

@if MimeExtension?ImageTypes[]@
   @set MediaWindow="<iframe src='/code/html-fdnld?frames=y&recno="FILE.RECORDNUMBER"' width='90%' height='50%'></iframe>"@
@elseif MimeExtension?VideoTypes[]@
<hr>
<center>
  <div id="Player">
  	<object id="mediaPlayer" name="mediaPlayer" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" standby="Loading Stream..." type="application/x-oleobject" height="360" width="400">
  		<param value="/file/area@FILE.AREA@/@FILE.NAME@" name="URL">
  		<param name="enableContextMenu" value="true">
  		<param name="stretchToFit" value="false">
  		<param name="windowlessvideo" value="false">
  		<param name="backgroundColor" value="white">
  		<param name="autostart" value="true">
  		<param name="mute" value="false">
  		<embed autosize="1" showtracker="1"
  		      type="application/x-mplayer2"
  		      src="/file/area@FILE.AREA@/@FILE.NAME@"
  		      pluginspage="http://www.microsoft.com/Windows/Downloads/Contents/Products/MediaPlayer/"
  		      id="mediaPlayer" showstatusbar="1" autostart="1" loop="0" name="mediaPlayer" enablecontextmenu="1" height="360" width="400">
  	</object>
  </div>
</center>
<hr>
@elseif MP3.Enable && MimeExtension?AudioTypes[]@
   @set MediaWindow="<iframe src='"MP3.Player.URL"?recno="FILE.RECORDNUMBER"' width='90%'></iframe>"@
@elseif MP3.Enable && MimeExtension?WavAudioTypes[]@
   @set MediaWindow=""@
   <script>
   function PlayIt(src) { document.wcAudio.PlayMedia(src); }
   </script>
   <hr>
   <div id="divAudio" style="display:block; position: absolute; top: -1; z-index: 5;">
   <applet name="wcAudio" code="wcAudioPlay.class" width=0 height=0 codebase="/public" MAYSCRIPT></applet>
   </div>
   <center>
   @SET wav="/file/area"FILE.AREANUMBER"/"FILE.NAME"@
   <button onClick="PlayIt('@SUB wav@');" title="Play Audio!"><img src="/images/audio.png" border=0> Play @FILE.NAME@</button>
   </center>
   <hr>
@endif@

@if MediaWindow@
<hr>
<center>
@GET MediaWindow@
</center>
<hr>
@endif@

<!---------------- End Display Media Window ------------->

