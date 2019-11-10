---
title: NC-6
date: 2019-08-04 11:20:15
cover: /img/post_cover/cover43.jpg
categories: ncoder
tags: 
    - NC	
    - gcd
---

## [2019牛客暑期多校训练营（第六场）](https://ac.nowcoder.com/acm/contest/886)

### A.[Garbage Classification](https://ac.nowcoder.com/acm/contest/886/A)

就用map统计一下每种垃圾有多少个

然后在进行分类，看看每个类型的垃圾有多少个

最后就根据题意分类就好了

### B.[Shorten IPv6 Address](https://ac.nowcoder.com/acm/contest/886/B)

#### 题目思路：

这个题本身不难，但是他有一个坑

第一步先把读进来的二进制转化为十六进制

然后就是找一串最长的0用 ： 代题

如果说有几部分相同长度的0怎么办呢？

首先需要确定的是0的字典序是比 ：小的（ASCII），所以要先变前面的0

但是全题的坑点：变化中间的0为`::`，变完比开头结尾位数少一位，例如8个0，变中间加上冒号相当于11位变俩位

而开头结尾是10位变2位

注意一下只能省略前缀0就没其他的了

#### 题目代码：

```cpp
LL T,N,M,K;
/*-------------------------------------------------------------------------------------------*/
 
/* ------------------------------------------------------------------------------------------*/
 
void mycase(int x,char str[])
{
    cout << "Case #" << x <<": "<<str <<endl;
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
    int cnt = 0;
    char tensix[] = {'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'};
    int pow2[5] = {1,2,4,8};
    while(T--)
    {
        cnt++;
        string str;
        cin >> str;
        char ans[MAX];
        int pos = 1;
        for(int i = 0;i < str.size();i++)
        {
            int n = 0;
            for(int j = 0;j < 4;j++)
            {
                if(str[i+j] == '1') n+= pow2[3 - j];
            }
            ans[pos++] = tensix[n];
            i += 3;
        }
        int l,r;
        l = r = -1;
        int maxl = 0;
        int ansl,ansr;
        ansl = ansr = -1;
        for(int i = 1;i < pos;i++)
        {
            if(ans[i] == '0')
            {
                if(i % 4 == 1)
                {
                    if(l == -1) l = i;
                }
                else if(i % 4 == 0)
                {
                    if(l != -1) r = i;
                    if((r - l + 1) > 4)
                    {
                        if((r - l + 1) > maxl)
                        {
                            ansr = r;
                            ansl = l;
                            maxl = r-l+1;
                        }
                        else if((r - l + 1) == maxl)
                        {
                            if(ansl == 1 || r != pos-1)
                            {
                                ansr = r;
                                ansl = l;
                                maxl = r-l+1;
                            }
                        }
 
                    }
                }
            }
            else
            {
                l = r = -1;
 
            }
        }
        ans[pos] = '\0';
//cout << ans <<endl;
//cout << ansl << " " <<ansr <<endl;
        char rans[MAX];
        int p = 0;
        int flag = 1;
        for(int i = 1;i < pos;i++)
        {
            if(i == ansl)
            {
                rans[p++] = ':';
                rans[p++] = ':';
                i +=  maxl-1;
                flag = 0;
                continue;
            }
            if(i % 4 == 1 && i != 1 && flag)
            {
                rans[p++] = ':';
            }
            if(ans[i] == '0' && i % 4 == 1)
            {
                int j;
                for(j = 0;j < 4;j++)
                {
                    if(ans[i+j] != '0') break;
                }
                i += j - 1;
                if(j == 4) rans[p++] = '0';
            }
            else
            {
                rans[p++] = ans[i];
            }
            flag = 1;
        }
        rans[p] = '\0';
        mycase(cnt,rans);
 
    }
    return 0;
}
```

### D.Move

#### 题目思路：

我感觉题目的数据太水了吧

V的下限肯定是max（体积和除以箱子数量，最大的体积）

上限就算每个箱子装不下那个最大的，最多也就是下限+1000，不会太大，所以就枚举（证明看题解）

![](/img/post_blog/NC-6-1.png)

然后就是check每个答案，一种就是暴力的O（N^2），这样也是可以过的，虽然理论是不行

还有就是剪枝的暴力找，只需要20ms左右，就比较推荐

还有题解里说的O（NlogN），使用multiset的方法，跑了500ms

还有我自己写的multiset比较乱但是跑了300ms

玄学测评鸡

#### check部分代码：

```cpp
bool check(int n)//20ms
{
    int b[MAX];
    fill(b,b+MAX,0);
    int cnt = M;
    int l,r;
    int m;
    l = 0,r = N-1;
    int cmt = 0;
    while(cnt)
    {
        m = n;
        for(int i = r;i >= l;i--)
        {
            if(m < a[l]) break;
            if(m >= a[i] && !b[i])
            {
                b[i] = 1;
                m -= a[i];
                cmt++;
            }
            while(b[r]) r--;//当前最大值
            while(b[l]) l++;//当前最小值
        }
        cnt--;
    }
    return cmt == N;
}
```

```cpp
bool check(int V) {//500ms
    std::multiset<int> multiset;
    for (int i = 0; i < N; ++i) {
        multiset.insert(a[i]);
    }
    for (int i = 1; i <= M && !multiset.empty(); ++i) {
        int now = V;
        while (now && !multiset.empty()) {
            auto it = multiset.upper_bound(now);
            if (it == multiset.begin()) {
                break;
            }
            --it;
            now -= *it;
            multiset.erase(it);
        }
    }
    return multiset.empty();
}
```

### J.Upgrading Technology

#### 题目思路：

题解完美的说出了我们的**错误**思想，先假设到 j 都升满，然后对每个 i 看再继续走看能赚的钱最多为多少（负数）但是这样贪心选取的只是等级提升赚的最大了，但是全体升级可能给的奖励是负的，支出更大了



所以说**正确**的做法是：枚举一种科技作为等级最小的科技，然后枚举这个科技的level j，然后其他科技可以在（j ， M）之间取了

我们预处理出来奖励的前缀和

a（i，j）继续学习花的钱（赚的最多钱）（负数）

a（1->N,j）继续学习花的钱的和

都学到 j 等级时需要花多少钱

我们枚举的时候就很快速的找到答案了

​                `temp = lesum[j] - tesum[j] - temsum[j] + temax[i][j];`

学习到 j 级奖励的和 - 学习到 j 级花的钱 - 所有人继续学习花的钱（负数）+ i 位继续学习花的钱（i 只能为 j级，不能偷偷学了）

#### 题目代码：

```cpp
LL T,N,M,K;
/*-------------------------------------------------------------------------------------------*/
LL lesum[MAX];//奖励和
LL temax[MAX][MAX];//i技能学到j时，再向上能赚多少
LL temsum[MAX];//j时，向上赚的和
LL tesum[MAX];//1 - i层的技能消耗和
LL a[MAX][MAX];//技能
/* ------------------------------------------------------------------------------------------*/
  
void mycase(int x,LL ans)
{
    cout << "Case #" << x <<": "<<ans <<endl;
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
    int cnt = 0;
    while(T--)
    {
        cnt++;
        cin >> N >> M;
        for(int i = 1;i <= N;i++)
        {
            a[i][0] = 0;
            for(int j = 1;j <= M;j++)
            {
                cin >> a[i][j];//技能
            }
        }
  
        lesum[0] = 0;
        LL level;
        for(int i = 1;i <= M;i++)
        {
            cin >> level;//奖励
            lesum[i] = level + lesum[i-1];//奖励和
        }
  
        fill(tesum,tesum+MAX,0);
        for(int i = 1;i <= N;i++)
        {
            temax[i][M] = 0;
            tesum[M] += a[i][M];
            for(int j= M-1 ; j >= 0;j--)
            {
                tesum[j] += a[i][j];
                temax[i][j] = min(a[i][j+1]+ temax[i][j+1],min(a[i][j+1],(LL)0));//看看能不能靠学习赚钱了，不能赚钱就不学了
            }
        }
  
        fill(temsum,temsum+MAX,0);
        for(int i = 0;i <= M;i++)
        {
            tesum[i] += tesum[i-1];//等级都到i的花费
            for(int j = 1;j <= N;j++)
            {
                temsum[i] += temax[j][i];
            }
        }
        LL ans = 0;
        LL temp;
        for(int i = 1;i <= N;i++)
        {
            for(int j = 0;j <= M;j++)
            {
                temp = lesum[j] - tesum[j] - temsum[j] + temax[i][j];
                ans = max(ans,temp);
            }
        }
        mycase(cnt,ans);
    }
    return 0;
}
```

