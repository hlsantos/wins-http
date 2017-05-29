var WildcatSignupOptions = {
    UseAjax:       {Captcha: 1, UserName: 1},
    AskForCaptcha: 1,
    AskForEmail:   1,
    reserved: null
};

//-----------------------------------------------------------------
// helper functions

function TrimLeft(s)
{
   while (s.substring(0,1) == ' ') s = s.substring(1, s.length);
   return s;
}

function wcStr(v, def)
{
  if (typeof v == "undefined") {
     if (typeof def == "undefined") def = "";
     return def;
  }
  return v;
}

function wcBool(v, def)
{
  if (typeof v == "undefined") {
     if (typeof def == "undefined") def = false;
     return def;
  }
  if (typeof v == "string") {
     v = v.toLowerCase();
     switch (v) {
      case "true","yes","on":   return true;
      case "false","no","off":  return false;
     }
  }
  return v != 0;
}

function SetCookie(name,value,expires,path,domain,secure) {
    document.cookie = name + "=" +escape(value) +
        ( (expires) ? ";expires=" + expires.toGMTString() : "") +
        ( (path) ? ";path=" + path : "") +
        ( (domain) ? ";domain=" + domain : "") +
        ( (secure) ? ";secure" : "");
}

//------------------------------------------------------------------------

function showStatus(s)
{
   var el = document.getElementById("divAjaxResult");
   if (el) {
      el.innerHTML     = s;
      var rid = document.getElementById("rowStatus");
      if (rid) {
         rid.style.display = "";
      }
   }
}

function hideStatus()
{
   var el = document.getElementById("divAjaxResult");
   if (el) {
      el.innerHTML = "";
      var rid = document.getElementById("rowStatus");
      if (rid) {
         rid.style.display = "none";
      }
   }
}
function checkCaptcha(captcha)
{
   //var lcURL = "/public/code/html-checkcaptcha?captcha="+captcha;
   var lcURL = "/public/code/html-captcha?ajax=1&captcha="+captcha;
   return sjaxCheckCaptcha(lcURL);
}

function checkUserName(username)
{
   var lcURL = "/public/code/html-wcajax?cmd=lookupname&p1="+username;
   return sjaxCheckUserName(lcURL);
}

//--------------------------------------------
// Synchronous Query
//--------------------------------------------
function getxhr()
{
   var x = 0;
   if (document.getElementById) {
      x = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
   }
   return x;
}
function sjaxCheckCaptcha(url)
{
   var x = getxhr();
   if (x) {
      x.open("GET", url, false);
      x.send(null);
      if (x.status != 200)    {
         showStatus("incorrect image characters. try again");
         return false;
      }
      return true;
   }
}
function sjaxCheckUserName(url)
{
   var x = getxhr();
   if (x) {
      x.open("GET", url, false);
      x.send(null);
      if (x.status == 200)    {
         showStatus("bad user name or duplicate. try again");
         return false;
      }
      return true;
   }
}

//-----------------------------------------------------------
// Password strength meter
//-----------------------------------------------------------

function passwordStrength(pwd,username)
{
   var shortPass  = 'Password too short'
   //var badPass    = 'Bad password'
   var badPass    = 'Weak password'
   var goodPass   = 'Good Password'
   var strongPass = 'Strong Password'
   score = 0

   if (pwd.length < 4 ) { return shortPass; }

   //pwd == username
   if (pwd.toLowerCase()==username.toLowerCase()) return badPass;

   //pwd length
   score += pwd.length * 4
   score += ( checkRepetition(1,pwd).length - pwd.length ) * 1;
   score += ( checkRepetition(2,pwd).length - pwd.length ) * 1;
   score += ( checkRepetition(3,pwd).length - pwd.length ) * 1;
   score += ( checkRepetition(4,pwd).length - pwd.length ) * 1;

   //pwd has 3 numbers
   if (pwd.match(/(.*[0-9].*[0-9].*[0-9])/))  score += 5;

   //pwd has 2 sybols
   if (pwd.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) score += 5;

   //pwd has Upper and Lower chars
   if (pwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  score += 10;

   //pwd has number and chars
   if (pwd.match(/([a-zA-Z])/) && pwd.match(/([0-9])/))  score += 15;
   //
   //pwd has number and symbol
   if (pwd.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && pwd.match(/([0-9])/)) score += 15;

   //pwd has char and symbol
   if (pwd.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && pwd.match(/([a-zA-Z])/)) score += 15;

   //pwd is just a nubers or chars
   if (pwd.match(/^\w+$/) || pwd.match(/^\d+$/) )  score -= 10;

   //verifing 0 < score < 100;
   if ( score < 0 )  score = 0;
   if ( score > 100 )  score = 100;
   if (score < 34 )  return badPass;
   if (score < 68 )  return goodPass;
   return strongPass;
}

// checkRepetition(1,'aaaaaaabcbc')   = 'abcbc'
// checkRepetition(2,'aaaaaaabcbc')   = 'aabc'
// checkRepetition(2,'aaaaaaabcdbcd') = 'aabcd'

function checkRepetition(pLen,str)
{
   res = "";
   for ( i=0; i<str.length ; i++ ) {
     repeated=true;
     for (j=0;j < pLen && (j+i+pLen) < str.length;j++) {
        repeated=repeated && (str.charAt(j+i)==str.charAt(j+i+pLen));
     }

     if (j<pLen) repeated=false;
     if (repeated) {
        i+=pLen-1;
        repeated=false;
     } else {
        res+=str.charAt(i);
     }
   }
   return res
}

function CheckPwd(o)
{
   if (o.value == "") return;
   var frm = document.formSignup;
   var ps = passwordStrength(o.value,frm.username.value);
   if (ps != "") showStatus(ps);
}

function CheckForCookieSupport(url)
{
   if (document.cookie == "") {
      SetCookie("cookieEnabled","1");
      if (document.cookie == "") {
         document.write("<center>");
         document.write("<iframe name='nocookie' src='/public/warning-no-cookie.wct' frameborder=0 width=100% scrolling=NO>");
         document.write("<font color='red'>No cookie support.</font>");
         document.write("</iframe>");
         document.write("</center>");
         return false;
      }
   }
   return true;
}

function ValidateFields()
{
  var opts = WildcatSignupOptions;

  hideStatus();

  var frm = document.formSignup;
  frm.username.value = TrimLeft(frm.username.value);
  if (frm.username.value == "") {
    showStatus("Please enter your user name");
    frm.username.focus()
    return false;
  }

  if (opts.UseAjax.UserName) {
    if (!checkUserName(frm.username.value)) {
      frm.username.focus()
      return false;
    }
  }

  frm.password1.value = TrimLeft(frm.password1.value);
  if (frm.password1.value == "") {
    showStatus("Please enter your password");
    frm.password1.focus()
    return false;
  }

  frm.password2.value = TrimLeft(frm.password2.value);
  if (frm.password2.value == "") {
    showStatus("Please enter your confirmation password");
    frm.password2.focus()
    return false;
  }

  if (frm.password1.value != frm.password2.value) {
    showStatus("Password Mismatch!");
    frm.password2.focus()
    return false;
  }

  if (opts.AskForEmail) {
    frm.email.value = TrimLeft(frm.email.value);
    if (frm.email.value == "") {
      showStatus("Please enter your email address");
      frm.email.focus()
      return false;
    }
  }

  if (opts.AskForCaptcha) {
    frm.captcha.value = TrimLeft(frm.captcha.value);
    if (frm.captcha.value == "") {
      showStatus("Please enter image characters");
      frm.captcha.focus()
      return false;
    }
    if (opts.UseAjax.Captcha) {
      if (!checkCaptcha(frm.captcha.value)) {
        frm.captcha.focus()
        return false;
      }
    }
  }

  if (!confirm("Ready to send new signup information?")) return false;

  frm.submit();
  return false;
}

