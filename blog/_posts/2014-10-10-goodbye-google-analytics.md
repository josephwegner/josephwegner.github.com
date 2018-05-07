---
title: "Goodbye, Google Analytics"
layout: post
meta:
 _edit_last: "1"
 dsq_thread_id: "goodbyegoogleanalytics"
image: /images/blog_images/analytics_dashboard.png
---

About a year ago I wrote [a blog post](https://joewegner.com/blog/analytics-is-a-privacy-decision/) about how choosing an analytis platform for your website is a very important privacy decision for your users. You can read the whole post if you want the intricate details, but the short version is that most analytics platforms track a ridiculously large amount of data. As developers, it's our responsibility to treat our user's privacy with care, and we should be careful not to track anything that we don't need. Especially if you're using third-party analytics like Google Analytics, you never know [who](https://pixabay.com/static/uploads/photo/2012/04/12/13/12/uncle-sam-29972_640.png) might get their hands on that data.

At the end of that post I put it on my to-do list to move WegnerDesign from Google Analytics to a custom analytics startup called [Keen](https://keen.io). Keen let's you send custom JSON blobs which then get treated as events. The wonderful thing about Keen is that you decide what data you want to send - exactly how much or how little. They've committed to not sell whatever data you do send them, as well, which is a hell of a lot more than any other analytics company can say.

Anyways, [a few weeks after](https://github.com/josephwegner/josephwegner.github.com/commit/644a948b97b21f7b2582eb5a12436544ce6cf148) writing that blog post I officially turned on Keen analytics for all of WegnerDesign. However, I did not turn off Google Analytics. To be honest, I was nervous - as much as I talked about not really caring about what screen size my user's had, I *did* care. I'm a nerd - I like data. It might not be useful *at all*, but knowing that I *could* find out what city all of my viwers live in seemed important. I also had years of history built up into Google Analytics - dropping GA would mean losing literally millions of invaluable data points.

And so I waited a year. And everytime I looked into my precious analytics and saw someone reading that blog post, I felt guilty. I knew that my reasons for keeping Google Analytics were *complete bullshit* - I just didn't have it in me to make the cut.

Well, [today I made the cut](https://github.com/josephwegner/josephwegner.github.com/commit/6fd1cf474c04bb68f6882905f79145c77b7aabfb). If you open up your dev tools right now (or view source, if that's your style), you will see that I am making exactly 0 requests to www.google-analytics.com. I'm making a few requests to Keen, but the beautiful thing about them is that you can see *exactly* what I'm sending. Check it yourself - it's really not much.

As I've wrestled with this over the past year, I kept coming up against this concept of transparency in data, and I think it's really powerful. After all, the data that I'm collecting isn't mine - it's yours. My readers. You give it to me (although not entirely willingly) as a gift - you certainly have a right to see what you're handing over to me. In the name of transparency, I've created [an analytics dashboard](https://joewegner.com/dashboard) for WegnerDesign, and have made it public. It's pretty sparse, but that's really because the data I'm collecting is sparse. There's a few more things I will probably add over time, but I've really tried to be intentional and only track the things I'm actually interested in seeing. Those things will all show up on the dashboard.

![WegnerDesign Analytics Dashboard](/images/blog_images/analytics_screenshot.png)

*also, if you want some proof that I'm not tracking things behind the scenes, my Keen read key will be in the javascript somewhere. You're more than welcome to poke around at the data. If you see something that bugs you, email me or [tweet at me](https://www.twitter.com/Joe_Wegner).*
