--- 
published: true
title: "Angular.js Directive Tutorial: On-Attribute Bootstrap Confirm Button"
type: post
layout: post
meta: 
  _edit_last: "1"
  dsq_thread_id: "975261631"
status: publish
tags: []

---
I haven't talked about it much on the blog yet, but let me tell you something - I _love_ [AngularJS](https://angularjs.org).  AngularJS is a client-side javascript framework that pretty much speeds up development by 500% by taking out **100%** of the DOM manipulation.  That's right - no more fighting with the DOM in your javascript.  Let AngularJS do it.  It's really awesome.

One of my favorite things about AngularJS is something called [directives](https://docs.angularjs.org/guide/directive).  Directives are an awesome tool that essentially lets you create new HTML tags, or supercharge existing tags with attributes.  Have a special button that you like to use, but you hate typing all that HTML every time?  Directives will fix that.  Want to do a special sort of validation on all of your email inputs?  Directives can help with that.

The majority of the directive tutorials out there - including the [great one provided by AngularJS](https://docs.angularjs.org/guide/directive) - focus on tag directives.  That means that it's all about creating new HTML tags, like &lt;specialbutton>, for instance.  That's all fine and well, but I've found that the really cool stuff actually happens in the less-talked-about attribute directives.  These are the things like &lt;input validate="email" />.

I built one recently for my super secret startup that I'd like to teach you how to make.  It's a confirm button that utilizes [Bootstrap Popovers](https://twitter.github.com/bootstrap/javascript.html#popovers).  Here's a [demo of what we're going to build](https://plnkr.co/edit/a7TTvWSXbWHY14PgR7Ew?p=preview).

So, first off, let's just build the scaffolding of an AngularJS app with a directive. Check it out:

{% highlight javascript %}
var app = angular.module('TestApp', ['ui']).directive("confirmButton", function($document, $parse) {

});

function TestCtrl($scope) {

}
{% endhighlight %}

So that's the super simple part.  It creates a controller called TestApp, and loads in [AngularUI](https://angular-ui.github.com/), an awesome UI library for AngularJS.  It's fairly lightweight, and is required to get Bootstrap to work correctly.  You'll notice that the directive loads in $document and $parse.  $document is just a wrapper of the regular document object.  [$parse](https://docs.angularjs.org/api/ng.$parse) is used to turn angular expressions into functions.

Now that that's set, let's start putting in some of the scaffolding for the actual directive.  Still no functionality, but these parts are important too.

{% highlight javascript %}
var app = angular.module('TestApp', ['ui']).directive("confirmButton", function($document, $parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

    }
  }
});
{% endhighlight %}

Directive factories should always return the configuration object, so that's what we've got started here.  We added two keys to that object - restrict and link.  The restrict key is pretty cool - it limits how your directive can be used.  In this scenario we only want the confirmButton directive used as an attribute on an existing element, but you could easily change that to something like 'EA' to allow it to be an attribute or an element.

The link function is a little bit more complex.  I promise I won't explain it correctly, so you should probably go to the directive guide linked above and read more about it.  Essentially, the linking function is where you're supposed to wire up all of your DOM listeners.  This is also where you're supposed to do any DOM manipulation that might need to happen prior to the element being displayed. Keep that in mind, because we can't break the golden angular rule: **Never do DOM manipulation in the controller.**

Now we finally get to add in some functionality.  Oh joy.


{% highlight javascript %}
var app = angular.module('TestApp', ['ui']).directive("confirmButton", function($document, $parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var buttonId, html, message, nope, title, yep;
      
      buttonId = Math.floor(Math.random() * 10000000000);
      
      attrs.buttonId = buttonId;
      
      html = "&lt;div id=\"button-" + buttonId + "\">\n  &lt;span class=\"confirmbutton-msg\">Are you sure?&lt;/span>&lt;br>\n  &lt;button class=\"confirmbutton-yes btn btn-danger\">Yes&lt;/button>\n	&lt;button class=\"confirmbutton-no btn\">No&lt;/button>\n&lt;/div>";
      
      element.popover({
        content: html,
        html: true,
        trigger: "manual",
        title: "Confirm"
      });
      
      element.bind('click', function(e) {

        var dontBubble = true;
        
        e.stopPropagation();
        
        element.popover('show');

      });
    }
  };
});
{% endhighlight %}

The vast majority of that code you see above is just handling propagation and bubbling.  There's some intricacies with Bootstrap that I had to fight with to get the right things to show and hide at the right times.  Ignore anything that has to do with dontBubble or stopPropagation. I'll walk through the rest.

Right off the bat, you see we're generating a random buttonId.  Bootstrap doesn't tell you where your popover exists in the DOM, so we have to have some sort of scoped identifier available so we can bind to the confirmation buttons in the popover.  That's what this buttonId is for.  You can see that it is added onto the id of the popover's inner &lt;div>

That next part, `element.popover({...})` is the bootstrap part.  We're telling Bootstrap what to display in the popover, that we want it to only be opened manually - because we will write that part ourselves - and that it should have a title of "Confirm".

The final portion there is where we start to get fancy.  We're using AngularJS's internal version of jQuery to select the parent element, and bind to it's click event.  Once in there we're going to handle some propagation events, and then show the confirmation popover.  Great!  It doesn't actually do anything, but it does show the popover at this point!

Now for the rest of the bindings, and we'll finally be done.

{% highlight javascript %}
element.bind('click', function(e) {

        var dontBubble = true;
        
        e.stopPropagation();
        
        element.popover('show');
        
        var pop = $("#button-" + buttonId);
        
        pop.closest(".popover").click(function(e) {
          if (dontBubble) {
            e.stopPropagation();
          }
        });
        
        pop.find('.confirmbutton-yes').click(function(e) {
          dontBubble = false;
          
          var func = $parse(attrs.confirmButton);
          func(scope);
        });
        
        pop.find('.confirmbutton-no').click(function(e) {
          dontBubble = false;
          
          $document.off('click.confirmbutton.' + buttonId);
          
          element.popover('hide');
        });
        
        $document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function() {
          $document.off('click.confirmbutton.' + buttonId);
          element.popover('hide');
        });
      });
{% endhighlight %}

Again, as I mentioned, a lot of this code has to do propagation.  Keep ignoring everything that has to do with dontBubble and stopPropagation.  That means you can skip that entire first click event handler - that's purely for propagation.

The next one is the binding for the No button.  When you click on the no button, it should unbind any of the listeners we had and then hide the popover.  Makes sense.

After that we've got the famous Yes button.  This is where things get fancy.  Remember earlier when I told you that we were bringing the $parse module into the directive?  Well, we're using that here.  The confirm button accepts a string parameter, in the form of an [AngularJS expression](https://docs.angularjs.org/guide/expression).  When you pass $parse a string expression, it parses it and returns to you a function you can call.  That's `func` in our code.  When you call the returned function, though, by default it doesn't know what scope to be run in.  Luckily the directive linking function is given the parent scope, so we can pass that in to `func`.

That last click handler is just another propagation thing, but it's actually an interesting one.  The default functionality for a Bootstrap Popover is to not close until you explicitly tell it to close.  Well, we set our trigger to manual, remember?  That means there's nothing that's going to tell it to close!  That last handler bind's to $document's click event, and then checks if the user actually clicked on the popover.  If they didn't click on the popover, then it closes.  Pretty cool!

### Bonus Feature!

Alright, cool, so we made a confirm button.  That's nice, but it's kind of boring.  Wouldn't it be cool if we could extend it so that we can tell it what to say?  Done.

Angular allows you to access all of the attributes on the parent directive, so we can easily tell our directive to look at those for the content strings.  Simply change the html generation string to look like this:

{% highlight javascript  %}
      message = attrs.message || "Are you sure?";
      yep = attrs.yes || "Yes";
      nope = attrs.no || "No";
      title = attrs.title || "Confirm";
      
      html = "&lt;div id=\"button-" + buttonId + "\">\n  &lt;span class=\"confirmbutton-msg\">" + message + "&lt;/span><br>\n  &lt;button class=\"confirmbutton-yes btn btn-danger\">" + yep + "&lt;/button>\n	&lt;button class=\"confirmbutton-no btn\">" + nope + "&lt;/button>\n&lt;/div>";
      
      element.popover({
        content: html,
        html: true,
        trigger: "manual",
        title: title
      });
{% endhighlight %}

There you go!  Now you can create confirmation buttons by simply adding the `confirm-button` attribute!  Check out the [demo](https://plnkr.co/edit/a7TTvWSXbWHY14PgR7Ew?p=preview) to see exactly how your HTML should look!
