---
title: 19JXCPC
date: 2019-07-29 20:43:28
cover: /img/post_cover/cover13.jpg
categories: ccpc
tags: 
    - ccpc	
    - 树换根rerooting
    - 概率
---

## [ 2019CCPC-江西省赛（重现赛）- 感谢南昌大学](http://acm.hdu.edu.cn/contests/contest_show.php?cid=868)

### 1001.[Cotree](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1001&cid=868)

#### 题目思路：

又是我换根大法的展现时间

首先来了解一个知识点啊，树的重心

#### 树的重心：

1. 树中所有点到某个点的距离和中，到重心的距离和是最小的，如果有两个距离和，他们的距离和一样。
2. 把两棵树通过一条边相连，新的树的重心在原来两棵树重心的连线上。
3. 一棵树添加或者删除一个节点，树的重心最多只移动一条边的位置。
4. 一棵树最多有两个重心，且相邻

重点是第一条

偷一下题解

![](/img/post_blog/JXCPC-1.png)

其实题解里的u1，u2就是俩棵树的重心

答案组成包括了俩部分

一部分是原本树内俩俩点之间的最小距离，这是不变的

另一部分是俩起来之后俩个树的点对

就是题解说的那三种情况

显然节点个数我们没法改变，所以就是找到树的重心

然后怎么找呢，换根！！！！！！

定义size[n]（和题解里的没关系）为n所有子节点的个数

dp[n]为节点n的所有子节点到n的距离之和

所以我们的dp[n] = dp[i] (i为n的儿子) + size[n]

分别用 

casize计算出子节点的个数

dfs_dpfirst计算出任意一个根的dp[n]

dfsfindroot分离出俩颗树，算出每颗树的节点个数

dfs_rerooting换根dp的核心，见以往博客

然后我们根据换根的原理，可以发现，在每一次换根之后，都会得到根节点到所有其他节点的距离和，全部加起来就是树内俩俩点之间的最小距离的和的二倍，除二就可以了

这样俩部分就都求出来了

#### 题目代码：

```cpp
#include<bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cmath>
#include <iomanip>
#include <string>
#include <cstring>
#include <algorithm>
#include <set>
#include <map>
#include <vector>
#include <queue>
#include <stack>
#include <deque>
#include <utility>
#define LL long long
using namespace std;
const int MAX = 100020;//100000
const int MAX_1 = 70;
const int INF = 0x3f3f3f3f;//1061109567,1e9,int-MAX2147483647;
const double EPS = 0.0000001;
const int MOD = 998244353;//998244353;
const double PI = acos(-1);
LL T,N,M;
/*-------------------------------------------------------------------------------------------*/
LL dp1[MAX];
LL dp2[MAX];
int tsize1[MAX];//有多少个子节点
int tsize2[MAX];
vector<int> edge[MAX];
int flag[MAX];
LL ans = 0;
LL tree1,tree2,tmin;
/* ------------------------------------------------------------------------------------------*/
void tempcout(LL a[])
{
    for(int i = 1;i <= N;i++)
    {
        cout << a[i] << " ";
    }
    cout <<endl;
}

void dfsfindroot(int n)
{
    flag[n] = 1;
    for(int i = 0;i < edge[n].size();i++)
    {
        int m = edge[n][i];
        if(flag[m]) continue;
        else
        {
            flag[m] = 1;
            dfsfindroot(m);
        }
    }
}

int casize(int tsize[],int n,int v)
{
    for(int i = 0;i < edge[n].size();i++)
    {
        int m = edge[n][i];
        if(m == v) continue;
        else
        {
            tsize[n] += casize(tsize,m,n);
        }
    }
    return tsize[n] + 1;
}

int dfs_dpfirst(LL dp[],int tsize[],int n,int v)
{
    dp[n] = tsize[n];
    for(int i = 0;i < edge[n].size();i++)
    {
        int to = edge[n][i];
        if(to == v) continue;
        else
        {
            dp[n] += dfs_dpfirst(dp,tsize,to,n);
        }
    }
    return dp[n];
}

void dfs_rerooting(LL dp[],int tsize[],int n,int v)
{
    ans += dp[n];
    tmin = min(tmin,dp[n]);
    for(int i = 0;i < edge[n].size();i ++)
    {
        int to = edge[n][i];
        if(to == v) continue;

        dp[n] -= dp[to];
        dp[n] -= tsize[to];
        tsize[n] -= (tsize[to]+1);
        tsize[to] += (tsize[n]+1);
        dp[to] += dp[n];
        dp[to] += tsize[n];

        dfs_rerooting(dp,tsize,to,n);

        dp[to] -= tsize[n];
        dp[to] -= dp[n];
        tsize[to] -= (tsize[n]+1);
        tsize[n] += (tsize[to]+1);
        dp[n] += tsize[to];
        dp[n] += dp[to];
    }
}


int main()
{
    std::ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    //freopen("input.in","r",stdin);
    //freopen("output.out","w",stdout);
/* --------------------------------------------------------------------------------------*/
    cin >> N;
    M = N - 2;
    int u,v;
    LL t1,t2,node1,node2;
    node1 = node2 = 0;
    LL minans = 0;
    while(M--)
    {
        cin >> u  >> v;
        edge[u].push_back(v);
        edge[v].push_back(u);
    }
    dfsfindroot(1);

    t1 = 1;
    for(int i = 1;i <= N;i++)
    {
        if(flag[i]) node1++;
        if(!flag[i])
        {
            t2 = i;
        }
    }
    node2 = N - node1;

    casize(tsize1,t1,-1);
//tempcout(tsize1);
    dfs_dpfirst(dp1,tsize1,t1,-1);
//tempcout(dp1);
    tmin = INF;
    ans = 0;
    dfs_rerooting(dp1,tsize1,t1,-1);
    tree1 = tmin;
    minans += ans>>1;
//cout << ans <<endl;

    casize(tsize2,t2,-1);
//tempcout(tsize2);
    dfs_dpfirst(dp2,tsize2,t2,-1);
//tempcout(dp2);
    tmin = INF;
    ans = 0;
    dfs_rerooting(dp2,tsize2,t2,-1);
    tree2 = tmin;
    minans += ans>>1;
//cout << ans <<endl;

    minans += node1 * node2;
    minans += node1 * tree2;
    minans += node2 * tree1;
//cout << node1 << " " << node2 << " " << tree1 << " " << tree2 <<endl;
    cout << minans <<endl;
    return 0;
}
```

### 1004.[Wave](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1004&cid=868)

#### 题目思路：

把每一个数字n出现的位置记录下来

然后枚举pair（i，j）就是序列的数字

然后按照位置交替放，找到最长的

#### 题目代码：

```cpp
/*-------------------------------------------------------------------------------------------*/
vector<int> a[MAX];
/* ------------------------------------------------------------------------------------------*/


int main()
{
    std::ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    //freopen("input.in","r",stdin);
    //freopen("output.out","w",stdout);
/* --------------------------------------------------------------------------------------*/
    cin >> N >> M;
    if(N == 1)
    {
        cout << "0" <<endl;
        return 0;
    }
    int x;
    for(int i = 0;i < N;i++)
    {
        cin >> x;
        a[x].push_back(i);
    }
    int ans = 0;
    for(int i = 1;i <= M;i++)
    {
        for(int j = 1;j <= M;j++)
        {
            if(i == j) continue;
            int li = a[i].size();
            int lj = a[j].size();
            if(li+lj < ans) break;
            int temp = 0;
            int m = 0;
            for(int k = 0;k < li;k++)
            {
                if(k != 0)
                {
                    if(a[j][m] > a[i][k]) continue;
                }
                //cout << a[i][k] << " " << a[j][m] <<endl;
                temp++;
                while(a[j][m] < a[i][k])
                {
                    m++;
                    if(m >= lj) break;
                }
                if(m >= lj) break;
                temp++;
                //m++;
            }
            ans = max(temp,ans);
        }
    }
    cout <<ans <<endl;
    return 0;
}
```



### 1006.[String](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1006&cid=868)

记住每个字母有几个

乘一下，gcd一下，就好了

### 1007.[Traffic](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1007&cid=868)

这个题意一点也不清楚，枚举题意

题意是说b车都等着，最少要等多少秒，然后出发不会和a相遇

就记住a车的时间，枚举b等待时间，看会不会相遇就可以

### 1008.[Rng](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1008&cid=868)

#### 概率看我：

这个不算ac了

就是获取到一些知识

相交的区间比较多，所以我们可以想到算不相交的

错误：然后在比赛的时候我们算的不是概率，而是去算的不相交的区间个数，这种做法是错误的，因为选取到每一个区间的概率是不相同的，当选取了右端点，第二次选左端点的概率是不同的的

例如1，2，3

选到[2,2]区间的概率是1/3 * 1/2 而选到[3,3]区间的概率为1/3 * 1/3（1/n * 1/r）

这里附上别人的题解:[题解传送门](https://blog.csdn.net/Cassie_zkq/article/details/96147685)

第二行两个线段，左边的圈位置可以取的值我称为左圈值，右边的圈的位置可以取的值我称为右圈值，不考虑相交时，左圈值可以是1，2，。。n，右圈值同理，故有n*n中情况，在考虑相交时，左圈值可以取1，2，3。。。n-1，此时右圈值对应可以取n-1个，n-2个，n-3个。。。1个，所以总的情况有n-1 + n-2 + n-3 +。。+1（即1->n求和），所以概率就是上面列的那个式子

(见传送门评论区)

### 1009.[Budget](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1009&cid=868)

一开始还以为这个是考的四舍五入

然而a是很大的，考的是字符串了，只要看最后一位小数是大于4还是小于4就好了

### 1010.[Worker](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1010&cid=868)

先算出所有仓库订单的最小公倍数k

然后计算出每个仓库订单达到k所需要的工人之和sum

题中所给的人数必须是此sum的倍数，然后就顺序输出就行，按比例分配工人

### 1011.[Class](http://acm.hdu.edu.cn/contests/contest_showproblem.php?pid=1011&cid=868)

小学题