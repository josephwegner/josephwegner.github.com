$(document).ready(function() {
	$(window).scroll(function() {
		if($(window).scrollTop() > 200) {
			$(".go-to-top").css('bottom', 0);
		} else {
			$(".go-to-top").css('bottom', '-4em');
		}
	});

	$(".go-to-top").click(function() {
		$("html, body").animate({scrollTop: 0}, 400);
	});
});