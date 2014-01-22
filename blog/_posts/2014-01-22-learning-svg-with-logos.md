--- 
title: "Learning SVG With Logos"
layout: tutorial
meta: 
 _edit_last: "1"
 dsq_thread_id: "learningsvgwithlogos"
tutorialbg: "#05051f"
---
*It seems that Google Chrome has some trouble looping SVG animations.  If you're interested in the examples, you may want to view this page in Firefox*



In my book, [SVG](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics) is classified as a mythical unicorn super technology.  SVG shares this category with other technologies like [RegExp](http://en.wikipedia.org/wiki/Regular_expression), [vim](http://www.vim.org/), and [OpenGL](http://en.wikipedia.org/wiki/OpenGL). The common traits between each of these technologies is that they are incredibly useful when used correctly, but incredibly difficult to use correctly.  All three pack some serious punch inside of a terribly confusing syntax.

<div id="logo_example_target"></div>

I've made the jump and figured out how to do RegExp, and have reaped many benefits from that bit of knowledge. Today I'm going to try and do the same with SVG.  SVG stands for Scalable Vector Graphics - essentially it is a XML-formatted document that describes a graphic.  The benefit to using SVG over other image formats is that it describes vector graphics - that means your images will scale crisply at any size.  Best of all, HTML5 brought along support for native SVG documents inside of a web page, so you can now treat SVG graphics like first-class DOM elements.

## The Task
I learn best by finding something I need done, and just pounding away at it until it's done. For awhile now I've been wanting to change the [WegnerDesign](http://www.wegnerdesign.com) logo into SVG, so that will be the task I start with.

## Break It Down
Since SVG is an XML document, you can think about it much like you do regular HTML markup.  The thing you're trying to create needs to be broken up into multiple pieces, which will be represented by separate elements in the markup. Just like learning any new language, beginners probably will want to break their image up into the most simple components possible.  It's possible this isn't the most efficient design, but it's probably the easiest to learn with.

<div id="first-break-target"></div>

The WegnerDesign logo is essentially a giant 'W', with a 'J' highlighted on one branch of the W. Broken into simple components, I see three vertical rectangles - the long necks of the W - and two arcs on the bottom.

## Basic Components
### Rectangle

There are two basic components we need to create these pieces.  The first, and certainly the easiest, is the [`rect`](http://www.w3.org/TR/SVG/shapes.html#RectElement).  A rectangle is probably the simplest shape you will find in SVG.  As you would probably imagine, there are four key properties: `x`, `y`, `height`, and `width`. `x` and `y` define the location of the top left corner of the rectangle.  Coordinates in SVG are relative to their container.  In our case, the container is the root SVG document, so they're pretty simple.

`height` and `width` are also pretty obvious.  `height` is how tall the rectangle will be, and `width` is how wide the rectangle will be.  Because SVG graphics are made to scale, the idea of "units" doesn't make too much sense.  You may be used to defining heights, widths, and positions in `px` from CSS; in SVG you're best off not putting a unit.  Using `px` will just map to the SVG internal unit.  You *can* use things like `em` and `ex`, but that would only cause confusion in this context.

<div id="rectangle-target"></div>

If you create a rectangle just using the information above, you might be a bit disappointed; you'll be given a black rectangle, which isn't terribly interesting.  Luckily, every svg shape accepts a `style` attribute.  The `style` attribute is just CSS markup, so the syntax is identical to the CSS you are familiar with.  The two important style rules are `stroke` and `fill`.  On a `rect`, `stroke` refers to the border of the box, and `fill` is the inside portion.  Both rules accept either a hex color or a regular CSS color.  At the end of the day, your `rect` code should look like this:

```html
<svg  xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">

      <rect x="0" y="0" height="100" width="200" style="stroke: #70d5dd; fill: #dd524b" />

</svg>
```

### Path

The [`path`](http://www.w3.org/TR/SVG/paths.html) shape is the next one we will be using.  In fact, `path` is probably the most versatile SVG shape - you can literally draw anything you want.  The `path` shape utilizes a pretty weird syntax, but it allows you to draw everything from straight lines to bezier curves.  Learning the syntax takes some elbow grease, but once you get it down it's very powerful.

The important attribute on a `path` is `d`, which is short for **`d`rawing**, and will contain all of the commands to draw the path. We're only going to be needing arcs for this logo, but there are [a lot more](http://tutorials.jenkov.com/svg/path-element.html) options you can use.  The `d` attribute is a string that is sort of formatted as a space-separated list of commands.  The `M` command is used to **`m`ove** the pen without creating a stroke.  `M` accepts x and y coordinates, and will usually looking something like `M70,330` - that would move the pen to x=70, y=330.

<div id="rxry-target"></div>

Once you've moved the cursor to where you want it, you actually need to draw the arc.  You do this with the `A` command. `A` takes 7 parameters - radius x(rx), radius y(ry), x-axis-rotation, large-arc-flag, sweep-flag, x, and y. The first two are fairly easy; `rx` will define how wide your arc is, and `ry` will define how tall the arc is

Once you've got rx and ry figured out, you need to think about the x-axis rotation of your arc.  I find it's easiest to visualize the rotation if you think about your arc as a full oblong circle.  The x-axis rotation simply rotates that circle around the x-axis.

<div id="xaxis-target"></div>

The next two parameters are a bit more confusing. For any set of rx,ry parameters, four different arcs can be drawn. These three parameters will define that. The first option is called the `large-arc-flag`. This flag decides if the arc will greater or less than 180 degrees.  Setting the large-arc-flag to 0 will make the arc less than 180 degrees, and setting it to 1 will make it greater than 180 degrees.  This flag mostly just sets if your arc will be wide or thin.

<div id="largearc-target"></div>

After the large-arc-flag is the sweep flag. The naming of the sweep flag is a little bit weird, but the functionality is actually pretty easy.  The `sweep-flag` just decides if the arc will begin with a negative angle or a positive one. In most cases, toggling the sweep flag will just reverse your arc. Setting the sweep flag to 0 will start you off with positive angles, and setting it to 1 will give you negative angles.

<div id="sweep-target"></div>

Finally, we get to the easy parameters. `x` and `y` are very straight forward - you just define where you want your arc to end.  These should be absolute x,y coordinates.  Remember that when we started the path we had to use a `M`ove command.  Your arc will be drawn from where the last `M`ove command ended and where these final `x` and `y` parameters define.

## Building a Logo

Now that we've got all of our basic components, we can start fitting them together to create a logo.  If you remember, we broke the WegnerDesign logo up into five pieces - the three long arms at the top, and two arcs connecting them all at the bottom.  Using our basic components, that means we will need three `rect`s and two `path`s.

My original logo design was done on a 600x600 canvas, so I will be using sizes and positions according to that canvas. As I've mentioned, SVG is a vector image format, so regardless of what scale you use it should come out crisp.

### Rectangles

Each of the rectangles will need to be 320 units tall, and 100 units wide.  We will need three of them evenly spaced with 150 units between them.  I will be starting my logo at 10,10 simply because I like a little bit of padding.  The padding isn't required, but can be helpful if you ever want to do animations in the future.  I also will not be using any stroke color for these rects.  I find that when I'm matching a design done elsewhere, it's easier to get the correct sizes of you're not translating between fill-width and stroke-width.

Your rect code should look something like this:

```html
<rect x="10" y="10" height="320" width="100" style="fill: #dd524b; fill-opacity: .5;" />
```

We want to space three of those with 150 units in between.  Remember, we are using absolute positions here, so we need to add the 100 units of width on to the x positions.  So the whole thing put together should be:

<div id="rects-target"></div>

```html
<rect x="10" y="10" height="320" width="100" style="fill: #dd524b;" />
<rect x="250" y="10" height="320" width="100" style="fill: #dd524b;" />
<rect x="490" y="10" height="320" width="100" style="fill: #dd524b;" />
```

### Arcs

Now we need the two arcs that will connect the three rectangles.  Both of the arcs will be identical, just shifted across the x axis from eachother.  According to my previous logo design, the radius inside of the arcs should be 140 units in diameter.  However, when we're drawing arcs using SVG we have to account for the width of the stroke. SVG draws your stroke from the center of the path out. For example, if you have a vertical path with x=50, and a stroke-width of 50 units, the stroke will be drawn solid from x=25 to x=75.  My strokes will be 100 units wide, so I need to shift my edge points 50 units out.  That puts me at 240 units.  The `rx` for these arcs is 70, and `ry` is 85.  The path code should look like this:

```html
<path d="M60,330 A70,85 0 1,0 300,330" style="stroke: #dd524b; fill: transparent; stroke-width: 100;" />
```

<div id="paths-target"></div>

The next path's left edge should match exactly with the right edge of the first path, so we can match up our x coordinates.  Put together with the `rects` from above, the whole code block will look like this:

```html
<rect x="10" y="10" height="320" width="100"
      style="fill: #dd524b;" />
<path d="M60,330 A70,85 0 1,0 300,330" style="stroke: #dd524b; fill: transparent; stroke-width: 100;" />
<rect x="250" y="10" height="320" width="100"
      style="fill: #dd524b;" />
<path d="M300,330 A70,85 0 1,0 540,330" style="stroke: #dd524b; fill: transparent; stroke-width: 100;" />
<rect x="490" y="10" height="320" width="100"
      style="fill: #dd524b;" />
```

Awesome!  We've got the shape down!  However, if you're looking at the example you're probably noticing that it doesn't look quite the same as my original logo.  If you compare what we've got so far against the original, the difference is pretty obvious: the original has some opacity.  Luckily, opacity is really easy to do - it's almost identical to playing with opacity in regular CSS.  The two properties we want to pay attention to are `stroke-opacity` and `fill-opacity`.  Those two values are set inside of the shape's `style` attribute, and accept values from 0 to 1.


On my design I highlight the J on top of the W.  That translates to the first arc and the second rectangle.  Those two shapes will have an opacity of .6, while the rest will be 0.5.

<div id="opacity-target"></div>

```html
<rect x="10" y="10" height="320" width="100"
      style="fill: #dd524b; fill-opacity: .5" />
<path d="M60,330 A70,85 0 1,0 300,330" style="stroke: #dd524b; fill: transparent; stroke-width: 100; stroke-opacity: .6" />
<rect x="250" y="10" height="320" width="100"
      style="fill: #dd524b; fill-opacity: .6" />
<path d="M300,330 A70,85 0 1,0 540,330" style="stroke: #dd524b; fill: transparent; stroke-width: 100; stroke-opacity: .5" />
<rect x="490" y="10" height="320" width="100"
      style="fill: #dd524b; fill-opacity: .5" />
```

### Mask

Uh oh!  Now that we've applied the opacity, you can see that there are some problems where my shapes overlap.  The two arcs overlap as they converge into the center rectangle, and their opacities add up to 100%.  This is a pretty sloppy design, so it's got to be fixed.  Unfortuantely, without pulling all of our hair out, there isn't an easy way to create a path that concaves out so that we can remove the overlap.  Instead, the solution will be to create a mask that hides part of one arc, so that they don't overlap.

If you're at all familiar with graphic design, masks in SVG are very similar to layer masks in most advanced graphics editors.  Essentially, a mask creates a new canvas for you to draw on; you can draw anything you could on a normal SVG canvas - paths, rectangles, circles, etc.  Everything you draw on the mask will be invisible, but they will create a sort of lense that lets the elements underneath it shine through. Think of the mask as a black sheet that is on top of your shape - you can cut holes in it so that you can see parts of the shape underneath.

Anything you draw on the mask that is white will create a hole.  Inversely, anything you draw that is black will cover back up a hole.  The entire canvas is black by default, so it really is like carving. If you wanted to get even fancier, you could use gradients to progressively open up parts of the mask.

In order to cut out the little bit of the arc that is overlapping, I will duplicate the two arcs and place them in the mask.  However, I will flip their rotation - I will put the second arc before the first arc in the SVG markup.  SVG uses a standard box model, so things that come later in the markup are *on top of* things that come before them.  Now that they're overlapping, I can set the color of the first (right) arc to white and the second (left) arc to black.  At the point that they overlap, the second (left) arc will be on top of the other one, making that portion of the mask black.  The overlapping portion of the mask is effectively closed.

```html
<mask id="opacity-mask" x="0" y="0" height="2" width="2">
	<path d="M300,330 A70,85 0 1,0 540,330" style="stroke: #ffffff; stroke-width: 100;" />
	<path d="M60,330 A70,85 0 1,0 300,330" style="stroke: #000000; stroke-width: 100;" />
</mask>
```

<div id="mask-target"></div>

Now, all that's left is to apply the mask to the correct shape. Remember, the right arc is white in our mask, which means it will show through.  That means we need to apply the mask to the right arc.  You'll notice that in the above HTML I put an `id` attribute on the mask.  You need to have the `id` there so that you can choose which mask to apply.  You set the mask using the `mask` CSS attribute with a url selector.  It should look like:

```html
<path d="M300,330 A70,85 0 1,0 540,330" style="stroke: #dd524b; stroke-opacity: .5; fill: transparent; stroke-width: 100; mask: url(#opacity-mask)" />
```

## Polishing

That looks pretty dang good.  As far as I can tell, we've matched my logo 1-to-1.  The colors are the same, the opacities are the same, and everything scales beautifully. It looks good at first glance right now, but unfortunately there are some quirks that we need to take care of before we can call this finished. The major thing - and you may have already noticed this - is that certain browsers really struggle with antialiasing on SVG shapes.

Depending on your browser, you may notice thin gaps between each of the arcs and the rectangles. It looks as if we ended the rectangles one pixel too high so that it doesn't quite reach the top of the arc. In fact, that's what I originally thought I did - I spent nearly an hour playing with stroke widths and positioning to try and fix that one pixel gap. It turns out that all along the black line is an artifact from the browser trying to create smooth edges. It seems like a silly bug, especially given that the lines in question are flat horizontals, but SVG is new and you have to let these things slide sometimes.

The bad news is that there's no fix for this.  If we're going to design an SVG with the architecture that we're using above, there is no way not to have these antialiasing artifacts in some browsers. Obviously I'm not about to place a messed up image on my website, so I had to refactor the whole thing.  In the end, instead of using 3 rects and 2 arcs, I broke the whole design into three paths - the first "U", the highlighted "J" that sits on top of that first U, and a second "J" to make up the third branch of the W.

The only thing new that you need to know in order to implement this new architecture is the `L` command on paths. `L` stands for Line, and just creates a straight line from your starting pen position to an end position. The syntax is simple - just provide `x` and `y` coordinates for where you want the line to end (your `M`ove commands define where it starts). For example, this command draws a line to x=300, y=330: `L300,330`.

Here's what the entire SVG code looked like in the end:

<div id="refactor-target"></div>

```html
  <path d="M50,50 L50,330 A70,85 0 1,0 300,330 L300,50" style="stroke: #dd524b; stroke-opacity: .6; fill: transparent; stroke-width: 100;" />
  <path d="M550,50 L550,330 A70,85 0 0,1 300,330" style="stroke: #dd524b; stroke-opacity: .6; fill: transparent; stroke-width: 100; mask: url(#first-u-mask)" />
  <path d="M300,50 L300,330 A70,85 0 0,1 50,330" style="stroke: #dd524b; stroke-opacity: .5; fill: transparent; stroke-width: 100;" />

  <mask id="first-u-mask" x="0" y="0" height="2" width="2">
    	<path d="M550,50 L550,330 A70,85 0 0,1 300,330" style="stroke: #ffffff; stroke-width: 100;" />
    	<path d="M50,50 L50,330 A70,85 0 1,0 300,330 L300,50" style="stroke: #000000; stroke-width: 100;" />
  </mask>
```

## Animating
One of my goals for this logo-to-SVG project has been to add some animation to the logo. [Jesse Pollak](http://jessepollak.me) has a cool effect on his website header that slowly transitions the background color between a few well-picked colors.  The effect happens very slowly and with enough space inbetween each transition that it's very subtle and easy to miss - you just notice it out of the corner of your eye.  It's not distracting, it just adds a feeling of detailed design.  I want to recreate that effect in my logo.

I will be transitioning through 5 different colors, and will do a transition every 10 seconds. The "J" in my logo should start the color transition three seconds before the rest of the logo.  My hope is that this will increase the contrast of the "J", and also create a more interesting effect once the two color transitions lock into eachother.

As you've certainly seen from the examples, all major browsers support animation of SVG documents. To add animation to an SVG shape, you simple place an `animate` element as a child of the shape you want to animate. According to the SVG spec, color animation is actually supposed to be done in an `animateColor` element, but Firefox doesn't support that.  We will stick to the `animate` element.

`animate` elements require a few attributes.  First off is the easy one, `attributeName` - this defines which attribute on the shape that you want to animate; in our case, that will be `stroke` or `fill`. Then you have the `from` and `to` attributes; these define the starting and ending states of the animation. The value for `from` and `to` should match the format of the original attribute.  Next up is timing with `begin` and `duration`. `begin` gets a time format similar to CSS animations - if you want the animation to begin 5 seconds from page load, you set `begin` to `5s`. `dur` has the same format - a 5 second animation should have `dur` set to `5s`.

You also need to set a `fill` attribute. The fill attribute accepts two parameters - `remove` or `freeze`. Setting `fill` to remove will set whatever value you are animating back to it's original state once the animation finishes.  `freeze` will persist the final state of the animation even after the animation is finished.

There is one more optional attribute that is very important if you're going to do looping or sequencing animations - `id`. `id` works just the same as ids on any other HTML element - you can set it to whatever unique string that you want.  The upside to setting an id is that you can now use that id for timing sequences.  Let's say I have an animation that fades an element out over 5 seconds, and I want another animation that fades it back in.  I would set `begin` on the second element to `firstanimation.end`.

The animation for my logo is going to be animating the stroke (or fill, depending on the shape) attribute.  It will start at 10s and run for a duration of 5s.  An example animation element would look like this:

```html
<path d="M50,50 L50,330 A70,85 0 1,0 300,330 L300,50" style="stroke: #dd524b; stroke-opacity: .6; fill: transparent; stroke-width: 100;">
      <animate id="firstpathone" attributeName="stroke"
                from="dd524b;"
                to="#ddcb76"
                begin="10s; finished.end+10s" dur="5s"
                fill="freeze" />
</path>
```

That will do the first animation, and should work well enough.  As you can see, I have that animation starting at 10s AND at `finished`.end+10s.  In this hypothetical, there is another animation with an id of finished - this animation will loop 10 seconds after the last animation finishes.  Putting all the animations together into a sequance generates this:

```html
<path d="M50,50 L50,330 A70,85 0 1,0 300,330 L300,50" style="stroke: #dd524b; stroke-opacity: .6; fill: transparent; stroke-width: 100;">
  <animate id="first1" attributeName="stroke"
      from="#dd524b" to="#ddcb76"
      begin="13s; sixth1.end+10s" dur="5s"
      fill="freeze" />
  <animate id="second1" attributeName="stroke"
      from="#ddcb76" to="#92c5dd"
      begin="first2.end+10s" dur="5s"
      fill="freeze" />
  <animate id="third1" attributeName="stroke"
      from="#92c5dd" to="#dd6b93"
      begin="second1.end+10s" dur="5s"
      fill="freeze" />
  <animate id="fourth1" attributeName="stroke"
      from="#dd6b93" to="#69dd93"
      begin="third1.end+10s" dur="5s"
      fill="freeze" />
  <animate id="fifth1" attributeName="stroke"
      from="#69dd93" to="#cb86dd"
      begin="fourth1.end+10s" dur="5s"
      fill="freeze" />
  <animate id="sixth1" attributeName="stroke"
      from="#cb86dd" to="#dd524b"
      begin="fifth1.end+10s" dur="5s"
      fill="freeze" />
</path>
```
<div style="width: 100%;">
      <svg  xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewbox="0 0 600 600">
        <path d="M50,50 L50,330 A70,85 0 1,0 300,330 L300,50" style="stroke: #dd524b; stroke-opacity: .6; fill: transparent; stroke-width: 100;">
              <animate id="first1" attributeName="stroke"
                  from="#dd524b" to="#ddcb76"
                  begin="13s; sixth1.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="second1" attributeName="stroke"
                  from="#ddcb76" to="#92c5dd"
                  begin="first2.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="third1" attributeName="stroke"
                  from="#92c5dd" to="#dd6b93"
                  begin="second1.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="fourth1" attributeName="stroke"
                  from="#dd6b93" to="#69dd93"
                  begin="third1.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="fifth1" attributeName="stroke"
                  from="#69dd93" to="#cb86dd"
                  begin="fourth1.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="sixth1" attributeName="stroke"
                  from="#cb86dd" to="#dd524b"
                  begin="fifth1.end+10s" dur="5s"
                  fill="freeze" />
        </path>
        <path d="M550,50 L550,330 A70,85 0 0,1 300,330" style="stroke: #dd524b; stroke-opacity: .6; fill: transparent; stroke-width: 100; mask: url(#pfirst-u-mask)">
              <animate id="first2" attributeName="stroke"
                  from="#dd524b" to="#ddcb76"
                  begin="13s; sixth2.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="second2" attributeName="stroke"
                  from="#ddcb76" to="#92c5dd"
                  begin="first2.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="third2" attributeName="stroke"
                  from="#92c5dd" to="#dd6b93"
                  begin="second2.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="fourth2" attributeName="stroke"
                  from="#dd6b93" to="#69dd93"
                  begin="third2.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="fifth2" attributeName="stroke"
                  from="#69dd93" to="#cb86dd"
                  begin="fourth2.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="sixth2" attributeName="stroke"
                  from="#cb86dd" to="#dd524b"
                  begin="fifth2.end+10s" dur="5s"
                  fill="freeze" />
        </path>
        <path d="M300,50 L300,330 A70,85 0 0,1 50,330" style="stroke: #dd524b; stroke-opacity: .5; fill: transparent; stroke-width: 100;">
              <animate id="first3" attributeName="stroke"
                  from="#dd524b" to="#ddcb76"
                  begin="10s; sixth3.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="second3" attributeName="stroke"
                  from="#ddcb76" to="#92c5dd"
                  begin="first3.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="third3" attributeName="stroke"
                  from="#92c5dd" to="#dd6b93"
                  begin="second3.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="fourth3" attributeName="stroke"
                  from="#dd6b93" to="#69dd93"
                  begin="third3.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="fifth3" attributeName="stroke"
                  from="#69dd93" to="#cb86dd"
                  begin="fourth3.end+10s" dur="5s"
                  fill="freeze" />
              <animate id="sixth3" attributeName="stroke"
                  from="#cb86dd" to="#dd524b"
                  begin="fifth3.end+10s" dur="5s"
                  fill="freeze" />
        </path>

        <mask id="pfirst-u-mask" x="0" y="0" height="2" width="2">
            <path d="M550,50 L550,330 A70,85 0 0,1 300,330" style="stroke: #ffffff; stroke-width: 100;" />
            <path d="M50,50 L50,330 A70,85 0 1,0 300,330 L300,50" style="stroke: #000000; stroke-width: 100;" />
        </mask>
      </svg>
</div>

And now we're done!  The code for the whole thing is super long, so I'm not going to paste it here.  You can grab the whole thing from [this codepen](http://codepen.io/anon/pen/HfvKw) if you'd like.

<div class="example-block" data-target-anchor="logo_example_target" style="color: white; font-weight: bold;">
	<span>The Goal</span><br>
	<img src="/images/logo.png" style="height: 300px; width: auto;" />
</div>

<div class="example-block" data-target-anchor="rectangle-target" style="height: 200px;">
	<svg  xmlns="http://www.w3.org/2000/svg"
	      xmlns:xlink="http://www.w3.org/1999/xlink"
	      viewbox="0 0 200 100" style="width: 50%;">

	      <rect x="0" y="0" height="100" width="200" style="stroke: #70d5dd; fill: #dd524b" />

	</svg>
</div>

<div class="example-block" data-target-anchor="rxry-target" style="height: 130px; color: white;">
	<span>rx vs. ry</span><br>
	<svg  xmlns="http://www.w3.org/2000/svg"
	      xmlns:xlink="http://www.w3.org/1999/xlink"
	      viewbox="0 0 100 30" style="width: 80%;">

	      <path d="M10,5 A10,10 0 0,0 40,5" style="stroke: #dd524b; stroke-width: 1; fill: #70d4dd;">
	    	<animate id="rxryone" attributeName="d" attributeType="XML"
			    from="M10,5 A10,10 0 0,0 40,5"
			    to="M10,5 A15,10 0 0,0 30,5"
			    begin="0s; rxrytwo.end" dur="1s"
			    fill="freeze" />
	    	<animate id="rxrytwo" attributeName="d" attributeType="XML"
			    from="M10,5 A15,10 0 0,0 30,5"
			    to="M10,5 A10,10 0 0,0 40,5"
			    begin="rxryone.end;" dur="1s"
			    fill="freeze" />
	      </path>

	      <path d="M60,5 A10,10 0 0,0 90,5" style="stroke: #dd524b; stroke-width: 1; fill: #70d4dd">
	    	<animate id="rxrythree" attributeName="d" attributeType="XML"
			    from="M60,5 A10,10 0 0,0 90,5"
			    to="M60,5 A10,15 0 0,0 90,5"
			    begin="0s; rxryfour.end;" dur="1s"
			    fill="freeze" />
	    	<animate id="rxryfour" attributeName="d" attributeType="XML"
			    from="M60,5 A10,15 0 0,0 90,5"
			    to="M60,5 A10,10 0 0,0 90,5"
			    begin="rxrythree.end;" dur="1s"
			    fill="freeze" />
	      </path>	      

	</svg>
</div>

<div class="example-block" data-target-anchor="xaxis-target" style="height: 130px; color: white;">
	<span>x-axis rotation</span><br>
	<svg  xmlns="http://www.w3.org/2000/svg"
	      xmlns:xlink="http://www.w3.org/1999/xlink"
	      viewbox="0 0 100 30" style="width: 80%;">

	      <path d="M35,5 A10,15 0 0,0 65,5" style="stroke: #dd524b; stroke-width: 1; fill: #70d4dd;">
	    	<animate id="xaxisone" attributeName="d" attributeType="XML"
			    from="M35,5 A10,15 0 0,0 65,5"
			    to="M35,5 A10,15 50 0,0 65,5"
			    begin="0s; xaxistwo.end;" dur="1s"
			    fill="freeze" />
	    	<animate id="xaxistwo" attributeName="d" attributeType="XML"
			    from="M35,5 A10,15 50 0,0 65,5"
			    to="M35,5 A10,15 0 0,0 65,5"
			    begin="xaxisone.end;" dur="1s"
			    fill="freeze" />
	      </path>
	</svg>
</div>

<div class="example-block" data-target-anchor="largearc-target" style="height: 130px; color: white;">
	<span>large arc</span><br>
	<svg  xmlns="http://www.w3.org/2000/svg"
	      xmlns:xlink="http://www.w3.org/1999/xlink"
	      viewbox="0 0 100 30" style="width: 80%;">

	      <path d="M10,5 A20,10 0 0 0 40,5" style="stroke: #dd524b; stroke-width: 1; fill: #70d4dd;" />
	      <path d="M60,5 A20,10 0 1 0 90,5" style="stroke: #dd524b; stroke-width: 1; fill: #70d4dd" /> 
	</svg>
</div>

<div class="example-block" data-target-anchor="sweep-target" style="height: 130px; color: white;">
	<span>sweep</span><br>
	<svg  xmlns="http://www.w3.org/2000/svg"
	      xmlns:xlink="http://www.w3.org/1999/xlink"
	      viewbox="0 0 100 30" style="width: 80%;">

	      <path d="M10,5 A10,15 0 0,0 40,5" style="stroke: #dd524b; stroke-width: 1; fill: #70d4dd;" />
	      <path d="M60,30 A10,15 0 0,1 90,30" style="stroke: #dd524b; stroke-width: 1; fill: #70d4dd" />
	</svg>
</div>

<div class="example-block" data-target-anchor="first-break-target" style="height: 400px;">
	<svg  xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewbox="0 0 620 600" style="width: 50%;">
		<rect x="20" y="10" height="320" width="100"
			style="fill: #dd524b; fill-opacity: .6;">
	    </rect>
	    <path d="M70,330 A70,85 0 1,0 310,330" style="stroke: #dd524b; stroke-opacity: .6; fill: transparent; stroke-width: 100;">
	    	<animate id="firstbreakone" attributeName="d" attributeType="XML"
			    from="M70,330 A70,85 0 1,0 310,330"
			    to="M50,350 A70,85 0 1,0 290,350"
			    begin="0s; firstbreaktwo.end+2s" dur="1s"
			    fill="freeze" />
			<animate id="firstbreaktwo" attributeName="d" attributeType="XML"
			    from="M50,350 A70,85 0 1,0 290,350"
			    to="M70,330 A70,85 0 1,0 310,330"
			    begin="firstbreakone.end+2s" dur="1s" 
			    fill="freeze" />
	    </path>
	    <rect x="260" y="10" height="320" width="100"
	          style="fill: #dd524b; fill-opacity: .6;" >
	    </rect>
	    <path d="M310,330 A70,85 0 1,0 550,330" style="stroke: #dd524b; stroke-opacity: .5; fill: transparent; stroke-width: 100; mask: url(#first-u-mask)" >
	    	<animate id="firstbreakthree" attributeName="d" attributeType="XML"
			    from="M310,330 A70,85 0 1,0 550,330"
			    to="M330,350 A70,85 0 1,0 570,350"
			    begin="0s; firstbreakfour.end+2s" dur="1s" fill="freeze" />
			<animate id="firstbreakfour" attributeName="d" attributeType="XML"
			    from="M330,350 A70,85 0 1,0 570,350"
			    to="M310,330 A70,85 0 1,0 550,330"
			    begin="firstbreakthree.end+2s" dur="1s" fill="freeze" />
	   	</path>
	    <rect x="500" y="10" height="320" width="100"
	          style="fill: #dd524b; fill-opacity: .5;" >
	    </rect>

	    <mask id="first-u-mask" x="0" y="0" height="2" width="2">
	    	<path d="M310,330 A70,85 0 1,0 550,330" style="stroke: #ffffff; stroke-width: 100;">
		    	<animate id="firstbreakfive" attributeName="d" attributeType="XML"
				    from="M310,330 A70,85 0 1,0 550,330"
				    to="M330,350 A70,85 0 1,0 570,350"
				    begin="0s; firstbreaksix.end+2s" dur="1s" fill="freeze" />
				<animate id="firstbreaksix" attributeName="d" attributeType="XML"
				    from="M330,350 A70,85 0 1,0 570,350"
				    to="M310,330 A70,85 0 1,0 550,330"
				    begin="firstbreakfive.end+2s" dur="1s" fill="freeze" />
	    	</path>
	    	<path d="M70,330 A70,85 0 1,0 310,330" style="stroke: #000000; stroke-width: 100;">
	    		<animate id="firstbreakseven" attributeName="d" attributeType="XML"
				    from="M70,330 A70,85 0 1,0 310,330"
				    to="M90,350 A70,85 0 1,0 330,350"
				    begin="0s; firstbreakeight.end+2s" dur="1s" fill="freeze" />
				<animate id="firstbreakeight" attributeName="d" attributeType="XML"
				    from="M90,350 A70,85 0 1,0 330,350"
				    to="M70,330 A70,85 0 1,0 310,330"
				    begin="firstbreakseven.end+2s" dur="1s" fill="freeze" />
	    	</path>
	    </mask>
	</svg>
</div>

<div class="example-block" data-target-anchor="rects-target" style="height: 400px;">
	<svg  xmlns="http://www.w3.org/2000/svg"
	  xmlns:xlink="http://www.w3.org/1999/xlink"
	  viewbox="0 0 600 600" style="width: 60%;">
	    <rect x="10" y="10" height="320" width="100"
	          style="fill: #dd524b;" />
	    <rect x="250" y="10" height="320" width="100"
	          style="fill: #dd524b;" />
	    <rect x="490" y="10" height="320" width="100"
	          style="fill: #dd524b;" />
	</svg>
</div>

<div class="example-block" data-target-anchor="paths-target" style="height: 400px;">
	<svg  xmlns="http://www.w3.org/2000/svg"
	  xmlns:xlink="http://www.w3.org/1999/xlink"
	  viewbox="0 0 600 600" style="width: 60%;">
	  	<rect x="10" y="10" height="320" width="100"
	          style="fill: #dd524b;" />
	    <path d="M60,330 A70,85 0 1,0 300,330" style="stroke: #dd524b; fill: transparent; stroke-width: 100;" />
	    <rect x="250" y="10" height="320" width="100"
	          style="fill: #dd524b;" />
	    <path d="M300,330 A70,85 0 1,0 540,330" style="stroke: #dd524b; fill: transparent; stroke-width: 100;" />
	    <rect x="490" y="10" height="320" width="100"
	          style="fill: #dd524b;" />
	</svg>
</div>

<div class="example-block" data-target-anchor="opacity-target" style="height: 400px;">
	<svg  xmlns="http://www.w3.org/2000/svg"
	  xmlns:xlink="http://www.w3.org/1999/xlink"
	  viewbox="0 0 600 600" style="width: 60%;">
	  	<rect x="10" y="10" height="320" width="100"
	          style="fill: #dd524b; fill-opacity: .5" />
	    <path d="M60,330 A70,85 0 1,0 300,330" style="stroke: #dd524b; fill: transparent; stroke-width: 100; stroke-opacity: .6" />
	    <rect x="250" y="10" height="320" width="100"
	          style="fill: #dd524b; fill-opacity: .6" />
	    <path d="M300,330 A70,85 0 1,0 540,330" style="stroke: #dd524b; fill: transparent; stroke-width: 100; stroke-opacity: .5" />
	    <rect x="490" y="10" height="320" width="100"
	          style="fill: #dd524b; fill-opacity: .5" />
	</svg>
</div>

<div class="example-block" data-target-anchor="mask-target" style="height: 400px;">
	<svg  xmlns="http://www.w3.org/2000/svg"
	  xmlns:xlink="http://www.w3.org/1999/xlink"
	  viewbox="0 0 600 600" style="width: 60%;">
	    <rect x="10" y="10" height="320" width="100"
	          style="fill: #dd524b; fill-opacity: .5;" />
	    <path d="M60,330 A70,85 0 1,0 300,330" style="stroke: #dd524b; stroke-opacity: .6; fill: transparent; stroke-width: 100;" />
	    <rect x="250" y="10" height="320" width="100"
	          style="fill: #dd524b; fill-opacity: .6;" />
	    <path d="M300,330 A70,85 0 1,0 540,330" style="stroke: #dd524b; stroke-opacity: .5; fill: transparent; stroke-width: 100; mask: url(#opacity-mask)" />
	    <rect x="490" y="10" height="320" width="100"
	          style="fill: #dd524b; fill-opacity: .5;" />
	    <mask id="opacity-mask" x="0" y="0" height="2" width="2">
	    	<path d="M300,330 A70,85 0 1,0 540,330" style="stroke: #ffffff; stroke-width: 100;" />
	    	<path d="M60,330 A70,85 0 1,0 300,330" style="stroke: #000000; stroke-width: 100;" />
	    </mask>
	</svg>
</div>

<div class="example-block" data-target-anchor="refactor-target" style="height: 400px;">
	<svg  xmlns="http://www.w3.org/2000/svg"
	  xmlns:xlink="http://www.w3.org/1999/xlink"
	  viewbox="0 0 600 600" style="width: 60%">
	  <path d="M50,50 L50,330 A70,85 0 1,0 300,330 L300,50" style="stroke: #dd524b; stroke-opacity: .6; fill: transparent; stroke-width: 100;" />
	  <path d="M550,50 L550,330 A70,85 0 0,1 300,330" style="stroke: #dd524b; stroke-opacity: .6; fill: transparent; stroke-width: 100; mask: url(#refactor-mask)" />
	  <path d="M300,50 L300,330 A70,85 0 0,1 50,330" style="stroke: #dd524b; stroke-opacity: .5; fill: transparent; stroke-width: 100;" />

	  <mask id="refactor-mask" x="0" y="0" height="2" width="2">
	    	<path d="M550,50 L550,330 A70,85 0 0,1 300,330" style="stroke: #ffffff; stroke-width: 100;" />
	    	<path d="M50,50 L50,330 A70,85 0 1,0 300,330 L300,50" style="stroke: #000000; stroke-width: 100;" />
	  </mask>
	</svg>
</div>

