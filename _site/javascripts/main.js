$(document).ready(function() {
	$("#repoNav li").click(function() {
		var target = $(this).attr('goto');

		if($(target).length > 0) {
			var goHeight = $(target).offset().top;

			$('html, body').animate({
				scrollTop: goHeight
			}, 1000);
		}
	});
});