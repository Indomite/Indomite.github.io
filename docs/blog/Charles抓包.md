## Charles

### 使用基础

1.启动charles后会有很多本级的请求接口刷屏而过，不再对这些请求进行抓取可去掉如下选中项

Proxy > Mac OS X Proxy

去掉该选中项后，不在抓取本机接口

2.手机挂代理至电脑–-保持手机跟电脑在同一wifi网络环境下

    2.1打开手机网络高级设置，代理选择手动
    
    2.2服务器：要挂载电脑的IP
    
    2.3端口号：Charles的端口号（Proxy > Proxy Settings）默认端口号为8888，可以手动修改
    
    2.4Charles会询问是否允许挂载，选择Allow（一部手机经常挂载后可能不会出现此提示，此时实验一下是否能抓到包，如果能证明已经挂载成功）

### 代理H5页面


当我们在开发app内嵌的H5页面时，可以使用Charles进行抓包查看，另外charles也可以将我们本地的H5页面直接代理到app内嵌H5里运行。

1. 两个前提条件

有现成的app，且app里面访问了一个H5页面，我们拿到这个页面的URL，将这个url代理到局域网内我们本地的H5页面
手机和电脑需要连接到同一个局域网
下面，拿花小猪司机端举例

2. 连接步骤

将手机和电脑联到同一个局域网，打开Charles
进入当前的局域网  》配置代理 》手动
设置服务器与当前电脑的IP地址相同，端口一般默认8888
这时候弹窗，是否允许，选择allow
手机访问网页，看Charles是否有数据展示，若有，则成功
关闭proxy中的，macOS proxy，否则电脑连不上网

3. 配置代理

找到App上的H5页面（一般H5页面头部会有进度条）
配置Charles代理
打开tools 》Map remote 》add
罗明 > Charles抓包 > image2021-8-17_9-53-6.png如图所示，上述操作是将拦截页代理到钱包页，换句话说也就是用拦截页替换了钱包页，保存
再次进入的时候就可以代理到手机上了

4. mock本地数据

找到自己需要代理到本地的数据接口
打开tools > Map local > add
罗明 > Charles抓包 > image2021-8-17_9-59-54.png如图所示，即可将数据代理到本地的mock数据
注意：mock选用json格式，在代理本地数据的时候，保证json的数据格式正确，可以使用工具进行转换 https://www.json.cn/
使用Charles抓包或代理时可能会出现的一些问题

**问题1：Connection established**

不同的电脑，对同一台手机抓包，需要安装不同的证书

证书安装: help - SSL Proxying - install Charles Root Certificate，然后信任
手机证书安装 help - SSL Proxying - install Charles Root Certificate on a Mobile Device …,代理到本地后，访问chls.pro/ssl 下载安装，然后再Settings > General > About > Certificate Trust Testings 信任证书

**问题2：SSL handshake with client failed - Remote host terminated the handshake**

一般是证书信任问题: Settings > General > About > Certificate Trust Testings

**问题3: 使用Charles抓包时，需要关闭电脑的vpn代理**

使用Charles抓包，设置了网络代理，一切设置都正常，但是电脑上还是接收不到请求，发现vpn开启了，关掉后，就可以接收到请求的数据了。

