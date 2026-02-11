---
title: "Inefficient Directive Compilation in AngularJS"
date: 2013-07-13
---
*I wrote a little side project recently, called [CSS3 Man](https://www.css3man.com).  It's a fun experiment in CSS3.  You should check it out, it's fun and interactive, and will be sort of necessary to understand this blog post.*



I've taken to [AngularJS](https://angularjs.org) recently for most of my little side projects.  It's super fast, simple, and every time I use it I feel like my apps give off this feel of "wow, that was really well done!"  Most of that vibe comes from the data-binding, but from the developer end my favorite part is definitely directives.  I wrote [a tutorial](https://joewegner.com/blog/angular-js-directive-tutorial-on-attribute-bootstrap-confirm-button/) awhile back on how to write an AngularJS directive, but now I want to write some words of caution on why they can be dangerious.

In CSS3 Man, I have to generate styles for each of the men on the fly.  The requirements were that they can't be stored in a file, they have to be dynamic, and they have to be dynamic *fast*.  To do this, I wrote a directive called `superStyle`.  The direcive is given two attributes - a selector and the content (note: it wasn't given pure CSS for XSS reasons).  It would then generate style tags, insert them into the DOM, and watch the attributes to see when they changed.  The code is below.


app.directive( 'superstyle', function( $compile ) {
  return {
    restrict: 'E',
    scope: { selector: "=selector", styles: "=styles", verify: "=verify", key: "=key" },
    link: function ( scope, element, attrs ) {
      var el;

      scope.$watch( 'selector', function () {
      	if(typeof(scope.key) === "string") {
	        el = typeof(scope.selector) !== "undefined"  ?
	        	$compile( '<style> '+scope.selector+' { '+scope.styles+' } </style>' )( scope ) :
	        	$compile( '<style>'+scope.styles+'</style>' )( scope )

	        element.html("");
	        element.append( el );
        }
      });

       scope.$watch( 'styles', function() {
       	if(typeof(scope.key) === "string") {
	       	if(typeof(scope.verify) === "function") {
	       		if(!scope.verify(scope.key, scope.styles)) {
	       			return false;
	       		}
	       	}

	        el = typeof(scope.selector) !== "undefined"  ?
	        	$compile( '<style> '+scope.selector+' { '+scope.styles+' } </style>' )( scope ) :
	        	$compile( '<style>'+scope.styles+'</style>' )( scope )

	        element.html("");
	        element.append( el );
    	}
      })
    }
  };
});


You might be wondering why I'm not using [AngularJS templates](https://docs.angularjs.org/guide/dev_guide.templates) and letting Angular handle the binding.  Unfortunately, AngularJS templates don't work with `style` tags - which makes sense, and I'm fine working around it.

Anyways, I created a bunch of these for each human - one for head, body, legs, head-after, etc.  It worked absolutely wonderfully in the editor.  It loaded up almost instantaneously, and there was no noticeable delay between changing a CSS rule and seeing it show up on the preview.  This was a great solution, and I was pretty excited to share it.

Later in the project, I decided that I wanted users to be able to submit their men so they would show up in the top world.  That would make CSS3 Man feel much more interactive, and I was already generating these humans in a couple places - it should just be a copy & paste.  Or, even better, a human directive.  I figured that if I could create a `human` directive that was passed the necessary CSS attributes, and then use a bunch of `superStyle`s to make them look right.  Here's what the directive template looked like:


<div class="human human-live " id="human_" ng-click="click(human);">
	<superStyle selector="" styles="human.css.animations" key="human.key"></superStyle>

	<superStyle selector="'#human_' + human._id +  ' .head'" styles="human.css.head" key="human.key"></superStyle>
	<superStyle selector="'#human_' + human._id +  ' .head:before'" styles="human.css.head_before" key="human.key"></superStyle>
	<superStyle selector="'#human_' + human._id +  ' .head:after'" styles="human.css.head_after" key="human.key"></superStyle>

	<superStyle selector="'#human_' + human._id +  ' .body'" styles="human.css.body" key="human.key"></superStyle>
	<superStyle selector="'#human_' + human._id +  ' .body:before'" styles="human.css.body_before" key="human.key"></superStyle>
	<superStyle selector="'#human_' + human._id +  ' .body:after'" styles="human.css.body_after" key="human.key"></superStyle>

	<superStyle selector="'#human_' + human._id +  ' .legs'" styles="human.css.legs" key="human.key"></superStyle>
	<superStyle selector="'#human_' + human._id +  ' .legs:before'" styles="human.css.legs_before" key="human.key"></superStyle>
	<superStyle selector="'#human_' + human._id +  ' .legs:after'" styles="human.css.legs_after" key="human.key"></superStyle>
	<div class="head"></div>
	<div class="body"></div>
	<div class="legs"></div>
</div>


And it worked! I put a man in the database, loaded it in via the API, and it showed up.  Perfect!  I figured I had that done, so I moved onto styling how it would look when I had a bunch of men on the screen (you know, [spacing and such](https://github.com/josephwegner/css3man/commit/902c6ea27dd54c3043a7da34596e8c5631c3f61c)).  As I was testing this, though, I realized that having 20 men load onto the screen took A LONG time.  I didn't know what was going on - AngularJS is supposed to be fast, I was using well-written directives, but it was super slow.  I fought with it for awhile, and then decided that it was an unbeatable problem.  I caved, and [updated my code](https://github.com/josephwegner/css3man/commit/6e949b89fe00f19f7af43fb2cec39ce8dff8b666) to animate the men in once they had loaded, instead of having a huge delay at first-load.

Development went on, but every time I loaded up the page I cringed, because the animation felt *so cheesy*.  It was obvious that animating them in was just a hack because I couldn't find a smooth alternative.  Finally I decided I couldn't live with that.  If I couldn't make the site work *well*, then I didn't want to release it at all.

I finally came up with the idea that maybe AngularJS was having a hard time compiling all of those direcives.  I realized that I have 10 `superStyle`s in each `human`, and 20 `human`s on the page.  That's 200 `superStyle`s that AngularJS had to load.  Although using directives is the *right* way to do AngularJS, I realized that perhaps it wasn't the most *efficient* way.  After trying out a few tests, I confirmed this was the issue, and started work on ripping out the `superStyle`s.  Instead, I copied the `style` generation code from `superStyle` and dropped it into `human`, but with one large `style`, rather than 10 small ones.  The new `human` directive is below.


app.directive("human", function() {
	return {
		restrict: 'E',
		templateUrl: "/assets/templates/human.html",
		scope: {
			human: "=human",
			click: "=ngClick"
		},
		link: function(scope, element, attrs) {
			var possibilities = ['close', 'medium', 'far'];

			scope.distance = possibilities[Math.floor(Math.random() * possibilities.length)];

			var styleTag = "<style type='text/css'>";
			styleTag	+= scope.human.css.animations;
			styleTag	+= "#human_" + scope.human._id + " .head { ";
			styleTag	+= 		scope.human.css.head;
			styleTag 	+= "}";
			styleTag	+= "#human_" + scope.human._id + " .head:before { ";
			styleTag	+= 		scope.human.css.head_before;
			styleTag 	+= "}";
			styleTag	+= "#human_" + scope.human._id + " .head:after { ";
			styleTag	+= 		scope.human.css.head_after;
			styleTag 	+= "}";
			styleTag	+= "#human_" + scope.human._id + " .legs { ";
			styleTag	+= 		scope.human.css.legs;
			styleTag 	+= "}";
			styleTag	+= "#human_" + scope.human._id + " .legs:before { ";
			styleTag	+= 		scope.human.css.legs_before;
			styleTag 	+= "}";
			styleTag	+= "#human_" + scope.human._id + " .legs:after { ";
			styleTag	+= 		scope.human.css.legs_after;
			styleTag 	+= "}";
			styleTag	+= "#human_" + scope.human._id + " .body { ";
			styleTag	+= 		scope.human.css.body;
			styleTag 	+= "}";
			styleTag	+= "#human_" + scope.human._id + " .body:before { ";
			styleTag	+= 		scope.human.css.body_before;
			styleTag 	+= "}";
			styleTag	+= "#human_" + scope.human._id + " .body:after { ";
			styleTag	+= 		scope.human.css.body_after;
			styleTag 	+= "}";
			styleTag 	+= "</style>"

			element.prepend(styleTag);
		}
	};
});


It worked!  I was now loading in 20 `human`s, and there was no noticeable wait time on first load.  The valuable lesson here is that, although AngularJS directives are awesome, they don't necessarily scale well.  Certainly my generation of `style` tags was a heavy operation, but I think that this probably would have happened with easier templated directives.  Be careful as you're developing in AngularJS, and recognize that you may have to choose the hard way rather than the directive way, for the sake of your users.
