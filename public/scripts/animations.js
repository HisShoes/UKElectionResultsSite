$('.scroll-link').click(function(){
        $('body').animate({
            scrollTop: $(document).height()
        }, 500);
        return false;
    });
    

//on unload play the fade out animations
$(window).on("unload", function() {
  $('.transition-element').addClass('animated-fadeout');
});
