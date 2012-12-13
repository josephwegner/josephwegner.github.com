---
name: node-session
repourl: "https://github.com/josephwegner/node-session"
---
I'm a pretty big believer that less is more when it comes to web servers - that's why I started using Node.js in the first place! So, while there's plenty of great Node.js web servers out there, I would (almost) always recommend starting from scratch, and adding features as you need them. That's why I built node-session - it's a great tool for the barebones Node.js web server, which will allow you to store user sessions. And the code is simple, to boot!

    var session = require('./node-session.js');
    
    //Start your http server however you like. Imagine the code below is inside of your server loop
    
    var yourSession = session.start(response, request); //response and request are the res/req variables passed from http.createServer()
    
    yourSession.testValue = "A session variable" //Create a session variable called testValue

That's it!  And at just 3KB for the entire repository, node-session is the perfect no-bloat solution for your Node.js web server!