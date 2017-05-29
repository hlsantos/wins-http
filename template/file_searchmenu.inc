<center>
<table width="96%"
       border="1"
       cellspacing="0"
       cellpadding="1"
       align="center"
       class="buttontable">
<tr>
	<td width="1%" nowrap class="itemoff">@IF indexprev@<a href="/code/html-search+files?frames=@SUB query.frames@&target=@SUB target@&index=1" class="item">@ENDIF@&nbsp;Top&nbsp;@IF indexprev@</a>@ENDIF@</td>
	<td width="1%" nowrap class="itemoff">@IF indexprev@<a href="/code/html-search+files?frames=@SUB query.frames@&target=@SUB target@&index=@SUB indexprev@" class="item">@ENDIF@&nbsp;Page&nbsp;Up&nbsp;@IF indexprev@</a>@ENDIF@</td>
	<td width="1%" nowrap class="itemoff">@IF indexnext@<a href="/code/html-search+files?frames=@SUB query.frames@&target=@SUB target@&index=@SUB indexnext@" class="item">@ENDIF@&nbsp;Page&nbsp;Down&nbsp;@IF indexnext@</a>@ENDIF@</td>
	<td width="1%" nowrap class="itemoff">@IF indexnext@<a href="/code/html-search+files?frames=@SUB query.frames@&target=@SUB target@&index=@SUB indexbottom@" class="item">@ENDIF@&nbsp;Bottom&nbsp;@IF indexnext@</a>@ENDIF@</td>
@if !FrameMode@
	<td width="1%" nowrap class="item"><a href="/code/html-file?frames=y" class="item" target="_parent">&nbsp;View&nbsp;Frames&nbsp;</a></td>
	<!-- <td width="1%" nowrap class="item"><a href="/" target="_top" class="item">&nbsp;Home&nbsp;</a></td> -->
@endif@
   <td nowrap class="item">&nbsp;</td>
   <td width="1%" align="right" nowrap class="item"><a href="/code/html-search+files?frames=@SUB query.frames@&target=@SUB target@&index=1&ra=1" class="item" title="Refresh File Search">&nbsp;Refresh&nbsp;</a></td>
</tr>
</table>
</center>
