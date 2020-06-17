# Web 端即时通讯技术盘点

Web 端即时通讯方案大致有 4 种：**传统 Ajax 短轮询、Comet 技术、WebSocket 技术、SSE（Server-sent Events）**。本文将简要介绍这 4 种技术的原理，并指出各自的异同点、优缺点等。[原文链接](http://www.52im.net/thread-338-1-1.html)

## 传统 Ajax 短轮询

原理是在客户端通过 Ajax 的方式的方式每隔一小段时间就发送一个请求到服务器，服务器返回最新数据，然后客户端根据获得的数据来更新界面，这样就间接实现了即时通信。优点是简单，缺点是对服务器压力较大，浪费带宽流量。

实例代码见 `web-communication-demo/polling`

## Comet

Comet 技术并不是 HTML 5 标准的一部分，是一种 hack 技术.

### 长轮询（long-polling）

客户端发送一个请求到服务器，服务器查看客户端请求的数据是否发生了变化（是否有最新数据），如果发生变化则立即响应返回，否则保持这个连接并定期检查最新数据，直到发生了数据更新或连接超时。同时客户端连接一旦断开，则再次发出请求，这样在相同时间内大大减少了客户端请求服务器的次数。

实例代码见 `web-communication-demo/long-polling`

### 基于 http-stream 通信

原理是让客户端在一次请求中保持和服务端连接不断开，然后服务端源源不断传送数据给客户端，就好比数据流一样，并不是一次性将数据全部发给客户端。它与 polling 方式的区别在于整个通信过程客户端只发送一次请求，然后服务端保持与客户端的长连接，并利用这个连接在回送数据给客户端。

#### 基于 XHR 对象的 streaming 方式

这种方式的思想是构造一个 XHR 对象，通过监听它的 onreadystatechange 事件，当它的 readyState 为 3 的时候，获取它的 responseText 然后进行处理，readyState 为 3 表示数据传送中，整个通信过程还没有结束，所以它还在不断获取服务端发送过来的数据，直到 readyState 为 4 的时候才表示数据发送完毕，一次通信过程结束。在这个过程中，服务端传给客户端的数据是分多次以 stream 的形式发送给客户端，客户端也是通过 stream 形式来获取的，所以称作 http-streaming 数据流方式。

```sh
'content-type', 'multipart/octet-stream'
```

实例代码见 `web-communication-demo/http-stream/xhr-stream.js、xhr-stream.html`

#### 基于 iframe 的数据流

在浏览器中动态载入一个 iframe,让它的 src 属性指向请求的服务器的 URL，实际上就是向服务器发送了一个 http 请求，然后在浏览器端创建一个处理数据的函数，在服务端通过 iframe 与浏览器的长连接定时输出数据给客户端，但是这个返回的数据并不是一般的数据，而是一个类似于 `<script type=\"text/javascript\">parent.process('"+randomNum.toString()+"')</script>`脚本执行的方式，浏览器接收到这个数据就会将它解析成 js 代码并找到页面上指定的函数去执行，实际上是服务端间接使用自己的数据间接调用了客户端的代码，达到实时更新客户端的目的。

实例代码见 `web-communication-demo/http-stream/iframe-stream.js、iframe-stream.html`

#### IE 中基于 htmlfile 的数据流通信

在 IE 中，使用 iframe 请求服务端，服务端保持通信连接没有全部返回之前，浏览器 title 一直处于加载状态，并且底部也显示正在加载，这对于一个产品来讲用户体验是不好的，于是谷歌的天才们又想出了一中 hack 方式：动态生成一个 htmlfile 对象，这个对象 ActiveX 形式的 com 组件，它实际上就是一个在内存中实现的 HTML 文档，通过将生成的 iframe 添加到这个内存中的 HTMLfile 中，并利用 iframe 的数据流通信方式达到上面的效果。同时由于 HTMLfile 对象并不是直接添加到页面上的，所以并没有造成浏览器显示正在加载的现象。

实例代码见 `web-communication-demo/http-stream/ie-htmlfile-stream.js、ie-htmlfile-stream.html`

### comet 技术需注意

- 不要在同一客户端同时使用超过两个的 HTTP 长连接
- 服务器端的性能和可扩展性
- 控制信息与数据信息使用不同的 HTTP 连接
- 在客户和服务器之间保持“心跳”信息

## SSE（服务器推送事件（Server-sent Events）

SSE（Server-Sent Event，服务端推送事件）[mdn](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)是一种允许服务端向客户端推送新数据的 HTML5 技术。与由客户端每隔几秒从服务端轮询拉取新数据相比，这是一种更优的解决方案。

因为受单项通信的限制 EventSource 只能用来实现像股票报价、新闻推送、实时天气这些只需要服务器发送消息给客户端场景中。

- 单向消息传递
- `EventSource` 对象
- `"Content-Type": "text/event-stream"`

实例代码见 `web-communication-demo/sse`

### 与 WebSocket 区别

- WebSocket 基于 TCP 协议，EventSource 基于 http 协议。
- EventSource 是单向通信，而 websocket 是双向通信。
- EventSource 只能发送文本，而 websocket 支持发送二进制数据。
- 在实现上 EventSource 比 websocket 更简单。
- EventSource 有自动重连接（不借助第三方）以及发送随机事件的能力。
- websocket 的资源占用过大 EventSource 更轻量。
- websocket 可以跨域，EventSource 基于 http 跨域需要服务端设置请求头。

## WebSocket

在 HTML5 中，为了加强 web 的功能，提供了 websocket 技术，它不仅是一种 web 通信方式，也是一种应用层协议。它提供了浏览器和服务器之间原生的双全工跨域通信，通过浏览器和服务器之间建立 websocket 连接（实际上是 TCP 连接）,在同一时刻能够实现客户端到服务器和服务器到客户端的数据发送。

### request headers

```sh
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits // 协议扩展类型
Sec-WebSocket-Key: MSkCNr/v1i8mgVSSnI3bFA==  // 客户端采用base64编码的24位随机字符序列
Sec-WebSocket-Version: 13 // 	客户端支持WebSocket的版本
Upgrade: websocket  // 协议升级为WebSocket协议
Connection: Upgrade  // 标识该HTTP请求是一个协议升级请求
```

### response headers

```sh
Connection: Upgrade
Sec-WebSocket-Accept: hZtNtyZ241sV0mR1Hd4UE5sGkf8= // 服务器接受客户端HTTP协议升级的证明,服务端采用与客户端一致的密钥计算出来后返回客户端
Upgrade: websocket
```

### 注意点

- 通过 TCP 通讯
- socket.io
- 101 Switching Protocols 响应代码指示服务器正在根据发送包括 Upgrade 请求头的消息的客户端的请求切换到的协议。
- WS 协议有两部分组成：握手和数据传输

### 与 HTTP 比较

#### 相同点

- 都是基于 TCP 的应用层协议；
- 都使用 Request/Response 模型进行连接的建立；
- 在连接的建立过程中对错误的处理方式相同，在这个阶段 WS 可能返回和 HTTP 相同的返回码；
- 都可以在网络中传输数据。

#### 不同点

- WS 使用 HTTP 来建立连接，握手阶段采用 HTTP 协议，但是定义了一系列新的 header 域，这些域在 HTTP 中并不会使用；
- WS 的连接不能通过中间人来转发，它必须是一个直接连接；
- WS 连接建立之后，通信双方都可以在任何时刻向另一方发送数据；
- WS 连接建立之后，数据的传输使用帧来传递，不再需要 Request 消息；
- WS 的数据帧有序。

### 基于 socket.io 打造的简易聊天室

实例代码见 `web-communication-demo/chat-demo`
