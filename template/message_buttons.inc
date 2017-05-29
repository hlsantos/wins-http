@if hasmessages@
<table width="96%"
       border="1"
       cellspacing="0"
       align="center"
       class="msglistbuttons">
  <tr>
     <td class="itemgifrow" valign="bottom" align="left">
      <a href="javascript:void msgAction('delete');" class="itemgif" id="btnMsgDelete" title="delete checked message(s)">
      <img src="/images/msgdelete.gif" align="top" border="0">
      &nbsp;Delete&nbsp;
      </a>
      @if NewMail@
      &nbsp;&nbsp;
      <a href="javascript:void msgAction('markread');" class="itemgif" id="btnMsgMarkRcvd" title="mark checked message(s) as received">
      <img src="/images/msgmark.gif" align="top" border="0">
      &nbsp;Mark Read&nbsp;
      </a>
      @endif@
     </td>
  </tr>
</table>
@endif@
