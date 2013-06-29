

	var firstVisit = false;
	var guid = false;
	var loadTime = Date.now();

	function readCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return false;
	}

	function writeCookie(name, value) {
		var now = Date.now();
		var expires = new Date(now + (60 * 60 * 24 * 365));

		document.cookie = name+"="+value+";expires="+expires.toGMTString()+";path=/";
	}

	function randomString() {
		var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 50; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

	var Keen=Keen||{configure:function(e){this._cf=e},addEvent:function(e,t,n,i){this._eq=this._eq||[],this._eq.push([e,t,n,i])},setGlobalProperties:function(e){this._gp=e},onChartsReady:function(e){this._ocrq=this._ocrq||[],this._ocrq.push(e)}};(function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=("https:"==document.location.protocol?"https://":"http://")+"dc8na2hxrj29i.cloudfront.net/code/keen-2.1.0-min.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();

	// Configure the Keen object with your Project ID and (optional) access keys.
	Keen.configure({
	    projectId: "51cee1b7897a2c5a74000001",
	    writeKey: "1cf031f9560d9e59be38b22dd85739d6132766ea78dafb6803c4da904891adc8ff5c04b978b9ff89e369086db3faf331ee0ce68fe52b725006956e0ebd32be0d4e67166ed918734f109c1d55e72c6a9531fef19fafc3967ba260a081df4a3413b16de0333ae14e9a6e88773bbfc69a4f", // required for sending events
	    readKey: "d26495906529de8ee6f9ad9cdee37505b3eaf4d6f5b5c8c072eef9fc61db01011e7bff3a0ea98055239921986b15118480463aa1b2b6f89ef6328fa8ee84a43cb4927886657cdaab402dd36f0eca7a4a23761d5df3e50ac787803bd607272a719936261fa61b43458ec51de250fd8cf5"    // required for doing analysis
	});

	theKeen = Keen;
	function getGlobalProperties(eventCollection) {
		var props = {
			newVisitor: firstVisit,
			guid: guid,
			page: {
				path: document.location.pathname,
				href: document.location.href,
				host: document.location.host
			},
			referrer: document.referrer,
			sinceLoad: Date.now() - loadTime
		};

		return props;
	}

	Keen.setGlobalProperties(getGlobalProperties);

	$(document).ready(function() {

		guid = readCookie("keen_sess");

		if(!guid) {
			guid = randomString();
			writeCookie("keen_sess", guid);
			firstVisit = true;
		}

		Keen.addEvent("page_load", {
			time: Date.now()
		});

		if(document.location.pathname === "/") {
			bindHomepageEvents();
		} else if(document.location.pathname === "/blog/") {
			bindBlogIndexEvents();
		} else if(document.location.pathname.indexOf("/blog/") === 0) {
			bindPostEvents();
		}

		$(window).bind("beforeunload", function(e) {
			Keen.addEvent("leave", {
				scrollTop: $(window).scrollTop(),
				windowHeight: $(window).height() 
			});
		});

	});

	function bindHomepageEvents() {
		$("#scrollArrow").click(function(e) {
			Keen.addEvent("interaction", {
				action: "Scroll Arrow",
				meta: {
					scrollTop: $(window).scrollTop(),
					windowHeight: $(window).height()
				}
			});
		});

		$("li.blogpost").children("a").click(function(e) {
			return Keen.trackExternalLink(this, "interaction", {
				action: "Clicked Blog Link",
				meta: {
					index: $(this).parent().index(),
					path: $(this).attr('href')
				}
			});
		});

		$(".editor").click(function(e) {
			Keen.addEvent("interaction", {
				action: "Clicked on Editor",
				meta: {
					id: $(this).attr('id'),
				}
			});
		});

		$("#social").children("a").click(function(e) {
			return Keen.trackExternalLink(this, "interaction", {
				action: "Clicked Social Icon",
				meta: {
					network: $(this).attr('class')
				}
			})
		});
	}

	function bindBlogIndexEvents() {
		$("#logo").find("a").click(function(e) {
			return Keen.trackExternalLink(this, "interaction", {
				action: "Clicked Logo"
			});
		});

		$("#rss").find("a").click(function(e) {
			return Keen.trackExternalLink(this, "interaction", {
				action: "Clicked RSS"
			});
		});

		$("#list").find("a").click(function(e) {
			return Keen.trackExternalLink(this, "interaction", {
				action: "Cicked Blog Item",
				meta: {
					path: $(this).attr('href')
				}
			});
		})
	}

	function bindPostEvents() {
		var passedBottom = false;

		$("#logo").find("a").click(function(e) {
			return Keen.trackExternalLink(this, "interaction", {
				action: "Clicked Logo"
			});
		});

		$("#rss").find("a").click(function(e) {
			return Keen.trackExternalLink(this, "interaction", {
				action: "Clicked RSS"
			});
		});

		$("#index").find("a").click(function(e) {
			return Keen.trackExternalLink(this, "interaction", {
				action: "Clicked Index"
			});
		});

		$("#body").find("a").click(function(e) {
			return Keen.trackExternalLink(this, "link_out", {
				target: $(this).attr('href'),
				text: $(this).text()
			});
		});

		$("#socialColumn").children().hover(function(e) {
			Keen.addEvent("interaction", {
				action: "social_hover",
				meta: {
					network: $(this).attr('class')
				}
			});
		});

		$("#socialColumn").find("a").click(function(e) {
			return Keen.addEvent("interaction", {
				action: "social_click",
				meta: {
					network: $(this).parent().attr('class')
				}
			})
		});

		$(window).scroll(function() {
			if(!passedBottom) {
				console.log($("#body"), $("#body").offset());
				var blogBottom = $("#body").height() + $("#body").offset().top;
				var windowBottom = $(window).scrollTop() + $(window).height();

				if(blogBottom <= windowBottom) {
					Keen.addEvent("interaction", {
						action: "finished_blog"
					});

					passedBottom = true;
				}
			}


		});
	}
