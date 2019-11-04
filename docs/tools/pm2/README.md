# PM2 初探

![PM2](../../images/pm2.jpg)

## 引子

pm2 是一个很优秀的 node 项目部署和运维的工具，对于前端程序员来说服务端部署本来就不是一件轻易的工作，更不用说性能监控、多进程管理、负载均衡这些看起来似懂非懂的东西了。

今天我尝试一下用一遍短小的文章来带大家认识一下这个优秀的前端工具是怎么帮我们处理好部署运维的问题的。

## node.js 部署

### 一般nodejs项目，我们是这样启动的

`node ./index.js`

```command
bowen BOWEN-PC /e/pm2-demo (master)
$ node ./index.js
daodao listening at port 8081
```

这样做用来调试程序还可以，但如果是生产环境就有点力不从心了，一方面是没有办法进行多进程，另外是整个运维监控都要自己去写代码管理。

### PM2 的方式

1. 先全局或者项目内安装 pm2

```cmd
npm install -g pm2
```

2. 通过PM2启动项目

`pm2 start ./index.js`

```cmd
$ pm2 start ./index.js
[PM2] Starting /e/pm2-demo/index.js in fork_mode (1 instance)
[PM2] Done.
┌──────────┬────┬─────────┬──────┬───────┬────────┬─────────┬────────┬───────┬───────────┬─────────────┬──────────┐
│ App name │ id │ version │ mode │ pid   │ status │ restart │ uptime │ cpu   │ mem       │ user        │ watching │
├──────────┼────┼─────────┼──────┼───────┼────────┼─────────┼────────┼───────┼───────────┼─────────────┼──────────┤
│ index    │ 0  │ 3.5.3   │ fork │ 11716 │ online │ 0       │ 1s     │ 46.8% │ 37.1 MB   │ bowen       │ disabled │
└──────────┴────┴─────────┴──────┴───────┴────────┴─────────┴────────┴───────┴───────────┴─────────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app

```

从运行的结果我们可以清晰地看到有一个实例运行起来，实例的名称、id、进行id，状态，重启资料，起动时长，CPU使用，内存使用等等。

不仅仅有这么一系列实用的状态数据，他还可以通过一系统的运维命令来实现单一项目的高效运维。

## 性能监控

可以尝试执行`pm2 show {name|id}` 命令，看看当前实例的运行状态

```cmd
$ pm2 show 0
 Describing process with id 0 - name index
┌───────────────────┬───────────────────────────────────────────────────────┐
│ status            │ online                                                │
│ name              │ index                                                 │
│ version           │ 3.5.3                                                 │
│ restarts          │ 0                                                     │
│ uptime            │ 3h                                                    │
│ script path       │ \web_blog\demos\tools\pm2\pm2-demo\index.js           │
│ script args       │ N/A                                                   │
│ error log path    │ xxxx\.pm2\logs\index-error.log                        │
│ out log path      │ xxxx\.pm2\logs\index-out.log                          │
│ pid path          │ xxxx\.pm2\pids\index-0.pid                            │
│ interpreter       │ node                                                  │
│ interpreter args  │ N/A                                                   │
│ script id         │ 0                                                     │
│ exec cwd          │ \web_blog\demos\tools\pm2\pm2-demo                    │
│ exec mode         │ fork_mode                                             │
│ node.js version   │ 10.15.3                                               │
│ node env          │ N/A                                                   │
│ watch & reload    │ ✘                                                     │
│ unstable restarts │ 0                                                     │
│ created at        │ 2019-11-04T02:32:47.817Z                              │
└───────────────────┴───────────────────────────────────────────────────────┘
```

> 这里只截取了实例的运行状态信息，其余的信息大家可以自行运行看效果。

## 多进程管理

`NODEJS` 生出来就是个单进程单线程，官方提供的多进行用起来是各种的不适应，当然大家也可以用类似[`greenlet`](https://github.com/developit/greenlet)这类的工具实现多线程操作，但唯一不好的是容易导致线程混乱，熟悉多线程的小伙伴们都知道，线程数量越多不指定就会越快，反而会导致CPU时间分片在不同线程间切换时的性能损耗。

使用 `pm2` 可以简单地根据当前`CPU`核心数据进行多进程管理，简单点说是就充分利用`CPU`的每个内核进行高效的程序处理。

```cmd
$ pm2 start ./index.js -i 4
[PM2] Starting \web_blog\demos\tools\pm2\pm2-demo\index.js in cluster_mode (4 instances)
[PM2] Done.
┌──────────┬────┬─────────┬─────────┬───────┬────────┬─────────┬────────┬─────┬───────────┬─────────────┬──────────┐
│ App name │ id │ version │ mode    │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user        │ watching │
├──────────┼────┼─────────┼─────────┼───────┼────────┼─────────┼────────┼─────┼───────────┼─────────────┼──────────┤
│ index    │ 0  │ 3.5.3   │ cluster │ 5452  │ online │ 0       │ 4s     │ 0%  │ 46.0 MB   │ bowen       │ disabled │
│ index    │ 1  │ 3.5.3   │ cluster │ 5572  │ online │ 0       │ 4s     │ 0%  │ 45.7 MB   │ bowen       │ disabled │
│ index    │ 2  │ 3.5.3   │ cluster │ 11884 │ online │ 0       │ 4s     │ 0%  │ 46.4 MB   │ bowen       │ disabled │
│ index    │ 3  │ 3.5.3   │ cluster │ 7228  │ online │ 0       │ 3s     │ 61% │ 43.9 MB   │ bowen       │ disabled │
└──────────┴────┴─────────┴─────────┴───────┴────────┴─────────┴────────┴─────┴───────────┴─────────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

如上所示通过参数 `-i 4` 起动了4个进程，有没有感觉非常地简单粗暴。

另我上是每个进行还是单独管理，例如想查看`id`为`2`的进程的日志输出。

```cmd
$ pm2 log 2
[TAILING] Tailing last 15 lines for [2] process (change the value with --lines option)
xxxx\.pm2\logs\index-error-2.log last 15 lines:
2|index    | WARNING: NODE_APP_INSTANCE value of '2' did not match any instance config file names.
2|index    | WARNING: See https://github.com/lorenwest/node-config/wiki/Strict-Mode

xxxx\.pm2\logs\index-out-2.log last 15 lines:
2|index    | daodao listening at port 8081
```

巴适的舒服了！

## 通过配置

除了上面给大伙显示的命令行，我们还可以通过配置文件进行`PM2`的丰富配置，简单地了解一下

先通过命令行初始化一个配置文件

`pm2 ecosystem`

然后

`cat ecosystem.config.js`

```js
module.exports = {
  apps : [{
    name: 'API', // 进程名称
    script: 'index.js', // 运行脚本

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 4,   //进程数
    autorestart: true,  // 自动重启
    watch: false,   // 监听更新
    max_memory_restart: '300M', // 最大内存，超出来会自动重启，很好地防止的down 机
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '0.0.0.0',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};

```

跑一下

`pm2 start ecosystem.config.js`

```cmd
[PM2][WARN] Applications API not running, starting...
[PM2] App [API] launched (4 instances)
┌──────────┬────┬─────────┬─────────┬───────┬────────┬─────────┬────────┬───────┬───────────┬─────────────┬──────────┐
│ App name │ id │ version │ mode    │ pid   │ status │ restart │ uptime │ cpu   │ mem       │ user        │ watching │
├──────────┼────┼─────────┼─────────┼───────┼────────┼─────────┼────────┼───────┼───────────┼─────────────┼──────────┤
│ API      │ 0  │ 3.5.3   │ cluster │ 18556 │ online │ 0       │ 5s     │ 0%    │ 46.0 MB   │ bowen       │ disabled │
│ API      │ 1  │ 3.5.3   │ cluster │ 13988 │ online │ 0       │ 4s     │ 0%    │ 45.8 MB   │ bowen       │ disabled │
│ API      │ 2  │ 3.5.3   │ cluster │ 10452 │ online │ 0       │ 4s     │ 0%    │ 46.1 MB   │ bowen       │ disabled │
│ API      │ 3  │ 3.5.3   │ cluster │ 14560 │ online │ 0       │ 3s     │ 65.5% │ 43.8 MB   │ bowen       │ disabled │
└──────────┴────┴─────────┴─────────┴───────┴────────┴─────────┴────────┴───────┴───────────┴─────────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app

```

跑进来跟上面差不多，但不用每次输入参数。

更多的使用方式大家可以打开PM2的官网进行查看，类似跟`DOCKER`和`K8S`的结合使用都是有意思得很。
