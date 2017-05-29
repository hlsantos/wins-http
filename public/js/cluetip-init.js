$(document).ready(function() {

  $('a.basic').cluetip({
      width: '450px',
      arrows:true,
      dropShadow: false,
      ajaxProcess: function(data) {
        //data = $(data).not('style, meta, link, script, title, img');
        data = "<span>"+data+"</span>";
        data = $(data).text();
        return data;
      },
      waitImage: '/public/js/images/wait.gif'
  });

  $('#sticky').cluetip({'sticky': true, arrows:true, dropShadow: false, cluetipClass: 'jtip'});
  $('a.sticky').cluetip({'sticky': true, arrows:true, dropShadow: false});
  $('span[@title]').css('background', 'yellow').cluetip({splitTitle: '|', arrows:true, dropShadow: false, cluetipClass: 'jtip'});

});