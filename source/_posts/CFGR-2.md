---
title: CFGR-2
date: 2019-04-11 22:15:55
cover:  /img/post_cover/cover30.jpg
categories: cf
tags: 
    - cf
    - 贪心
---

#### 题目链接：

[<http://codeforces.com/contest/1119/problem/B>]()

### 题目思路：

比赛的时候这个题写了好久，主要是就想着按照俩个间距最小放一起，然后就想着放一个把前面的优化一次就写不出来

然后看了这个豁然开朗，排完序相邻的就是间距最小了，嗯，就是这样

### 代码：

```cpp
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
#define LL long long
using namespace std;
const int MAX = 10010;
const int INF = 0xfffffff;//268435455,2e8;
const int MOD = 1;
int T,N,M;
//std::ios::sync_with_stdio(false);
/*-------------------------------------------------------*/

vector<int> bottle;

/* --------------------------------------------------------------*/


int main()
{
    cin >> N >> M;
    int flag= 1;
    for(int i = 0;i < N;i++)
    {
        int x;
        int height = 0;
        cin >> x;
        bottle.push_back(x);
        sort(bottle.begin(),bottle.end());
        for(int i = bottle.size()-1;i >= 0;i -= 2)
        {
            if(i >= 1) height += max(bottle[i],bottle[i-1]);
            else height += bottle[0];
        }
        if(height > M)
        {
            for(int j = i+1;j<N;j++)
            {
                int x;
                cin >> x;
            }
            cout << i <<endl;
            flag = 0;
            break;
        }
    }
    if(flag)cout << N << endl;
    return 0;
}
```



### 题目链接：

[<http://codeforces.com/contest/1119/problem/E>]( /img/post_cover/cover3.jpg)

### 题目思路：

​	这题吧比赛的时候因为B题做了好久其实就没怎么看，我也不知道会不会，啊哈哈哈

​	看了题解发现挺简单的吧，比D要简单

​	就是能构成三角形的只有三个相同边。或者是俩大一小（三个不同，俩小一大都可以证明不能构成三角形）

​	然后就是贪心吧，优先俩大一小，然后三边相同

### 题目代码：

#### MY：

```cpp
#include<bits/stdc++.h>
#define LL long long
using namespace std;
const int MAX = 1000010;
const int INF = 0xfffffff;//268435455,2e8;
const int EPS = 0.0000001;
const int MOD = 1e9+7;
int T,N,M;
//std::ios::sync_with_stdio(false);
/*-------------------------------------------------------*/


/* --------------------------------------------------------------*/


int main()
{
    cin >> N;
    LL ans = 0;
    LL surplus = 0;
    while(N--)
    {
        LL x;
        cin >> x;
        if(x >= 2)
        {
            if(surplus > 0)
            {
                LL k = x / 2;
                if(k > surplus)
                {
                    ans += surplus;
                    x -= 2 * surplus;
                    surplus = 0;
                    if(x >= 3)
                    {
                        ans += x / 3;
                        surplus += x % 3;
                    }
                    else
                    {
                        surplus += x;
                    }
                }
                else
                {
                    surplus -= k;
                    ans += k;
                    if(x % 2 == 1) surplus += 1;
                }
            }
            else
            {
                ans += x / 3;
                surplus += x % 3;
            }

        }
        else
        {
            surplus += x;
        }
    }
    cout << ans << endl;
    return 0;

}
```

#### Other：

这个好简洁呀，没那么分类，直接一次通式处理QAQ

```cpp
#include<bits/stdc++.h>
using namespace std;
const int MAX = 1000010;
const int INF = 0xfffffff;//268435455,2e8;
const int EPS = 0.0000001;
const int MOD = 1e9+7;
int T,N,M;
//std::ios::sync_with_stdio(false);
/*-------------------------------------------------------*/

/* --------------------------------------------------------------*/
int main()
{
    cin >> N;
    LL ans = 0;
    LL surplus = 0;
    while(N--)
    {
        LL x;
        cin >> x;
        LL k;
        k = min(surplus,x/2);
        ans += k;
        surplus -= k;
        x -= 2*k;
        ans += x / 3;
        surplus += x % 3;
    }
    cout << ans << endl;
    return 0;
}
```

