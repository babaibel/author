$(function () {
    var $select = $('.js-select');
    if (!$select.length) return;

    $select.selectize({
        create: true,
        sortField: 'text'
    });
});

$(function () {
    var $tooltip = $('.js-tooltip');
    if (!$tooltip.length) return;

    $tooltip.tooltipster({
        theme: 'tooltipster-light',
        maxWidth: 400
    });
});

$(function () {
    var $antitheftSlider = $('.js-antitheft-slider');
    if (!$antitheftSlider.length) return;

    $antitheftSlider.slick({arrows: false,dots: true});
});


$(function () {
    var $antitheftTabs = $('.js-antitheft-tabs');
    if (!$antitheftTabs.length) return;

    $antitheftTabs.tabslet();

    $antitheftTabs.on("_after", function() {
        $(this).find('.antitheft-tabs__tab:visible .js-antitheft-slider').slick('setPosition');
        jQuery(window).trigger('resize').trigger('scroll');
    });
});


$(function () {
    var $antitheftInnerTabs = $('.js-antitheft-inner-tabs');
    if (!$antitheftInnerTabs.length) return;

    $antitheftInnerTabs.tabslet();
});


$(function () {
    var $phone = $('.js-phone');
    if (!$phone.length) return;

    $phone.inputmask({"mask": "+7 (999) 999-9999"});
});


$(function () {
    var $advantages = $('.js-advantages');
    if (!$advantages.length) return;

    var $advantagesTabs = $advantages.find('.js-advantages-tabs li'),
        $advantagesTabsBtn = $advantagesTabs.find('span'),
        $advantagesSlider = $advantages.find('.js-advantages-slider');

    $advantagesSlider.on('init afterChange', function(slick){
        var number = $advantagesSlider.find('.slick-active').index() - 1;
        $advantagesTabs.removeClass('active').eq(number).addClass('active');
    });

    $advantagesSlider.slick({arrows: false,dots: true});

    $advantagesTabsBtn.click(function(){
        var number2 = $(this).closest('li').index();
        $advantagesSlider.slick('slickGoTo', number2);
    });

});

var scrollbarW = 0;
var scrollbarWidth = function () {
    if ( $('html').hasClass('no-touch')){
        var block = $('<div>').css({'height':'50px','width':'50px'}),
            indicator = $('<div>').css({'height':'200px'});

        $('body').append(block.append(indicator));
        var w1 = $('div', block).innerWidth();    
        block.css('overflow-y', 'scroll');
        var w2 = $('div', block).innerWidth();
        $(block).remove();
        scrollbarW = (w1 - w2);
    }
}();

$(function () {
    var $btn = $('.js-popup-btn');

    $btn.magnificPopup({
        preloader: false,
        mainClass: 'mfp-fade',
        removalDelay: 300,
        type: $(this).data('type') || 'inline',
        callbacks: {
            open: function () {
                $('body').addClass('_popup');
                $('.js-header').css({'width':'auto','right':scrollbarW})
            },
            close: function () {
                $('body').removeClass('_popup');
                $('.js-header').css({'width':'100%','right':'auto'})
            }
        }
    });
});

(function ($) {
    $.fn.formPopup = function () {

        $(this).each(function () {
            var $this = $(this),
                $show = $this.find('.js-popup-base-show'),
                $hide = $this.find('.js-popup-base-hide'),
                $form = $this.find('.js-form');

            $form.submit(function(){
                $show.slideUp();
                $hide.slideDown();
                return false;
            })
        })

    };
})(jQuery);

$(function () {
    var $formPopup = $('.js-popup');
    if(!$formPopup.length) return;

    $formPopup.formPopup({});

});