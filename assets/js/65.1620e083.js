(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{479:function(v,_,t){"use strict";t.r(_);var e=t(0),o=Object(e.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h2",{attrs:{id:"浏览器渲染机制"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#浏览器渲染机制"}},[v._v("#")]),v._v(" 浏览器渲染机制")]),v._v(" "),_("ol",[_("li",[v._v("浏览器先对得到的HTML进行解码，之后进行网络资源的预处理，将以后要发送的请求提前加进请求队列中。")]),v._v(" "),_("li",[v._v("浏览器将HTML转化为一个个的标记（标记化Tokenization），之后通过标记来构建DOM树；CSS同理，先进行标记化，再进行CSS样式树的构建。")]),v._v(" "),_("li",[v._v("浏览器将DOM树和CSS样式树结合，生成渲染树。")]),v._v(" "),_("li",[v._v("布局：浏览器根据渲染树，获取每个渲染对象在屏幕上的位置和尺寸。")]),v._v(" "),_("li",[v._v("绘制：将计算好的像素点绘制到屏幕。")]),v._v(" "),_("li",[v._v("渲染层合成：多个绘制后的渲染层按照恰当的重叠顺序进行合并，而后生成位图，最终通过显卡展示到屏幕上。")])]),v._v(" "),_("h3",{attrs:{id:"回流-重排"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#回流-重排"}},[v._v("#")]),v._v(" 回流/重排")]),v._v(" "),_("p",[_("strong",[v._v("当渲染对象的位置，尺寸，或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程。")])]),v._v(" "),_("p",[v._v("导致回流的操作：")]),v._v(" "),_("ol",[_("li",[_("p",[v._v("页面首次渲染")])]),v._v(" "),_("li",[_("p",[v._v("元素位置或尺寸发生变化。")])]),v._v(" "),_("li",[_("p",[v._v("添加或删除可见的DOM元素。")])]),v._v(" "),_("li",[_("p",[v._v("浏览器窗口大小发生变化。")])]),v._v(" "),_("li",[_("p",[v._v("查询某些属性或调用某些方法")]),v._v(" "),_("p",[_("code",[v._v("clientWidth")]),v._v("、"),_("code",[v._v("clientHeight")]),v._v("、"),_("code",[v._v("clientTop")]),v._v("、"),_("code",[v._v("clientLeft")])]),v._v(" "),_("p",[_("code",[v._v("offsetWidth")]),v._v("、"),_("code",[v._v("offsetHeight")]),v._v("、"),_("code",[v._v("offsetTop")]),v._v("、"),_("code",[v._v("offsetLeft")])]),v._v(" "),_("p",[_("code",[v._v("scrollWidth")]),v._v("、"),_("code",[v._v("scrollHeight")]),v._v("、"),_("code",[v._v("scrollTop")]),v._v("、"),_("code",[v._v("scrollLeft")])]),v._v(" "),_("p",[_("code",[v._v("scrollIntoView()")]),v._v("、"),_("code",[v._v("scrollIntoViewIfNeeded()")])]),v._v(" "),_("p",[_("code",[v._v("getComputedStyle()")])]),v._v(" "),_("p",[_("code",[v._v("getBoundingClientRect()")])]),v._v(" "),_("p",[_("code",[v._v("scrollTo()")])])])]),v._v(" "),_("h3",{attrs:{id:"重绘"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#重绘"}},[v._v("#")]),v._v(" 重绘")]),v._v(" "),_("p",[_("strong",[v._v("样式的改变不改变渲染对象在文档流中的位置时（如：color, background-color的改变）浏览器重新绘制。")])]),v._v(" "),_("p",[_("strong",[v._v("回流一定引发重绘，重绘不一定引发回流。回流比重绘的代价要更高")]),v._v("。")]),v._v(" "),_("h3",{attrs:{id:"优化"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#优化"}},[v._v("#")]),v._v(" 优化")]),v._v(" "),_("ol",[_("li",[_("p",[v._v("浏览器会维护一定队列，所有引起回流或重绘的操作会放进这个队列，一定时间后会对这些操作进行批处理。")]),v._v(" "),_("p",[v._v("但当访问clientWidth, clientHeight之类的属性时，会刷新这个队列，所以要尽量减少这些属性的访问")])]),v._v(" "),_("li",[_("p",[v._v("浏览器使用的流式布局模型，避免使用table。")])]),v._v(" "),_("li",[_("p",[v._v("对DOM元素进行修改时，可以先使用"),_("code",[v._v("display: none")]),v._v("使其脱离文档流，再进行DOM操作，执行完再放回文档流。")])]),v._v(" "),_("li",[_("p",[v._v("对于复杂的动画效果，可以用"),_("code",[v._v("display: position")]),v._v("使其脱离文档流")])]),v._v(" "),_("li",[_("p",[v._v("使用CSS3中的"),_("code",[v._v("transform, opacity, filters")]),v._v("属性，启动GPU加速，这些属性的改变不会引发回流或重绘。")])])])])}),[],!1,null,null,null);_.default=o.exports}}]);