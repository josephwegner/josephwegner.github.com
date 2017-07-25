--- 
published: true
title: "Analytics Platform is a Privacy Decision"
type: post
layout: post
meta: 
  _edit_last: "1"
  dsq_thread_id: "analyticsplatformisaprivacydecision"
status: post
tags: []
image: /images/population.jpg
---

With [all of the PRISM news](https://twitter.com/Joe_Wegner/status/342841857723744256) flying around right now, I was putting some thought into how the average person might avoid having their entire lives digitally documented without their permission.  Turns out, it's pretty much impossible to both enjoy the internet and mantain your privacy.  The main problem - in my opinion - is web analytics.

Web Analytics platforms have access to *everything*.  If your site is using Google Analytics (which, it [probably is](https://w3techs.com/technologies/overview/traffic_analysis/all)), then Google is tracking your user's path from site to site.  They know the sites they've been to recently, where the user is located, the sort of technology they're using.  Now that they're forcing all Google users to have a Google+ account, they also have a load of personal information to relate that data with.  It's not just Google Analytics, either - all the big players are storing this sort of information.

Being a responsible web developer requires that I'm considering my user's interest.  No one would ever disagree with this.  This is a no-brainer when it comes to user-facing features and UX decisions.  Rarely, though, do we consider what the user is expecting in terms of privacy.  Although I know better, I certainly would like to expect that the sites that I browse to are not sending off my personal information to some third party.  I don't mind sites keeping analytics - of course they need to know what I'm reading and where I came from - but does where I live really affect how someone runs their blog?  Does the site that's teaching me [to make sourdough](https://sourdough.com/) really need to know that I'm running Chrome on OS X with a 13" screen?

No.  They don't.  Especially given the fact that the data they store is both hackable and retrievable by the government, I expect my privacy to be treated with the utmost respect.  The tricky part about this for web developers is that we need *some* analytics, but it's hard to get good analytics without tracking too much.  Google Analytics will do [IP Anonymization](https://support.google.com/analytics/answer/2763052?hl=en) if you tell it to, but do you really trust them not to store any log?  Even with that anonymization, there's a ton of unnecessary personal information that's being sent - and GA is the only service I can find that supports anonymization.

It's a hard question to answer, but just becomes something is hard doesn't mean we can ignore it.  Not when it's something this important.  It is our *responsibility* as developers to keep our user's privacy at top priority.

This blog post isn't supposed to be an advertisement as much as it is a reminder to be responsible developers, but there is one service I would suggest.  We've been using [Keen.io](https://keen.io/) at work for mobile analytics, and it dawned on me this evening that Keen is the perfect solution for getting good analytics while respecting my user's privacy.  Keen tracks *as much, and exactly* what you want.  They're event-based like Mixpanel, but they don't track anything that the developer doesn't specifically send them.  There may be competitors out there that give you similar fine-grained control, but Keen certainly fits the bill for me.  It's officially on my to-do list to move WegnerDesign off of GA and onto Keen.