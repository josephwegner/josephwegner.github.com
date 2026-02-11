---
title: "Jasmine-Clog : Override console.log in Jasmine Test Suites"
date: 2012-11-16
tags:
  - "jasmine"
  - "New Projects"
  - "Plugins"
  - "Tools"
  - "unit tests"
---
I've recently started writing frontend test suites for <a title="MySocialCloud" href="https://mysocialcloud.com" target="_blank">MySocialCloud</a>.  We use <a title="Backbone.js" href="https://backbonejs.org/" target="_blank">Backbone.js</a> for pretty much all of our frontend work, which makes running test suites <a href="https://tomphilip.me/index.php/testing-backbone-with-jasmine-and-sinon/" target="_blank">very</a> <a href="https://tinnedfruit.com/2011/03/03/testing-backbone-apps-with-jasmine-sinon.html" target="_blank">interesting</a>.  I've settled on using <a title="Jasmine " href="https://pivotal.github.com/jasmine/" target="_blank">Jasmine</a> for the actual unit testing, and <a title="Sinon" href="https://sinonjs.org/" target="_blank">Sinon</a> to mock API interactions. It's actually a really cool setup, and Jasmine's <a title="Behavior Driven Development" href="https://en.wikipedia.org/wiki/Behavior-driven_development" target="_blank">BDD</a>-style testing makes a lot of sense for how we utilize Backbone.



Through the whole process, though, there's been one thing pestering me.  At MySocialCloud we do <strong>a lot</strong> of logging.  We lock it so that only users on the development team see the logs, but when they're turned on every page comes with 100s of lines of logs.  This is great for frontend development, but has proved very frustrating when writing test.  Pretty often in a test I need to send out a console.log about how far along the test suite is, or perhaps if a non-essential stub got called.  Mingling those in with 1000s of lines of other logs is essentially useless - if I can't see the data at first glance, then I mine as well not have it there.

To solve this, I've created a little jasmine plugin called <a href="https://github.com/josephwegner/jasmine-clog" target="_blank">jasmine-clog</a>.  Put simply, jasmine-clog overrides the regular console.log function, and adds a new logging function to the jasmine object.  The way that it does this makes sure that any logging that you've already got in your code doesn't throw errors, but it also won't show up in the console.  In order to actually get something to show up in the console, you have to call jasmine.clog().

There's more details on how to use it and how to set it up in the <a href="https://github.com/josephwegner/jasmine-clog" target="_blank">github repo</a>, but it's really pretty simple.  Just make sure you include jasmine-clog.js <strong>after</strong> your base jasmine file, and leave the rest of the work up to us.  jasmine.clog() away!
