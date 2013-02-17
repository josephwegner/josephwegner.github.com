$(window).ready(function() {

	var colors = ["blue", "red", "green", "orange", "purple"]

    $(".blogpost").each(function() {
    	var color = colors[Math.floor(Math.random() * colors.length)];
    	$(this).addClass(color);
    });
    
    var editors = {};

    var typeIn = [];

    $(".editor").each(function() {
    	var id = $(this).attr('id');
    	var mode = $(this).attr('lang');
    	var text = $(this).text();

    	editors[id] = ace.edit(id);
    	editors[id].setTheme("ace/theme/chrome");
    	editors[id].getSession().setMode("ace/mode/"+mode);

    	var that = this;
    	setTimeout(function() {
    		$(that).height($(that).find(".ace_gutter-cell").last().position().top + 100);
    		editors[id].setValue("");
    	}, 10);

    	typeIn.push({
    		ele: $(this),
    		text: text,
    		editor: editors[id]
    	});

    });

    $(window).scroll(function(e) {
    	var bottom = $(window).scrollTop() + $(window).height();

    	for(var i=0,max=typeIn.length; i<max; i++) {
    		if(bottom > $(typeIn[i].ele).offset().top + 100) {
    			typeInEditor(typeIn.splice(i, 1)[0]);
    			i--;
    			max--;
    		}
    	}
    });

});

function typeInEditor(obj) {
	var len = obj.text.length;
	var time = 2000 / len;
	time = time > 200 ? 200 : time;
	console.log(time, len);

	var type = setInterval(function() {
		if(obj.text.length <= 0) {
			clearInterval(type);
		} else {
			obj.editor.setValue(obj.editor.getValue()+obj.text.charAt(0));
			obj.text = obj.text.substr(1);
			obj.editor.gotoLine(0);
		}
	}, time)
}