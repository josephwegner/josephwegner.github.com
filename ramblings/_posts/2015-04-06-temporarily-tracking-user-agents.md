---
title: Temporarily Tracking User Agents
layout: rambling
---

<div class="alert alert-info">A couple hours of data turned out to be enough. It turns out all of the duplicate UUIDs were coming from Googlebots. It would appear that Googlebots all use the same seed for javascript's Math.random() function, which resulted in duplicate UUIDs. I have turned off user-agent tracking, filtered out Googlebot from my analytics, and scrubbed the data with Keen's <a href="https://keen.io/docs/maintenance/">handy maintenance APIs</a>.</div>

In the name of transparency, I thought it would be a good idea for me to put a notice here. This post was written on the morning of April 6th, 2015 - the changes discussed here were published a few minutes before this post.

I was looking at some of my analytics today, and noticed that I have had an extreme increase in the number of UUID collisions. I generate a UUID for every new visitor to WegnerDesign. I pretty much only use this to track if people are new visitors or returning.

I (normally) do not store any user identifying information - to be specific, on a normal day my analytics **DO NOT** include things like user agent, IP address, window sizes, locations, etc. I do track referrals - that's probably the only user-identificable piece of info I track.

Anyways, in order to figure out the root of this duplicate UUID bug, I have temporarily started tracking user-agents. I know that this is somewhat of a privacy violation, and I apologize for that. As soon as I have some sort of confirmation about which browsers are causing the issue, I will turn the user-agent tracking off. My hope is that I can turn it off by the end of the day, but I have set a reminder to turn it off by the end of this week (April 10th, 2015). I will turn it off on Friday, regardless of if my questions are answered.

Also, once it's turned off, I will reach out to Keen (my analytics service) and see if I can either scrub user-agent info out of those events, or if I can just delete all of the events during that time period. I'm going to start working at Keen in a week anyways, so I'll probably have some pull on that subject :)

As always, you can see my analytics on the [WegnerDesign dashboard](https://www.wegnerdesign.com/dashboard). If you want to see exactly what I track, my Keen read keys will be in the source of that page.

Please reach out to me [on twitter](https://www.twitter.com/Joe_Wegner) if you're freaked out about this.

<div class="alert alert-info">If you want to follow along, you can see users that have the duplicate UUID and their user-agent tracked, with this <a href="https://api.keen.io/3.0/projects/51cee1b7897a2c5a74000001/queries/extraction?api_key=d26495906529de8ee6f9ad9cdee37505b3eaf4d6f5b5c8c072eef9fc61db01011e7bff3a0ea98055239921986b15118480463aa1b2b6f89ef6328fa8ee84a43cb4927886657cdaab402dd36f0eca7a4a23761d5df3e50ac787803bd607272a719936261fa61b43458ec51de250fd8cf5&event_collection=page_load&analysis_type=extraction&timezone=UTC&filters=%5B%7B%22property_name%22%3A%22guid%22%2C%22operator%22%3A%22eq%22%2C%22property_value%22%3A%22VSQInE5gNUwPSnter8gg2kdJ71yboe04qwgVbWspvUmfDv9e4G%22%2C%22coercion_type%22%3A%22String%22%7D%2C%7B%22property_name%22%3A%22newVisitor%22%2C%22operator%22%3A%22eq%22%2C%22property_value%22%3Atrue%2C%22coercion_type%22%3A%22Boolean%22%7D%2C%7B%22property_name%22%3A%22parsed_user_agent.browser.family%22%2C%22operator%22%3A%22exists%22%2C%22property_value%22%3Atrue%2C%22coercion_type%22%3A%22Boolean%22%7D%5D">Keen API URL</a>.</div>
