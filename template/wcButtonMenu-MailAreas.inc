@COMMENT@

version: 452.1g 02/25/07 04:08 pm
version: 452.3c 09/04/07 10:33 am - added Options Access check

This include file creates two arrays that defines the buttons
for the mail and file client.

This file defines the buttons for the Message Client:

Array #1 btns[] has 4 fields per button item

  1 - text to display
  2 - optional GIF (should be limited to 16x16 transparent
  3 - class CSS name (if it exist it will be used)(
  4 - 1 or 0, use 1 is you want to make sure it begins a new row
      The generator will use 3 columns in frame mode, 1 row in
      non-frame mode.

Array #2 brefs[] has 3 fields per button item. This array must
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
@if ThreadMode@
@add btns[] ["flat",        "/images/flatmode.gif",      "di",  "0"]@
@else@
@add btns[] ["thread",      "/images/threadmode.gif",    "di",  "0"]@
@endif@
@add btns[] ["create new",  "/images/edit.gif",          "di",  "1"]@
@add btns[] ["inbox",       "/images/mailinbox.gif",     "di",  "0"]@
@if NewMail@
@add btns[] ["new mail",    "/images/hotnewmail.gif",    "di",  "0"]@
@endif@

@add btns[] ["Recent Mail",   "/images/icon_folder_hot.gif",    "di",  "1"]@

@//@---------------------------------------

@set brefs[] =@
@if !UseTopFrame && FrameMode@
@add brefs[] ["_top",     "Go to home page",             "/"]@
@if UseLogOff && FrameMode@
@add brefs[] ["_top",     "Logoff the system",           "/logout"]@
@endif@
@endif@
@IF EVAL("Access.Client.Personal Properties Client")@
@add brefs[] ["_top",     "Change mail options",         "/code/html-personal?page=messaging"]@
@ENDIF@
@if HelpEnabled && FrameMode@
@add brefs[] ["",         JavaHelpTitle,                 JavaHelpUrl]@
@endif@
@if FrameMode@
@add brefs[] ["_parent",  "View in no frames",           "/code/html-message?frames=n&threads="query.threads]@
@else@
@add brefs[] ["_parent",  "View with frames",            "/code/html-message?frames=y&threads="query.threads]@
@endif@
@if ThreadMode@
@add brefs[] ["",         "View mail in flat mode",      "/code/html-conference+areas?threads=n&frames="query.frames]@
@else@
@add brefs[] ["",         "View mail in threaded mode",  "/code/html-conference+areas?threads=y&frames="query.frames]@
@endif@
@add brefs[] ["body",     "Create new message",          "/code/html-new+message?frames="query.frames"&threads="query.threads"&conf=0&backto=html-message"]@
@add brefs[] ["index",    "Read personal messages",      "/code/html-inbox?oldscan=1&frames="query.frames]@
@if NewMail@
@add brefs[] ["index",    "Read NEW personal messages",  "/code/html-inbox?frames="query.frames]@
@endif@

@add brefs[] ["index",    "Display Recent Messages",     "/code/html-recentmail?frames="query.frames]@
