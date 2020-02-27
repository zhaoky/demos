# 跨域读取阻止（CORB）

-[文档](https://chromium.googlesource.com/chromium/src/+/master/services/network/cross_origin_read_blocking_explainer.md)

-[解析](https://juejin.im/post/5cc2e3ecf265da03904c1e06)

使用 `mkcert` 生成本地测试 `https` 证书

```sh
brew install mkcert
mkcert -install
mkcert 192.168.50.56 #本机地址
```

使用 `http-server` 开启本地测试服务器

```sh
http-server -S -C 192.168.50.56.pem -K 192.168.50.56-key.pem
```

这样就可以本地调试 `https` 的测试页面了
