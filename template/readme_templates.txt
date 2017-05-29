                Wildcat! HTML Templates and Style Sheets
                         version 6.4.454.4

-------------
Introduction:
-------------

The template folder contains the default HTML Wildcat! template (WCT)
files. Various Wildcat! WCX client applications uses HTML templates
to display the client sections such as Mail Client (WebMail), File
Client, etc.

---------------------
version control file:
---------------------

verinfo.dat                         used by AUP to update templates

--- style sheets ---

templates.css
buttons.css
BigButtons.css
layout.css
mailclient.css
personalclient.css
whoclient.css


-- general include files --

globalopts.inc
pageheader.inc
pagefooter.inc
copyright.inc
helpbutton.inc
helpbuttonref.inc
pageheadermenu.inc                 provides GOTO CLIENT pulldown
pageheader.wct

---- files with help ------

message_conferences.htm
message_search_form.htm
pageheader.inc

-- javascript files --

wcmsglib.js                        required by message_inbox.htm and
                                   message_index.htm
..\public\js\wcaudioplay.js
..\public\js\soundmanager2.js
..\public\js\soundmanager2.swf

AreaResizer.js                     scrolling regions

--- mail client ---

wcButtonMenu-MailAreas.inc         defines buttons for mail client
message_conferences.htm            list the conferences/groups
message_inbox.htm                  show user new mail inbox
message_buttons.inc                has delete/read Javascript buttons
message_index.htm                  show mail list for conference (CURRENT)
message_index_layout3.htm          show mail list for conference (OBSELETE)
message_indexthd.htm               show thread mail list for conference
message_indexmenu.inc              menu include file for list table
message_indexthdmenu.inc           menu table in thread mode
message_ok.htm                     response for new message
message_read.htm                   read a message
message_search_form.htm            start search form page
message_search.htm                 show search results
message_create_error.htm           (optional) shows creation error (451.3)
message_create.htm                 create new message form
message_frame_init.wct             used to initialize frames
recentmail.htm                     show summary of recent messages

--- file client ---

wcButtonMenu-FileAreas.inc         defines buttons for files client
file_areas.htm                     show file areas
file_listing.htm                   show file list in file areas
file_search.htm                    show file search result
file_new.htm                       show new files
file_listmenu.inc                  menu table for file area list
file_searchmenu.inc                menu table for file search list
file_newmenu.inc                   menu table for new files list
file_list.inc                      file table of file listings
file_info.htm                      show file info
file_password.htm                  form for file w/ password download
file_passfail.htm                  response for bad password
file_upload.htm                    form for file upload
file_uploadok.htm                  response for file upload
file_offline.htm                   form for offline file request
file_frame_init.wct                used to initialize frames
file_upload.css                    style sheet
file_upload.js                     for process bar
file_upload_pbar.inc               simple progress bar
file_upload_pbar_xp.inc            another progress bar (xp_progress.js)
file_info_mediawindow.inc          Used to display AUDIO player for sound files
file_notselected.htm               Used by html-file info.wcx
xp_progress.js

-- file manager client ---

file_manager_options.inc           option file manager menu
file_editor.htm                    sysop/user file editor
file_saved.htm                     file editor save result
file_moveselectarea.htm            pick new area to move file
file_moved.htm                     move result
file_error.htm                     file access error result
file_deleted.htm                   file delete result

--- personal client ---

personalclient.htm                 Personal Property Pages Layout (replaces account_info.htm)
message_groupselect.htm            mail options
personalmenu.inc                   menu for each property section
personalmenu.ini                   Wildcat! Personal Properties Pages
personalmenu3P.ini                 3rd party Personal Properties Pages
personal_page_general.htm
personal_page_chgpwd.htm
passwordchangeok.htm               Displays Result of Password change
personal_page_messaging.htm
personal_page_filing.htm
personal_page_filing_save.wct
personal_page_audio.htm
personal_page_pwdupdated.htm
save_audio_profile.wct
personal_page_skins.htm
personal_page_skins_save.wct
personal_page_myfiles.htm          use to display user's uploaded files
myfiles.wct                        used by personal_page_myfiles.htm

personal_page_example.htm          Example 3rd party Personal Page
personal_page_example_save.wct


--- chat client ---

wcnav.htm
chat.htm

--- who is online client ---

whos_online.htm
save_whos_online_options.wct

--- sysop menu --- MAYBE OPTIONALLY INSTALLED (used by HTML-SYSOP.WCX client)

sysopclient.htm                    presents sysop menu
sysopclient.css                    style sheet
sysopmenu.inc                      controls menu display
sysopmenu.ini                      ini file of sysop actions
sysopmenu3p.ini                    optional ini file of 3rd party sysop actions

-- other

helpwindow.htm                     used by optional html-help.wcc
helpwindowframe.htm                used by optional html-help.wcc
mailform.htm                       mail form response template
LoginOptions.inc                   used by login.wct and wclogin.js
wcNavigator.js                     Exploratory:  Used to popup WCNAV connect window

- Wildcat! List Server --- OPTIONALLY INSTALLED by WCLISTSERVE ADD-ON

list_subscribe.htm                 Only available for wcListServe Product


-----------------
Revision History:
-----------------

452.8 - Updated files:

readme_templates.txt
verinfo.dat
personalmenu.ini
personalmenu.inc
personalclient.css
pageheader.inc
personal_page_messaging.htm
File_Info_MediaWindow.inc
message_index.htm
message_read.htm
file_list.inc
layout.css
whoclient.css
errors.css
myfiles.wct
personal_page_myfiles.htm
copyright.inc
file_upload.js
file_uploadok.htm
file_upload.css
templates.css
file_upload.htm
pageheadermenu.inc
personalclient.css
personalmenu.inc
personalmenu.ini
personal_page_myfiles.htm
NoClientAccess.htm                 Moved to http\Errors\ as NoClientAccess.wct
                                   All client WCXs updated to use
                                   http\errors\NoClientAccess.wct

personalclient.htm                 new name of account_info.htm (for consistency)


- added sysop menu files

sysopclient.css
sysopclient.htm
sysopmenu.inc
sysopmenu.ini
sysopmenu3p.ini
sysop_page_general.htm

453.1 - Updated files:

- added

wcssl_http.redirect.htm            see wcSSLConfig.htm Enable HTTP redirection for ssl


453.2 - Updated files

file_listing.htm:
file_uploadok.htm:
message_conferences.htm:
message_inbox.htm:
personal_page_audio.htm:
readme_templates.txt:
whos_online.htm:
message_inbox.htm
sysopmenu.inc
personal_page_messaging.htm
sysopmenu.ini
personalmenu.inc
personal_page_general.htm
File_Info_MediaWindow.inc
file_list.inc

453.2 - new files

LoginPage.wct
LogoutPage.wct
SignupPage.wct
WebError.htm
WcAudioPlay.inc

-------------------------------------------------------------
453.3
-------------------------------------------------------------

- new files

   checkremainingtime.inc
   ForgotPasswordPage.wct
   ForgotPassword-Message-ContactAdmin.wct
   ForgotPassword-Message-Request.wct
   ForgotPasswordContactAdmin.wct
   ForgotPasswordPage.css
   ForgotPasswordReset.wct
   login-noscript.wct
   SignupPage.wct
   SignupPage.css

- updated files

   verinfo.dat
   readme_templates.txt
   whos_online.htm
   whosclient.htm
   pageheader.inc
   pageheadermenu.inc
   templates.css
   logoutpage.wct
   loginpage.wct
   globalopts.inc

-------------------------------------------------------------
454.4
-------------------------------------------------------------

- new files

  html-suggest-users.wcx

- updated files

   verinfo.dat
   readme_templates.txt
   chat.htm
   file_areas.htm
   file_editor.htm
   file_frame_init.wct
   file_search.htm
   file_upload.htm
   file_upload.js
   file_upload_pbar_xp.inc
   globalopts.inc
   LoginPage.wct                   moved js scripts urls to /public/js
   LogoutPage.wct
   message_frame_init.wct
   pageheader.inc
   pageheadermenu.inc
   personalmenu.inc
   personal_page_chgpwd.htm
   personal_page_pwdupdated.htm
   personal_page_skins.htm
   readme_templates.txt
   SignupPage.wct
   sysopclient.htm
   sysopmenu.inc
   sysopmenu3p-wcsmq.ini
   sysop_page_wcsmq.htm
   verinfo.dat
   wcAudioPlay.Inc                 moved soundmanager urls to /public/js
   wcnav.htm
   wcsmq.htm


