$(document).ready(function() {
  $(".menu").click(function(evnt){
    if($(this).hasClass('is-active')){
      evnt.preventDefault();
      $(this).removeClass('is-active');
      $("#leftMenuPos").animate({right: '-100%'}, 100).fadeOut(300);
    }else{
      evnt.preventDefault();
      $(this).addClass('is-active');
      $("#leftMenuPos").fadeIn(100).animate({right: '0'}, 500);
    }
  });
  $("html, body").click(function(et){
    if($("#leftMenuPos").css('right') > '0'){
      if(!$(et.target).closest("#leftMenuPos").length){
        $(".menu").removeClass('is-active');
        $("#leftMenuPos").animate({right: '-100%'}, 100).fadeOut(300);
      }
    }
  });
});