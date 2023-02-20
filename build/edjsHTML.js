!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).edjsHTML=e()}(this,(function(){"use strict";var t=["left","right","center","justify"],e={delimiter:function(){return"<hr />"},header:function(t){var e=t.data;return"<h".concat(e.level,">").concat(e.text,"</h").concat(e.level,">")},paragraph:function(e){var n=e.data,r=n.alignment||n.align;return void 0!==r&&t.includes(r)?'<p style="text-align:'.concat(r,';">').concat(n.text,"</p>"):"<p>".concat(n.text,"</p>")},list:function(t){var e=t.data,n="unordered"===e.style?"ul":"ol",r=function(t,e){var n=t.map((function(t){if(!t.content&&!t.items)return"<li>".concat(t,"</li>");var n="";return t.items&&(n=r(t.items,e)),t.content?"<li> ".concat(t.content," </li>")+n:void 0}));return"<".concat(e,">").concat(n.join(""),"</").concat(e,">")};return r(e.items,n)},nestedlist:function(t){var e=t.data,n="unordered"===e.style?"ul":"ol",r=function(t,e){var n=t.map((function(t){if(!t.content&&!t.items)return"<li>".concat(t,"</li>");var n="";return t.items&&(n=r(t.items,e)),t.content?"<li> ".concat(t.content," </li>")+n:void 0}));return"<".concat(e,">").concat(n.join(""),"</").concat(e,">")};return r(e.items,n)},image:function(t){var e=t.data,n=e.caption?e.caption:"Image";return'<img src="'.concat(e.file&&e.file.url?e.file.url:e.url,'" alt="').concat(n,'" />')},quote:function(t){var e=t.data;return"<blockquote>".concat(e.text,"</blockquote> - ").concat(e.caption)},code:function(t){var e=t.data;return"<pre><code>".concat(e.code,"</code></pre>")},embed:function(t){var e=t.data;switch(e.service){case"vimeo":return'<iframe src="'.concat(e.embed,'" height="').concat(e.height,'" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>');case"youtube":return'<iframe width="'.concat(e.width,'" height="').concat(e.height,'" src="').concat(e.embed,'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');case"twitter":return'<blockquote class="twitter-tweet" class="embed-twitter" width="'.concat(e.width,'" height="').concat(e.height,'"><a href="').concat(e.embed,'"></a></blockquote>');case"instagram":return'<blockquote class="instagram-media" width="'.concat(e.width,'" height="').concat(e.height,'"><a href="').concat(e.embed,'/captioned"></a></blockquote>');default:throw new Error("Only Youtube, Vimeo, Twitter, Instagram Embeds are supported right now.")}}};function n(t){return new Error('[31m The Parser function of type "'.concat(t,'" is not defined. \n\n  Define your custom parser functions as: [34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks [0m'))}var r=function(t){void 0===t&&(t={});var c=Object.assign({},e,t);return{parse:function(t){return t.blocks.map((function(t){return c[t.type]?c[t.type](t):n(t.type)}))},parseBlock:function(t){return c[t.type]?c[t.type](t):n(t.type)},parseStrict:function(t){var e=t.blocks,o=r(c).validate({blocks:e});if(o.length)throw new Error("Parser Functions missing for blocks: ".concat(o.toString()));for(var a=[],i=0;i<e.length;i++){if(!c[e[i].type])throw n(e[i].type);a.push(c[e[i].type](e[i]))}return a},validate:function(t){var e=t.blocks.map((function(t){return t.type})).filter((function(t,e,n){return n.indexOf(t)===e})),n=Object.keys(c);return e.filter((function(t){return!n.includes(t)}))}}};return r}));
