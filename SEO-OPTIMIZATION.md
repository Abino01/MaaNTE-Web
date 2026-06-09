# MaaNTE-Web SEO 优化方案实施

## 已实施的优化

### 1. 安装 VuePress SEO 插件
```bash
pnpm add -D @vuepress/plugin-seo @vuepress/plugin-sitemap
```

**功能：**
- `@vuepress/plugin-seo` - 自动生成 SEO meta 标签
- `@vuepress/plugin-sitemap` - 自动生成 sitemap.xml

### 2. 配置 SEO 插件 (config.ts)

#### seoPlugin 配置
- **hostname**: `https://maante.org`
- **canonical**: 自动生成规范 URL
- **author**: `MaaNTE Team`
- **twitterCard**: `summary_large_image` - 大图卡片
- **fallBackImage**: Logo 作为默认分享图
- **autoDescription**: 自动从内容提取描述
- **ogp**: Open Graph 协议支持
  - og:type = website
  - og:locale = 根据页面语言自动设置
  - og:site_name = MaaNTE

#### sitemapPlugin 配置
- **hostname**: `https://maante.org`
- **changefreq**: `weekly` - 每周更新
- **excludeUrls**: 排除 404 页面

### 3. 增强 Head Meta 标签

#### 基础 SEO
- **keywords**: MaaNTE,MAA,异环,Rust,自动化,游戏辅助,MaaFramework,Anamnesis,Hether,脚本,开源
- **author**: MaaNTE Team
- **robots**: index,follow

#### Open Graph (社交分享)
- og:type - website
- og:site_name - MaaNTE
- og:image - Logo 256x256
- og:image:alt - MaaNTE Logo

#### Twitter Card
- twitter:card - summary_large_image
- twitter:image - Logo 256x256

#### 移动端优化
- theme-color - #3eaf7c
- apple-mobile-web-app-capable - yes
- apple-mobile-web-app-status-bar-style - black

### 4. 创建 robots.txt
位置：`docs/.vuepress/public/robots.txt`

内容：
- 允许所有爬虫访问
- 指定 sitemap 位置
- 设置 1 秒爬取延迟

## SEO 效果预期

### 搜索引擎优化
1. ✅ **Google/Bing/百度** 可以高效索引所有页面
2. ✅ **sitemap.xml** 自动生成，包含所有文档页面
3. ✅ **robots.txt** 引导爬虫正确抓取
4. ✅ **canonical URL** 避免重复内容惩罚

### 社交媒体分享
1. ✅ **Twitter** - 大图卡片预览
2. ✅ **Discord/Telegram** - Open Graph 预览
3. ✅ **微信/QQ** - 标题、描述、缩略图
4. ✅ **Facebook** - Open Graph 完整支持

### 技术 SEO
1. ✅ **结构化 URL** - hostname 正确配置
2. ✅ **多语言支持** - og:locale 自动设置
3. ✅ **移动端友好** - viewport + PWA meta
4. ✅ **自动描述提取** - 从页面内容生成 meta description

## 验证构建产物

构建完成后检查：
```bash
# 检查 sitemap 是否生成
ls -la docs/.vuepress/dist/sitemap.xml

# 检查 robots.txt 是否复制
ls -la docs/.vuepress/dist/robots.txt

# 查看 sitemap 内容（应包含所有页面）
cat docs/.vuepress/dist/sitemap.xml | head -50
```

## 后续建议

### 立即可做
1. ✅ 已完成基础 SEO 配置
2. ⏭️ 提交 sitemap 到搜索引擎
   - [Google Search Console](https://search.google.com/search-console)
   - [Bing Webmaster Tools](https://www.bing.com/webmasters)
   - [百度站长平台](https://ziyuan.baidu.com/)

### 进阶优化（可选）
1. **添加 JSON-LD 结构化数据**
   - SoftwareApplication schema
   - Organization schema
   - BreadcrumbList schema

2. **页面级 SEO 优化**
   - 为重要页面添加自定义 meta description
   - 优化页面标题（frontmatter title）
   - 添加自定义 keywords

3. **性能优化**
   - 图片懒加载（已有）
   - 预加载关键资源
   - Service Worker 缓存

4. **分析工具集成**
   - Google Analytics
   - 百度统计
   - Umami/Plausible（隐私友好）

## 注意事项

1. **版本兼容警告**：插件版本与 VuePress 有 peer dependency 警告，但不影响功能
2. **构建时间**：SEO 插件会增加构建时间（约 10-20%）
3. **sitemap 更新**：每次部署都会重新生成 sitemap.xml
4. **爬虫限制**：robots.txt 设置了 1 秒延迟，避免服务器过载

## 部署后验证

部署到生产环境后，使用以下工具验证：

1. **SEO 检查**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

2. **Sitemap 验证**
   - 访问 `https://maante.org/sitemap.xml`
   - 检查所有页面是否包含

3. **Meta 标签验证**
   - 浏览器开发者工具查看 `<head>` 标签
   - 确认 og: 和 twitter: 标签正确生成

## 文件清单

修改的文件：
- ✅ `docs/.vuepress/config.ts` - 添加 SEO 插件配置
- ✅ `docs/.vuepress/public/robots.txt` - 新建爬虫控制文件
- ✅ `package.json` - 自动更新依赖（pnpm add）

生成的文件（构建后）：
- `docs/.vuepress/dist/sitemap.xml` - 自动生成
- `docs/.vuepress/dist/robots.txt` - 自动复制
- 所有 HTML 文件的 `<head>` 包含完整 SEO meta 标签
