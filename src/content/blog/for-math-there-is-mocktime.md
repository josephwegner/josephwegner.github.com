---
title: "For Math, There is MockTime"
date: 2012-11-18
tags:
  - "New Projects"
  - "Tools"
---
*Tl;Dr: I built an app that helps you do math. [Take a look](https://www.mocktime.com).*



Every other Saturday morning I go out to breakfast with a group of guys from my church.  This week it was a small group - just me and two others.  Oddly enough, the three of us sitting at the table had a high aptitude for math.  I am a programmer, one of the guys is a math teacher, and the other is an accountant.  Our waitress was extremely diligent this morning about refilling our coffee - never letting our mugs get below half.  I noticed that one of my friends (the accountant) added a new creamer every time his coffee mug was refilled, even though it was only half empty.  I jokingly posed the question, wondering how many half-cup refills it would take for him to have more creamer than coffee in his mug.

Silly me.  Turns out when you put three math nerds at a table and ask questions like that, you end up not talking about much of anything.  We ended up bickering over what the limit was on the creamer - the math teacher and I argued that the creamer would come infinitely close to being half the cup, while the accountant argued that the creamer level woud stay relatively small, regardless of the number of refills.

I'm writing this blog post, though, not because of an interesting math problem, but because of an interesting problem we have with math.  Real-world math like this is just begging for us to make quick conclusions that may not necessarily be correct.  Although the above problem sounds simple, there's actually quite a few moving pieces.  So many, in fact, that both me and the math teacher were very wrong.  Our brains so quickly skip over the details in order to get to an answer quickly.  As I sat there, arguing about creamer, it dawned on me that there should be an easy way to write and visualize problems like this.  Thus, [MockTime](https://www.mocktime.com) was born.

There's not too much that's ground-breaking about MockTime, aside from the fact that it's super easy to use.  All it does is let you label some variables, write some pseudo equations to make them interact, and then see how each of the variables changes.  Chances are you could get this done somewhere else - WolframAlpha, Google Search, etc.  But here's the thing - I, a super nerd, don't even know the best way to do this.  I tried to sculpt the write wording in WolframAlpha, and as hard as I tried I couldn't find a good way to do it.  Hopefully MockTime will bring some ease to visualizing math problems both to the average nerd like me, and possibly to some teacher somewhere.

For those of you that are still reading, hoping for something nerdy, here's how I've got it running.  The backend design is done entirely in Node.js, and uses Express.js for the web server.  I'm not usually an Express fan, but the app is one HTML page with a bunch of static resources - I didn't feel like dealing with the pain of homebrewing a web server.  The frontend uses the awesome power of AngularJS to bind data all over the view so I don't have to write any update code.  It's a beautiful thing.  I'm hosting the site on Heroku, currently.  There's no database in the back - you have the ability to share MockTime solutions, but it's essentially just a really ugly URL with JSON GET parameters for filling in Angular's $scope.  I'll probably eventually setup a URL shortener to make things less ugly.

P.S. - if you want to view the MockTime solution for the coffee & creamer problem, here's the link: [https://wgnrd.es/RL79Qm](https://wgnrd.es/RL79Qm)
