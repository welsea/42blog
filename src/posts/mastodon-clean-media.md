---
title: 用crontab清理长毛象媒体文件
date: 2022-10-23 19:13:51
category: "一些经验"
tags: ["mastodon"]
---
写一个crontab自动清理毛毛象的media files。
<!-- more -->

**以下所有命令都在root用户下执行。**

## 编写mastodon用户的crontab：

```bash
crontab -e -u mastodon
```

打开文件后在里面直接添加下面的内容，
注意最后一行：`10 * * * * cd /home/mastodon/live && bin/tootctl media remove`，这里的`10`代表每个小时的十分（比如10:10）执行这个指令，为了查看crontab是否正确运行，建议先将时间设置为当前时间的5-10分钟后，如果命令正常执行了就可以再改为想要的执行周期。

```bash
  SHELL=/bin/bash
  PATH=/home/mastodon/.rbenv/shims:/home/mastodon/.rbenv/bin:/usr/local/bin:/usr/bin:/bin

  ###
  ### Mastodon cronjobs for media cache purging
  ###
  RAILS_ENV=production
  10 * * * * cd /home/mastodon/live && bin/tootctl media remove

```
## 重启crontab

```bash
sudo service cron restart
```

然后蹲等到设置的时间，之后查看运行状态。

### 查看crontab是否正确运行

有两种方式，
第一种：

```bash
systemctl status cron.service
```

第二种，查看log：

```bash
cat /var/log/cron.log
```

比较推荐第二种。如果发现没有log文件，需要启动cron log记录，按照下面步骤进行：

1. 打开conf文件

```bash
sudo vim /etc/rsyslog.d/50-default.conf
```

2. 找到`cron.* /var/log/cron.log` 这行，把前面的注释去掉。
3. 重启rsyslog: `sudo service rsyslog restart`
4. 查看log。

如果log中出现`(CRON) info (No MTA installed, discarding output)`，则需要安装和启动mail服务：

```bash
sudo apt-get install postfix
sudo service postfix start
```

选择local，名字随意填，之后crontab的日志就也可以用`tail /var/spool/mail/mastodon`。

完成！