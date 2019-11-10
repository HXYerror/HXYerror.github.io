---
title: NC-3
date: 2019-07-27 19:44:57
cover: /img/post_cover/cover17.jpg
categories: ncoder
tags:
    - 前缀和
---

## [2019牛客暑期多校训练营（第三场）](https://ac.nowcoder.com/acm/contest/883)

### [Crazy Binary String](https://ac.nowcoder.com/acm/contest/883/B)

#### 题目思路：

定义1为+1，0为-1

扫一遍数组，计算出前缀和，并将每个数字出现的index记录下来

然后逆序往回找，想要区间0和1的个数相等，就要区间和为0

所以当我们找到一个区间前缀和和为n，只需要减去前缀和为n的区间

此时就找一下在他前面有没有前缀和为n的区间，刚才已经记录

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
const int MAX = 200010;//100000
const int MAX_1 = 100000;
const int INF = 0x3f3f3f3f;//1061109567,1e9,int-MAX2147483647;
const double EPS = 0.0000001;
const int MOD = 998244353;//998244353;
const double PI = acos(-1);
LL T,N,M;
/*-------------------------------------------------------------------------------------------*/
int sum[MAX];
vector<int> flag[MAX];
/* ------------------------------------------------------------------------------------------*/


int main()
{
    std::ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    //freopen("input.in","r",stdin);
    //freopen("output.out","w",stdout);
/* --------------------------------------------------------------------------------------*/
    cin >> N;
    char c;
    int ans = 0;
    int cnt0,cnt1;
    cnt0 = cnt1 = 0;
    for(int i = 0;i < N;i++)
    {
        cin >> c;
        if(c == '0')
        {
            sum[i] = sum[i-1]- 1;
            cnt0++;
            flag[sum[i]+MAX_1].push_back(i);
        }
        else
        {
            cnt1++;
            sum[i] = sum[i-1] + 1;
            flag[sum[i]+MAX_1].push_back(i);
        }

    }
    if(cnt0 == N || cnt1 == N)
    {
        cout << "0" << " 0" <<endl;
        return 0;
    }
    for(int i = N-1;i >=0;i--)
    {
        int n;
        if(sum[i] == 0)
        {
            ans = max(ans,i+1);
            continue;
        }
        if(flag[sum[i]+MAX_1].size())
        {
            n = flag[sum[i]+MAX_1][0];
        }
        int m = i - n;
        ans = max(m,ans);
        if(ans == N) break;
    }
    cout << ans << " " << min(cnt0,cnt1)*2 <<endl;
    return 0;
}
```

