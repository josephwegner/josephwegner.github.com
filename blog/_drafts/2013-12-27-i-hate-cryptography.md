--- 
title: "I Hate Cryptography"
layout: post
meta: 
 _edit_last: "1"
 dsq_thread_id: "ihatecryptography"
image: /images/blog_images/waltz_release.jpg
---
Cryptography is something that really interests me.  When I was working at [MySocialCloud](https://mysocialcloud.com/) I became somewhat of the go-to security guy - I don't have any formal training in security or crypto, but I do a lot of research because I find it very interesting. As I'm sure many of you can attest, our interests generally drive the things that we work on in our free time.  That means that much of my free time is spent working on security related projects, or at the very least I spend a lot of time thinking about the security of the things I'm building.

Most recently my side project has been [Waltz](https://getwaltz.com).  Waltz is a modern account manager that uses [Clef](https://getclef.com) to log in (or out) from any site.  Obviously, we had to think a lot about security as we were building Waltz.  We're following all the best practices that I (and the rest of the team) can think of, and are still [adding things](https://github.com/waltzio/cy/issues/15) to make Waltz more secure.

Here's the trouble, though: *I know we're doing it wrong*.  Not because we're ignoring any best practice, or intentionally doing something that's insecure, but because I know that the guys trying to break in are smarter than me.  Or, at least, a hell of a lot more determined than me.  This is a pretty well known fact in the security community - [**There's Always Someone Out There Smarter, More Knowledgeable, Or Better-Equipped Than you**](https://www.albion.com/security/intro-14.html).

I *know* there are security defficencies in Waltz, but I'm afraid to ask for help.  I'm afraid that if I open up Waltz to a public security review, Waltz will die a horrible flaming death, caused by the embaressement of my awful security practices.

I think it's usually pretty smart to [learn from the mistakes of others](https://www.goodreads.com/quotes/20393-learn-from-the-mistakes-of-others-you-can-t-live-long), so let's take a look at a company who faced the same problems recently: [Telegram](https://telegram.org).  Telegram is a messaging platform - like WhatsApp - that is built around security and privacy.  They talk a lot about their encryption and secure protocols, which should mean that it's impossible for anyone to listen in on your messages.

Telegram was founded by two brothers - [Pavel](https://en.wikipedia.org/wiki/Pavel_Durov) and [Nikolai Durov](https://en.wikipedia.org/wiki/Nikolai_Durov).  Nikolai runs the tech at Telegram, and justifies his position based on multiple PhD's in mathematics and his numerous contribution to the mathematics world.  Nikolai is in the [Mathematics Hall of Fame](https://www.imo-official.org/hall.aspx), has won multiple [ACM programming competitions](https://en.wikipedia.org/wiki/ACM_International_Collegiate_Programming_Contest), and has published [well-received Mathematics papers](https://arxiv.org/abs/0704.2030). I think of myself as well-equipped for security, but I don't even come close to this guy.

Regardless of his expertise and education, Nikolai still knew that there was likely an attacker out there that was smarter than him.  Nikolai and Pavel made the good decision to [open source](https://telegram.org/source) their entire system, and [thoroughly document](https://core.telegram.org/mtproto) the security protocols they were implementing. Certainly their hope was that by opening up the protocol, the security community would be able to review their decisions and provide necessary feedback to improve the system.  And then they would ride their unicorns off to Narnia to live happily ever after.

When Telegram announced their launch, the technology community erupted.  The [Hacker News](https://news.ycombinator.com/item?id=6913456) post stayed on the front page for quite awhile, and gathered 230 (mostly scathing) reviews. Everyone who had any understanding of security not only gave their two cents, but deemed Telegram as [snake oil](https://en.wikipedia.org/wiki/Snake_oil).  Here's some of the backlash that showed up on twitter:

<blockquote class="twitter-tweet" lang="en"><p>Telegram, AKA “Stand back, we have Math PhDs!” <a href="https://t.co/UI7oCzjdlq">https://t.co/UI7oCzjdlq</a> PhD not a substitute for knowing something about cryptography</p>&mdash; Justin Yost (@jtyost2) <a href="https://twitter.com/jtyost2/statuses/414225984477728768">December 21, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>upon further review of Telegram I&#39;ve found the cryptography behind it to be shoddy at best. don&#39;t use it. at least the UI is nice??</p>&mdash; Ευθύμιος (@evankaloudis) <a href="https://twitter.com/evankaloudis/statuses/415749840845295616">December 25, 2013</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p>Sigh. <a href="https://twitter.com/telegram">@telegram</a> could be the next big secure messenger, but their arrogance and crypto ignorance is holding them back. Don&#39;t use them yet.</p>&mdash; Josh Girvin (@girvo) <a href="https://twitter.com/girvo/statuses/414786820434432000">December 22, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I guess those unicorns never showed up.  Now, don't get me wrong - the whole point of Telegram opening up their crypto protocol was to get the community's feedback.  However, the backlash was entirely uncalled for.  Telegram is an open source project, is entirely free to everyone, and did everything in their power to get constructive feedback. The community responded as if Telegram was [regularly reading your messages](https://www.zdnet.com/is-microsoft-reading-your-skype-instant-messages-7000015388/).

The fallout has only gotten worse since the initial launch.  Telegram, noticing the incredible community backlash, opened up a [$200,000 contest](https://telegram.org/crypto_contest), challenging the community to read messages that they were sending. While there are [some flaws](https://thoughtcrime.org/blog/telegram-crypto-challenge/) in how they setup this contest, you can tell that Telegram spent some real development time setting it up, and the $200,000 reward is pretty steep for an open source project. A Russian security researcher did end up finding a vulnerability, and was [rewared with $100,000](https://telegram.org/blog/crowdsourcing-a-more-secure-future). The $200,000 contest still stays open, and Telegram has made it clear that they are dedicated to seeking out flaws in their system.

This is what scares the heck out of me.  The guys at Telegram are way smarter than me, have documented their system way better, have open sourced everything, have invested $300,000 to squash bugs in their protocol, and they're *still* getting crushed in negative PR. Truly, I can't think of one more thing that Telegram could do to show the security community that they're dedicated to getting security right.  If Telegram can't do it, I certainly can't do it with Waltz.

So I hate cryptography.  I'm incredibly interested in it, but every time I write it I sit in front of my laptop with a bit of fear lingering in the back of my head.  I *know* I'm messing things up, but I know that asking for help will nullify all of my work. How do I win?

Crypto community, you're doing this wrong. We have options in these situations - we can either tear apart projects with bad crypto, or we can show them what's wrong and and help fix it. Every time we choose the former, we force the next guy to start from scratch and probably make the same mistakes. That sounds a whole lot like the opposite of innovation. We have a supremely intelligent enemy, and we can only overcome that by working together to do security correctly.

