// Cookie Javascript code

function SetCookie(name,value,expires,path,domain,secure) {
  document.cookie = name + "=" +escape(value) +
    ( (expires) ? ";expires=" + expires.toGMTString() : "") +
    ( (path) ? ";path=" + path : "") +
    ( (domain) ? ";domain=" + domain : "") +
    ( (secure) ? ";secure" : "");
}

function DeleteCookie( cookie_name )
{
  var cookie_date = new Date ( );  // current date & time
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString()+"; path=/";
}

function GetCookie ( cookie_name )
{
  var results = document.cookie.match ( cookie_name + '=(.*?)(;|$)' );
  if ( results ) return ( unescape ( results[1] ) );
  return null;
}

function CheckForCookies()
{
    if (document.cookie != "") return true;
    SetCookie("cookieEnabled","1");
    if (document.cookie != "") {
       DeleteCookie("cookieEnabled");
       return true;
    }
    return false;
}
