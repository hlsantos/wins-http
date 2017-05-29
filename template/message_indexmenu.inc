<!-- Menu bar for Message List table -->
<center>
<table width="96%"
       id="tbAnch"
       border="0"
       cellspacing="0" cellpadding="0"
       class="buttontable collapse" >
<tr>
    @if top@
      <td class="disabled"><img id="btnImage" src="/images/dpagetop.gif" align=top border=0 alt=""> &nbsp;Top&nbsp;</td>
      <td class="disabled"><img id="btnImage" src="/images/dpageup.gif" align=top border=0 alt="">&nbsp;Page Up&nbsp;</td>
    @else@
      <td><a href="/code/html-list+messages?@SUB bparm@&pg=t" class="item">
      <img id="btnImage" src="/images/apagetop.gif" align=top border=0 alt="">&nbsp;Top&nbsp;</a></td>
      <td><a href="/code/html-list+messages?@SUB bparm@&pg=u&ptop=@SUB ptop@" class="item">
      <img id="btnImage" src="/images/apageup.gif" align=top border=0 alt="">&nbsp;Page Up&nbsp;</a>
      </td>
    @endif@
    @if bot@
      <td class="disabled"><img id="btnImage" src="/images/dpagedown.gif" align=top border=0 alt="">&nbsp;Page Down&nbsp;</td>
      <td class="disabled"><img id="btnImage" src="/images/dpagebottom.gif" align=top border=0 alt="">&nbsp;Bottom&nbsp;</td>
    @else@
      <td><a href="/code/html-list+messages?@SUB bparm@&pg=d&pbot=@SUB pbot@" class="item">
      <img id="btnImage" src="/images/apagedown.gif" align=top border=0 alt="">&nbsp;Page Down&nbsp;</a></td>
      <td><a href="/code/html-list+messages?@SUB bparm@&pg=b" class="item">
      <img id="btnImage" src="/images/apagebottom.gif" align=top border=0 alt="">&nbsp;Bottom&nbsp;</a></td>
    @endif@
    @if allowpost@
      <td>
      <a href="/code/html-new+message?@SUB bparm@&backto=html-list+messages&msgid=@SUB ptop@&pg=r" @if FrameMode@target="body"@endif@ class="item">
      <img id="btnImage" src="/images/write.gif" align=top border=0 alt="">&nbsp;New&nbsp;</a></td>
    @else@
      <td class="disabled">&nbsp;New&nbsp;</td>
    @endif@
      <td>
      <a href="/code/html-searchform?@SUB bparm@" class="item">
      <img id="btnImage" src="/images/mailques.gif" align=top border=0 alt="">
      &nbsp;Search&nbsp;
      </a>
      </td>
@if oldthreadlink@
      <td><a href="/code/html-list+messages?frames=@SUB frames@&conf=@SUB conf@&index=@SUB index@&threads=@if ThreadMode@n@ELSE@y@endif@"
                  class="item">&nbsp;View @if ThreadMode@Flat@else@Thread@endif@ Mode&nbsp;
          </a></td>
@else@
      <!-- removed the index reference for a view switch -->
      <td>
      <a href="/code/html-list+messages?frames=@SUB frames@&conf=@SUB conf@&threads=@if ThreadMode@n@ELSE@y@endif@" class="item">
      <img id="btnImage" src="/images/@if ThreadMode@flat@ELSE@thread@endif@mode.gif" align=top border=0 alt="">
      &nbsp;View @if ThreadMode@Flat@else@Thread@endif@ Mode&nbsp;
      </a>
      </td>
@endif@
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
</center>
