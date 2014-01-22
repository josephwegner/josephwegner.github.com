$(document).ready(function() {

	positionExampleBlocks();
	$(document).on('load', positionExampleBlocks);
	$(window).resize(positionExampleBlocks);

	setTimeout(positionExampleBlocks, 5000);

});

function positionExampleBlocks() {
	
	$exampleContainer = $(".tutorial-examples");
	$paragraphContainer = $("#paragraph-text");

	//get all the example blocks, and then hide them until we can get the correct positioning
	var exampleBlocks = $(".example-block");
	$(exampleBlocks).hide();

	//Set the tutorial example block height
	$exampleContainer.css('height', $paragraphContainer.outerHeight());

	//Get offset between example container and paragraph container
	var containerOffsets = $paragraphContainer.offset().top - $exampleContainer.offset().top;

	//Loop through each example block, find the correct anchor, and position the example item there
	$(exampleBlocks).each(function() {

		//Move the block really quick and show it, so that we can get the height
		$(this).css({
			position: 'absolute',
			top: '100%'
		}).show();
		$exampleContainer.append(this);

		var realHeight = $(this).outerHeight();

		var target_text = $(this).data('target-anchor');

		var $target = $("#"+target_text);

		var targetHeight = $target.outerHeight();

		if($target.length === 1) {
			var position = $target.position().top;

			$exampleContainer.append(this);

			console.log(position, realHeight, containerOffsets, targetHeight);

			$(this).css({
				position: 'absolute',
				top: position - (realHeight / 2) + containerOffsets + targetHeight,
				display: "block",
				margin: "auto"
			});

			$(this).show();
		}
	});
}