---
title: ECF-63-2-C
date: 2019-04-24 21:20:08
cover: /img/post_cover/cover31.jpg
categories: cf
tags: 
    - cf	
    - gcd
---

### 题目链接：

[<http://codeforces.com/contest/1155/problem/C>](http://codeforces.com/contest/1155/problem/C)

### 题目思路：

一开始题读错了，还以为要在区间响

然后其实就是找间隔的gcd，又想成了俩俩间隔的gcd必须相同，但其实也不是，只要把所有间隔都gcd一遍，求出来的就是能满足所有间隔的最大gcd，然后在p[i]中找一个他的因子就好了

然后re了一发，因为如果只有俩个数，就只有一个间隔，没法gcd！

### 题目代码：

```cpp
/*-------------------------------------------------------------------------------------------*/
LL x[MAX];
LL k[MAX];
LL p[MAX];
/* ------------------------------------------------------------------------------------------*/

LL gcd(LL a,LL b)
{
    return a % b == 0? b : gcd(b,a%b);
}

int main()
{
    std::ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
/* --------------------------------------------------------------------------------------*/
    cin >> N >>M;
    int f = 0;
    for(int i = 1;i <= N;i++)
    {
        cin >> x[i];
        k[i] = x[i]-x[i-1];
    }
    LL m;
    if(N > 2)
    {
        m = gcd(k[2],k[3]);
    }
    else m = k[2];//RE RE RE RE RE
    for(int i= 4;i <= N;i++)
    {
       m = gcd(k[i],m);
    }

    LL ans = 0;
    for(int i = 1;i <= M;i++)
    {
        cin >> p[i];
    }
    int j;
    for(j = 1;j <= M;j++)
    {
        if(m % p[j]  == 0)
        {
            ans = j;
            f = 1;
            break;
        }
    }
    if(j == M+1) f= 0;

    if(f)
    {
        cout <<"YES" <<"\n" ;
        cout << x[1] <<" " << ans;
    }
    else cout << "NO";
    return 0;
}
```

