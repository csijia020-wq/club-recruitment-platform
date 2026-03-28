# 国内评审镜像部署说明

这个项目当前已经有一条可用的国际镜像链路：

- GitHub 仓库：`csijia020-wq/club-recruitment-platform`
- Vercel 备用链接：`https://club-recruitment-platform.vercel.app/`

由于 `vercel.app` 在中国大陆网络下可能出现超时或不可达，这里补一条“评审专用、国内更稳”的镜像方案，推荐使用：

`GitHub(main)` -> `腾讯云 CloudBase 静态网站托管` -> `已备案自定义域名`

## 1. 目标

- 评审主链接改为国内基础设施上的 HTTPS 自定义域名
- 保留 Vercel 作为备用国际镜像
- 后续继续使用 GitHub 仓库作为唯一代码源
- 每次向 `main` 分支 push 后，CloudBase 自动拉代码并更新同一个评审域名

## 2. 当前项目构建参数

这个项目是纯静态前端，无后端依赖，适合直接托管 `dist` 目录。

- 仓库：`csijia020-wq/club-recruitment-platform`
- 分支：`main`
- Node.js：`20.x`
- 安装命令：`npm ci`
- 构建命令：`npm run build`
- 输出目录：`dist`
- 根目录：`/`

## 3. CloudBase 控制台配置

在腾讯云 CloudBase 静态网站托管中新增一个评审环境，推荐配置如下：

- 环境类型：静态网站托管
- 代码来源：GitHub 仓库导入
- 仓库地址：`csijia020-wq/club-recruitment-platform`
- 部署分支：`main`
- Node.js 版本：`20.x`
- Install Command：`npm ci`
- Build Command：`npm run build`
- Output Directory：`dist`
- Root Directory：`/`

部署完成后，先用 CloudBase 生成的默认访问地址做内部验证，再绑定评审域名。

## 4. SPA 路由回退

这个项目使用 `react-router-dom`，线上访问以下路径时都必须回退到 `index.html`：

- `/`
- `/student`
- `/club`
- `/admin`

在 CloudBase 静态网站托管里，需要把“默认首页 / 索引文档”设置为：

- `index.html`

并为前端路由配置 SPA 回退，目标效果是：

- 未命中静态文件时，返回 `/index.html`
- 直接打开 `/student`、`/club`、`/admin` 时不出现 404

如果控制台提供的是“错误文档”或“重写规则”两种方式，优先选能把未知路径重写到 `/index.html` 的方式。

## 5. 评审域名与 HTTPS

推荐使用一个单独的评审子域名，例如：

- `review.example.com`
- `club-review.example.com`

接入要求：

- 域名已备案
- 在 CloudBase 中绑定该自定义域名
- 按控制台提示完成 DNS 解析
- 启用 HTTPS，评审只提交 `https://` 链接

提交评审时，主链接使用 CloudBase 的自定义域名，不使用 `vercel.app`。

## 6. 推荐 DNS 与链路策略

- 主评审链接：CloudBase 自定义域名
- 备用链接：Vercel 域名
- GitHub：唯一代码源

建议口径：

- 评审提交：`https://review.你的域名.com`
- 技术备份：`https://club-recruitment-platform.vercel.app/`

## 7. 发布流程

本地开发和发布流程保持不变：

```bash
git add .
git commit -m "更新说明"
git push
```

推送后：

1. GitHub `main` 分支更新
2. CloudBase 自动拉取并重新构建
3. 同一个评审域名自动更新
4. Vercel 备用镜像也会继续更新

## 8. 上线后验证清单

部署完成后，至少检查下面这些点：

- 打开根路径时，首页直接显示 `PLAN.md` 设计思路页
- 顶部导航能进入 `学生端`、`社团端`、`学校端`
- 直接访问 `/student`、`/club`、`/admin` 不出现 404
- 页面无明显旧首页残留
- 静态资源加载无 403 / 404
- 在中国大陆常见网络环境下不再出现 `ERR_CONNECTION_TIMED_OUT`

## 9. 为什么不用 Gitee Pages

Gitee 官方帮助页显示 Pages 功能已下线，因此不再作为当前可执行方案。

## 10. 参考资料

- Vercel 官方：大陆访问限制说明  
  `https://vercel.com/guides/accessing-vercel-hosted-sites-from-mainland-china`
- 腾讯云 CloudBase：静态网站托管  
  `https://cloud.tencent.com/document/product/876/46900`
- 腾讯云 CloudBase：Git 仓库与托管配置  
  `https://cloud.tencent.com/document/product/876/41139`
- 腾讯云 CloudBase CLI / 托管管理  
  `https://cloud.tencent.com/document/product/1210/52129`
- Gitee 官方帮助：Pages 功能已下线  
  `https://gitee.com/help/articles/4136`
  `https://gitee.com/help/articles/4237`
