<!-- vinfo: file_manager_options.htm 09/08/05 v6.1.451.5
@COMMENT@

The Web-based File Manager options are prepared by HTML-FILE INFO.WCX
per user per access security:

   CanDownload             User can download
   CanDeleteFile           User can delete
   CanSysopEditFile        User has sysop access to file
   CanModifyFile           User has Ownership Access to file
   CanMoveFile             User can move file


@ENDCOMMENT@
-->

@if CanDeleteFile@
<script type="text/javascript">
function wcDeleteConfirm(url,fname,disktoo)
{
  var prm = "Delete this record?";
  if (disktoo) prm = "Delete record and file?";
  if (confirm("File: "+fname+"\r\n"+prm)) {
     document.location.href = url;
  }
  return true;
}
</script>
@endif@

<table width="96%" border="0" cellspacing="3" cellpadding="2" align="center">
 <tr class="disabled">
 @if CanDownload@
 <td width="1%" nowrap class="itemoff" align="left">
   <a href="/code/html-fdnld?frames=@SUB query.frames@&area=@FILE.AREA@&file=@sub filename@" class="item" title="Download this file.">&nbsp;Download&nbsp;</a>
 </td>
 @endif@
 <td nowrap align="right">&nbsp;</td>
 @if CanDeleteFile@
 <td width="1%" nowrap class="item_red" align="right"><a href='javascript:void wcDeleteConfirm("/code/html-fm-delete?frames=@Sub Query.Frames@&area=@FILE.AREA@&recno=@SUB RECNO@","@SUB FILENAME@");' Title="WARNING! This will delete the file record!" class="item_red">&nbsp;Delete Record&nbsp;</a></td>
 <td width="1%" nowrap class="item_red" align="right"><a href='javascript:void wcDeleteConfirm("/code/html-fm-delete?frames=@Sub Query.Frames@&area=@FILE.AREA@&recno=@SUB RECNO@&disktoo=1","@SUB FILENAME@",true);'  Title="WARNING! This will delete the file record and file stored on disk!" class="item_red">&nbsp;Delete Record & File&nbsp;</a></td>
 @Endif@
 @if CanMoveFile@
 <td width="1%" nowrap class="itemoff" align="right"><a href="/code/html-fm-move?frames=@Sub Query.Frames@&ofa=@FILE.AREA@&fn=@SUB FILENAME@" class="item">&nbsp;Move File&nbsp;</a></td>
 @endif@
 @if CanModifyFile || CanSysopEditFile@
 <td width="1%" nowrap class="itemoff" align="right">
    <a href="/code/html-fm-edit?frames=@Sub Query.Frames@&area=@FILE.AREA@&file=@SUB FILENAME@" class="item" title="Change file information.">
    &nbsp;@if CanSysopEditFile@Sysop Edit@else@Change Info@endif@&nbsp;
    </a>
 </td>
 @endif@
 </tr>
</table>
