<style>

.bar        { background: silver; }
.Capitalize { text-transform: capitalize;}

table.buttontable {
    border: 1px solid #333333;
    border-collapse: collapse;
    empty-cells: show;
    white-space: nowrap;
    font-family: verdana,tahoma,arial; font-size : 8pt;
    font-weight : Bold;
    background : Silver;
}
table.buttontable td {
    vertical-align: top;
    white-space: nowrap;
    padding: 0;
    overflow: hidden;
}
#btnText {
   display: inline;
   padding: 2pt;
   vertical-align: middle;
}

#btnImage {
    border: 0px;
@if "MSIE"?Http.User-Agent@
    width: 16px;
    height: 16px;
@endif@
}

</style>

@Set UploadWindow.Target="description"@

<div id="msgThreadMenuDivider"
     style="margin-top: 1%; margin-bottom: 1%; width: auto;">

<center>
<table width="96%"
       border="0"
       cellspacing="0"
       cellpadding="1"
       align="center"
       class="buttontable">
<tr>
    <td @if !indexprev@class="disabled"@endif@ width="1%" nowrap>
       @if indexprev@
         <a href="/code/html-list+files?frames=@SUB query.frames@&area=@SUB query.area@&index=1" class="item">
        <img id="btnImage" src="/images/apagetop.gif" align=top border=0 alt="">&nbsp;Top&nbsp;</a>
        @else@
        <img id="btnImage" src="/images/dpagetop.gif" align=top border=0 alt="">
        &nbsp;Top&nbsp;
       @endif@
    </td>
    <td @if !indexprev@class="disabled"@endif@ width="1%" nowrap>
       @if indexprev@
        <a href="/code/html-list+files?frames=@SUB query.frames@&area=@SUB query.area@&index=@SUB indexprev@" class="item">
        <img id="btnImage" src="/images/apageup.gif" align=top border=0 alt="">&nbsp;Page up&nbsp;</a>
        @else@
        <img id="btnImage" src="/images/dpageup.gif" align=top border=0 alt="">
        &nbsp;Page up&nbsp;
       @endif@
    </td>

    <td @if !indexnext@class="disabled"@endif@ width="1%" nowrap>
       @if indexnext@
       <a href="/code/html-list+files?frames=@SUB query.frames@&area=@SUB query.area@&index=@SUB indexnext@" class="item">
        <img id="btnImage" src="/images/apagedown.gif" align=top border=0 alt="">&nbsp;Page down&nbsp;</a>
        @else@
        <img id="btnImage" src="/images/dpagedown.gif" align=top border=0 alt="">
        &nbsp;Page down&nbsp;
       @endif@
    </td>

    <td @if !indexnext@class="disabled"@endif@ width="1%" nowrap>
       @if indexnext@
        <a href="/code/html-list+files?frames=@SUB query.frames@&area=@SUB query.area@&index=@SUB indexbottom@" class="item">
        <img id="btnImage" src="/images/apagebottom.gif" align=top border=0 alt="">&nbsp;Bottom&nbsp;</a>
        @else@
        <img id="btnImage" src="/images/dpagebottom.gif" align=top border=0 alt="">
        &nbsp;Bottom&nbsp;
       @endif@
    </td>

@if !FrameMode@
	 <td width="1%" nowrap class="itemoff"><a href="/code/html-file?frames=y" class="item" target="_parent">
    <img id="btnImage" src="/images/frames.gif" align=top border=0 alt="">
	 &nbsp;View&nbsp;Frames&nbsp;</a></td>

	 <td width="1%" nowrap class="itemoff"><a href="code/html-file+areas?frames=n&group=@SUB QUERY.group@#group@SUB QUERY.group@" class="item" target="_parent">
    <img id="btnImage" src="/images/forums.gif" align=top border=0 alt="">
	 &nbsp;File Areas&nbsp;</a></td>
@endif@

    <td nowrap class="item">&nbsp;</td>

 	 @if CanUpload@
 	 <td width="1%" nowrap class="itemoff">
 	   <a href="/code/html-upload?frames=@SUB query.frames@&farea=@SUB query.area@" target="@SUB UploadWindow.Target@" class="item" title="Upload a new file into file area.">
      <img id="btnImage" src="/images/uploadfile.gif" align=top border=0 alt="">&nbsp;Upload&nbsp;</a>
    </td>
    @else@
 	 <td width="1%" nowrap class="disabled">
      <img id="btnImage" src="/images/nouploadfile.gif" align=top border=0 alt="">&nbsp;Upload&nbsp;
    </td>
    @endif@

    <td width="1%" align="right" nowrap class="item">
@IF EXIST "wc:\http\FileListRefresh.wct"@
    <a href="/FileListRefresh.wct?frames=@SUB query.frames@&area=@SUB query.area@&ra=1" class="item" title="Refresh File Area">
@ELSE@
    <a href="/code/html-list+files?frames=@SUB query.frames@&area=@SUB query.area@&ra=1" class="item" title="Refresh File Area">
@ENDIF@
    <img id="btnImage" src="/images/refresh.gif" align=top border=0 alt="">&nbsp;Refresh&nbsp;</a>

    </td>
</tr>
</table>
</center>

</div>
