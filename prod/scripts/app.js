$(function(){var t=$(".js-select");t.length&&t.selectize({create:!0,sortField:"text"})}),$(function(){var t=$(".js-tooltip");t.length&&t.tooltipster({theme:"tooltipster-light",maxWidth:400})}),$(function(){var t=$(".js-antitheft-slider");t.length&&t.slick({arrows:!1,dots:!0})}),$(function(){var t=$(".js-antitheft-tabs");t.length&&(t.tabslet(),t.on("_after",function(){$(this).find(".antitheft-tabs__tab:visible .js-antitheft-slider").slick("setPosition"),jQuery(window).trigger("resize").trigger("scroll")}))}),$(function(){var t=$(".js-antitheft-inner-tabs");t.length&&t.tabslet()}),$(function(){var t=$(".js-phone");t.length&&t.inputmask({mask:"+7 (999) 999-9999"})}),$(function(){var t=$(".js-advantages");if(t.length){var i=t.find(".js-advantages-tabs li"),s=i.find("span"),n=t.find(".js-advantages-slider");n.on("init afterChange",function(t){var s=n.find(".slick-active").index()-1;i.removeClass("active").eq(s).addClass("active")}),n.slick({arrows:!1,dots:!0}),s.click(function(){var t=$(this).closest("li").index();n.slick("slickGoTo",t)})}});var scrollbarW=0,scrollbarWidth=function(){if($("html").hasClass("no-touch")){var t=$("<div>").css({height:"50px",width:"50px"}),i=$("<div>").css({height:"200px"});$("body").append(t.append(i));var s=$("div",t).innerWidth();t.css("overflow-y","scroll");var n=$("div",t).innerWidth();$(t).remove(),scrollbarW=s-n}}();$(function(){var t=$(".js-popup-btn");t.magnificPopup({preloader:!1,mainClass:"mfp-fade",removalDelay:300,type:$(this).data("type")||"inline",callbacks:{open:function(){$("body").addClass("_popup"),$(".js-header").css({width:"auto",right:scrollbarW})},close:function(){$("body").removeClass("_popup"),$(".js-header").css({width:"100%",right:"auto"})}}})}),function(t){t.fn.formPopup=function(){t(this).each(function(){var i=t(this),s=i.find(".js-popup-base-show"),n=i.find(".js-popup-base-hide"),e=i.find(".js-form");e.submit(function(){return s.slideUp(),n.slideDown(),!1})})}}(jQuery),$(function(){var t=$(".js-popup");t.length&&t.formPopup({})});