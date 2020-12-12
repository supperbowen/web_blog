# 玩坏了的 mixin

## 开题

mixin 是 vue 中一个很常被用到的特性，它可以把一系列公共属性注入到被引入的组件中，用好了可以明显提高我们开发的效率，提高代码的重用性，但我想说的是别再`过度使用` `mixin`了。

## mixin 是什么

有过面向对象设计经验的同学特别喜欢用`interface`，它可以给我们的程序代码声明一个个的协议，只要`class`引入了该协议我们就可以在这个实例中兑现相应的协议内容，特别酷的设计。

我们的 `mixin` 跟 `interface` 有一点点像，就是它也类似地约定是一个协议，在引入它的组件也可以兑现`mixin`中声明的特性，不一样的是`mixin`不仅仅是声明而是带了具体的实现，而且作为`弱类型`的 `javascript`在兑现协议的时候感觉被调用的方法和属性就是当前对象的，很多时候不知道为什么就有一个如此方便的方法可以用。

## mixin 之强大

不可否认的是 `mixin` 的作用是很强大的，它能大量地减少了代码拷贝，并且使用起来非常的简单，就跟写一般的组件一样，没有过多的约束，甚至还可以访问`$options`来实现参数的配置和差异化处理。

## 被过度消费的 mixin

`mixin` 太强大了，导致有的项目看起来到处都是`mixin`

1. 表单带个`mixin` 用来实现输入有效性检查
2. 把 `http` 都放在`mixin`里面，直接调用`this.http(xxxx)`
3. 把一个复杂的模块拆成10个`mixin`，一个处理参数传入、一个界面逻辑、一个处理http....
4. 全局加个读取和更新字典的`mixin`
5. 在`mixin`里面声明个全局为量，管理全局的事件或者是数据状态
6. 今天很开心，写个`mixin`。。。。。。

我们会发现 `mixin` 的确是解决了很多代码重用的问题，但也很容易导致代码变得不可维护，例如有时候明明在组件中调用了个`getModel`的方法，但怎么找都找不到声明它的位置（有时候还会找到两个一模一样的声明 so sad!）。

1. `mixin` 会导致组件声明不清晰，不知道组件特性明确声明的位置。