var navItems = [];

$(window).load(function() {

	var parallaxSpeed = .4;

	var parallaxWrap = $("<div>").addClass("parallax-wrap").css({
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%"
	});



	$("#nav ul li a").each(function() {
		var ele = $($(this).attr('href'));

		if(ele) {
			navItems.push({
				ele: ele,
				nav: this
			});
		}
	})

	selectedNav = 0
	$(navItems[0].nav).addClass("selected");

	if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$("body").append(parallaxWrap);

		$(".parallax").each(function() {
			var curTop = $(this).offset().top;

			$(this).css({
				top: curTop,
				position: "absolute"
			});

			if($(this).attr('offset')) {

				var offset = $(this).attr('offset');
				if(offset.indexOf("%") > -1) {
					var perc = parseFloat(offset);
					offset = ($(document).height() * (perc / 100));
				}

				$(this).css('top', "+="+offset);
			}

			$(parallaxWrap).append(this);

		});

		$(window).scroll(function() {
			var top = $(window).scrollTop() * parallaxSpeed;

			$("#content").css('top', top);

			if($("#nav").is(":visible") && $(window).scrollTop() <= 10) {
				$("#nav").stop(true).fadeOut(500);
			} else if(!$("#nav").is(":visible") && $(window).scrollTop() > 10) {
				$("#nav").stop(true).fadeIn(500);
			}

			checkNavItems();

		});
	}
	$("#nav a").click(function(e) {
		e.preventDefault();

		var target = $($(this).attr('href'));

		var newTop

		if($(target).hasClass("parallax")) {
			newTop = $(target).offset().top
		} else {
			var cur = $(window).scrollTop();
			var dest = $(target).offset().top;

			var change = (dest - cur) * (1 - parallaxSpeed);

			newTop = dest + change;
		}

		$('html, body').animate({
			scrollTop: newTop
		}, 2000, function() { checkNavItems(true); })
	});

	$("#scrollArrow").click(function() { $("#goAbout").click(); })

});

var beforeScroll = 0;
var selectedNav = 0;

function checkNavItems() {

	var scroll = $(window).scrollTop();

	var dir = scroll > beforeScroll ? "down" : "up";
	beforeScroll = scroll;

	if(dir === "down" && selectedNav < navItems.length - 1) {

		if(scroll + 1>= $(navItems[selectedNav + 1].ele).offset().top) {
			console.log("switch!");
			selectedNav++;
			$("#nav .selected").removeClass("selected");
			$(navItems[selectedNav].nav).addClass("selected");
		}
	} else if(dir === "up" && selectedNav > 0) {
		if(scroll - 1 <= $(navItems[selectedNav - 1].ele).offset().top) {
			selectedNav--;
			$("#nav .selected").removeClass("selected");
			$(navItems[selectedNav].nav).addClass("selected");
		}
	}
}
