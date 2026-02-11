---
title: "An Experiment In Mobile Controllers"
date: 2013-01-11
---
I had jury duty the other day.  What that translates to is I had a whole day of [forced free time](https://twitter.com/Joe_Wegner/status/288812290910859265).  I had decided it would be a good idea to treat this time as a hackathon, and was inspired by a [Google+ demo](https://odem.chromeexperiments.com/8mEis2) that allowed you to browse using gestures from your mobile phone.  The actual Google+ demo was pretty unexciting - it was very choppy, and not really an increase in usability at all.  But, cool nonetheless.



In all reality, using your mobile device as a controller for your desktop computer doesn't really have a place on the normal web - adding a new layer of abstraction isn't ever going to make things easier.  However, it does have an application in one place - gaming.  It's never been a secret that people prefer to control games with a controller rather than a mouse and keyboard.

So that's what I set out to do.  The end goal here is to create a library that people can use in the future, but for my forced hackathon I just wanted to create a proof of concept.  I didn't want to deal too heavily with designing a UI, so I chose the simplest game that might use a mobile controller - the keep-the-ball-on-the-tilty-thing game.

Check out [the demo](https://mobile-interactive.herokuapp.com/) - it'll make the rest of this post make sense.  **Make sure you're phone is on wifi.  There's a lot of websockets magic, which will likely suck up your available data.**  This will also probably only work on chrome, both on the desktop and on your mobile.  You can try other browsers, but I don't promise any success.

![Mobile Interactive Demo](/images/mobile-interactive-demo.png)

[HTML5 Rocks](https://www.html5rocks.com) has a great tutorial on the specifics of [working with orientation/movemenent data from a mobile phone](https://www.html5rocks.com/en/tutorials/device/orientation/).  That's not the exact challenge here, but I suggest you skim that article before you read this one.  The challenges here are more related to coordinating things between the devices with websockets, and that's what I'll be focusing on.

So, before I even get into the work of sending the orientation data back and forth, I need to make sure that the phone and the desktop are both synced up.  As you can see from the demo, I'm using a QR code to send the phone to a URL with a unique identifier.  The basic flow of this process is:

1. Desktop generates unique ID, and displays QR code
2. Desktop sends a registration event to the server via socket.io, which contains the unique ID.
3. Mobile phone scans QR code, which opens a page with the unique ID as a JS variable
4. Mobile phone sends a registration event to the server via socket.io, which contains the unique ID.
5. Server sends a notification to both the mobile phone and the desktop that pairing is complete, and they can start the game.

I'll show you the code in a second, I just wanted to mention one thing.  You're probably looking at that step 5 and thinking it is redundant to send a notification to the mobile phone, because the phone is what initiated the whole process on the server.  I originally didn't have that step, but was noticing that there's a certain amount of latency that happens between the server receiving the websocket request and the desktop receiving the request.  In that time, the mobile phone was generating a slew of data and sending it to the server, which then was getting backlogged with processing those and ended up with inconsistencies on the desktop's end.  OK, here's the code:

### On the desktop

  var baseUrl = document.location.protocol + "//" + document.location.host

  var allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var ranLength = 50;

  var uniqueId = "";

  for(var i=0; i<ranLength; i++) {
      uniqueId += allChars[Math.floor(Math.random() * allChars.length)];
  }

  $(document).ready(function() {
      $("#qr").qrcode(baseUrl + "/mobile/" + uniqueId);

      var socket = io.connect(baseUrl);

      socket.emit('desktop-register', {id: uniqueId});

      socket.on('mobile-on', function(data) {
          $("#content").slideDown(function() { $(window).trigger('content-ready'); });
      });
  });


### On the mobile phone

var baseUrl = document.location.protocol + "//" + document.location.host

$(document).ready(function() {
    var socket = io.connect(baseUrl);

    var uniqueId = $("body").attr('data-id');

    socket.emit('mobile-register', {id: uniqueId});

    socket.on('start', function(data) {
      //Start Game
    });
});


### On the server

var regUsers = {};

io.sockets.on('connection', function(socket) {
    var deskSocket;
    var mobileSocket

    socket.on('desktop-register', function(data) {
        regUsers[data.id] = deskSocket = socket;
    });


    socket.on('mobile-register', function(data) {
        mobileSocket = socket;

        if(typeof(regUsers[data.id]) !== "undefined") {
            deskSocket = regUsers[data.id];

            deskSocket.emit('mobile-on');
            mobileSocket.emit('start');
        }
    });
});


So as you can see I'm just storing an array of desktop clients with the unique ID as the key.  When the mobile client registers, I use the uniqueID to associate the mobile phone with the desktop client.  In a real-life example, I would also want to do the vice versa, and bring the mobile phone's socket into the desktop socket's scope, but for this POC I didn't need to.  Also, in a real-life example, I would need to do some garbage collecting when the socket.io connection is broken so that my regUsers array doesn't get infinitely large.

Now that we're all registered, we can start the fun part - passing the orientation data.  If you've read through that HTML5 Rocks article, you probably noticed that the orientation data comes through an event system.  Essentially, whenever the browser notices that the orienation of your device changes, it will trigger an orientation event.  Unless you've got your phone on a tripod (which is cheating.), the shake in your hands should cause the orientation event to be called pretty much as fast as javascript will allow.  Of course, we can't expect socket.io to be able to pass 100s of orientation events per second to the desktop client, so I wrote a wrapper that handles the event, and sends the data at a known interval (500ms).  That wrapper can be [found on github](https://github.com/josephwegner/mobile-interactive/blob/master/static/js/mobile-data.js), but here's how the implementation is done.


socket.on('start', function(data) {
    MobileReader.bindOrientation({
      callback: function(orientation) {
        socket.emit('mobile-orientation', orientation);
        $(".count").text(parseInt($(".count").text()) + 1);
      },
      interval: 500
    });
});


Now, 2 times every second, the mobile phone will check what the current orientation is, and send that off to socket.io to be passed to the desktop client.  The code on the server is simple:


socket.on('mobile-orientation', function(orientation) {
    if(typeof(deskSocket) !== "undefined" && deskSocket !== null) {
        deskSocket.emit('orientation', orientation);
    }
});


On the frontend, I did my best to abstract the game functionality from the socket.io work.  As I mentioned, my end goal here is to release a library that can be reused by other people, so I need those two parts to be separate.  In order to do that, I utilized jQuery's event passing system to get the data from socket.io, and then trigger an 'orientation-change' event.


socket.on('orientation', function(orientation) {
    $(window).trigger('orientation-change', orientation);
})


And that's that.  Orientation data should be passing just fine.  The last part is just the game mechanics, which are relatively simple and I won't get into here.  You can [see that code on Github](https://github.com/josephwegner/mobile-interactive/blob/master/static/js/game.js) as well.

So, after reading all that and playing with the demo, you're probably wondering why in the world I'm only sending orientation events every 500ms.  When that translates into the game, it becomes very jumpy, and you don't have very fine control.  I mentioned earlier that when the mobile phone sends events faster than the total transport+processing time (to server, server processing, to desktop), the desktop starts to get backlogged and behaves pretty weird.  500ms is a little bit slower than it needs to be to avoid that problem, but I figured people might be demoing this on 3G, which can be quite slow at times.  Any faster than 500ms, and I worry that the game will break.

The unfortunate conclusion of that is that unless I can find some way to speed things up, using your mobile phone as a desktop controller is not a viable solution for high-intensity games.  Transport speeds are simply too slow.  You could definitely turn your phone into a regular controller with a bunch of buttons, and that would probably function fine.  Only sending an event every time a user touches a button would be a very light load for socket.io.  Definitely doable, and if I get around to turning mobile-interactive into a reusable library, that will definitely be a feature.
