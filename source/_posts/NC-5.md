---
title: NC-5
date: 2019-08-01 16:43:53
cover: /img/post_cover/cover42.jpg
categories: ncoder
tags: 
    - NC
    - dp
    - 矩阵快速幂
    - 十进制快速幂
---

## [2019牛客暑期多校训练营（第五场）](https://ac.nowcoder.com/acm/contest/885)

### A.[digits 2](https://ac.nowcoder.com/acm/contest/885/A)

输出N个N即可

### B.[generator 1](https://ac.nowcoder.com/acm/contest/885/B)

#### 题目思路：

平常这个脑子会比比赛时候好用很多

比赛时候看到数据范围也想到了有没有十进制快速幂这种操作，但是没想到怎么实现

牛客这个测评鸡真的是看心情跑，一会T，一会A

第一版的十进制快速幂大概确实复杂度高了

十进制和二进制的快速幂区别就是

二进制每次是a * a

十进制每次是a * a * a ……a(十次)

这个倍增的思想是不变的

还有就是二进制只用看‘0’ ‘1’来判断乘不乘

而十进制是那一位上的数字是多少就乘多少次

一开始更新a的倍增和算答案b是分开的，但是其实他们中间算的a的幂是有重复的

一起运算会减少复杂度，就能稳A了

#### 题目代码：

```cpp
LL T,N,M,K;
/*-------------------------------------------------------------------------------------------*/
 
/* ------------------------------------------------------------------------------------------*/
void calculate(LL a[][MAX],LL b[][MAX],LL MOD)//这就是一个矩阵乘法
{
    LL c[MAX][MAX] = {0};
    for(int i =0;i < MAX_1;i++)
    {
        for(int j = 0;j < MAX_1;j++)
        {
            for(int k = 0;k < MAX_1;k++)
            {
                c[i][j] += (a[i][k]*b[k][j]) % MOD;
                c[i][j] = c[i][j] % MOD;
            }
        }
    }
    for(int i = 0;i < MAX_1;i++)
    {
        for(int j = 0;j < MAX_1;j++)
        {
            a[i][j] = c[i][j];
        }
    }
}
 
void Qmod2(int n,int m,LL MOD,LL a[][MAX],LL b[][MAX],LL c[][MAX])//快速幂的过程
{
    while(n || m)
    {
        if(n & 1)
        {
            calculate(b,a,MOD);
        }
        if(m & 1)
        {
            calculate(c,a,MOD);
        }
        calculate(a,a,MOD);
        n >>= 1;
        m >>= 1;
    }
}
 
void Qmod1(char str[],LL MOD,LL a[][MAX],LL b[][MAX])//快速幂的过程
{
    int l = strlen(str);
    LL c[MAX][MAX];
    int n;
    for(int i = l-1;i >= 0;i--)
    {
        n = str[i] - '0';
        c[0][0] = a[0][0];
        c[0][1] = a[0][1];
        c[1][0] = a[1][0];
        c[1][1] = a[1][1];
        Qmod2(n,9,MOD,c,b,a);
    }
}
 
 
int main()
{
    //std::ios::sync_with_stdio(false);
    //cin.tie(0);
    //cout.tie(0);
    //freopen("input.in","r",stdin);
    //freopen("output.out","w",stdout);
/* -----------------------------------------------------------------------------------------*/
    LL a[MAX][MAX];
    LL b[MAX][MAX];
    LL x1,x2,p,q;
    scanf("%lld%lld%lld%lld",&x1,&x2,&p,&q);
    LL MOD;
    char str[MAX_2];
    scanf("%s%lld",str,&MOD);
    //构造矩阵，相当于底数
    a[0][0] = 0;
    a[0][1] = q;
    a[1][0] = 1;
    a[1][1] = p;
    //相当于sum= 1
    b[0][0] = 1;
    b[0][1] = 0;
    b[1][0] = 0;
    b[1][1] = 1;
    Qmod1(str,MOD,a,b);
    printf("%lld",((b[0][0] * (x1 % MOD) ) % MOD + (b[1][0] * (x2 % MOD)) % MOD) % MOD);
    return 0;
}
```

### C.[subsequence 1](https://ac.nowcoder.com/acm/contest/885/G)

#### 题目思路：

给你s和t，将t看为十进制数问你s的子序列中有多少个大于t的

第一部分就是位数大于t的，着肯定是比t大的，但是不能有前导0

可以根据杨辉三角预处理出组合数，然后很容易就能求得

第二部分是位数相等的，这个就要用到dp的思想

dp（i，j）为s走到第 i 位的时候，和 t 中前 j 位相等的种数

例如 s：132245     t：123

那么dp（4，2） =  2（s第四位之前有俩个‘12’的子序列）

那么状态转移方程就是:非常容易理解

```cpp
if(s[i] == t[j]) dp[i][j] = (dp[i-1][j-1] + dp[i-1][j]) % MOD;
else dp[i][j] = dp[i-1][j];
```

然后我们在dp的时候更新答案，当`s[i] > t[j]` 有一哥高位比 t 大了，那么后面不管怎么选都大了，就可以更新答案

在后面的（N-i）个数字中再选（M - j）个然后乘上`dp[i-1][j-1]`注意是少一位的dp

#### 题目代码：

```cpp
LL T,N,M,K;
/*-------------------------------------------------------------------------------------------*/
LL C[MAX][MAX];
LL dp[MAX][MAX];
/* ------------------------------------------------------------------------------------------*/
 
int main()
{
    //std::ios::sync_with_stdio(false);
    //cin.tie(0);
    //cout.tie(0);
    //freopen("input.in","r",stdin);
    //freopen("output.out","w",stdout);
/* -----------------------------------------------------------------------------------------*/
    for(int i = 0;i < MAX;i++)//组合数
    {
        C[i][0] = 1;
        for(int j = 1;j <= i;j++)
        {
            C[i][j] = (C[i-1][j] + C[i-1][j-1]) % MOD;
        }
    }
    cin >> T;
    string s,t;
    while(T--)
    {
        cin >> N >> M;
        cin >> s >> t;
        LL ans = 0;
        for(int i = 0;i < N;i++)//长度大于M的部分
        {
            if(s[i] == '0') continue;
            int n = N - i - 1;
            for(int j = M;j <= n;j++)
            {
                ans = (ans + C[n][j]) % MOD;
            }
        }
//cout << ans <<endl;
        dp[0][0] = 0;
        if(s[0] == t[0]) dp[0][0] = 1;
        if(s[0] > t[0]) ans = (ans + C[N-1][M-1]) % MOD;
        for(int i = 1;i < N;i++)
        {
            if(s[i] == t[0]) dp[i][0] = dp[i-1][0]+1;
            else dp[i][0] = dp[i-1][0];
            if(s[i] > t[0]) ans = (ans + C[N-i-1][M-1]) % MOD;
//cout << i << " " <<ans <<endl;
        }
 
        for(int i = 1;i < N;i++)
        {
            for(int j = 1;j < min(M,(LL)i+1);j++)
            {
                if(s[i] == t[j]) dp[i][j] = (dp[i-1][j-1] + dp[i-1][j]) % MOD;
                else dp[i][j] = dp[i-1][j];
                if(s[i] > t[j]) ans = (ans + (C[N-i-1][M-j-1] * dp[i-1][j-1]) % MOD ) % MOD;
//cout << s[i] << " " << j << " "<<ans <<endl;
            }
        }
        cout << ans <<endl;
    }
    return 0;
}
```

