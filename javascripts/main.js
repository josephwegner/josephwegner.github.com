var loadInterval;

$(document).ready(function() {
	loadInterval = setInterval(function() {
		var ele = $("#scrollArrow");

		if($(ele).hasClass("a3")) {
			$(ele).removeClass("a3");
		} else if($(ele).hasClass("a2")) {
			$(ele).removeClass("a2").addClass("a3");
		} else if($(ele).hasClass("a1")) {
			$(ele).removeClass("a1").addClass("a2");
		} else {
			$(ele).addClass("a1");
		}

		if(!$("#loadOverlay span").is(":visible")) {
			$("#loadOverlay span").fadeIn(1000);
		}

	}, 500)

});

$(window).load(function() {

	clearInterval(loadInterval);
	$("#scrollArrow").attr('class', '');
	$("body").removeClass("loading");
	$("#loadOverlay span").fadeOut(500);
	$("#loadOverlay").stop(true).fadeOut(2000);

	var parallaxSpeed = .4;

	var parallaxWrap = $("<div>").addClass("parallax-wrap").css({
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%"
	});

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
			console.log(dest, change)
			newTop = dest + change;
		}

		$('html, body').animate({
			scrollTop: newTop
		}, 2000)
	});

	$("#scrollArrow").click(function() { $("#goAbout").click(); })

});
