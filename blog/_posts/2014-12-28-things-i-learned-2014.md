---
title: "Tools I Love: 2014"
layout: post
meta:
 _edit_last: "1"
 dsq_thread_id: "toolsilove2014"
image: /images/blog_images/2014_tools.jpg
thanks: "Have you found any cool new tools in 2014? Drop me a note in the comments - I'm always looking for new ways to enhance my productivity!"
---

2014 has been an interesting year for me as a software engineer. Taking the job at [Belly](https://www.bellycard.com) has given me an opportunity to work in a way that I never have before. Unlike anywhere I've been, Belly puts a large focus on doing things the _right_ way - it's worth the extra time to write good code and write it efficiently. This has given me the opportunity to grow immensely in my skill as an engineer, but it has also given me the time to learn some new tools and introduce significant efficiencies into my day.

The tools I've picked up have been incredibly helpful, and not only do I want to document them for future reference, but I think other programmers could benefit from some of these. I've decided to do a year-review, talking about what tools I picked up. This is the first year, but hopefully this will become a tradition!

## iTerm/zsh

A few months ago I came across a blog post telling me how to [badassify my terminal and shell](https://jilles.me/badassify-your-terminal-and-shell/). I was still using OSX's built-in terminal at the time, and had been hearing about some of the crazy stuff that my coworkers do with their shells, so I thought I'd take a look.

Simply switching to [iTerm](https://iterm.sourceforge.net/) and [zsh](https://www.zsh.org/) wasn't that life-changing. When I first popped them open, it felt very similar to Terminal. However, iTerm and zsh put together open up a _ton_ of ways to easily customize your terminal, and it also just encouraged me to dig into those customizations.

![Terminal Customizations](/images/blog_images/term-screenshot.png)

1. The coloring and layout here is much better than Terminal's default. I use the oh-my-zsh [mh](https://github.com/robbyrussell/oh-my-zsh/wiki/themes#mh) theme, with some customized colors in iTerm. Choosing the colors wasn't much of a science - I just grabbed a very dark gray, and lightened up each of the text colors so there was enough contrast. Drop a comment below, and I can give you the exact colors.

2. ZSH has a built-in `git` plugin, and this is one of the coolest features. Paired with the mh theme, whenever I'm in a git repo, the branch name shows up on the right side of my terminal. The red asterisk even denotes if my working directory is dirty or not!

3. This is [z](https://github.com/rupa/z). Z is a huge time saver - essentially it sits around, diligently watching which directories I `cd` into most. As I navigate around my system, z builds shortcuts so that I can quickly go to common places. For instance, from anywhere on my system I can type `z bites`, and I will be automatically taken to `/Users/josephwegner/Code/web-bites/` (which is a project I work on often).

4. ZSH's tab completion is incredibly wonderful. If I type the beginning of any command and then hit `tab`, ZSH will output a list of commands that start with whatever I typed, as well as a description of what that command does. Then I can simply `tab` through the list, and choose what I want to run.

5. I built this one myself - I've always found it incredibly frustrating that default terminal tab names show the entire path to your current working directory. That path is usually _super_ long, and seeing it in my tab name is useless. Especially if I've got a ton of active tabs open, I'm more interested in just the top level folder name and if/what is running in that tab. This customization I made sets the tab name to the top level directory if no process is running, or the directory/current process when something is running.

Here's the code to do that, if you're curious. I just dropped it in my `~/.zshrc`.

```bash
# Prompt Command
DISABLE_AUTO_TITLE="true"
precmd () {
  echo -ne "\e]2;${PWD/${HOME}/\~}\a"
  echo -ne "\e]1;${PWD##*/}\a"
}
preexec() {
  echo -ne "\e]1;${PWD##*/}/${1[(wr)^(*=*|sudo|ssh|rake|-*)]:gs/%/%%}\a"
}
```

## Middleman

Middleman is a static site generator. I know, I know, there's about a million and a half static site generators out there right now, and they're all the best for whatever reason. I'm not going to try to tell you that Middleman is the best SSG you've ever seen, but I do think it's one of the most powerful. It gives you access to a full ruby app that you can use to configure things, fetch dynamic data, or manipulate things before they actually go into the view. You can use HAML or ERB for templates, as well as things like Coffeescript, SASS, etc.

I wrote [a post](https://tech.bellycard.com/blog/static-all-the-things/) about Middleman for Belly - that talks a lot about how we use Middleman, but we dove even deeper into the rabbit hole recently. Now we are actually pulling data from the API on every build, and have set up a scheduled build server that rebuilds and publishes new pages automatically. And all of that feels like an extremely fast site to the user.

Aside from the capabilities of Middleman, I really do enjoy it simply because of how easy it is to use. In the past, when I've needed to test something or work on some project that wasn't big enough to build a real app for it, I would throw it in a directory and get an apache server running. It's been so long since I've done real PHP development that getting my apache server running took _a lot_ of work, and added significant time to the boilerplate of a project. Now, with Middleman, I can simply throw an HTML file in the `source` directory, run `middleman`, and access my files at `localhost:4567`. It's way faster, and takes way less customization!

## Vim

I was a Vim man in a former life. Or, at least, I thought I was. When I was first getting into the startup development game, I used Vim religiously. However, I didn't really care much about the speed hacks that Vim allows. I used the arrow keys, and pretty much stayed in Insert mode all the time. Obviously, because Vim is slow if you use it wrong, I moved on to better editors like Sublime or Atom.

In the past 3 months I've moved back to Vim, and have done it with the requirement that whenever I find myself doing the same thing multiple times, I would learn the "right way" to do it quickly in Vim. It took a long time to get used to some of the basics, like navigating with `hjkl`, but trust me - put in the time, and you'll be glad you did.

Here's some of my favorite shortcuts that I've got in Vim right now:

1. When in Visual mode, hitting `ip` will select your current paragraph (newline-delimited block). Continuing to hit `ap` after that will select each successive paragraph. This is great if you need to indent or delete large sections of code.
2. Sometimes, if you're writing in a language that cares about indentation, it can be very difficult to tell if your blocks line up in Vim. It doesn't have the benefit of a column indicator like Sublime. To solve that problem, I created a shortcut to turn on column highlighting if I need it. It's a bit aggressive - it creates a thick white line around the current column, so I wouldn't want to leave it on full time. I've bound it so I can toggle it on by `^cc`. Here's the configuration to put in your `.vimrc` to accomplish that: `map <silent> <Leader>cc      :set   cursorcolumn!`
3. For as long as I can remember, I've always assumed that Vim required that you know exactly the path of the file you wanted to edit. If you hadn't memorized your folder structure, you would need to quit Vim, `ls` around, and find your file to open it. Turns out that isn't the case. [NERD Tree](https://github.com/scrooloose/nerdtree) is a Vim plugin that gives you a full file tree in a Vim split screen. Even better, the NERD Tree screen behaves just like a regular vim document, so you can search around in Find mode. I've mapped `^n` to toggle my NERD Tree open and closed, so that I don't always have to waste the screen real estate on viewing the tree.

## Slate

Shortly after starting my first "real" programming job, I took the plunge and got a Mac. I love macs now - I would never go back. However, the one big thing I always struggled with on the Mac, after coming from a Windows 7 machine, was managing my windows. Aero was a beautiful tool - it made it incredibly easy to make windows full screen, half screen (vertical or horizontal), etc. It was by far the best way I had ever seen for efficiently using screen real estate. OSX didn't have that, at least until I found Slate.

Now, a word of warning, Slate is nowhere near as user-friendly as Aero. Slate uses a somewhat confusing `.slate` configuration file, and all of the window management uses hotkeys - no actual dragging of windows. However, if you define good hot keys for how you work, and take the time to build up the muscle memory, you'll love it. 

Along with the common shortcuts (fill screen 1/2, half screen left/right, shrink/enlarge step), I've defined a few hotkeys that simply bring an app to the focus. I've defined these for the three apps I flip through most commonly during the day - iTerm, Chrome, and Slack. `Ctrl+1` focuses iTerm, `Ctrl+2` focuses Chrome, and `Ctrl+3` focuses Slack. Here's the configuration block for doing that:

```
# Focus Bindings
bind 1:ctrl  focus 'iTerm'
bind 2:ctrl  focus 'Google Chrome'
bind 3:ctrl  focus 'Slack'
```

## `.dres` Directory

This is definitely the newest pattern I've started on this list, and it's not something I've seen anywhere else. However, the moment I thought of it was an "Aha!" moment - I knew it was a great idea. Usage has proven that to be true.

Pretty much any project I do at work is collaboritive. Our creative team does designs, that platform team specs out the API, the project lead defines user flows, etc. These collaboritive pieces come to me in a variety of documents, and from a variety of sources. Creative resources generally live on Google Drive, API docs are in README's in the API repo, flows are emailed PDFs. Lot's of different places.

Historically, whenever I resumed working on a project, I would search around all of the different places that these files might live, download them if I can't find them, open and start working. Depending on the project, this could take a lot of time, especially if I couldn't remember where a resource was supposed to be.

And then it dawned on me - wouldn't it be awesome if I just had these resources in the same place as I kept the code? Obviously I don't want them committed into the repo, but that's what `.gitignore` is for! So now every project I start gets a `.dres` folder (short for developer resources). It's a hidden directory so people I pair with don't get confused by the weird folder, but I will always know that it's there ready for me to play with.

Downloaded resources get dropped in there (and cleared out after I finish a project). I try not to put copies of Google Drive resources in there, because they're usually large PSDs and are already taking up HDD space in the Google Drive folder. In that case, I just symlink the file so I can access it quickly without ever having to dig in to Google Drive.

I don't know of anyone else doing this, but seriously - it saves me a ton of time in the day.

## Kindle

I know this has very little to do with software engineering, but I had to put it in this list because it's had a huge impact on my life, and I was significantly surprised by how much I love it. I get about 1.5 hours every day of commute time, which is mostly on the train. It's dead time - time to spend on myself. In fact, I have a rule that I'm not allowed to work on the train - that's important because I need to unpack mentally before I get home.

My first few months of commuting I usually played a game or read a book on my phone/iPad. I never really thought about disliking reading on a phone screen. However, I had read a bit about the affects of blue light (which is a fancy word for the light coming out of your phone or tablet) on people's ability to focus. Kindles are cheap, so I took the plunge and bought one. I even got the one without the backlight - it was the perfect price for an experiment.

**I Love It!** Reading on the Kindle is relaxing - it's like reading a paper book. There's no distractions from other apps, and reading on it is just so much more pleasurable. It's hard to describe, but the harsh light from the phone screen forced my eyes to strain and squint. It was subtle, but my face was always a little bit tense when reading on that screen. The kindle doesn't do that - it's just flat ink, no different from a book. My eyes can relax and enjoy the perfect contrast of the Kindle.

## Runner Ups

There's a few things that didn't quite make the list. Maybe I used them last year, or maybe I started using them too recently to really say that I officially love them. Those are here.

### Dash
I've only been using [Dash](https://kapeli.com/dash) for about a week, but so far I love it. Dash let's you pull in the docs for a bunch of different things - CSS, Angular, the DOM, etc. - and crunch them into a single super-intuitive interface. I pull up dash using a hotkey (`Cmd+d`), and it opens in HUD mode. The search is so fast and smart that from the moment I think I _might_ want docs to the time I'm actually reading them is easily less than 5 seconds. It's the ultimate tool to quickly reach a lot of documentation without having to lose the context of what you are working on.

### Keen
I've been using [Keen](https://keen.io) for a long time - this definitely isn't a new love. However, in the past year I've started using Keen a bit differently than I have in the past. The new way of using Keen for analytics has given me a new view on what Analytics means, and better visibility into the metrics I care about.

- [Goodbye Google Analytics](https://joewegner.com/blog/goodbye-google-analytics/)
- [WegnerDesign Analytics Dashboard](https://joewegner.com/dashboard/)
- [Analytics in Chrome New Tab Page (Chrome Extension)](https://github.com/josephwegner/WegnerDesign-Chrome-Extension)

### Flux
Flux goes along the same lines of why I love my Kindle. Blue light is harsh, especially if you're working on your laptop in the evening. Some people don't struggle with it as much, but if I have my laptop open in bed, it can seriously cause me to take 2 extra hours to fall asleep. The few nights that I have to work in bed are so hard because I can't sleep once I'm done.

[Flux](https://justgetflux.com/) tints your laptop screen so that it matches what your eyes are expecting to see at different times of the day. As I transition into the evening, my screen gets progressively yellower - it makes the light coming from my screen feel warm, more like what you would expect out of a lamp. The yellow light doesn't require my eyes to strain nearly as much as the harsh blue light.