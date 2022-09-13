import{_ as s,o as a,c as n,a as p}from"./app.2f199172.js";const d=JSON.parse('{"title":"GQT Map Operator","description":"","frontmatter":{},"headers":[{"level":2,"title":"Example","slug":"example"}],"relativePath":"gqt-map-operator.md"}'),l={name:"gqt-map-operator.md"},e=p(`<h1 id="gqt-map-operator" tabindex="-1">GQT Map Operator <a class="header-anchor" href="#gqt-map-operator" aria-hidden="true">#</a></h1><p>The map operator <code>[... &lt;constraint&gt;]</code> applies a constraint to all items of an array.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-hidden="true">#</a></h2><div class="language-graphql"><button class="copy"></button><span class="lang">graphql</span><pre><code><span class="line"><span style="color:#89DDFF;">mutation</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    addNumbers(</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;"># Accept a maximum of 10 numbers and</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;"># require every number to be less than 100.</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#A6ACCD;">numbers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> len &lt; </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;"> &amp;&amp; [... &lt; </span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">    )</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>The template above will allow any of the following operations to <strong>pass</strong>:</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">mutation {</span></span>
<span class="line"><span style="color:#A6ACCD;">    # OK: 6 numbers, all numbers are less than 100</span></span>
<span class="line"><span style="color:#A6ACCD;">    addNumbers(numbers: [1, 2, 3, 4, 5, 6])</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>The following operations will be <strong>rejected</strong>:</p><div class="language-graphql"><button class="copy"></button><span class="lang">graphql</span><pre><code><span class="line"><span style="color:#89DDFF;">mutation</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    addNumbers(</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;"># ERR: constraint violation at index 4</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#A6ACCD;">numbers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">452</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">    )</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,8),o=[e];function t(r,c,C,i,A,y){return a(),n("div",null,o)}const m=s(l,[["render",t]]);export{d as __pageData,m as default};
