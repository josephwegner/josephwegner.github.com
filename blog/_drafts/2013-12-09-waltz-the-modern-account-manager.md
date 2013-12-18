--- 
title: "Waltz, the Modern Account Manager"
layout: post
meta: 
 _edit_last: "1"
 dsq_thread_id: "waltzthemodernaccountmanager"
image: /images/blog_images/waltz_release.jpg
---
It's no secret that passwords bug me. I've [written](/blog/passwords-part-1-how-they-get-hacked) [about](/blog/passwords-part-2-your-password-policy) [them](/blog/passwords-part-3-social-sign-on-is-the-future) a number of times - mostly about why they're terrible and why you shouldn't use them. Generally my advice in the past has been to find a good password manager that can store randomly generated passwords, but today I have some new advice. I, along with an excellent group of developers, have built [Waltz](http://getwaltz.com).

Waltz is a **modern account manager**. That may sound similar to other products you've heard of, like [LastPass](https://lastpass.com), [1Password](https://agilebits.com/onepassword), or [Wallet](http://www.acrylicapps.com/wallet), but let me be clear - it's way better. All of those old products provide a solution to the password problem. Unfortunately, passwords are just a symptom of an overall broken authentication system. Waltz has a broader scope, and tackles the authentication and account management situation head on.

At the base, Waltz is a password manager much like existing solutions. You give Waltz your credentials, which are then encrypted using unique externally-stored keys, and stored in your local browser stash. That's where the similarities end, though. Using those credentials, Waltz allows you to login with one click from any page - no more searching for login forms. Once you're logged in, Waltz provides a centralized logout service so that you can log out of all of your sites with the click of a button. Waltz handles all of the authentication behind the scenes, so you're provided a seamless browsing experience.

## Waltz, on Security

I mentioned earlier that Waltz encrypts credentials and stores them locally - this is where the real magic of Waltz lives. Most password managers require that you have a "master password" so that they can encrypt your credentials. Knowing the vulnerabilities that come with using passwords as a key, there was no way I would be going that direction with Waltz. Instead, Waltz relies on [Clef](https://getclef.com/) for accessing the credential decryption keys. I've [written about](/blog/please-disrupt-passwords) Clef's innovative technology in the past. Clef allows you to authenticate with websites and services using your mobile phone.

We've written a [key-value store](http://dba.stackexchange.com/questions/607/what-is-a-key-value-store-database), called [Cy](https://github.com/waltzio/cy), that uses Clef for authentication. When you first enter your credentials, Waltz will request a unique cipher key from Cy. Cy will ask you to authenticate with Clef, at which point it will generate the cipher key and pass it back to Waltz. Waltz uses that key to encrypt your credentials, and then dumps the cipher key out of memory. The cipher keys stored in Cy are again encrypted before they are stored, and can only be decrypted when you're authenticated with Clef. This strategy means that even if an attacker were to gain access to Cy, or your locally stored encrypted credentials, they wouldn't be able to access your plaintext credentials.

Additionally, for people that are still worried about the security of their credentials, [Cy is open source](https://github.com/waltzio/cy) and is easy to spin up on your own server. Waltz has a configuration option so you can easily use your own Cy server rather than the one provided by Waltz.

I'm very excited to be partnering with Clef on this project. Jesse, Brennen, and Mark are class-act guys, and their vision is even stronger. Since writing my original post about the merits of their idea, I've poked holes in their technology, their business plan, and their values both as a company and personally. Every time I've been assured that there's nothing but great intentions behind Clef. Clef has a noble - and in my opinion, very necessary - vision. It excites me to see that the Clef team does everything they can to realize that vision.

## Waltz, on Future

I've been using LastPass pretty religiously for about a year. As far as password managers go, it's a pretty great solution. As I was developing Waltz and watching it mature into a final product, I was beginning to worry that Waltz wouldn't provide much benefit over a well-built password manager. The team and I have been [dogfooding](http://en.wikipedia.org/wiki/Eating_your_own_dog_food) Waltz for the past couple weeks, and it is *so* much better. I never would have realized, but there is a significant amount of mental stress that goes into finding a login form, selecting the credentials, and convincing the form to actually submit. I hate to use silly product buzz words, but the whole thing just feels *elegant*.

While I'm really excited about how cool of a product Waltz is, I want to be very clear about one thing: Waltz isn't the future that I'm looking forward to. Waltz is a great product, and is fun to use, but in reality it's just a nice hack to expose the sort of technology that Clef is trying to push. Clef is really the future that I'm working towards with Waltz - I hope people try out Waltz, love it, and start begging sites to implement with Clef so they can get the real experience.

I think that the web on Clef is a lot easier for users, and a heck of a lot more secure. I'm not going to go too far into detail on why Clef is such an exceptional idea, but you can read my [previous post on Clef](/blog/please-disrupt-passwords) or just [try out Waltz](https://chrome.google.com/webstore/detail/waltz/obhibkfopclldmnoohabnbimocpgdine?utm_source=chrome-ntp-icon). I'm confident you'll *get it* the moment you install the extension.

## You, on Waltz

Before I close up this post, I want to point out that I can in no way take all the credit for building Waltz. When I first thought up the idea of Waltz, I reached out to Clef (mainly to secure their blessing) and was greeted with a huge amount of enthusiasm. [The guys at Clef](https://getclef.com/company) began talking up the idea to the people around them, and very quickly there was a team of people providing feedback, ideas, and development time to get Waltz finished. Clef even caught the vision enough to spend a significant amount of their time doing development and design work. Honestly, I'm not sure if I would have ever completed Waltz without all the help I've received - I pass on my sincere thanks and gratitude to everyone who has (and will!) contribute.

As far as contributing goes, Waltz is 100% open source. There's already a number of contributors, but, like any open source project, we're always looking for more hands. Obviously there's a great need for developers and designers, but we've also made it very easy for people to contribute site configs. Most of the information for site configs can easily be found by an average user, and if you get stuck anywhere we'd be happy to help out. Here's an [example site config](https://github.com/waltzio/waltz/blob/develop/site_configs/github.json), if you're interested.

