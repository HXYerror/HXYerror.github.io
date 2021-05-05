/**
  随机获取名言.

  author:prd.
  version:2016.7.22
  note:名言均来自[一个](https://www.wufazhuce.com)

  使用示例(关于使用的调用,请参考最底部的函数.):
        1.先引入本js.
        2.在想使用的地方,调用getMingYan()函数即可获取名言.[getMingYanHref()获取可以跳转至One的名言,getMingYanContent():只获取名言内容]
        3.名言中存储为json数据,index对应One的每一期号,content是名言.
        4.请尊重版权,在展示名言的同时,可将名言链接至One.例如:<a href="https://wufazhuce.com/one/14">是狼是人，日久见心。</br> - </br>小饭</a>其中的14为期号.
*/
var mingyan=new Array();
mingyan.push("{'index':1024,'content':'不论什么阶段，每天都要学习几刻，以后的你会感激万分</br> - </br>寒萧雨'}");
mingyan.push("{'index':1023,'content':'把事情留到最后做一定是失败的，最后的时刻是最不想做的时刻</br> - </br>寒萧雨'}");
mingyan.push("{'index':331,'content':'知识改变命运 精力用在什么地方，哪里就会开花</br> - </br>寒萧雨'}");
mingyan.push("{'index':226,'content':'很高兴又见到你。</br> - </br>寒萧雨'}");
mingyan.push("{'index':127,'content':'成功的人总是多才多艺，成功的人总是努力，要一直一直奔跑</br> - </br>寒萧雨'}");


/**
    随机获取名言.

    直接调用此函数即可.
*/
function getMingYan(){
  return (mingyan[parseInt(Math.random()*(mingyan.length-1))]);
}

/*
  获取名言,并链接至One.
*/
function getMingYanHref(){
  var item = getItem();
  return "<a href='https://wufazhuce.com/one/"+item.index+"' target='_blank'>"+item.content+"</a>";
}

function getItem(){
  return eval('(' +(mingyan[parseInt(Math.random()*(mingyan.length-1))])+ ')');
}

/*
  只获取内容.
*/
function getMingYanContent(){
  var item = getItem();
  return item['content'];
}