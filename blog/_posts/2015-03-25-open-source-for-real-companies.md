---
title: "Open Source for Real Companies"
layout: post
meta:
 _edit_last: "1"
 dsq_thread_id: "opensourceforrealcompanies"
image: /images/blog_images/bazaar.jpg
---

I'm reading [*The Cathedral and the Bazzar*](LINK HERE) right now, and just finished the section titled *Homesteading the Noosphere*. Eric Raymond talks at length in that essay about the economic model that drives open source. He compares the traditional exchange model that most private commercial companies use against what is called a "reputation-game gift" model.

As a quick overview, the exchange model is what we all know and understand quite well - both employers and employees have scarce resources, money and time/skill respectively. An employer exchanges their money with an employed programmer, in return for them to spend their time and expertise producing quality software.

The reputation-game gift model is wildly different - it operates under the assumption that money *is not* a scarce resource for the programmer. In this case, the programmer has either excess time or money, so they are not motivated by exchanging them - instead, argues Raymond, the programmer is motivated by reputation allocation. Raymond compares the open-source economic model to a similar model seen in remote tribal communities, where people will compete in their generocity - giving away massive amounts of their wealth in exchange for increased reputation among the tribe.

In an attempt to encourage all-out replacement of the exchange model with the reputation-game, Raymond closes his argument in *Homesteading the Noosphere* with this incredible quote:

> If you want the most efficient production, you must give up trying to *make* programmers produce. Handle their subsistence, give them their heads, and forget about deadlines.

## Engineering is not a scarce resource

This is a difficult pill to swallow. I've worked a lot of programming jobs thus far, and exactly zero of them have been at companies that encourage open-source development. Yeah, some of them owned open-source projects, but they were by no means priorities, and even then they were mostly just engineering-sponsored marketing campaigns instead of true OSS.

On the surface, that makes sense - in business, we have to deal with the real world. We have to make money. We have to supply our customers with a good product. We have to do all of those *really hard* things, and at the same time make sure we're doing them better than our competitors. Obviously, if we shared the code that powers our product with the world, our competitors would snatch it up and we would lose our edge. right? RIGHT?

Well, no - at least I don't think so.

The fact of the matter is that, in most cases, engineering is not a scarce resource. As I look back at the various projects I've worked on at all of my previous employers, I truly can't think of a single one that I think open sourcing would have given a competitor a significant advantage. In most cases, our competitors had internal projects that did very similar things and did them very similarly well. Sure, there were short periods after a new product launch in which we could look at our competitors and see that we out-maneuvered them - but before too long they would again release a similar product that worked similarly well.

The engineering battle between us and our competitors was short-lived; engineering wasn't a scarce resource. Engineering could not be the thing that decided the "winner", because it was simply too level of a playing field.

I think this holds true in a lot of places. In fact, I think if any of the following three things are true, then engineering isn't (necessarily) your competetive advantage:

- Your product - in a code sense - could probably be recreated by a reasonable amount of engineers in a reasonable amount of time
- The amount of capital required to actually get your product up and running is immense - big enough that if you handed your source code to a competitor, they could not reasonably come up with the capital to make use of it.
- Your target market is either so large or so segregated, that you and your competitor can coexist

I've already explained, from personal experience, why the first point is in that list, but I want to quickly dive in to the next two.

## Incredibly High Operational Cost

There's a handful of businesses out there that work on things that are so massively scaled that it's almost impossible to compete with them. These are the kinds of companies that, whenever I hear about what they are working on, my reaction is to blurt out "My job is so easy." [SpaceX](https://www.spacex.com/) is the big obvious one that comes to mind. Even if SpaceX were to completely open up their source, document it with incredible detail, and personally hold the hand of any developer who was interested, it would still be nearly impossible to compete with them.

<iframe src="https://vine.co/v/OjqeYWWpVWK/embed/simple" width="600" height="600" frameborder="0"></iframe><script src="https://platform.vine.co/static/scripts/embed.js"></script>

That's a video of SpaceX crash landing a [$61.2M](https://www.spacex.com/about/capabilities) Falcon 9 rocket. They considered that a success, because it will help them get the landing correct [in the future](https://twitter.com/elonmusk/status/553855109114101760). There's not many companies out there that have the capital available to run $61.2M trial-and-error sort of tests. SpaceX's advantage is in its money, not its engineering.

The really exciting thing about this category of business is that most of their engineering resources fall into the research category. They're spending all that money pushing the edges of our understanding. This is commonly the explanation of why the US has dumped so much money in to NASA - their research has benefited society in ways that dwarf the amount of money they have spent. Open-sourcing that research means that external parties can validate the data in parallel, and build on it in ways that may never have occurred to the actual researcher.

## Small Target Markets

When I added this point, I was specifically thinking about companies that are in the enterprise space or the consultancy space. I used to work for a small design shop. I was their only web developer, and I spent the vast majority of my time building and mantaining Wordpress sites for our clients. Wordpress sites are about as entry-level as you can get in engineering - obviously our competitive advantage was not my extreme prowess in Wordpress development. I may have tried hard to build clean, stable, scalable sites, but I definitely am not unique in that ability.

However, even with the low barrier to entry in our market, the agency I worked for made good money. We had fancy desks, and drank a shit ton of espresso. Life was good. We were successful because our target market was small, and very supportive of coexisting competition. Every client needed an insane amount of attention to be successful - we earned our wages with months upon months of time and energy making each customer happy.

I could have open sourced every single line of code I ever wrote at that company, and we never would have felt a financial impact. That's because our product wasn't what I could build - our product was the time and care that we promised to every client. Time doesn't scale, so regardless of competitive advantage we were pretty well guaranteed to find clients that needed someone to spend the time to guide them towards success.

## #Hustle #Execute

I touched on a very important point in that last section, and it really sums up what I'm trying to say. **Know Your Product**

If you fit in any of those three categories, then engineering probably isn't your product. Your product might be customer service. It might be an ability to execute things well on the business side. It might be great branding. Who knows, it might just be that you write really engaging tweets. I don't know your company, so I can't say exactly what it is, but your product is the thing that makes you better than your competitors.

## Engineering, but better

If you're still reading and engaged at this point, you're probably following my point about open-source not being the end of the world for real companies. Or, I guess, you might just be reading as fodder for a flame war in the comments, but I certainly hope not. Anyways, if we can agree that open-source isn't *bad*, then our next step is to figure out why it's *good*. What are the benefits of trusting me, and diving in to the open source world?

Eric Raymond, along with looking at a bunch of different open source projects that are active and awesome *right now*, has convinced me that open-source engineering creates better software. One of the primary reasons (and my favorite) for this, according to Raymond, is selfish actors.

In closed-source engineering, a product is guided by a single entity (your company). Your company has selfish motives as they guide the development of a project. They want to make money, and they want to do that in the most efficient and lucrative way possible. Sometimes the best thing for the project (ie: the best thing for your *users*) does not align with the most lucrative thing for the business. In the short term, it may seem beneficial to make these decisions, but in the long-term providng the best experience for your users will likely result in the most success. Suddenly, your product goals and your business goals don't align - guess who wins in the closed-source world.

Running your engineering as an open-source project vastly decreases the likelihood of business goals getting in the way of user-focued project enhancements. Open source projects attract a wide variety of contributors, all of which can be considered selfish actors. Every contributor has their own goals - be it business goals, or simply a desire to create a project they think is cool. The distribution of selfish actors with different goals will eventually balance out, and provide a consistent drive towards user happiness.

I know it sounds crazy, and I definitely can't make the argument that open-source is better for *every* business, but I do think open-source is both a viable and a beneficial option for a lot of companies. It's crazy, but maybe it's good crazy.

If you're living the dream and doing open-source in a commerical sense, please [reach out to me](mailto:joe@joewegner.com) - I'm becoming increasingly interested in the topic, and I'd love to hear your story. Same deal if you've got battle scars from this approach - I want to hear about it.

### Examples

Some of my readers had requested that I come up with some examples of companies that have proven the rules that I wrote about here. That seems fair, and the research is pretty fun as well.

- [Ghost](https://github.com/TryGhost), [Discourse](https://github.com/discourse). and [Reddit](https://github.com/reddit) all have fairly simple concepts, and have wonderful open-source communities.
- [NASA](https://github.com/nasa), [Android](https://github.com/android), and [Coinbase](https://github.com/coinbase) are all such capital-heavy projects that even with their source open, it's difficult for any competitors to gain an advantage
- [Wordpress](https://github.com/wordpress), [Docker](https://github.com/docker), and [SugarCRM](https://github.com/sugarcrm) all have wide enough target markets that they can afford for their competition to benefit from their source code.

On the opposite side of the spectrum, [Mailchimp](https://mailchimp.com/), [Google](Google)(search, specifically), and [iRobot](https://www.irobot.com/) are all companies that probably would not benefit from open sourcing their core products.