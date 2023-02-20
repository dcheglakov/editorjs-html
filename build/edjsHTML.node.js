"use strict";var t=["left","right","center","justify"],e={delimiter:function(){return"<hr />"},header:function(t){var e=t.data;return"<h".concat(e.level,">").concat(e.text,"</h").concat(e.level,">")},paragraph:function(e){var n=e.data,c=n.alignment||n.align;return void 0!==c&&t.includes(c)?'<p style="text-align:'.concat(c,';">').concat(n.text,"</p>"):"<p>".concat(n.text,"</p>")},list:function(t){var e=t.data,n="unordered"===e.style?"ul":"ol",c=function(t,e){var n=t.map((function(t){if(!t.content&&!t.items)return"<li>".concat(t,"</li>");var n="";return t.items&&(n=c(t.items,e)),t.content?"<li> ".concat(t.content," </li>")+n:void 0}));return"<".concat(e,">").concat(n.join(""),"</").concat(e,">")};return c(e.items,n)},nestedlist:function(t){var e=t.data,n="unordered"===e.style?"ul":"ol",c=function(t,e){var n=t.map((function(t){if(!t.content&&!t.items)return"<li>".concat(t,"</li>");var n="";return t.items&&(n=c(t.items,e)),t.content?"<li> ".concat(t.content," </li>")+n:void 0}));return"<".concat(e,">").concat(n.join(""),"</").concat(e,">")};return c(e.items,n)},image:function(t){var e=t.data,n=e.caption?e.caption:"Image";return'<img src="'.concat(e.file&&e.file.url?e.file.url:e.url,'" alt="').concat(n,'" />')},warning:function(t){var e=t.data;return'<div class="warning">\n      <h4>'.concat(e.title,"</h4>\n      <p>").concat(e.message,"</p>\n    </div>")},quote:function(t){var e=t.data;return"<figure><blockquote>".concat(e.text,"</blockquote>").concat(e.caption?"<figcaption>".concat(e.caption,"</figcaption>"):"","</figure>")},code:function(t){var e=t.data;return"<pre><code>".concat(e.code,"</code></pre>")},raw:function(t){var e=t.data;return e.html?e.html:""},embed:function(t){var e=t.data;switch(e.service){case"vimeo":return'<div class="'.concat(e.service,'-embed"><iframe src="').concat(e.embed,'" height="').concat(e.height,'" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>');case"youtube":return'<div class="'.concat(e.service,'-embed"><iframe width="').concat(e.width,'" height="').concat(e.height,'" src="').concat(e.embed,'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');case"twitter":return'<div class="'.concat(e.service,'-embed"><blockquote class="twitter-tweet" class="embed-twitter" width="').concat(e.width,'" height="').concat(e.height,'"><a href="').concat(e.embed,'"></a></blockquote></div>');case"instagram":return'<div class="'.concat(e.service,'-embed"><blockquote class="instagram-media" width="').concat(e.width,'" height="').concat(e.height,'"><a href="').concat(e.embed,'/captioned"></a></blockquote></div>');default:throw new Error("Only Youtube, Vimeo, Twitter, Instagram Embeds are supported right now.")}}};function n(t){return new Error('[31m The Parser function of type "'.concat(t,'" is not defined. \n\n  Define your custom parser functions as: [34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks [0m'))}var c=function(t){void 0===t&&(t={});var r=Object.assign({},e,t);return{parse:function(t){return t.blocks.map((function(t){return r[t.type]?r[t.type](t):n(t.type)}))},parseBlock:function(t){return r[t.type]?r[t.type](t):n(t.type)},parseStrict:function(t){var e=t.blocks,a=c(r).validate({blocks:e});if(a.length)throw new Error("Parser Functions missing for blocks: ".concat(a.toString()));for(var i=[],o=0;o<e.length;o++){if(!r[e[o].type])throw n(e[o].type);i.push(r[e[o].type](e[o]))}return i},validate:function(t){var e=t.blocks.map((function(t){return t.type})).filter((function(t,e,n){return n.indexOf(t)===e})),n=Object.keys(r);return e.filter((function(t){return!n.includes(t)}))}}};module.exports=c;
