---
title: "why node js speed"
date: 2011-04-11
tags:
  - "fileDrop"
  - "Javascript"
  - "New Projects"
  - "Node.JS"
  - "Series"
  - "web server"
  - "WhyNodeJS"
---
I'm currently considering porting <a title="File Drop" href="https://joewegner.com/file-drop/">fileDrop</a> to a node.js web application.  I started reading about Node.JS about a month ago, and played it off as a pretty silly language, mostly useful for apps that required real-time updates.  I wasn't in the business of building anything of that sort, so I uninstalled it just about as fast I installed it originally.  For some reason, though, it popped back into my head last night and struck me as the perfect thing to build into fileDrop.  What seemed originally as a one-use server technology has now flourished in my head as a limitless framework for web apps and beyond.

I'll be writing a three part series on why exactly I'm considering this transition.  I'm pretty new to Node.JS so this series will be just as much a learning experience for me as it is for you.  With that in mind, I'd really like to hear some feedback in the comments.  Based on the amount of hype that node.js is generating in the web design world, I would imagine there are benefits that are beyond me, but I will be focusing on the three core principles that stand out to me- <strong>Speed</strong>, <strong>Security</strong>, and <strong>Portability</strong>.  The first of these is speed.

When you look at fileDrop today, it seems to be pretty fast.  Even on my relatively <del>slow</del> cheap server host, everything loads just as fast as you would expect a server to load.  AJAX requests are seemingly instantaneous, javascript runs beautifully, so it seems that there is no reason to change.  The worry, however, is how will fileDrop function when it is handling thousands of requests per day, or even per hour?  This may seem unlikely in my immediate use case, but it certainly is possible - and even a goal of mine - that fileDrop would be used in that sort of setting.

<strong>Server Connections</strong>

fileDrop does a lot of interaction with the server .  Whether it be dynamically loading in new content on the fileList, uploading large batches of files, or even just AJAXily handling login requests, there are a lot of pulls from the server that the normal user doesn't see.  Running on Apache, this is sort of a scary fact when we think about scalability.  Apache has a lot of logic built into it that has to process with each request, but the biggest bottleneck is how apache handles each unique connection.  Apache creates a new thread for every open connection; generally these threads are created and destroyed relatively quickly (the time it takes to be served a webpage) but uploading files creates a very unique - and potentially dangerous scenario.  Uploading large files can take several minutes, meaning that connection threads could stay open for 5 minutes or longer.  Multiply that by how many people could be uploading at one time, as well as the number of people that are somewhere else in the system being served some sort of dynamic content, and it would be very easy to reach your maximum connections.

A very beefy server running apache can usually be set to allow about 200 concurrent connections.  On a large-use installation of fileDrop, this is definitely a number that could be hit.  When you finally hit your max number of connections, your users will start being thrown into a queue - waiting for the person in front of them to finish up their request, and then they get served their page.  This is where Apache becomes painfully slow, and Node.JS becomes a beautiful solution.  Node.JS utilizes a completely different method of handling requests.  Node is informed by a service on the OS level that a new connection has arrived, and then stores that connection information in a small heap of memory.  At that point Node uses a callback function to process the request.  This is the key - Node.JS only uses a single thread for <em>all</em> code execution, regardless of the number of requests.  This allows Node.JS to spend more threads handling I/O - which takes significantly longer to process than code.

<strong>Google's V8 Javascript Engine</strong>

I suppose I should preface this section with the statement that I am a Google Lover.  Sometimes - and more often recently - that is a controversial statement, but I stand by the fact that Google provides some of the most well-built web tools out there, and strives to continue pushing the boundaries of the web-based world.  A perfect example of this is Google's V8 javascript engine, which is used in the Chrome Brower, famous for its speed. <a title="Javascript Performance Rundown" href="https://ejohn.org/blog/javascript-performance-rundown/"> John Resig illustrates</a> that, while Mozilla's TraceMonkey is similarly impressive in speed, V8 blows all older browsers out of the water, as well as most current browsers.

Google has completely reevaluated how javascript engines should work, and has provided tons of improvements.  The precise reasoning and explanation of how these changes make V8 awesome is enough to fill my blog quota for a month, so I'll just give an overview.  The most well known improvement in V8 is how it manages object properties, methods, and other linked data.  Javascript is known as a dynamic language, meaning that there are no classes, and anything other than the primitive types (Number, String, Boolean) is considered a generic Object.  For example, look at this code

<pre class="prettyprint lang-js">
function objectFunct() {
    this.randomProperty = "Hello, World!";
}
var myObject = new objectFunct();
alert(typeof myObject);  //Outputs "object"
</pre>

This means that every time you access an object in javascript, the engine has to look up the constructor of that object, check if it contains that method/parameter, and then continue with the code execution.  Prior to V8, most javascript engines used hash tables to quickly look up this information, but in large programs these hash tables take lots of time and precious resources to sort through.  V8 solves this problem by using a sort of 'hidden' class structure.  This is fundamentally different from any prior javascript engine, because classes do not exist in javascript.  Using this class structure allows V8 to quickly associate objects to the correct methods and properties.

This is just one of the many (many) reasons that V8 is significantly faster than any JS engine we've seen before.  Take a look at <a href="https://techon.nikkeibp.co.jp/article/HONSHI/20090106/163619/">this blog</a> for a complete, and extremely detailed, description of the changes in Javascript V8.  It's an extremely interesting article, and gets you pretty excited about how the engine works.  These extra speed increases from thread management and the V8 engine are certainly not the only benefits to Node.JS; there are tons more reasons why Node is ideal for a web app server, but they go beyond the scope of this blog (in other words, my understanding).

Come back soon to read about Node.JS's security benefits.
