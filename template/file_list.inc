@comment@
version: 453.2 11/23/2009

Display table listing of files. Included by:

   file_listing.htm
   file_new.htm
   file_search.htm

@endcomment@



<!-- Start WcFlash -->
@set MP3.Enable=0@
@set MP3.Player="wc:\http\public\wcflash\wcflash.wcx"@
@set MP3.Player.URL="/public/wcflash/wcflash.wcx"@
@if Exists Mp3.Player@@set MP3.Enable=1@@endif@
<!-- End WcFlash -->

@set playlist[]=@

<style>
.tablelist {
	font-family: Verdana, Arial, Helvetica, sans-serif;
   font-size : 8pt;
}

.tablelist, th, td {
	font-family: Verdana, Arial, Helvetica, sans-serif;
   font-size : 8pt;
}

.tabletitle {
	font-family: Verdana, Arial, Helvetica, sans-serif;
   font-size : 8pt;
}

.tablesortbtn {
  border: 1px solid black;
  color: yellow;
}

</style>

<script type='text/javascript'>
function fileListHover(ob,evt)
{
   if (evt.type=="mouseover") ob.style.background = "yellow";
   if (evt.type=="mouseout")  ob.style.background = "";
}
</script>

<table class="tablelist"
       width="96%"
       border="1"
       cellspacing="0"
       cellpadding="2"
       align="center">
  <tr>
  @//@ Name Sort - not sticky
  @//@<th class="tabletitle"><a class="tablesortbtn" href="/code/html-list+files?frames=@SUB query.frames@&area=@SUB query.area@&sort=name" title="sort by name">Name</a></th>
  <th class="tabletitle">Name</th>
  <th class="tabletitle">Description</th>
  <th class="tabletitle">Info</th>
  <th class="tabletitle" style="text-align:right;">Size</th>
  <th class="tabletitle" style="text-align:right;">Dnlds</th>
  @//@ Date Sort - not sticky
  @//@<th class="tabletitle"><a class="tablesortbtn" href="/code/html-list+files?frames=@SUB query.frames@&area=@SUB query.area@&sort=date" title="sort by date">Date</a></th>
  <th class="tabletitle" nowrap>Date</th>
  </tr>
@LOOP@
  @if newarea@
  <tr bgcolor="#dddddd"><th colspan=6>Area @FILE.AREA@ - @SUB areaname@</td></tr>
  @endif@
  <tr class="filerow" onmouseOver="fileListHover(this,event);" onmouseout="fileListHover(this,event);">
    <td valign="top">
     @if new@<img src="/images/new.gif">@endif@
     @if MP3.Enable && ".mp3"?file.name@
        <a href="@SUB MP3.Player.URL@?recno=@FILE.RECORDNUMBER@" title="Play Audio!" target="description">
        <img src="/images/redarrow.gif" border=0>
        </a>
        @add playlist[] [FILE.NAME, FILE.DESCRIPTION]@
     @endif@
     @if CanDownload@
       <a href="/code/html-fdnld?frames=@SUB query.frames@&recno=@FILE.RECORDNUMBER@" @if FrameMode@target="description"@endif@ title="Download this file.">&nbsp;@FILE.NAME@@IF File.Password@ (PP)@endif@</a>
     @else@
       &nbsp;@FILE.NAME@
     @endif@
    </td>
    <td>&nbsp;@FILE.DESCRIPTION@</td>
    <td><a href="/code/html-file+info?frames=@SUB query.frames@&recno=@FILE.RECORDNUMBER@"
           @IF FrameMode@target="description"@ENDIF@>@SUB1@</a></td>
    <td nowrap align="right">&nbsp;@FILE.SIZEMBYTES@</td>
    <td align="right">&nbsp;@FILE.DOWNLOADS@</td>
    <td nowrap>&nbsp;@FILE.DATE@</td>
  </tr>
@ENDLOOP@
</table>


@IF PLAYLIST.COUNT > 0@
@EXISTINCLUDE "wcAudioPlayList.htm"@
@ENDIF@

