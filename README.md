# wins-http
Wildcat! HTTP Web Files and Temples

These are the stock files for version 7.0.454.4, 05/12/2012.

Not supplied are the default pages for the public and private folder:

  http\         private 
  http\public   public

You should be able to copy this folder  into your 'http\" folders:

brand new:
  
  cd \wcat
  git init .
  git clone https://github.com/hlsantos/wins-http.git http

For Wildcat! Virtual Domains Groups (VDG), where each web site has its document "http\" folders:

  cd \wcat
  git init .
  git clone https://github.com/hlsantos/wins-http.git http-vdg
