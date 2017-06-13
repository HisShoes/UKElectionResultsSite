$('.scroll-link').click(function(){
        $('body').animate({
            scrollTop: $(document).height()
        }, 500);
        return false;
    });