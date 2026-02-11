---
title: "update benchmarking phantomjs against curl"
date: 2012-07-13
---
Yesterday I wrote a <a title="Benchmarking PhantomJS Against cURL" href="https://joewegner.com/blog/benchmarking-phantomjs-against-curl/">post</a> detailing some benchmarking results I got while comparing <a title="cURL" href="https://curl.haxx.se/">cURL</a> to<a title="PhantomJS" href="https://phantomjs.org/"> PhantomJS</a>.  The results were pretty good, considering the amount of extra processing that needs to be done, but were not quite good enough for me to use in production.  <a title="Ariya" href="https://ariya.ofilabs.com/">Ariya</a>, who is apparently the developer of PhantomJS, left me a note in the comments telling me that the results might be a little skewed because PhantomJS was loading images as well as javascript.  He was correct - loading images is actually a pretty crucial part of my specific use case, but I realize now that those results were misleading because I didn't describe that scope in the post.

So I've redone all the tests with the --load-images=no flag (<a title="Benchmark PhantomJS" href="https://gist.github.com/3087830">new gist</a>), and have gotten drastically different results.  My original intention was to just update the previous post with the new values, but they are so incredibly different that I think they deserve an entirely different post (and an update to the old one better describing the scope of the test).  The new results are below:


<h2>Gawker 10 Request Benchmark</h2>
<table border="1" cellpadding="2">
<tbody>
<tr>
<th>Trial #</th>
<th>PhantomJS Load Time (ms)</th>
<th>cURL Load Time (ms)</th>
</tr>
<tr>
<td>1</td>
<td>41446</td>
<td>2881</td>
</tr>
<tr>
<td>2</td>
<td>67852</td>
<td>38782</td>
</tr>
<tr>
<td>3</td>
<td>26975</td>
<td>2977</td>
</tr>
<tr>
<td>Average</td>
<td>22879.333</td>
<td>36537</td>
</tr>
</tbody>
</table>
<strong>On Average, every PhantomJS request took <em>0.626</em> times as long as a regular cURL request!</strong>
<h2>WegnerDesign 10 Request Benchmark</h2>
<table border="1" cellpadding="2">
<tbody>
<tr>
<th>Trial #</th>
<th>PhantomJS Load Time (ms)</th>
<th>cURL Load Time (ms)</th>
</tr>
<tr>
<td>1</td>
<td>15760</td>
<td>9061</td>
</tr>
<tr>
<td>2</td>
<td>15063</td>
<td>13812</td>
</tr>
<tr>
<td>3</td>
<td>16703</td>
<td>9939</td>
</tr>
<tr>
<td>Average</td>
<td>15842</td>
<td>10937.333</td>
</tr>
</tbody>
</table>
<strong>On Average, every PhantomJS request took <em>1.448</em> times longer than a regular cURL request</strong>
<h2>Google 10 Request Benchmark</h2>
<table border="1" cellpadding="2">
<tbody>
<tr>
<th>Trial #</th>
<th>PhantomJS Load Time (ms)</th>
<th>cURL Load Time (ms)</th>
</tr>
<tr>
<td>1</td>
<td>6948</td>
<td>2072</td>
</tr>
<tr>
<td>2</td>
<td>5092</td>
<td>2044</td>
</tr>
<tr>
<td>3</td>
<td>5108</td>
<td>2078</td>
</tr>
<tr>
<td>Average</td>
<td>5716</td>
<td>2064.666</td>
</tr>
</tbody>
</table>
<strong>On Average, every PhantomJS request took <em>2.768</em> times longer than a regular cURL request</strong>

As you can see, these results are incredible.  All of the PhantomJS averages dropped by at least half, and the first request - the one with all content loaded via AJAX - actually was <strong>faster than cURL</strong>.  Now that doesn't really make one bit of sense to me, and is probably a result of only having 3 trials, but regardless it proves that <em>PhantomJS is really freaking fast</em>.  If you're doing web scraping (and don't need images), I can't think of a single good reason why you wouldn't jump on the PhantomJS wagon.

One thing that I'm still confused about, though - and Arial, if you're reading this I'd love to hear from you in the comments - is that the tests (WegnerDesign, Google) that don't load any content via javascript still load significantly slower compared to the largely AJAX based Gawker test.  Logically it would make sense that low-javascript pages would perform better than high-javascript pages, but I haven't seen proof of that in either this set of tests or the previous.
