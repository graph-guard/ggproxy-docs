import{_ as s,o as n,c as a,a as l}from"./app.0e9444ca.js";const F=JSON.parse('{"title":"GQT Variables","description":"","frontmatter":{},"headers":[{"level":2,"title":"Example","slug":"example"}],"relativePath":"gqt-variables.md"}'),p={name:"gqt-variables.md"},o=l(`<h1 id="gqt-variables" tabindex="-1">GQT Variables <a class="header-anchor" href="#gqt-variables" aria-hidden="true">#</a></h1><p>GQT allows you to associate individual input object fields and input parameters with variable names using the <code>&lt;parameter&gt;/&lt;obj_field&gt; = $variableName</code> syntax to allow for dynamic constraint checking.</p><p>GQT Variables should not be confused with GraphQL variables! Variables are scoped within one template and must be unique across the template.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-hidden="true">#</a></h2><p>To limit the amount of nodes a client can ask for in 1 request to <code>100</code> we can assign variable names to the <code>limit</code> parameters and refer to their dynamic runtime values in constraint expressions.</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">query {</span></span>
<span class="line"><span style="color:#A6ACCD;">    # Limit the total number of requestable nodes</span></span>
<span class="line"><span style="color:#A6ACCD;">    # to 100 (99 + the user node) with a maximum query depth of 3.</span></span>
<span class="line"><span style="color:#A6ACCD;">    user(id: *) (</span></span>
<span class="line"><span style="color:#A6ACCD;">        name</span></span>
<span class="line"><span style="color:#A6ACCD;">        friends(limit=$L1: &lt;= 99) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            name</span></span>
<span class="line"><span style="color:#A6ACCD;">            friends(limit=$L2: &lt;= 99 / $L1) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                name</span></span>
<span class="line"><span style="color:#A6ACCD;">                friends(limit: &lt;= 99 / $L1 / $L2) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    name</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    )</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>The template above will allow any of the following operations to <strong>pass</strong>:</p><div class="language-graphql"><button class="copy"></button><span class="lang">graphql</span><pre><code><span class="line"><span style="color:#89DDFF;">query</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    user(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">alice</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;"># OK: 100 nodes requested.</span></span>
<span class="line"><span style="color:#A6ACCD;">        friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">99</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            name</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-graphql"><button class="copy"></button><span class="lang">graphql</span><pre><code><span class="line"><span style="color:#89DDFF;">query</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    user(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">alice</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">33</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            name</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;"># OK: 3 * 33 = 99 nodes requested</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;"># which doesn&#39;t exceed the limit of 99.</span></span>
<span class="line"><span style="color:#A6ACCD;">            friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                name</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-graphql"><button class="copy"></button><span class="lang">graphql</span><pre><code><span class="line"><span style="color:#89DDFF;">query</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    user(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">alice</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;"># OK: 3*3*3=27 nodes at maximum allowed depth.</span></span>
<span class="line"><span style="color:#A6ACCD;">        friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            name</span></span>
<span class="line"><span style="color:#A6ACCD;">            friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                name</span></span>
<span class="line"><span style="color:#A6ACCD;">                friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                    name</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>The following operations will be <strong>rejected</strong>:</p><div class="language-graphql"><button class="copy"></button><span class="lang">graphql</span><pre><code><span class="line"><span style="color:#89DDFF;">query</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    user(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">alice</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">33</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            name</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;"># ERR: 10 * 33 = 330 nodes</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;"># which exceeds the limit of 99.</span></span>
<span class="line"><span style="color:#A6ACCD;">            friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                name</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-graphql"><button class="copy"></button><span class="lang">graphql</span><pre><code><span class="line"><span style="color:#89DDFF;">query</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    user(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">alice</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            name</span></span>
<span class="line"><span style="color:#A6ACCD;">            friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                name</span></span>
<span class="line"><span style="color:#89DDFF;">                </span><span style="color:#676E95;"># ERR: 2 * 2 * 100 = 400 nodes requested</span></span>
<span class="line"><span style="color:#89DDFF;">                </span><span style="color:#676E95;"># which exceeds the limit of 99.</span></span>
<span class="line"><span style="color:#A6ACCD;">                friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                    name</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-graphql"><button class="copy"></button><span class="lang">graphql</span><pre><code><span class="line"><span style="color:#89DDFF;">query</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    user(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">alice</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            name</span></span>
<span class="line"><span style="color:#A6ACCD;">            friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                name</span></span>
<span class="line"><span style="color:#A6ACCD;">                friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                    name</span></span>
<span class="line"><span style="color:#89DDFF;">                    </span><span style="color:#676E95;"># ERR: too deep.</span></span>
<span class="line"><span style="color:#A6ACCD;">                    friends(</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                        name</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,14),e=[o];function c(t,r,D,C,y,A){return n(),a("div",null,e)}const d=s(p,[["render",c]]);export{F as __pageData,d as default};
