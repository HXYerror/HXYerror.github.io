---
title: ubuntu18.04双硬盘（ssd+机械）+双系统（win10+linux）
date: 2019-10-14 23:14:50
cover: /img/post_cover/cover53.jpg
categories: linux
tags: linux
mathjax: true
---

## 安装

### 最先一定要分清楚一件事情

你的系统启动方式是什么

UEFI or BCD？看清楚再安装（百度怎么看）

**安装**参考链接： https://www.cnblogs.com/ERFishing/p/10050867.html 

### 注意事项

#### 1.win10压缩空间

千万一定不要不硬盘转化为动态硬盘，不然ubuntu安装的时候就扫描不到了

如果你现在已经是动态硬盘了，分区助手了解一下吧，没救了

#### 2.制作启动盘

不知道为什么不能用哪个软通碟

然后推荐一个rufus很好用的

#### 3.安装方式

我一开始看了一个假的教程，非常难受，选了与win10共存，就自动的安装到了ssd里面

心态崩了

#### 4.boot分区

我是设置了boot分区的，有的人说需要boot分区，有的人说不需要，我没试过

我的win的引导空间才200M？我觉得可能放不下

#### 5.我现在的问题

不知道为什么使用grub就不能引导启动win10，会一直循环

然后再bios里面修改win10为默认启动之后

就可以进入win10了，同时按F12进入boot选择ubuntu引导项也可以进入

## 卸载

大家都在教怎么安装，我来教你怎么卸载，说不定你就安装错了要重新装呢

同时，还是一定要分清楚自己电脑的启动方式

**卸载**参考链接：http://www.cnblogs.com/xia-Autumn/p/6294055.html

注意一定不要直接把ubuntu的硬盘格式化了就以为可以了，引导项会一直在

## 使用

#### 1.显卡驱动问题

默认源是没有专有驱动的，然后换成阿里云的源更新一下就有

还可以试一下这个https://blog.csdn.net/qq_41099561/article/details/100588384

虽然我没用，看着不错？

#### 2.更新一下语言

你点一下语言它会提示你的

#### 3.时间问题

你可能会遇到一个问题就是win10和ubuntu的时间相差了8小时

我修改ubuntu失败了

修改win10成功了

理论都可以，链接 https://blog.csdn.net/yogima/article/details/82917924 

#### 4.你一定想要使用QQ什么的

不多说，链接给你

 https://blog.csdn.net/qq_39268193/article/details/87880219 

#### 5.网卡问题

我的显卡是intel

所以首先需要自己去下载一个

驱动链接： https://www.intel.com/content/www/us/en/support/articles/000005511/network-and-i-o/wireless-networking.html 

然后扔到firware？

然后看一下wifi的硬件开关是不是被锁了

如果是的话就移除默认的那个

（有时间补上详细的）

# over！