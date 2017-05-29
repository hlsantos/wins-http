File   : ReadMe_Errors.txt
Created: 07/12/2002
Updated: 01/07/2008 v6.2.452.4
Updated: 02/06/2009 v6.3.452.8

Title  : Wildcat! Web Server URL response Error Pages

The following optional HTML pages are available in the http/errors
folder.  They are not required since the web server has default messages
to display. However, a few are necessary for proper web flow.

-------------
Custom Folder
-------------

If you wish to modfy the errors template files, create a sub-folder
called CUSTOM, copy the template this folder and customize the copy.
WcWEB will always look in the custom folder first to find a template.

---------------------
HTM vs WCT extension
---------------------

By default, for these HTTP/ERRORS files, WcWEB will look for a WCT
extension first over a HTM extension.  So even if these are
documented as with HTM extensions, it applies to WCT extensions as
well.

------------------------------------
Authorization/Login Errors  (/login)
------------------------------------

http/errors/filename     http response code, comment
----------------------   ----------------------------------------------

Errors.wct               This is the "catch all" authentication error display.
                         It will catch all the 40x errors, except 404.

LockedOut.wct            403, account is locked out
InvalidNode.wct          403, no nodes available. probably maintenance.
AlreadyLoggedin.wct      403, user is already logged in.

UserNotLoggedin.wct      401, user is not logged in.
                              This page is displayed if the user cancels
                              the initial browser login attempt.

UserNotFound.wct         401, account not found.
                              This page is displayed if the user name is
                              not found in the database during a login.
OutofTime.wct            403, out of time
BadPassword.wct          401, bad password
PasswordChange.wct       403, force password change (see below)
PasswordExpire.wct       403, password expired
NotValidated.wct         403, user is not validation
HoursRestricted.wct      403, restricted hours

When any other authorization required request error occurs or none of
the above are found in the http/errors folder, the following is used:

Unauthorized.wct         401, unauthorized access to URL resource

-------------
URL not found
-------------

NotFound.wct             404, Requested URL not found

-----------------------
Signup Errors (/signup)
-----------------------

http/errors/filename     http response code, comment
----------------------   ----------------------------------------------

SignupAlreadyDone.wct    200, already authorized, /signup was issued
                              again when the user was already logged in.
SignupIncomplete.wct     200, user did not enter all data
SignupDupeAccount.wct    200, the user name already existed.
SignupBadPasswords.wct   200, password mismatch.
SignupBadUserName.wct    200, user name not allowed. User name exist in
                              data\badnames.lst

PasswordChange.wct
------------------

PasswordChange.htm is a form which will request the user's old password,
new password change information.  The form method is a POST and the form
action is a WCX program called html-changepassword. This program willl
process the user's password change request information.


----------
Validation
----------

NotValidated.htm        Used for Closed/Validation setups during /SIGNUP
                        when verifying the user email address.

------
Others
------

NoClientAccess.wct      Used to display NO ACCESS to clients
SignupDupeAccount.htm   Using during /SIGNUP when the user name already exist



