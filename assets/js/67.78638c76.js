(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{478:function(a,t,s){"use strict";s.r(t);var e=s(0),r=Object(e.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h3",{attrs:{id:"http状态码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#http状态码"}},[a._v("#")]),a._v(" HTTP状态码")]),a._v(" "),t("ul",[t("li",[a._v("1XX 通知\n"),t("ul",[t("li",[a._v("100 客户端重新发请求")]),a._v(" "),t("li",[a._v("101 更改协议，http，https，http1.0，1.1，2.0")])])]),a._v(" "),t("li",[a._v("2XX 成功\n"),t("ul",[t("li",[a._v("200 操作成功")]),a._v(" "),t("li",[a._v("201 创建新资源")]),a._v(" "),t("li",[a._v("202 请求不被实时处理")]),a._v(" "),t("li",[a._v("204 请求成功，但是报文不含实体的主体部分")]),a._v(" "),t("li",[a._v("205 请求成功，但是报文不含实体的主体部分，要求客户端重置内容")])])]),a._v(" "),t("li",[a._v("3XX 重定向\n"),t("ul",[t("li",[a._v("301 永久性重定向")]),a._v(" "),t("li",[a._v("302 临时重定向")]),a._v(" "),t("li",[a._v("303 资源存在另一个URL")]),a._v(" "),t("li",[a._v("304 允许访问资源，但实体为空")])])]),a._v(" "),t("li",[a._v("4XX 客户端错误\n"),t("ul",[t("li",[a._v("400 请求报文语法错误")]),a._v(" "),t("li",[a._v("401 请求需要通过验证（认证证书）")]),a._v(" "),t("li",[a._v("403 请求资源存在，但是被拒绝")]),a._v(" "),t("li",[a._v("404 找不到资源")]),a._v(" "),t("li",[a._v("405 不支持的请求方法")])])]),a._v(" "),t("li",[a._v("5XX 服务端错误\n"),t("ul",[t("li",[a._v("500 执行请求发生错误")]),a._v(" "),t("li",[a._v("501 不支持请求方法")]),a._v(" "),t("li",[a._v("502 代理与上行服务器之间出现问题")]),a._v(" "),t("li",[a._v("503 服务器暂时超负荷")])])])]),a._v(" "),t("h3",{attrs:{id:"get-post"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#get-post"}},[a._v("#")]),a._v(" GET ， POST")]),a._v(" "),t("p",[a._v("本质上来说，二者之间没有太大的区别，都取决于HTTP")]),a._v(" "),t("p",[a._v("GET能请求缓存，POST不行；POST支持多编码；GET回退无害，POST再次提交；GET可以保存书签，POST不行；GET的长度受限制；POST相对安全")]),a._v(" "),t("p",[a._v("对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；")]),a._v(" "),t("p",[a._v("而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）")]),a._v(" "),t("h3",{attrs:{id:"restful"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#restful"}},[a._v("#")]),a._v(" RESTful")]),a._v(" "),t("p",[a._v("应该尽量将API部署在专用域名之下。")]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token literal-property property"}},[a._v("https")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("api"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("example"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("com\n")])])]),t("p",[a._v("如果确定API很简单，不会有进一步扩展，可以考虑放在主域名下。")]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token literal-property property"}},[a._v("https")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("example"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("org"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("api"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("\n")])])]),t("p",[a._v("在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词。")]),a._v(" "),t("p",[a._v("对于资源的具体操作类型，由HTTP动词表示。")]),a._v(" "),t("p",[a._v("如Get, Post, Put, Delete等")]),a._v(" "),t("h3",{attrs:{id:"http头部"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#http头部"}},[a._v("#")]),a._v(" HTTP头部")]),a._v(" "),t("p",[a._v("请求头部")]),a._v(" "),t("div",{staticClass:"language-http extra-class"},[t("pre",{pre:!0,attrs:{class:"language-http"}},[t("code",[t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[a._v("cookie")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token header-value"}},[a._v("''")])]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[a._v("host")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token header-value"}},[a._v("''")])]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[a._v("If-None-Match")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token header-value"}},[a._v("''")])]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[a._v("If-Modified-Since")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token header-value"}},[a._v("''")])]),a._v("\n")])])]),t("p",[a._v("响应头部")]),a._v(" "),t("div",{staticClass:"language-http extra-class"},[t("pre",{pre:!0,attrs:{class:"language-http"}},[t("code",[t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[a._v("Set-Cookie")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token header-value"}},[a._v("''")])]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[a._v("Location")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token header-value"}},[a._v("'/'")])]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[a._v("ETag")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token header-value"}},[a._v("''")])]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[a._v("Last-Modified")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token header-value"}},[a._v("''")])]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[a._v("Cache-Control")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token header-value"}},[a._v("'max-age='")])]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[a._v("expires")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token header-value"}},[a._v("''")])]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[a._v("access-control-allow-origin")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token header-value"}},[a._v("'*'")])]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[a._v("access-control-allow-credentials")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token header-value"}},[a._v("true")])]),a._v("\n")])])]),t("h3",{attrs:{id:"http协议-1-0-1-1-2-0"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#http协议-1-0-1-1-2-0"}},[a._v("#")]),a._v(" HTTP协议 1.0 ，1.1， 2.0")]),a._v(" "),t("h4",{attrs:{id:"http1-1比起1-0"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#http1-1比起1-0"}},[a._v("#")]),a._v(" HTTP1.1比起1.0")]),a._v(" "),t("ol",[t("li",[a._v("HTTP1.0默认不开启长连接，HTTP1.1默认开启（Connection：Keep-Alive），并且支持管线化（Pipeline）。")]),a._v(" "),t("li",[a._v("HTTP1.0不支持Host头部，HTTP1.1支持，可以实现虚拟主机。")]),a._v(" "),t("li",[a._v("HTTP1.1比1.0新加了E-tag，If-Node-Match，Cache-control等用于缓存控制的头部。")]),a._v(" "),t("li",[a._v("HTTP1.1新增24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突。")]),a._v(" "),t("li",[a._v("HTTP1.1对带宽进行优化。")])]),a._v(" "),t("h4",{attrs:{id:"http2-0比起1-1"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#http2-0比起1-1"}},[a._v("#")]),a._v(" HTTP2.0比起1.1")]),a._v(" "),t("ol",[t("li",[a._v("HTTP2.0采用的二进制格式传输，取代了HTTP1.x的文本格式的传输。")]),a._v(" "),t("li",[a._v("多路复用。在HTTP2.0中有两个概念，分别是帧（frame）和流（stream），帧表示最小的单位，每个帧都会标识出该帧属于哪个流。多路复用指的是一个TCP连接中可以存在多个流，也就是说，同一时间可以发送多个请求。")]),a._v(" "),t("li",[a._v("头部压缩。对报文的头部进行压缩，在客户端和服务端都维护着一份字典记录着头部对应的索引。")]),a._v(" "),t("li",[a._v("服务端推送（Server Push）。服务端可以预测客户端需要的资源，并主动推送给客户端。")])]),a._v(" "),t("h3",{attrs:{id:"https原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#https原理"}},[a._v("#")]),a._v(" HTTPS原理")]),a._v(" "),t("p",[a._v("HTTP = HTTP + TLS/SSL")]),a._v(" "),t("p",[a._v("发送HTTPS请求时")]),a._v(" "),t("ol",[t("li",[a._v("生成HTTP报文，交给TLS处理，进行TLS握手；交换互相的随机数，支持的加密算法，压缩算法，协议版本号。")]),a._v(" "),t("li",[a._v("服务端发送证书给客户端，证书包括服务端的公钥和CA的私钥对服务端公钥的签名。客户端用CA的公钥对签名进行验证。")]),a._v(" "),t("li",[a._v("验证成功后，客户端生成预备主密码，用服务端公钥加密后发送给服务端。服务端接收到预备主密码后，结合两个随机数生成主密码。")]),a._v(" "),t("li",[a._v("主密码用来生成会话使用的密钥，消息认证码使用的密钥，CBC模式要用到的初始向量。")]),a._v(" "),t("li",[a._v("报文分割后，压缩，加上MAC后进行加密传输。")])])])}),[],!1,null,null,null);t.default=r.exports}}]);