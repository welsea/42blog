---
title: 不如来搞一个Hugo博客
date: 2023-02-03 13:18:45
tags: ["Hugo"]
category: "一些经验"
---

vps上只有一个毛毛象，决定把博客也搞到vps上，顺便从hexo换到hugo。
<!-- more -->
## Hugo
### 安装
为了方便更新blog，我选择在本地新建hugo site，之后再推到vps上就行了。如果使用GitHub不方便的话，也可以直接拷贝public文件夹到服务器哦。
所以首先本地安装一下hugo，这里跟着[官方文档](https://gohugo.io/installation/)走就好啦。
不过如果想在服务器更新博客的话（...），与其用`apt install`，建议从[release页](https://github.com/gohugoio/hugo/releases)直接下载需要的版本安装，比如我的系统是` Ubuntu 18.04 LTS x64`，这里我选择`hugo_extended_0.110.0_linux-amd64.deb`下载:
```
$ wget https://github.com/gohugoio/hugo/releases/download/v0.110.0/hugo_extended_0.110.0_linux-amd64.deb
```
然后安装
```
$ sudo dpkg -i hugo_extended_0.110.0_linux-amd64.deb
```
 `hugo version`查看一下当前版本。


安装好之后就可以新建博客啦。

选择使用服务器直接写博客的跳到后面的部署服务器部分。

### 新建博客
创建site，这里的`mysite`是新建的site名称，下面命令会直接在当前目录创建文件夹，所以记得先切换目录哈。
```
$ hugo new site mysite
```
下面的部分follow官方文档的[quick start部分](https://gohugo.io/getting-started/quick-start/)，主题什么的之后更改也可以。
```zsh
$ cd mysite
$ git init
$ git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke themes/ananke
$ echo "theme = 'ananke'" >> config.toml
$ hugo server
```
可以在成功看到hugo的页面就可以啦。

### 配置GitHub
>复读一下我自己：如果使用GitHub不方便的话，也可以直接拷贝public文件夹到服务器哦，看下一步。

去GitHub新建一个仓库，在本地添加一下remote（所有命令在刚刚新建的site目录下运行）。因为我是ssh登陆GitHub所以这里用ssh的链接举例。建议使用ssh登录啦，方便安全！
```zsh
$ git remote add origin git@github.com:username/mysite.git
$ git branch -M main
```
如果只想推public文件夹的话就在本地的site目录下加一个`.gitignore`文件过滤其他文件夹，这一步可以省略。
接下来本地build一下Hugo，然后推到GitHub的仓库里。
```powershell
$ hugo
$ git add .
$ git commit -m "hugo"
$ git push -u origin main
```
ok！

## 部署服务器
现在来到服务器端。
先来创建一个新用户。这里的`blog`就是新建用户的用户名。详细信息看情况填写。
```sh
$ adduser --disabled-login blog
```
然后切换一下用户
```bat
$ su - blog
```
接下来可以：
1. 把刚刚推到GitHub的文件拉下来。
    ```
    $ mkdir mysite
    $ cd mysite
    $ git init
    $ git remote add origin git@github.com:username/mysite.git
    $ git branch -M main
    $ git pull origin main
    ```
2. 没有用GitHub的话直接拷贝public文件夹，命令是在本地运行而不是服务器哦。

    这里的`root@server`其中的server改成自己的服务器ip。
    ```
    $ scp -r ./public root@server:/home/blog/ 
    ```
3. 之前选择在服务器更新博客的可以在这里运行新建博客的命令。

之后在服务器`ls -l`check一下文件，顺便使用`pwd`来确认一下路径，复制粘贴一下等下配置nginx用。

#### 配置nginx
```bat
$ exit
$ cd /etc/nginx/sites-available/
```
新建配置文件，这里的`blog`是配置文件的名字，可以随意。
```sh
$ vim blog
```
下面贴出我的配置，其中的`example.com`要修改成自己的域名哦，我直接用的我毛象域名的二级域名，省钱（。）

还有`/home/blog/mysite/public`路径也要修改，是刚刚复制粘贴的路径哦。
```conf
proxy_cache_path /tmp/blog_nginx levels=1:2 keys_zone=blog:100m max_size=1g inactive=24h;
server {
     listen 80;
     listen [::]:80;
     server_name example.com;

     root /home/blog/mysite/public;
     index index.html index.xml;

     access_log /var/log/nginx/blog-access.log;
     error_log /var/log/nginx/blog-error.log;
     
     location / {
     }
	
}
server {    
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!MEDIUM:!LOW:!aNULL:!NULL:!SHA;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    root /home/blog/mysite/public;
}
```
然后把配置文件同步到`sites-enabled`文件夹下：
```
$ ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/blog
```
没有ssl的话加一下，这里跟着[毛象的教程](https://docs.joinmastodon.org/admin/install/#acquiring-a-ssl-certificate)走就可以。
```
$ certbot --nginx -d example.com
```
到这里nginx部分就配置完成了，check一下没有语法错误
```
$ nginx -t
```
没问题的话reload nginx：
```
$ systemctl reload nginx
```
结束！这样就可以成功访问啦。







