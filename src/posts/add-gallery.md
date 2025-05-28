---
title: "用bootstrap和hugo-easy-gallery给Hugo博客主题添加一个相册区吧"
date: 2023-04-28T18:51:45+02:00
draft: false
tags: ["Hugo","bootstrap","hugo-easy-gallery"]
category: "一些经验"
---

本篇文章内容中介绍的相册区域页有参考：[Building a hugo site and theme with Bootstrap](https://willschenk.com/howto/2018/building-a-hugo-site/) \
单个相册展示功能来自[hugo-easy-gallery](https://github.com/liwenyip/hugo-easy-gallery/)。

需要用的：

- [bootstrap](https://getbootstrap.com/)
- [hugo-easy-gallery](https://github.com/liwenyip/hugo-easy-gallery/)
## 添加一下bootstrap
因为我博客主题整个都是在用`bootstrap`的，没有用的话这里先添加一下哦（就不用自己写css了哈哈哈哈）

在`/layout/partials/head.html`中添加bootstrap的css和js文件：
```html
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
    crossorigin="anonymous"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
    crossorigin="anonymous"
  ></script>
```
版本可以根据自己的需求更改。

或者可以在主题文件夹下用如下命令添加：
```
npm install --save bootstrap
```

## 先来给主题建立一个相册区

1. 在主题的`/layout`文件夹下新建文件夹`/photos`
2. 在`/photos`文件夹下新建两个文件，`list.html`和`single.html`

其中`list.html`会作为当前相册区域的主页面，展示每个相册的标题，创建时间和封面图。

```html
{{ define "main" }}
<div class="container">
  <div class="row">
    {{ range .Pages }}
      {{ $images := .Resources.ByType "image" }}
      {{ $image := index $images 0 }}
      {{ $image := $image.Fill "512x360" }}

      <div class="col-md-6 col-lg-4">
        <div class="card">
          <img class="card-img-top" src="{{ $image.RelPermalink }}">
          <div class="card-body">
            <h5 class="card-title">{{ .Title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ .Date.Format "Jan 2, 2006" }}</h6>
            <a href="{{ .RelPermalink }}" class="btn btn-dark">See all</a>
          </div>
        </div>
      </div>
    {{ end }}
  </div>
{{ end }}
```

之后来给`single.html` 添加内容：

```html
{{ define "main" }}
  <div class="container main-s">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">{{ .Title | markdownify }}</h1>
        {{ if .Params.Subtitle }}
          <h2 class="font-weight-light font-italic mb-3">
            {{ .Params.Subtitle | markdownify }}
          </h2>
        {{ end }}
        <p class="text-muted mt-3">
          <a class="text-muted" href="{{ .Permalink }}"
            >Published {{ .Date.Format "January 2, 2006" }}</a
          >

          {{ range .Params.tags }}
            <a class="text-muted" href="{{ "/tags/" | relURL }}{{ . | urlize }}"
              >#{{ . }}</a
            >
          {{ end }}
        </p>

        <article class="article mt-5">
          {{ .Content }}
        </article>
      </div>
    </div>
  </div>
 <!-- 这里是“上一篇”和“下一篇”的按钮，不想要可以删掉 -->
  {{ if or .Next .Prev }}
    <div class="py-5 nex-prev">
      <div class="container">
        <div class="row">
          <div class="col-md-6 text-center">
            {{ if .Prev }}
            &lt;
              <a href="{{ .Prev.Permalink | relURL }}" class="link-dark"
                >{{ .Prev.Title | markdownify }}</a
              >
            {{ end }}
          </div>
          <div class="col-md-6 text-center">
            {{ if .Next }}
              <a href="{{ .Next.Permalink | relURL }}" class="link-dark"
                >{{ .Next.Title | markdownify }}</a
              >
              &gt;
            {{ end }}
          </div>
        </div>
      </div>
    </div>
  {{ end }}
{{ end }}
```

之后去`hugo-easy-gallery`的仓库把文件都下载下来。根据[文档](https://github.com/liwenyip/hugo-easy-gallery/)，将下列文件添加在对应的目录里：
1. /layouts/shortcodes/figure.html
2. /layouts/shortcodes/gallery.html
3. /layouts/shortcodes/load-photoswipe.html
4. /static/js/load-photoswipe.js
5. /static/css/hugo-easy-gallery.css

因为我选择从`content`目录下的特定文件夹加载相册，而不是`hugo-easy-gallery`所默认的`/static`文件夹下，所以在这里将`/layouts/shortcodes/gallery.html`文件中的第十二行内容改一下：

修改前：
```html
{{- $files := readDir (print "/static/" .) }}
```

修改后：
```html
{{- $files := readDir (print "/content/" .) }}
```


## 然后来建立相册区域的内容

1. 在博客的`/content`文件夹下建立`photos`文件夹。
2. 在`config.toml`中添加相册区，`weight`根据自己需求更改。
   ```toml
     [[menu.main]]
    identifier = "photos"
    name = "照片"
    url = "/photos/"
    weight = 100
   ```
3. 之后就可以在`/photos`文件夹下来新建相册了，举例：新建一个名为`gallery-one`的相册，则需要在`/photos`中新建文件夹`/gallery-one`然后在该文件夹内添加图片和`index.md`文件和所有的图片。
   1. `index.md`的书写方式和普通post相同。
   2. 在需要加载图片的部分写上：`< gallery dir="photos/gallery-one"   />`和`< load-photoswipe >`（实际使用的时候外部要加`{{`和`}}`哦）
   3. 会默认加载缩略图，点击后加载原图。缩略图和原图放在同一个文件夹哦。这里推荐一个[批量制作缩略图的网站](http://makethumbnails.com/#dropzone)
   4. 其他更多设置详见：[hugo-easy-gallery-usage](https://www.liwen.id.au/heg/#gallery-usage)


完成！