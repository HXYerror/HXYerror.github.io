---
title: NC-7
date: 2019-08-09 10:46:39
cover: /img/post_cover/cover47.jpg
categories: ncoder
tags: 
    - NC	
---

## [2019牛客暑期多校训练营（第七场）](https://ac.nowcoder.com/acm/contest/887)

### A.[String](https://ac.nowcoder.com/acm/contest/887/A)

#### 题目思路：

其实就是要求一个字符串，把原串的后缀拼到前面的时候，每一种后缀拼完字典序都比原串大

然后题目给你一个s，问你s最少能切割为多少个这样的字符串

可以发现，这样的串一定是0开头的1结尾的

那么如果s开头是1，那么直到遇见0，这些1是一段

然后结尾是0的话，往回走直到遇见1，这些0是一段

然后中间的：

首先我们可以把这些字符串分为01段，因为这样的串一定是0开头的1结尾的

1.我们每次把可能的最多的01段拼到一起，然后每次拿（1，2，……n-1）个’01‘段的后缀拼到前面比较

![](/img/post_blog/NC-7-1.png)

如果所有长度的后缀拼完的都比原来的大，说明这些01段组成的字符串是满足所求的

2.如果有一个比原串小那么，就不行，就减去最末尾的一个01段，继续判断，直到找见满足的

最坏的情况就是只有一个’01‘段本身做一个所求字符串

3.然后继续从刚才去掉的’01‘段种找（回到第一步，用过的01段就不能用了），直到所有的都找完

a，好难啊，说不清楚，看看代码的注释呀

#### 题目代码：一坨屎

```cpp
int T,N,M,K;
/*-------------------------------------------------------------------------------------------*/
string str;
/* ------------------------------------------------------------------------------------------*/
int solve(int l,int r,vector<int> a,int n,int cnt)
{
    char c[MAX];
    int j = 0;
    for(int i = a[l];i <= n;i++)//第一步拼尽可能多的01段
    {
        c[j++] = str[i];
    }
    int lc = j;
    c[j] = '\0';
    char cmp[MAX];
    int k = l;
    while(r >= l)//第二步,cmp
    {
        while(k <= r)
        {
            int i;
            int j = 0;

            int m;
            if(r == cnt-1) m = n + 1;
            else m = a[r+1];

            for(i = a[k];i < m;i++)
            {
                cmp[j++] = str[i];
            }
            for(i = a[l];i < a[k];i++)
            {
                cmp[j++] = str[i];
            }
            cmp[j] = '\0';
            if(strcmp(c,cmp) > 0) break;
            k++;
        }
        if(k == r+1) break;
        int m;
        m = n - a[r] + 1;
        c[lc - m] = '\0';
        r--;
    }
    return r;
}

int main()
{
    std::ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    //freopen("input.in","r",stdin);
    //freopen("output.out","w",stdout);
/* -----------------------------------------------------------------------------------------*/
    cin >> T;
    while(T--)
    {
        cin >> str;
        N = str.size();
        vector<int> a;
        int cnt1 = 0;
        int k = 0;
        for(k = 0 ;k < N;k++)//前面1
        {
            if(str[k] == '1')
            {
                cnt1++;
            }
            else break;
        }
        if(cnt1 > 0)
        {
            while(cnt1--)
            {
                cout << "1";
            }
            cout << " ";
        }
        int cnt0 = 0;
        int j;
        for(j = N-1;j >= 0;j--)//后面0
        {
            if(str[j] == '0') cnt0++;
            else break;
        }
        int cnt = 0;
        for(int i = k;i < j;)//分为01段
        {
            a.push_back(i);
            cnt++;
            while(i <= j)
            {
                if(str[i] == '0') i++;
                else break;
            }
            while(i <= j)
            {
                if(str[i] == '1') i++;
                else break;
            }
        }
        int n = -1;
        while(n < cnt-1)
        {
            int m = n+1;
            n = solve(n+1,cnt-1,a,j,cnt);//第三步，不断的从剩下的01段中找
            int r;
            if(n == cnt-1) r = j+1;
            else r = a[n+1];
            for(int i = a[m];i < r;i++)
                cout << str[i];
            cout << " ";
        }
        if(cnt0)
        {
            while(cnt0--) cout << "0";
        }
        cout <<endl;
    }
    return 0;
}

```

### B.[Irreducible Polynomial](https://ac.nowcoder.com/acm/contest/887/B)

为什么3次以上一定可以

### D.[Number](https://ac.nowcoder.com/acm/contest/887/D)

超简单啊，位数要是小于P就行，多的话的不断加0

### J.[A+B problem](https://ac.nowcoder.com/acm/contest/887/J)

很简单啊，把每一位提取出来，先提取的不断乘10

加一下，在反转一下