$(window).load(function() {

	var parallaxWrap = $("<div>").addClass("parallax-wrap").css({
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%"
	});

	$("body").append(parallaxWrap);

	$(".parallax").each(function() {
		var curTop = $(this).offset().top;

		$(this).css({
			top: curTop,
			position: "absolute"
		});

		if($(this).attr('offset')) {
			console.log($(this).offset().top);
			console.log($(this).attr('offset'));

			var offset = $(this).attr('offset');
			if(offset.indexOf("%") > -1) {
				var perc = parseFloat(offset);
				offset = ($(document).height() * (perc / 100));
			}

			$(this).css('top', "+="+offset);
			console.log($(this).offset().top);
		}

		$(parallaxWrap).append(this);
	})

	$(window).scroll(function() {
		var top = $(window).scrollTop() * .4;

		$("#content").css('top', top);
	});

});
