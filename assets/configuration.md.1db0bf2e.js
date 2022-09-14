import{_ as s,o as n,c as a,a as e}from"./app.81e28db4.js";const C=JSON.parse('{"title":"Configuration","description":"","frontmatter":{},"headers":[{"level":2,"title":"Ingress & API","slug":"ingress-api"},{"level":2,"title":"Services","slug":"services"},{"level":2,"title":"Whitelist","slug":"whitelist"}],"relativePath":"configuration.md"}'),l={name:"configuration.md"},p=e(`<h1 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-hidden="true">#</a></h1><p>GraphGuard Proxy expects a specific configuration file structure. By default, the configuration directory is located under <code>/etc/ggproxy</code> but you can manually change it using <code>ggproxy serve -config &lt;path&gt;</code>.</p><h2 id="ingress-api" tabindex="-1">Ingress &amp; API <a class="header-anchor" href="#ingress-api" aria-hidden="true">#</a></h2><p>The configuration directory must contain the main configuration file <code>config.yaml</code> defining ingress and API server configurations:</p><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#676E95;"># /etc/ggproxy/config.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">ingress</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># Address and port of the ingress server.</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">host</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">localhost:443</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># Optional, enables HTTPS.</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">tls</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># Certificate file path.</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">cert-file</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ingress.cert</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># Private key file path.</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">key-file</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ingress.key</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># Optional, in bytes, default: 4MiB.</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">max-request-body-size</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1024</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Optional, enables API server.</span></span>
<span class="line"><span style="color:#F07178;">api</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># Address and port of the API server.</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">host</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">localhost:3000</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># Optional, enables HTTPS.</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">tls</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># Certificate file path.</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">cert-file</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">api.cert</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># Private key file path.</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">key-file</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">api.key</span></span>
<span class="line"></span></code></pre></div><p>The ingress server is where all incoming traffic will be received and processed. The API server serves a GraphQL API providing debugging functionality and information about ggproxy&#39;s configuration and statistics.</p><h2 id="services" tabindex="-1">Services <a class="header-anchor" href="#services" aria-hidden="true">#</a></h2><p>A service defines where to forward requests to and what whitelist to apply to incomming traffic. One <code>ggproxy</code> instance can host multiple services simultaneously and requires at least 1 service to be enabled. A service is uniquely identified by the name of its directory for example: <code>/etc/ggproxy/services_enabled/my_service</code> where the unique identifier is <code>my_service</code>. If your proxy is running at <a href="https://myproxy.tld" target="_blank" rel="noreferrer">https://myproxy.tld</a> and the unique ID of the service is <code>myservice</code> then GraphQL requests are sent to <a href="https://myproxy.tld/myservice" target="_blank" rel="noreferrer">https://myproxy.tld/myservice</a>.</p><p>The configuration directory can contain both <code>services_enabled</code> and <code>services_disabled</code> subdirectories hosting enabled and disabled service definitions respectively. Disabled service definitions will not accept incoming traffic.</p><p>Each service definition must contain its main configuration file <code>config.yaml</code>:</p><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#676E95;"># /etc/ggproxy/services_enabled/my_service/config.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># The service&#39;s display name</span></span>
<span class="line"><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Service A</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Destination URL (where to proxy requests to)</span></span>
<span class="line"><span style="color:#F07178;">forward_url</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://localhost:8080/path</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># false for forwarding the original request,</span></span>
<span class="line"><span style="color:#676E95;"># true for the reduced version.</span></span>
<span class="line"><span style="color:#F07178;">forward_reduced</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"></span></code></pre></div><h2 id="whitelist" tabindex="-1">Whitelist <a class="header-anchor" href="#whitelist" aria-hidden="true">#</a></h2><p>Each service has its own set of templates forming the query whitelist. The service directory can contain both <code>templates_enabled</code> and <code>templates_disabled</code> subdirectories hosting enabled and disabled template definitions respectively. Disabled template definitions will not be considered while matching.</p><p>A template is uniquely identified by the name of its file for example: <code>/etc/ggproxy/services_enabled/my_service/templates_enabled/a.gqt</code> where the unique identifier is <code>a</code>. Templates are defined using the <a href="./gqt">GraphQL Template Language</a> and can be annotated using frontmatter metadata:</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">---</span></span>
<span class="line"><span style="color:#A6ACCD;"># /etc/ggproxy/services_enabled/my_service/templates_enabled/a.gqt</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># The template&#39;s display name</span></span>
<span class="line"><span style="color:#A6ACCD;">name: &quot;A&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Arbitrary tags</span></span>
<span class="line"><span style="color:#A6ACCD;">tags:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - query</span></span>
<span class="line"><span style="color:#A6ACCD;">    - products</span></span>
<span class="line"><span style="color:#A6ACCD;">    - related_products</span></span>
<span class="line"><span style="color:#A6ACCD;">---</span></span>
<span class="line"><span style="color:#A6ACCD;">query {</span></span>
<span class="line"><span style="color:#A6ACCD;">    products(limit: &lt;= 10, after: *) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        id</span></span>
<span class="line"><span style="color:#A6ACCD;">        name</span></span>
<span class="line"><span style="color:#A6ACCD;">        relatedProducts(type: &quot;tea&quot; || &quot;juice&quot;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            id</span></span>
<span class="line"><span style="color:#A6ACCD;">            name</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,15),o=[p];function t(c,r,i,y,d,D){return n(),a("div",null,o)}const u=s(l,[["render",t]]);export{C as __pageData,u as default};
