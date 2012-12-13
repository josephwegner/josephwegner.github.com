---
name: node-multipost
repourl: "https://github.com/josephwegner/Multipost"
---
Node-multipost is an easy-to-use Node.js interface for sending multipart/form requests.  Multipart/form requests require a pretty wacky format, which is very hard to read and even harder to generate via code.  Node-multipost takes all the difficulty out of multipart requests.  

{% highlight javascript %}
var multipost = require("multipost");

var postFields = [
        {
            name: "field1", //Required
            value: "thisisfield1" //Required
        },
        {
            name: "field2",
            value: "thisisfield2"
        }
    ];

var req = new multipost("http://www.wegnerdesign.com/testFiles.php", postFields);

req.post(function(res) {
    console.log(res.data); 
});
{% endhighlight %}

