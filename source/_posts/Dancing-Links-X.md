---
title: 专题-Dancing Links X
date: 2019-10-25 21:33:32
cover: /img/post_cover/cover55.jpg
categories: DLX
tags: 
    - DLX
mathjax: true
---

# 122

```cpp
struct DLX
{
    int n,m,si;//n:row,m:col,si:node number
    int U[MAX],D[MAX],L[MAX],R[MAX],row[MAX],col[MAX];//i node it and row and col
    //行头结点->right和->left分别指向第i行的第一个“1”和最后一个“1”对应的结点

    //列头节点->down和->up分别指向第i列的第一个“1”和最后一个“1”对应的结点
    int H[MAX_1],S[MAX_1];//记录行的选择情况和列的覆盖情况
    int ansd,ans[MAX];
    void init(int nn,int mm)
    {
        n = nn;
        m = mm;
        for(int i = 0;i <= m;i ++)//列的头结点
        {
            S[i] = 0;//都没有被覆盖
            U[i] = D[i] = i;//列是空的，都指向自己
            L[i] = i-1;//横向的链连起来
            R[i] = i+1;
        }
        L[0] = m;//连成一个环
        R[m] = 0;
        si = m;//当前有了si个节点
        for(int i = 1;i <= n;i++)
        {
            H[i] = -1;//最开始行都没
        }
    }
    void link(int r,int c)//insert node(r,c)//怎么操作的
    {
        col[++si] = c;//增加一个节点si+1，并且所在的列为c
        S[c]++;//c列的1的数量++
        row[si] = r;//所在的行为r

        //D[c]:c列的第一个1
        //U[c]:c列的最后一个1
        U[si] = U[c];//节点的上指针指向上一个1
        D[si] = c;//节点的下指针指向列头结点
        D[U[c]] = si;//当前列的上一个1的下指针指向si
        U[c] = si;//c列头结点的上指针指向si，该列的最后一个1

        if(H[r] < 0)//还没有节点
            H[r] = L[si] = R[si] = si;//指向自己，h[r]代表本行第一个元素
        else
        {
            R[si] = H[r];//最右边的节点的右指针指向第一个节点
            L[si] =  L[H[r]];//最右边的节点的左指针指向前一个节点

            R[L[H[r]]] = si;//前一个节点的右指针指向当前节点
            L[H[r]] = si;//第一个节点的左指针指向当前节点
        }
    }
    void myremove(int c)//delete c col
    {
        L[R[c]] = L[c];//右边节点的左节点从塔变为他的左节点
        R[L[c]] = R[c];
        for(int i = D[c];i != c;i = D[i])
        {
            for(int j = R[i];j != i;j = R[j])
            {
                U[D[j]] = U[j];//上下断开
                D[U[j]] = D[j];
                --S[col[j]];//该列1元素--
            }
        }
    }
    void resume(int c)//添加第c列
    {
        for(int i = U[c];i != c;i = U[i])//和删除的时候的方向是反着的
        {
            for(int j = L[i];j != i;j = L[j])
            {
                U[D[j]] = D[U[j]] = j;
                ++S[col[j]];
            }
        }
        L[R[c]] = R[L[c]] = c;//头结点重新连接
    }
    bool dance(int d)//深度d
    {
        if(R[0] == 0)//达到全覆盖，头结点指向头节点
        {
            ansd = d;
            return 1;
        }
        int c = R[0];
        for(int i = R[0];i != 0;i = R[i])
        {
            if(S[i] < S[c])
                c = i;
        }//选择包含1最少的一列
        myremove(c);
        for(int i = D[c];i != c;i = D[i])
        {
            ans[d] = row[i];
            for(int j = R[i];j != i;j = R[j])//选了一行
                myremove(col[j]);//移除这一行其他包含1的列
            if(dance(d+1))//下一层
                return 1;
            for(int j = L[i];j != i ;j = L[j])//反移除
                resume(col[j]);
        }
        resume(c);
        return 0;
    }

}answer;
```

