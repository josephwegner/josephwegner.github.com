$(document).ready(function() {
  $(document).on("keen_ready", function(e, KeenClient) {
    /* Define Metrics */
    var totalTrafficSeries = new Keen.Query("count_unique",  {
      event_collection: "page_load",
      targetProperty: "guid",
      interval: "daily",
      timeframe: "this_31_days"
    });

    var mostReadBlogs = new Keen.Query("count", {
      event_collection: "page_load",
      groupBy: "page.path",
      filters: [
        {
          "property_name": "page.path",
          "operator": "contains",
          "property_value": "/blog/"
        },
        {
          "property_name": "page.path",
          "operator": "ne",
          "property_value": "/blog/"
        }
      ],
      timeframe: "this_31_days"
    });

    var blogReadCount = new Keen.Query("count", {
      event_collection: "interaction",
      groupBy: "page.path",
      filters: [{
        "property_name": "action",
        "operator": "eq",
        "property_value": "finished_blog"
      }],
      timeframe: "this_31_days"
    });

    var visitorType = new Keen.Query("count", {
      event_collection: "page_load",
      groupBy: "newVisitor",
      timeframe: "this_31_days",
      filters: [{
        "property_name": "newVisitor",
        "operator": "exists",
        "property_value": true
      }]
    });

    var twitterHovers = new Keen.Query("count", {
      event_collection: "interaction",
      timeframe: "this_31_days",
      filters: [{
        property_name: "action",
        operator: "eq",
        property_value: "social_hover"
      }]
    });

    var twitterClicks = new Keen.Query("count", {
      event_collection: "interaction",
      timeframe: "this_31_days",
      filters: [{
        property_name: "action",
        operator: "eq",
        property_value: "social_click"
      }]
    });

    var totalBlogPostViews = new Keen.Query("count", {
      event_collection: "page_load",
      timeframe: "this_31_days",
      filters: [
        {
          "property_name": "page.path",
          "operator": "contains",
          "property_value": "/blog/"
        },
        {
          "property_name": "page_path",
          "operator": "ne",
          "property_value": "/blog/"
        } 
      ]
    });

    /* Request & Draw */

    var totalTrafficSeriesRequest = KeenClient.draw(totalTrafficSeries, $("#total-traffic-series").get(0), {
      chartType: "areachart",
      width: $(window).outerWidth(),
      height: 200,
      chartOptions: {
        enableInteractivity: true,
        backgroundColor: 'transparent',
        series: [
          { color: '#bd4233' }
        ],
        vAxis: {
          gridlines: { count: 0 }
        },
        chartArea: {
          left: 0,
          top: 0,
          width: '100%',
          height: 200
        }
      }
    });

    var popularBlogPosts = KeenClient.run([mostReadBlogs, blogReadCount], function(res) {
      blogPageviews = res[0].result;
      blogFinishes = res[1].result; 
   
      var mostReadBlogs = [] 
      while(blogFinishes.length && blogPageviews.length) {
        var currentFinish = blogFinishes.shift();

        for(var i=0,max=blogPageviews.length; i<max; i++) {
          // Find the matching pageview for this finish
          if(currentFinish["page.path"] === blogPageviews[i]["page.path"]) {
            var pageview = blogPageviews.splice(i,1)[0];
            i--;
            max--;

            // Don't even move on if we know this isn't a most read blog
            if(mostReadBlogs.length === 10 && mostReadBlogs[9].pageviews > pageview.result) {
              break;
            }

            var post = {
              page: currentFinish["page.path"].replace("/blog/", "").replace("/", ""),
              pageviews: pageview.result,
              finish_rate: currentFinish.result / pageview.result
            };

            // We could be iterating this manually, but for clarity lets just read it each time
            var blogPostsFound = mostReadBlogs.length;

            // Insert the post in the correct place of the mostReadBlogs list
            for(var j=0; j<10; j++) {
              if(j === blogPostsFound) {
                mostReadBlogs.push(post);
                break;   
              }

              if(post.pageviews > mostReadBlogs[j].pageviews) {
                mostReadBlogs.splice(j, 1, post);
                break; 
              }
            }
            break;
          }
        }
      }  

      var $popularBlogList = $("#popular-blog-list");
      for(var i=0; i<10; i++) {
        var post = mostReadBlogs[i];
        $popularBlogList.append("<li><span class='blog-path'>"+post.page+"</span><span class='finish-rate'>"+((post.finish_rate * 100).toFixed(2))+"%</span><div class='clearfix'></div></li>");
      }
    });

    KeenClient.draw(visitorType, $("#visitor-type").get(0), {
      charType: "piechart",
      title: "New Visitors",
      width: $("#visitor-type").width(),
      colors: ["#dd524b", "#92c5dd"],
      chartOptions: {
        titleTextStyle: {
          color: 'white'
        },
        enableInteractivity: true,
        backgroundColor: 'transparent',
        legend: "none",
        chartArea: {
          left: $("#visitor-type").get(0) * .125,
          top: $("#visitor-type").get(0) * .125,
          width: $("#visitor-type").get(0) * .75,
          height: $("#visitor-type").get(0) * .75
        }
      }
    });

    KeenClient.run([twitterHovers, twitterClicks, totalBlogPostViews], function(res) {
      hovers = res[0].result
      clicks = res[1].result
      views  = res[2].result

      hover_rate = hovers / views;
      click_rate = clicks / views;

      $("#twitter-clicks").css('background-size', ((click_rate * 100) * .9) + "%");
      $("#twitter-hovers").css('background-size', ((hover_rate * 100) * .9) + "%");

      $(".twitter-views-num").text(views+" Views");
      $(".twitter-hovers-num").text((hover_rate * 100).toFixed(2)+"% hover rate ("+hovers+")");
      $(".twitter-clicks-num").text((click_rate * 100).toFixed(2)+"% click rate ("+clicks+")");
    });
  });
});
