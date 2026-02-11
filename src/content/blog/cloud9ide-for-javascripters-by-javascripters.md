---
title: "cloud9ide for javascripters by javascripters"
date: 2011-05-13
tags:
  - "Cloud9"
  - "IDE"
  - "Javascript"
  - "Node.JS"
  - "review"
  - "Tools"
  - "Websites"
---
For a long time I've been pretty proud to tell people that I do <em>all</em> of my programming from a terminal prompt - utilizing a vanilla vim install.  I've been proud to tell people this because of the shock and awe that I get to enjoy after saying that.  It's been the standard for a long time that web developer's use an IDE such as Netbeans, Kompozer, Dreamweaver (Yuk!), or others that are more feature-packed than vim.  I had stuck with a vim because none of those IDEs <em>actually work</em>.  The truth is, IDEs for web development are generally good for one thing - either they're great at PHP, or they're great with previewing your content, or they're great with source control, or whatever.  One thing that is <em>always</em> true, though, is that javascript is an afterthought in all of these IDEs.  Every interface I've tried has focused on the actual content development of the page, and only added javascript to stop people from getting pissed off.

This annoys me to such a great extent - it seems pretty clear to me that javascript is on the verge of becoming one of the most commonly used languages out there - yet no one has thought to build a good IDE!  Enter my friends at <a title="AJAX.OG" href="https://www.ajax.org/">Ajax.org</a>.  The group at Ajax.Org does a lot of javascript programming themselves, and instead of sitting and complaining like me, they've done something revolutionary about it.  Ajax.Org recently released the <a href="https://www.cloud9ide.com">beta version of their IDE, Cloud9IDE</a> - an editor primarily built for javascripters, but with a huge amount of openness that makes it great for any kind of developer.

While I could spend the rest of this article discussing the great features of Cloud9, I think it would be misleading if I didn't explain to you C9IDE's most peculiar feature.  C9IDE is 100% browser-based.  I know what you're thinking - "But the web simply isn't ready for this!  It must be painfully slow or incredibly under-featured".  Wrong and Wrong!  Actually, comparing C9IDE startup times against my previous favorite IDE <a title="PHPStorm" href="https://www.jetbrains.com/phpstorm/">PHPStorm</a>, it boots in almost half the time.  I can also say that, while developing, things in C9IDE respond equally as fast - if not faster - than PHPStorm.  Feature-wise, C9IDE is still in beta, so it doesn't have the largest feature set, but everything I look for in an IDE is there.  They've skipped the frill that other IDE's boast about, in favor of doing all the necessities <em>absolutely perfectly</em>.

<strong>Code Suggestions</strong>

<strong><a href="https://joewegner.com/wp-content/uploads/c9idesuggestions.jpg"><img class="alignnone size-full wp-image-164" title="c9idesuggestions" src="https://joewegner.com/wp-content/uploads/c9idesuggestions.jpg" alt="" width="460" height="218" /></a></strong>

Being pretty new to writing server-side javascript, one of the greatest features I've found in C9IDE is there code suggestions.  C9IDE not only does real-time error checking (and suggested fixes), but it also looks through your code for bad programming practices, risky coding methods, and little-known tips to speed up your javascript.  Suggestions are displayed on a roll-over warning icon, and are all written in ways that really make sense.  Unlike most IDEs, which display pretty generic error-code-like suggestions, C9IDE really makes everything understandable by the average programmer.

<strong>Node.JS Debugger</strong>

<strong><a href="https://joewegner.com/wp-content/uploads/c9idedebugger.jpg"><img class="alignnone size-full wp-image-165" title="c9idedebugger" src="https://joewegner.com/wp-content/uploads/c9idedebugger.jpg" alt="" width="290" height="208" /></a></strong>

Running javascript server-side with Node.JS often means that your only options for debugging is doing  a <strong>ton</strong> of console.log() debugging statements.  Actual errors in your code are pretty unreadable in Node.JS.  C9IDE has built into their IDE a Node.JS debugger, which greatly extends the error reporting native to Node.JS.  Most errors you receive while debugging in C9IDE will not only give you a better description of the error, but will also contain links to the line the error occurred on, and the line that called the function containing the error.

<strong>Git Integration</strong>

<strong><a href="https://joewegner.com/wp-content/uploads/c9idegit.jpg"><img class="alignnone size-full wp-image-166" title="c9idegit" src="https://joewegner.com/wp-content/uploads/c9idegit.jpg" alt="" width="680" height="87" /></a></strong>

One of Cloud9IDE's big pushes is to support git, and primarily github, from the very moment you access their page.  This ranges from being able to login using your github name, quick and easy git clones (image above), and an easy-to-use dashboard that lists and categorizes all of your repositories by host.  The developers at Ajax.org are currently working on a visual git interface, to make managing your repos even easier.  (As a note, many of these git features are not available if you host C9IDE locally.  Git is managed from their built in console if you are local.)

<strong>Much More</strong>

Not only have I done a great disservice by just skimming the current features of Cloud9, but there are tons more coming.  Ajax.org has provided an extremely easy-to-use extension system that makes adding functionality child's play for anyone that can write some javascript.  Even with the ease of their extension system, it is massively powerful - proof of this is that the majority of the IDE is actually <em>written in extensions</em>.  Take a look for yourself, and enjoy the awesome power of <a title="Cloud9IDE" href="https://www.cloud9ide.com">Cloud9IDE</a>!
