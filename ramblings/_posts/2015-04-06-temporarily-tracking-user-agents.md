---
title: Temporarily Tracking User Agents
layout: rambling
---

In the name of transparency, I thought it would be a good idea for me to put a notice here. This post was written on the morning of April 6th, 2015 - the changes discussed here were published a few minutes before this post.

I was looking at some of my analytics today, and noticed that I have had an extreme increase in the number of UUID collisions. I generate a UUID for every new visitor to WegnerDesign. I pretty much only use this to track if people are new visitors or returning.

I (normally) do not store any user identifying information - to be specific, on a normal day my analytics **DO NOT** include things like user agent, IP address, window sizes, locations, etc. I do track referrals - that's probably the only user-identificable piece of info I track.

Anyways, in order to figure out the root of this duplicate UUID bug, I have temporarily started tracking user-agents. I know that this is somewhat of a privacy violation, and I apologize for that. As soon as I have some sort of confirmation about which browsers are causing the issue, I will turn the user-agent tracking off. My hope is that I can turn it off by the end of the day, but I have set a reminder to turn it off by the end of this week (April 10th, 2015). I will turn it off on Friday, regardless of if my questions are answered.

Also, once it's turned off, I will reach out to Keen (my analytics service) and see if I can either scrub user-agent info out of those events, or if I can just delete all of the events during that time period. I'm going to start working at Keen in a week anyways, so I'll probably have some pull on that subject :)

As always, you can see my analytics on the [WegnerDesign dashboard](http://www.wegnerdesign.com/dashboard). If you want to see exactly what I track, my Keen read keys will be in the source of that page.

Please reach out to me [on twitter](https://www.twitter.com/Joe_Wegner) if you're freaked out about this.
