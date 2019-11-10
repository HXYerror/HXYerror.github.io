---
title: NC-4
date: 2019-07-27 19:45:19
cover: /img/post_cover/cover18.jpg
categories: ncoder
tags: 
    - NC
    - dp
    - 树换根rerooting
    - 构造
---

## [2019牛客暑期多校训练营（第四场）](https://ac.nowcoder.com/acm/contest/884)

### A.[meeting](https://ac.nowcoder.com/acm/contest/884/A)

#### 题目思路：

看到就想到之前的换根dp，真的就可以

[cfrerooting传送门](<https://hxyerror.github.io/2019/07/13/ECF-67-2/>)

我们把他们要去的集合地点作为树根

然后dp[i]表示到达 i 节点需要的最长时间（树深度）

状态转移

要转移到的节点未to，当前节点n，当前节点的父节点v

1：n剪儿子to

如果最长的时间来自于to，我们要在其他与n相连的节点中找到最大的（包括n）

如果不是to，就看一下是不是节点v（因为转移之后v就成为了n的子节点而不是父节点）

2：to加儿子n

这个只需要将dp[n]和dp[to]的大的赋值给to就好

先跑一次dfs将初始的树画出来，然后进行第二次dfs（dp）

#### 题目代码：

```cpp
/*-------------------------------------------------------------------------------------------*/
vector<int> edge[MAX];
int flag[MAX];
LL dp[MAX];
LL ans = INF;
/* ------------------------------------------------------------------------------------------*/
 
LL caculatesize(int n,int v)
{
    dp[n] = 0;
    for(int i = 0;i < edge[n].size();i++)
    {
        if(edge[n][i] == v) continue;
        dp[n] = max(caculatesize(edge[n][i],n),dp[n]);
    }
    if(flag[n] || dp[n]) return dp[n]+1;
    else return dp[n];
}
 
 
void dfs(int n,int v)
{
    ans = min(ans,dp[n]);
    for(int i = 0;i < edge[n].size();i++)//to
    {
        if(edge[n][i] == v) continue;
        int to = edge[n][i];
        LL temp = dp[n];
        if(dp[n] == (dp[to]+1))
        {
            dp[n] = 0;
            for(int j = 0;j < edge[n].size();j++)
            {
                if(edge[n][j] == edge[n][i]) continue;
                dp[n] = max(dp[n],(dp[edge[n][j]] || flag[edge[n][j]]) ? (dp[edge[n][j]]+1) : 0);
                //cout <<edge[n][j] << " " << flag[edge[n][j]]<<" "<<dp[n] << " ";
            }
        }
        else
        {
            if(v != -1) dp[n] = max((dp[v] || flag[v]) ? (dp[v]+1) : 0,dp[n]);
        }
        int temp2 = dp[to];
 
        dp[to] = max(dp[to],dp[n]+1);
 
        dfs(to,n);
 
        dp[n] = temp;
        dp[to] = temp2;
 
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
    cin >> N >> T;
    M = N - 1;
    int l,r;
    while(M--)
    {
        cin >> l >> r;
        edge[l].push_back(r);
        edge[r].push_back(l);
    }
    int x;
    while(T--)
    {
        cin >> x;
        flag[x] = 1;
    }
    ans = caculatesize(1,-1);
    dfs(1,-1);
    cout << ans <<endl;
    return 0;
}
```



### J.[triples I](https://ac.nowcoder.com/acm/contest/884/D)

#### 题目思路：

首先题目保证了一定存在答案

1.`N % 2 == 0` 输出N

2.`N % 2 ！= 0`

我们可以发现，一个数的二进制位的值（1，2，4，8，16），mod 3只能能等于1 or 2

所以我们可以通过剔除，组合这些二进制位来构造出mod 3  = 0数，得到答案

如果`N % 2 == 1`,我们可以N - 一个二进制mod 3 == 1的数，就能得到整除三的数，如果有俩个这样的数就能得到答案

题解附上：（很容易理解）

![](/img/post_blog/NC-4-1.png)

#### 题目代码:

```cpp
LL T,N,M;
/*-------------------------------------------------------------------------------------------*/
LL pow2[MAX_1];
/* ------------------------------------------------------------------------------------------*/
 
void mycout(LL a,LL b)
{
    cout << 2 << " " << b << " " << a <<endl;
}
 
int main()
{
    std::ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    //freopen("input.in","r",stdin);
    //freopen("output.out","w",stdout);
/* --------------------------------------------------------------------------------------*/
    pow2[0] = 1;
    for(int i = 1;i <= 62;i++)
    {
        pow2[i] = pow2[i-1]<<1;
    }
    cin >> T;
    while(T--)
    {
        cin >> N;
        if(N % 3 == 0)
        {
            cout << 1 << " " << N <<endl;
            continue;
        }
        M = N;
        int k,cnt = 0;
        vector<int> mod1,mod2;
        while(M)
        {
            k = M&1;
            M >>= 1;
            if(k)
            {
                if(cnt % 2)  mod2.push_back(cnt);
                else mod1.push_back(cnt);
            }
            if(mod1.size()+mod2.size() > 2) break;
            cnt++;
        }
        if(N % 3 == 1)
        {
            if(mod1.size() > 1) mycout(N-pow2[mod1[0]],N-pow2[mod1[1]]);
            else if(mod1.size() < 1) mycout(N-pow2[mod2[0]]-pow2[mod2[1]],pow2[mod2[0]]+pow2[mod2[1]]+pow2[mod2[2]]);
            else mycout(N-pow2[mod1[0]],pow2[mod1[0]]+pow2[mod2[0]]);
        }
        else
        {
            if(mod2.size() >1) mycout(N-pow2[mod2[0]],N-pow2[mod2[1]]);
            else if(mod2.size() < 1) mycout(N-pow2[mod1[0]]-pow2[mod1[1]],pow2[mod1[0]]+pow2[mod1[1]]+pow2[mod1[2]]);
            else mycout(N-pow2[mod2[0]],pow2[mod2[0]]+pow2[mod1[0]]);
        }
    }
    return 0;
}
```



### K.[number](https://ac.nowcoder.com/acm/contest/884/K)

#### 题目思路：

定义dp(0,1,2)为当前i(index)结尾的子串的sum（十进制和）mod 3值为0，1，2的个数

因为十进制数各位上加起来mod 3=0就能整除3，那么再多俩个0就能整除300

dp的状态转移为

1.转移区间，从i-1转移，把以i-1结尾转移到i结尾（1 - i-2开头）

如果当前位mod 3 == 2，很简单

```cpp
            int k = dp[0];
            dp[0] = dp[1];//之前余数1，又加了余数2，那么正好就能整除
            dp[1] = dp[2];
            dp[2] = k;
```

mod 3 == 1

```cpp
            int k = dp[0];
            dp[0] = dp[2];
            dp[2] = dp[1];
            dp[1] = k;
```

2.新加区间

还多了一个`（i-1，i）`的区间，所以就要新加这样一个区间

更新答案

当我们遇到0的时候，因为0本身满足条件，`ans++`

当我们遇到2个以上的0时就要就 `ans += dp[0]//能整除300的个数`

#### 题目代码：

```cpp
int main()
{
    std::ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    //freopen("input.in","r",stdin);
    //freopen("output.out","w",stdout);
/* --------------------------------------------------------------------------------------*/
    string str;
    cin >> str;
    N = str.size();
    LL dp[3];
    dp[0] = dp[1] = dp[2] = 0;
    LL ans = 0;
    int last = 0;
    int cnt = 0;
    if(str[0] == '0')//记得特判一个第一位
    {
        cnt++;
        ans++;
    }
    last = 0;
    for(int i = 1;i < N;i++)
    {
        if((str[i] - '0') % 3 == 1)
        {
            int k = dp[0];
            dp[0] = dp[2];
            dp[2] = dp[1];
            dp[1] = k;
        }
        else if((str[i] - '0') % 3 == 2)
        {
            int k = dp[0];
            dp[0] = dp[1];
            dp[1] = dp[2];
            dp[2] = k;
        }
        int n = str[i] + str[last] - '0' - '0';
        dp[n % 3] ++;
        if(str[i] == '0')
        {
            cnt++;
            ans++;
        }
        else cnt = 0;
        if(cnt > 1)
        {
            ans += dp[0];
        }
        last = i;
    }
    cout << ans <<endl;
    return 0;
}
```

