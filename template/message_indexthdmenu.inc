<style>

@if AreasFrame.Divider@
html { overflow-y: hidden; }
@endif@

.bar { background: silver; }

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

.Capitalize {
  text-transform: capitalize;
}

</style>


<div id="msgThreadMenuDivider"
     style="margin-top: 1%; margin-bottom: 1%; width: auto;">

<table border="0"
       cellspacing="0"
       cellpadding="2"
       align="center"
       class="buttontable"
       id="tbAnch">
<tr>
    <td @if !indexprev@class="disabled"@endif@>
       @if indexprev@
         <a href="/code/html-list+messages?frames=@SUB frames@&conf=@SUB conf@&index=1&threads=@SUB threads@" class="item">
        <img id="btnImage" src="/images/apagetop.gif" align=top border=0 alt="">&nbsp;Top&nbsp;</a>
        @else@
        <img id="btnImage" src="/images/dpagetop.gif" align=top border=0 alt="">
        &nbsp;Top&nbsp;
       @endif@
    </td>
    <td @if !indexprev@class="disabled"@endif@>
       @if indexprev@
        <a href="/code/html-list+messages?frames=@SUB frames@&conf=@SUB conf@&index=@SUB indexprev@&threads=@SUB threads@" class="item">
        <img id="btnImage" src="/images/apageup.gif" align=top border=0 alt="">&nbsp;Page up&nbsp;</a>
        @else@
        <img id="btnImage" src="/images/dpageup.gif" align=top border=0 alt="">
        &nbsp;Page up&nbsp;
       @endif@
    </td>

    <td @if !indexnext@class="disabled"@endif@>
       @if indexnext@
       <a href="/code/html-list+messages?frames=@SUB frames@&conf=@SUB conf@&index=@SUB indexnext@&threads=@SUB threads@" class="item">
        <img id="btnImage" src="/images/apagedown.gif" align=top border=0 alt="">&nbsp;Page down&nbsp;</a>
        @else@
        <img id="btnImage" src="/images/dpagedown.gif" align=top border=0 alt="">
        &nbsp;Page down&nbsp;
       @endif@
    </td>

    <td @if !indexnext@class="disabled"@endif@>
       @if indexnext@
        <a href="/code/html-list+messages?frames=@SUB frames@&conf=@SUB conf@&index=@SUB indexbottom@&threads=@SUB threads@" class="item">
        <img id="btnImage" src="/images/apagebottom.gif" align=top border=0 alt="">&nbsp;Bottom&nbsp;</a>
        @else@
        <img id="btnImage" src="/images/dpagebottom.gif" align=top border=0 alt="">
        &nbsp;Bottom&nbsp;
       @endif@
    </td>

    <td @IF !allowpost@class="disabled"@endif@>
       @IF allowpost@
       <a href="/code/html-new+message?frames=@SUB frames@&threads=@SUB threads@&conf=@SUB confnumber@&backto=/code/html-list messages?frames=@SUB frames@&threads=@SUB threads@&conf=@SUB confnumber@&index=@SUB indexfirst@"
          @IF frames="y"@target="body"@ENDIF@ class="item">
        <img id="btnImage" src="/images/write.gif" align=top border=0 alt="">
        &nbsp;New&nbsp;
       </a>
       @else@
       <img id="btnImage" src="/images/nowrite.gif" align=top border=0 alt="">
       &nbsp;New&nbsp;
       @endif@
    </td>

    <td><a href="/code/html-searchform?frames=@SUB frames@&conf=@SUB conf@&threads=@SUB threads@" class="item">
        <img id="btnImage" src="/images/mailques.gif" align=top border=0 alt="">&nbsp;Search&nbsp;</a></td>

    <td><a href="/code/html-list+messages?frames=@SUB frames@&conf=@SUB conf@&group=@SUB group@&threads=@IF threads="N"@Y@ELSE@N@ENDIF@" class="item">
        <img id="btnImage" src="/images/@if ThreadMode@flat@ELSE@thread@endif@mode.gif" align=top border=0 alt="">
         &nbsp;View @IF threads="N"@Thread@ELSE@Flat@ENDIF@ Mode&nbsp;</a></td>

    @if !FrameMode@
      <td><a href="/code/html-conference+areas?frames=n&threads=@SUB threads@&group=@SUB group@" class="item">
      <img id="btnImage" src="/images/forums.gif" align=top border=0 alt="">
      &nbsp;Forums&nbsp;</a>
      </td>
    @else@
      @ExistInclude "wc:\http\template\helpbutton.inc"@
    @endif@

</tr>
</table>
</div>
