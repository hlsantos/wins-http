@if Exist "wc:\http\template\YourBizFooter.htm"@
<div id="YourBizFooter">@include "wc:\http\template\YourBizFooter.htm"@</div>
@endif@
@if !SkipCopyRight@
<div id="ssicr">@existinclude "wc:\http\template\copyright.inc"@</div>
@endif@
