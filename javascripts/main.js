$(document).ready(function() {

    var unBlur = setInterval(function() {
        if($(".blurred").length) {
            $(".blurred").first().removeClass("blurred");
        } else {
            startTitleRotation();
            clearInterval(unBlur);
        }

    }, 1000);


    var header = $(".hello");
    var headerText = $(header).find("h1");

    var headerWidth = $(header).width();
    var headerHeight = $(header).height();
    var headerOffset = $(header).offset().top;

    $(".hello").mousemove(function(e) {
        var x = ((e.clientX / headerWidth) * 20) - 10;
        var y = (((e.clientY - headerOffset) / headerHeight) * 20) - 10;

        $(header).css('background-position', (x*-1)+"px, "+(y*-1)+"px");
        $(headerText).css({'top': y, 'left': x })
    })

});

function startTitleRotation() {
    var titles = ["Father (to be)", "Server Admin", "Node.js Guru", "Christian", "Guy", "PHP Dev", "Blogger", "Husband", "Writer", "Web Designer"];

    var index = 0;

    $("#rotating-self").addClass('blurrable');

    setInterval(function() {
        $("#rotating-self").addClass("blurred");

        setTimeout(function() {
            $("#rotating-self").text(titles[index]).removeClass("blurred");
            index++;
        }, 1000);
    }, 4000);
}