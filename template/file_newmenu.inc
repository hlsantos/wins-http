<center>
<table width="96%" border="1" cellspacing="0" cellpadding="1" align="center" class="buttontable" id="tbAnch">
<tr>
	<td width="1%" nowrap class="itemoff">@IF indexprev@<a href="/code/html-new+files?frames=@SUB query.frames@&days=@SUB query.days@&index=1" class="item">@ENDIF@&nbsp;Top&nbsp;@IF indexprev@</a>@ENDIF@</td>
	<td width="1%" nowrap class="itemoff">@IF indexprev@<a href="/code/html-new+files?frames=@SUB query.frames@&days=@SUB query.days@&index=@SUB indexprev@" class="item">@ENDIF@&nbsp;Page&nbsp;Up&nbsp;@IF indexprev@</a>@ENDIF@</td>
	<td width="1%" nowrap class="itemoff">@IF indexnext@<a href="/code/html-new+files?frames=@SUB query.frames@&days=@SUB query.days@&index=@SUB indexnext@" class="item">@ENDIF@&nbsp;Page&nbsp;Down&nbsp;@IF indexnext@</a>@ENDIF@</td>
	<td width="1%" nowrap class="itemoff">@IF indexnext@<a href="/code/html-new+files?frames=@SUB query.frames@&days=@SUB query.days@&index=@SUB indexbottom@" class="item">@ENDIF@&nbsp;Bottom&nbsp;@IF indexnext@</a>@ENDIF@</td>
@IF !FrameMode@
	<td width="1%" nowrap class="itemoff"><a href="/code/html-file?frames=y" class="item" target="_parent">&nbsp;View&nbsp;Frames&nbsp;</a></td>
	<td width="1%" nowrap class="itemoff"><a href="/" target="_top" class="item">&nbsp;Home&nbsp;</a></td>
@ENDIF@
   <td nowrap class="itemoff">&nbsp;</td>
</tr>
</table>
</center>
