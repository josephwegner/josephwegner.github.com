---
published: true
title: "Please Disrupt Passwords"
type: post
layout: post
meta:
  _edit_last: "1"
  dsq_thread_id: "pleasedisruptpasswords"
status: post
tags: []
image: /images/lock.jpg
---

I came into contact the other day with a new startup called [GetClef](https://getclef.com).  The essential idea behind GetClef is that they allow you to login to sites by scanning a QR code with your phone.  No passwords - just a PIN on your phone and a (built-in) QR code scanner.  I had had a similar idea when I worked at MySocialCloud, so in my interest I got in contact with their CPO and talked a little bit about their tech.  My original assumption was that GetClef was ultimately a password manager that sent your passwords along after you auth'd with a QR Code. I was wrong - they're getting rid of passwords altogether.

<!--more-->

As soon as I realized this, I had to take a moment to sit back and realize the implications of that.  I spend [a lot of time](joewegner.com/blog/passwords-part-1-how-they-get-hacked) thinking about password security, and usually for me that means [strong random passwords](joewegner.com/blog/passwords-part-2-your-password-policy/).  It had never dawned on me that completely replacing passwords was a real possibility.

When you think about it, though, replacing passwords is essential.  Today, an 8-character alphanumeric+symbols password can be cracked in [57 days](https://howsecureismypassword.net).  Stronger passwords increase that time exponentially, but that's today.  [Moore's Law](https://en.wikipedia.org/wiki/Moore's_law) says that processor speeds double every two years.  That means that every two years your passwords can be cracked in half the time.

Often times when I think about these "impending technology doom" problems, I wave it off on the basis that - similar to how processors evolve exponentially - technology evolves rapidly.  It would be easy to ignore the impending doom of passwords with that justification, but *it's just not true.*  [SHA-2](https://en.wikipedia.org/wiki/SHA-2), which is one of the better options for hashing passwords, was released *in 2001*.  That's 12 years ago!  That's not to say that a new encryption method couldn't be released any day, but the fact is that cracking mechanisms are becoming more efficient faster than encryption mechanisms can be released.

This isn't maintainable.  As a whole, the technology community is relying on passwords.  That's fine now, but I'm really not sure how comfortable I am thinking about logging into my bank ten years from now with a password.  It's a problem that absolutely needs to be solved - and [GetClef](https://getclef.com) may be the answer - but please, for the love of tech, disrupt the password market.

*Disclaimer:  I spoke with the GetClef CPO about their security practices.  There are a few vulnerability points that I can see, but they are minor.  As a whole, I'd say that using GetClef is similarly secure as using passwords. Give them a few months, though, and I expect they will close those holes.*
