<!-- Custom Options -->

@COMMENT@

This options are used for the web server templates:

History:

451.4e  Set UseLogOff=TRUE to support new cookie based logins
451.5l  UseJavaHelp is obselete
451.5l  Added ShowBrowserUploadNote
451.5l  Added ShowFileIdDizUploadNote
452.1e  SystemEvent can be set by a WCX/WCT ProcessSystemEvent variable
452.1g  Added AddMenu.GotoGlient pulldown menu option
452.1h  Added UseTopFrame
452.1j  Added Site Info

@ENDCOMMENT@

@set UseLogoff=TRUE@
@set ShowInbox=TRUE@
@set UseBack=FALSE@
@set ShowMailAreaDesc=TRUE@
@set ShowFileAreaDesc=TRUE@
@set ShowInboxToField=FALSE@
@set ShowOpenModemNodes=TRUE@
@set ShowDownModemNodes=FALSE@
@set ShowBrowserUploadNote=FALSE@
@set ShowFileIdDizUploadNote=FALSE@

<!-- Help Stuff -->
@set UseJavaHelp=TRUE@
@set JavaHelpUrl="javascript:WildcatHelp(this);"@
@set JavaHelpTitle="Show Help for this section"@

<!-- Event Options -->
@set SystemEvent=ProcessSystemEvent@

<!-- PageHeader Menu -->
@Set AddMenu.GotoCLient=1@
@set UsePageHeader.Timer=1@

<!-- Options PageHeader Menu in MAIL/FILE frame mode-->
@Set UseTopFrame=User.Variable("SkinsOptions","UseFrameMenuBar",1)@

@Set AreasFrame.Divider=1@
@Set ThreadList.Divider=1@
@set AreasFrame.Resizer=1@
@set ListFrame.Resizer=0@

<!-- Site Info -->
@set site.logo.image=@
@set site.logo.image="/public/graphics/banner.gif"@
@set site.logo.text=""@

<!-- wcJavaChat -->
@set wcJavaChat.Notify.Width      = 350@
@set wcJavaChat.Notify.Height     = 180@
@set wcJavaChat.Notify.Attributes = "scrollbars=0,resizable=0,titlebar=0,toolbar=0,menubar=0,status=0"@
@set wcJavaChat.Applet.Width      = 300@
@set wcJavaChat.Applet.Height     = 100@

