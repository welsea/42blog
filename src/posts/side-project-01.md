---
title: Side project 001：维京日历
date: 2025-01-20 19:53:16
tags: [ "side-project","礼物" ]
category: "生活是这样的"
---


庆祝我第一次真正意义上完成了一个side project并且正式投入使用（算是吧）！！！掌声！！！

项目是一个维京日历网站，叫[Primstav](https://primstav.site)，是送给2n妈妈，E女士——一位超酷的考古学家——的圣诞礼物嘿嘿，她很喜欢！我感觉也可能是本网站唯一的用户了哈哈哈哈。这也是为什么页脚写的是Nisse Production，圣诞老人出品嘿嘿。

简单介绍一下Primstav，也就是维京日历，顾名思义就是维京人记录节日用的嗯。一般是一把木头尺子，长下图这样，有夏季符号（太阳）的那面日期是四月到十月，另一面冬季符号（雪花）是从十月到来年四月。每个节日都会有一个对应的符号。

<img src="https://media.snl.no/media/45527/standard_primstav.jpg" alt="primstav" style="width:80%"  />



而网站就是这个日历的在线版。打开网站的话首先展示的是距离当前日期最近的节日，包括节日名称、日期和介绍，这个“最近”是向前取的，也就是说网站会优先展示今天的对应节日，如果今天没有的话会展示已经过去的节日里最近的那一个<span style="font-size: 0.7em;position:relative;top: -0.4em;color: #3c76a8;">1</span>。同时也有按钮可以查看前一个和下一个节日。

关于数据来源，节日数据一开始是从[UiO](https://www.titan.uio.no/blogg/sverre-holm/2015/en-moderne-primstav.html)那里拿的，但是我跟[Leksikon](https://snl.no/primstav)的页面一对发现咋还有出入呢，完了再一看2n家里的那把日历怎么图标数量也对不上，最后还是拜托2n爸爸把他们家里的那把日历的对应手册给我们寄过来才一一对照补全了节日，标明了图标。也侧面说明这个东西确实没有官方（？）统一数据，所以网站数据的准确性也不能完全保证的...但是我们尽力了！

比较中二的一点是，后期我们给每个节日加了维京语名字。打开网页会先显示维京语名字，慢慢变透明，再显示挪威语的信息（灵感来源：[valheim](https://store.steampowered.com/app/892970/Valheim/)）。虽然维京语看起来是酷酷的，但其实也是网上找的维京语字母表翻译的，所以也不保证准确性啦哇哈哈哈。

节日logo网上也找不到完整且清晰的图标，所以最后都是2n对着他家里那把日历的照片画的，虽然早就决定要做这个，但是一直到十月才开始真的认真搞，我还要上班他还要代课，2n画到圣诞前一周还没画完，他拿着ipad狂画，我在旁边抱着笔记本写码，差点被E抓个正着。

背景图也是纯手工绘制（不然呢），因为对copyright一窍不通，也不是很懂约画手能不能用在开源项目，所以还是自己搞了，维京船是我画的，头盔是2n画的，是不是都很可爱呀！

其实网站本身是很简单的，也有点粗糙。About页基本就是圣诞夜前一天随便写了写，节日logo也有的不小心导出时带了白色背景，介绍和节日名都是挪威语然而其他按钮和about页却又是英语...等等等等问题不要太多...但是还是很高兴，我终于终于，完成了一个side project。就算缺点很多，技术也很简单（非常纯粹的前端三件套），但是全程非常满足，很期待完成，算是明白了一些为什么有的人下班还在码了，有动力就有生产力嘛！希望以后会做更多的side project，让自己不那么排斥写码。




<br />
<br />
<br />
<div style="border-top:1px solid black; font-size:0.8em; width:fit-content">
1. 此处感谢小鸟编辑，语句通顺多啦！
</div>

