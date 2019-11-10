---
title: 19XZCPC(女生赛) 补表
date: 2019-07-24 17:47:50
cover: /img/post_cover/cover14.jpg
categories: ccpc
tags: 
    - ccpc	
    - 除法
---

## [2019中国大学生程序设计竞赛-女生专场（重现赛）-感谢南京晓庄学院](http://acm.hdu.edu.cn/contests/contest_show.php?cid=866)

### 1001.[Ticket](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1001&cid=866)

顺序选择循环结构

### 1002.[Gcd](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1002&cid=866)

转化一下就是俩队中的共同因子n要尽量大

每一堆必然是n * q,n * p

那么p+q（>1）就要尽量的小，我们不需要知道p，q具体值，宗旨要小

所以只要找到和能整除的最小值就好了

### 1007.[Circle](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1007&cid=866)

几何题，肯定是加在一段弧的中点加出来的最多

第一步求出其他N-1个未加点三角形的面积（俩边夹角sin）

第二步求出加点四边形的面积，对角线的乘积一半

![](/img/post_blog/19XZCPC-1.png)

### 1010.[Tangram](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1010&cid=866)

这个题画图就能知道每画一次多出来的边是6，7，8

数列求和

但是，我在写的时候等差数列求和用的*0.5导致了错误，应该是/2

```cpp
LL f2(LL N)
{
    LL ans = 0;
    ans += N * 5;
    ans += 7;
    ans += ((1+N)*N)/2;//这就是对的
    ans += ((1+N)*N)*0.5;//这就是错的
    return ans;
}
```

### 1011.[Tetris](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1011&cid=866)

这个题他给的就是最小的情况了

行列必须都是4的倍数才可以，照着输出就可以