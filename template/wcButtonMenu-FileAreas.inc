@COMMENT@

version: 452.1g 02/25/07 04:08 pm
version: 452.3c 09/04/07 10:33 am - added Options Access check

This include file creates two arrays that defines the buttons
for the mail and file client.

This file defines the buttons for the File Client:

Array #1 btns[] has 4 fields per button item

  1 - text to display
  2 - optional GIF (should be limited to 16x16 transparent
  3 - class CSS name (if it exist it will be used)(
  4 - 1 or 0, use 1 is you want to make sure it begins a new row
      The generator will use 3 columns in frame mode, 1 row in
      non-frame mode.

Array #1 brefs[] has 3 fields per button item. This array must
match the total items of btns[].

  1 - optional target window
  2 - optional tip for button
  3 - href link for button

@ENDCOMMENT@

@set btns[] =@
@if !UseTopFrame && FrameMode@
@add btns[] ["home",        "/images/homeicon.gif",      "di",  "1"]@
@if UseLogOff && FrameMode@
@add btns[] ["logoff",      "/images/logoff.gif",        "di",  "0"]@
@endif@
@endif@
@IF EVAL("Access.Client.Personal Properties Client")@
@add btns[] ["options",     "/images/hammer.gif",        "di",  "1"]@
@ENDIF@
@if HelpEnabled && FrameMode@
@add btns[] ["help",        "/images/helpbook.gif",      "di",  "0"]@
@endif@
@if FrameMode@
@add btns[] ["no frames",   "/images/noframes.gif",      "di",  "1"]@
@else@
@add btns[] ["frames",      "/images/frames.gif",        "di",  "1"]@
@endif@
@if CanUpload@
@add btns[] ["upload",      "/images/uploadfile.gif",    "di",  "0"]@
@endif@

@set brefs[] =@
@if !UseTopFrame && FrameMode@
@add brefs[] ["_top",     "Go to home page",             "/"]@
@if UseLogOff && FrameMode@
@add brefs[] ["_top",     "Logoff the system",           "/logout"]@
@endif@
@endif@
@IF EVAL("Access.Client.Personal Properties Client")@
@add brefs[] ["_top",     "Change file options",         "/code/html-personal?page=filing"]@
@ENDIF@
@if HelpEnabled && FrameMode@
@add brefs[] ["",         JavaHelpTitle,                 JavaHelpUrl]@
@endif@
@if FrameMode@
@add brefs[] ["_parent",  "View in no frames",           "/code/html-file?frames=n"]@
@else@
@add brefs[] ["_parent",  "View with frames",            "/code/html-file?frames=y"]@
@endif@
@if CanUpload@
@add brefs[] ["description",   "Upload a new file",  "/code/html-upload?frames="query.frames]@
@endif@


