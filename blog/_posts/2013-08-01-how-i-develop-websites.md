--- 
published: true
title: "How I Develop Websites"
type: post
layout: post
meta: 
  _edit_last: "1"
  dsq_thread_id: "howidevelopwebsites"
status: published
tags: []

---

I've been doing web development for quite awhile now.  Maybe not relatively to the rest of web developers, but relative to my lifetime, it's been a long time.  I've learned a lot in this time; languages, processes, servers, hosts, best practices, hacks, and a lot of ways to break things.  I learn new things because the old ways suck.  I started writing in vanilla PHP.  I didn't like that, so I started using CodeIgniter, and then Zend.  I still didn't like that, so I decided to give up on PHP and use node.js.  I love it.  All this learning has been for the goal of building the best web development process ever.  I think I'm getting close.

<blockquote class="twitter-tweet"><p>I&#39;ve worked out a really solid process for building Node.js webapps with my <a href="https://twitter.com/search?q=%23SimpleAPI&amp;src=hash">#SimpleAPI</a> and <a href="https://twitter.com/search?q=%23AngularJS&amp;src=hash">#AngularJS</a>. Makes web dev awesome.</p>&mdash; Joe Wegner (@Joe_Wegner) <a href="https://twitter.com/Joe_Wegner/statuses/361976252069974016">July 29, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Now that I've figured out a process that really jives, I thought the rest of the world might be interested to hear about it.

# The Backend
## Node.js
I love [node.js](http://nodejs.org).  You've probably gathered that, based on the fact that 90% of my blog posts and [github repos](https://github.com/josephwegner) are node.js related.  I love it for a [lot](http://wegnerdesign.com/blog/why-node-js-speed) of [reasons](http://wegnerdesign.com/blog/why-node-js-security).  In short, I love javascript, and I love having full control over how my server functions.  I love how hands-on I can get with Node.js' non-blocking IO.  I love being able to write a webserver in 5 lines, and _understand every bit of it._  So, clearly, the backend of my process is in Node.js

## Simple API
At least in my experience, I've seen web development trending towards API-powered frontends.  This is a great thing, because it allows quick page loads, fast data interactions with the page, and more reasonable collaboration between backend and frontend developers.  The downside, however, is that APIs are **hard** to write.  There's a large amount of dependency for URLs to map to functions, and that just isn't an easy task in node.js.  To solve that problem, I wrote [Simple API](https://github.com/josephwegner/simple-api).

Simple API does all the legwork for parsing the URL and mapping it to functions.  All you have to do is provide a resource name, and decide what variables you might need from the URL.  I spent a lot of time thinking about what the easiest way to define URL structure would be, and I really think I've hit it with Simple API. It works really well, and has sped up my backend development significantly.  You can look at an [example controller](https://github.com/josephwegner/css3man/blob/master/api/v0/controllers/men.coffee) in Simple API, from my [CSS3 Man](http://www.css3man.com) project.
### A Word On Models
Any good API system will rely on the idea of Models and Controllers.  I've shown you above an example of a controller in Simple API, but unfortunately I can't give an example of a Simple API model.  I have a lot of different ideas about how models _should_ work with Simple API, but I haven't decided which route I want to take.  As you can see in [the README](https://github.com/josephwegner/simple-api/blob/master/README.md), I'm taking some time to feel out the different options and get some community feedback.  Currently I'm using [MongoDB](http://www.mongodb.org/) and [mongoosejs](http://mongoosejs.com/) for most of my models.  I'm leaning towards this solution, but it definitely has some downsides.  Here's [an example](https://github.com/josephwegner/css3man/blob/master/api/v0/models/men.coffee) of a model written in Simple API

## Static Files

One of my favorite things about node.js is that I don't have to write a server that will serve any file in any folder structure.  This brings along a host of [security benefits](http://wegnerdesign.com/blog/why-node-js-security), mostly related to blocking remote code execution.  On the other hand, it causes a lot of problems.  I certainly don't want to have to modify my server code every time I add an image asset, nor do I want to have to refactor if I decide I want to change my folder structure.  To solve this, I wrote a static file server/compiler.  I plan on formalizing the structure of this system and releasing it as a standalone node module, but for now you can [view the library on github](https://github.com/josephwegner/css3man/blob/master/lib/staticFiles.coffee).

The beauty of this system is twofold.  I define a `public` folder, and anything that's in that folder gets served.  Most of my projects have relatively low amounts of static assets, so I've built in a pretty aggressive caching strategy.  Essentially, the first time a file gets loaded the contents are stored into memory.  Every time they get loaded in the future, there are no I/O operations - just a simple cache lookup.  

The second upside is that it allows me to compile static resources on the server level, rather than in a build script or with a dev tool like Codekit.  Currently the static file system only supports [CoffeeScript](http://coffeescript.org/) compiling, but I'm planning on adding [SASS](http://sass-lang.com/) in the near future.  The way this works is that I have a separate `build` folder, that mimicks the structure of the `public` folder.  To avoid URL confusion, I've setup a map so that clients will actually request files from an `assets` folder.  When the `assets` folder is recognized, the static file system checks to see if the requested file exists in `public`, and if not it will look in `build` and compile it.  Again, the files are cached, so once it is built it is held in the cache for future use.

# The Frontend
## AngularJS
My love for [AngularJS](http://angularjs.org/) is similar to my love for node.js.  I've worked with a lot of different frontend frameworks - and many of them were nice - but when I started using Angular my world changed.  My brain works more like a backend engineer than a frontend engineer, and Angular allows me to think like that.  Instead of "marking up" an interface, I feel more like I'm "architecting" a system when I work in AngularJS.  I'm not going to build a list of all the upsides to AngularJS (read them yourself, on their website), but I will talk about the ways that I make it particularly awesome.

First off, I separate _everything_ into different files and folders.  If you look at [CSS3 Man](https://github.com/josephwegner/css3man/tree/master/public/js), you can see that I've got different folders for controllers and directives.  If CSS3 Man had been a bigger project, I would have had additional folders for services, filters, and models (which I will explain later).  Separating files is generally a good idea with any javascript framework, but it is especially useful in Angular when you're working with so many different types of modules.

The second piece - this is a newer addition, but is incredibly useful - is an API service I've written.  The service maps some common CRUD functions to simple model actions, so that you don't have to fight with AJAX and the $http service every time you need to get data.  Naturally, this requires you to write your backend API to conform to a specific format, but the format follows best practices.  The API service has a simplistic version of caching built in right now - data goes stale after 10 minutes - which will work for simple APIs, but can be easily overridden/removed/enhanced for more complex APIs.  Below is an example of how easy it is to use the API service:

#### The Model
{% highlight coffeescript %}
MyApp.run (api) ->
	api.registerModel 'deals', {}
{% endhighlight %}

#### The Controller
{% highlight coffeescript %}
$scope.getDeals = () ->
	deals = false

	api.deals.getAll (err, data) ->
		if err
			console.log err
			return false

		deals = data
{% endhighlight %}

Unfortunately I haven't had a chance to open source this API service yet.  That's mostly because I'm lazy, but partly because I haven't written all the CRUD functions yet - I'm writing them as I need them.  I guess that's also because I'm lazy.  Here's [a gist](https://gist.github.com/josephwegner/6131425) of the code, if you're interested.

## CoffeeScript
You probably noticed that my code examples were in [CoffeeScript](http://coffeescript.org/), instead of javascript.  You're right, and - honestly - there's a small part of me that's embaressed about that.  I take great pride in being a javascript purist; for a long time I've sworn that there was no way some system could compile my code in a more efficient way than I could write it by hand.  Truthfully, I still believe that a lot of the time.  However, one of my old coworkers sort of forced me to use CoffeeScript about a year ago - I agreed, but only under the condition that I would take a good hard look at the compiled code and make sure it didn't suck.  I was blown away - CoffeeScript was writing _very_ efficient code.  Since then I've significantly eased up on the "javascript purist" argument.  I still write pure javascript a lot (you'll notice that CSS3 Man doesn't use CoffeeScript), but my more advanced code will often be in CoffeeScript.  Mostly, I appreciate the simple iteration over arrays and objects - this is a common task in heavy javascript apps, and is so simple in CoffeeScript.


## SASS
Here's a fact: I'm not much of a CSS guy.  I have no design skills whatsoever, so most of my time spent in CSS is stressful.  I'm pretty certain I write bad CSS, and a lot of the time it doesn't work.  However, even accepting that I make crappy designs, there are some really annoying things about CSS.  Particularly, it's pretty easy to write some HTML that uses the class `deal`, write some CSS to mark it up, and realize you accidentally used that class in another HTML tree somewhere else.  I know, this means my HTML is a bit buggy, but I don't think anyone can claim that they don't commonly make this mistake.  The best practice in CSS to solve this is to write long nested CSS selectors (#wrapper #main-content #body #center ul.deals .deal).  If you're working with a lot of nested entities, this gets very tedious very quick.  SASS (I chose SASS because of that same coworker that forced me into CoffeeScript), uses a better nesting format so you only have to write things once.

As a note, I currently use [CodeKit](http://incident57.com/codekit/) to compile and minify my SASS into a single `style.css` file.  You can also use [LiveReload](http://livereload.com/), or a host of other compilation tools.

# The Hosting
This is sort of a minor section, but I am often wondering what people use for hosting, so I thought I'd include it.

## Heroku
For personal projects, I always use [Heroku](http://heroku.com/).  They have a wonderful dashboard, and an overwhelmingly large set of [addons](https://addons.heroku.com/) that you can add to your app.  The workflow on Heroku makes a lot of sense - just push a git repo - and that has merged well with my workflow in the past.  The biggest upside to Heroku - at least for me - is that they have a great free tier.  You get one free dyno per app.  This means all of my side projects go up on Heroku for free, forever.  The only downside is that low-traffic apps will suffer from [dyno idling](https://devcenter.heroku.com/articles/dynos#dyno-sleeping), but chances are your low-traffic apps don't really care about spinning up new dynos.

## MongoLab
As I mentioned before, I'm on a MongoDB kick right now.  Heroku has a few options for hosted Mongo databases, but I've landed on [MongoLab](https://mongolab.com).  Their interface has been the most manageable for me, and I've heard great reviews.  The biggest difference I've heard between MongoLab and their competitors is their support.  I haven't had to deal with support much, but I hear it's great.  I've also found that MongoLab is really transparent about what is going on in their system - if something is down, is getting upgraded, has a security hole, or anything, you get an email.  I don't usually care about the updates, but I do appreciate being in the loop.

## LogEntries
Heroku's logging system sucks.  It just does - straight up, 100%, terrible.  For some reason they think it's a good idea to toss all of the router's logs into your web app's logs, and this makes looking at any historical data near impossible.  They only store a few thousand lines of logs, so if there's been a few hours between a user reporting an error and you checking your email, chances are you can't find the logs anymore.  Because of that, I've moved to [LogEntries](https://logentries.com/).  LogEntries has a free tier that gives you 1GB of logs per month, and a week of historical data.  They also have a really great system for parsing your logs for any sort of event and sending you notifications based on their severity.  I'm still pretty fresh with LogEntries, but it's been a great experience so far.




Now that I've given you an overview of my process, I'm really interested to hear how you develop websites.  I've put a lot of research into my path, but I'm certain that there are improvements to be made.  Explain your process in the comments!