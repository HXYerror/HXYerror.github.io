---
title: 15ICPC上海
date: 2019-07-16 10:25:26
cover: /img/post_cover/cover11.jpg
mathjax: true
categories: icpc
tags: 
    - icpc
    - gcd
---

### [B - Binary Tree](https://vjudge.net/problem/HDU-5573)

####  题目思路：

我们可以想到每个数字都一可以用二进制表示

那么就是由1，2，4，8，······可以发现正好是二叉树一直走左支

题目中的N <= 2^k，所以保证题目有解

但是这道题并不是选和不选，而是加还是减

1.一直走左儿子，加起来为sum。sum一定为奇数

2.如果N为偶数，我们在最后走右儿子

3.用cha = sum - N，这时我们能保证cha是一个偶数

4.易知减去一个节点n，就相当于sum-2*n

5.所以我们cha/2（cha是偶数，可以整除），这样减去 cha/2 节点值就可以了

6.cha/2一定比sum小，所以用节点一定可以表示出来cha/2，同样转化二进制表示就可以找到改变的节点

#### 题目代码：

```cpp
/*-------------------------------------------------------------------------------------------*/
LL tpow[MAX];
int ans[MAX];
/* ------------------------------------------------------------------------------------------*/
void mycase(int n)
{
    cout << "Case #" << n <<":" <<endl;
}

int main()
{
    std::ios::sync_with_stdio(false);
    //cin.tie(0);
    //cout.tie(0);
    //freopen("input.in","r",stdin);
    //freopen("output.out","w",stdout);
/* --------------------------------------------------------------------------------------*/
    cin >> T;
    int CNT = 0;
    for(int i =0;i < MAX;i++)
    {
        tpow[i] = 1 << i;
    }
    while(T--)
    {
        CNT++;
        cin >> N >> M;
        LL sum = 0;
        int flag = 0;
        for(int i =0;i < M;i++)
        {
            sum += tpow[i];
            ans[i] = 1;
        }
        if(!(N&1)) flag = 1;
        sum += flag;
        LL cha = sum - N;
        cha >>= 1;
        int i = 0;
        while(cha)
        {
            int x = cha&1;
            ans[i] = ans[i]-x;
            i++;
            cha>>=1;
        }
        mycase(CNT);
        for(int j = 0;j < M-1;j++)
        {
            cout << tpow[j] << " ";
            if(ans[j]) cout << "+"<<endl;
            else cout << "-" <<endl;
        }
        cout << tpow[M-1] + flag<< " ";
        if(ans[M-1]) cout << "+"<<endl;
        else cout << "-" <<endl;
    }
    return 0;
}
```



### [F - Friendship of Frog](https://vjudge.net/problem/HDU-5578)

#### 题目思路：

就循环找一下每俩个相同字母之间的距离就好了

### [K - Kingdom of Black and White](https://vjudge.net/problem/HDU-5583)

#### 题目思路：

1. 计算出每一段的数量

2. 计算出初始的每一段的平方和sqsum以及初始的ans

3. 我们把情况分为三种

   1. 当前这一段比前面一段大，那么前面给后面一位
   2. 当前这一位比前面小并且不等于一，把后面给前面一位
   3. 当前这一位等于1，改变这一位，就能联通前后

   但是第三种情况需要注意当i=N是，后面已经没有了段，需要重置为0，如果上一组数据比这一组多的话的就会出问题，卡了好久，因为想着数组覆盖就没有初始化

   `if(i+1>=cnt) sqsum[i+1] = sum[i+1] = 0;`

#### 题目代码：

```cpp
LL T,N,M;
/*-------------------------------------------------------------------------------------------*/
LL sum[MAX];
LL sqsum[MAX];
/* ------------------------------------------------------------------------------------------*/

void mycase(int n)
{
    cout << "Case #" << n <<": ";
}

LL befores(string str,int *cnt)
{
    LL ans = 0;
    for(int i = 0;i < str.size();i++)
    {
        if(i > 0)
        {
            if(str[i] == str[i-1])
            {
                sum[*cnt]++;
            }
            else
            {
                sqsum[*cnt] = sum[*cnt]*sum[*cnt];
                ans += sqsum[*cnt];
                (*cnt)++;
                sum[*cnt]++;
            }
        }
        else sum[*cnt]++;
    }
    sqsum[*cnt] = sum[*cnt]*sum[*cnt];
    ans += sqsum[*cnt];
    (*cnt)++;
    return ans;
}

int main()
{
    std::ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    //freopen("input.in","r",stdin);
    //freopen("output.out","w",stdout);
/* --------------------------------------------------------------------------------------*/
    //min shang or you
    cin >> T;
    int CNT = 0;
    while(T--)
    {
        CNT++;
        LL ans = 1;
        string str;
        cin >> str;
        fill(sum,sum+MAX,0);
        int cnt = 0;
        LL tempsum = befores(str,&cnt);
        LL tempsq;
        for(int i = 1;i < cnt;i++)
        {
            if(sum[i] <= sum[i-1])
            {
                if(sum[i] == 1)
                {
                    if(i+1>=cnt) sqsum[i+1] = sum[i+1] = 0;

                    LL n = (sum[i-1]+1+sum[i+1]);
                    tempsq = n*n;
                    ans = max(ans,tempsum - sqsum[i-1]-sqsum[i]-sqsum[i+1] + tempsq);
                }
                else
                {
                    LL n = sum[i-1]+1;
                    LL m = sum[i]-1;
                    tempsq = n*n+m*m;
                    ans = max(ans,tempsum - sqsum[i-1]-sqsum[i]+ tempsq);
                }
            }
            else
            {
                LL n = sum[i-1]-1;
                LL m = sum[i]+1;
                tempsq = n*n+m*m;
                ans = max(ans,tempsum - sqsum[i-1]-sqsum[i]+ tempsq);
            }
        }
        ans = max(ans,tempsum);
        mycase(CNT);
        cout<<ans <<"\n";
    }
    return 0;
}
```

### [L - LCM Walk](https://vjudge.net/problem/HDU-5584)

#### 题目思路：

1. 只能由max(x,y)走到下一步，所以路径是唯一的
2. gcd(x,y) = k ,x = nk,y = mk ,lcm(x,y) = nmk（假设x>y)
   1. 所以下一步走到（n(m+1)k,mk)
   2. 由于n与m互质，(m+1)与m互质，所以gcd还等于k
3. 逆推就可以得到当前点是由(x/(y/k+1),y)得到
4. 终止条件我还是有一点没搞懂，就是x中必须要有:(m+1)*k这个因子

[论证比较全 传送门](https://blog.csdn.net/codeswarrior/article/details/82379219)

#### 题目代码：

```cpp
void mycase(int n)
{
    cout << "Case #" << n <<": ";
}
LL gcd(LL x,LL y)
{
    return x%y ? gcd(y,x%y) : y;
}

int main()
{
    std::ios::sync_with_stdio(false);
    //cin.tie(0);
    //cout.tie(0);
    //freopen("input.in","r",stdin);
    //freopen("output.out","w",stdout);
/* --------------------------------------------------------------------------------------*/
    cin >> T;
    int CNT = 0;
    LL x,y;
    while(T--)
    {
        CNT++;
        cin >> x >> y;
        int ans = 1;
        LL k = gcd(x,y);
        if(x < y)
        {
            x = x + y;
            y = x - y;
            x = x - y;
        }
        while(x % ((y/k+1)*k) == 0 )
        {

            x = x / (y/k+1);
            ans++;
            if(x < y)
            {
                x = x + y;
                y = x - y;
                x = x - y;
            }
        }
        mycase(CNT);
        cout << ans <<"\n";
    }
    return 0;
}
```

