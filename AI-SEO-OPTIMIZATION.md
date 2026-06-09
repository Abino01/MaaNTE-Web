# AI 搜索引擎优化方案

## 概述

本文档说明 MaaNTE-Web 针对 AI 搜索引擎（如 ChatGPT、Claude、Perplexity、Gemini、文心一言等）的优化措施。

## 实施的优化

### 1. Meta 标签增强

#### Article 标签（AI 内容理解）
```html
<meta name="article:publisher" content="MaaNTE Team">
<meta name="article:author" content="MaaNTE Team">
<meta property="article:published_time" content="2024-01-01">
<meta property="article:modified_time" content="[动态更新]">
<meta property="article:section" content="Documentation">
<meta property="article:tag" content="MaaNTE,MAA,异环,自动化,游戏辅助">
```

#### Dublin Core（学术引用标准）
```html
<meta name="DC.title" content="MaaNTE - MAA 异环小助手">
<meta name="DC.creator" content="MaaNTE Team">
<meta name="DC.subject" content="游戏自动化,异环,MaaFramework,开源工具">
<meta name="DC.description" content="...">
<meta name="DC.publisher" content="MaaNTE Team">
<meta name="DC.type" content="Documentation">
<meta name="DC.format" content="text/html">
<meta name="DC.language" content="zh-CN">
```

#### Citation 标签（AI 引用）
```html
<meta name="citation_title" content="MaaNTE Documentation">
<meta name="citation_author" content="MaaNTE Team">
<meta name="citation_publication_date" content="2024/01/01">
<meta name="citation_online_date" content="[动态更新]">
```

**作用**：帮助 AI 理解文档的学术性质，便于引用时提供准确的出处信息。

### 2. Robots.txt AI 爬虫白名单

明确允许所有主流 AI 爬虫访问：

```txt
# OpenAI
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Google AI
User-agent: Google-Extended
Allow: /

# Anthropic (Claude)
User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Other AI
User-agent: Amazonbot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: YouBot
Allow: /
```

**支持的 AI 引擎**：
- ✅ ChatGPT (GPTBot, ChatGPT-User)
- ✅ Claude (ClaudeBot, Claude-Web, anthropic-ai)
- ✅ Perplexity (PerplexityBot)
- ✅ Google Gemini (Google-Extended)
- ✅ Amazon Q (Amazonbot)
- ✅ Apple Intelligence (Applebot-Extended)
- ✅ Common Crawl (CCBot)
- ✅ You.com (YouBot)
- ✅ 字节跳动 AI (Bytespider)
- ✅ Facebook AI (FacebookBot)

### 3. 结构化数据文件

#### schema.json (Schema.org)
位置：`/schema.json`

完整的 SoftwareApplication 结构化数据，包含：
- 软件名称、描述、版本
- 下载地址、代码仓库
- 作者、发布者信息
- 功能列表、系统要求
- 许可证、评分

**AI 使用场景**：
- 理解 MaaNTE 是什么软件
- 提取功能列表
- 获取下载和文档链接
- 了解技术栈和许可证

#### ai-summary.md
位置：`/ai-summary.md`

人类可读的完整项目摘要，包含：
- 项目概述
- 核心功能详细说明
- 技术特点
- 安装使用指南
- 社区资源
- 开发指南
- 常见问题

**AI 使用场景**：
- 快速了解项目全貌
- 回答用户关于功能的问题
- 提供安装和使用指导
- 引用技术细节

#### ai-instructions.txt
位置：`/ai-instructions.txt`

专为 AI 设计的索引指令，包含：
- 内容摘要和结构
- 引用指南
- 内容新鲜度说明
- 免责声明
- AI 回答建议
- 禁止内容说明

**AI 使用场景**：
- 理解如何正确引用
- 了解内容更新频率
- 遵守免责和使用限制
- 提供准确和安全的建议

### 4. 语义化 HTML 增强

#### 已有优化
- ✅ 使用 VuePress 2 (基于 Vue 3)
- ✅ 语义化 HTML5 标签
- ✅ 清晰的文档结构
- ✅ 面包屑导航
- ✅ 侧边栏大纲

#### 内容可读性
- ✅ Markdown 原生格式
- ✅ 清晰的标题层级
- ✅ 代码块语法高亮
- ✅ 图片 alt 属性
- ✅ 链接描述性文本

## AI 搜索引擎如何使用这些数据

### ChatGPT / GPT-4
1. **GPTBot** 抓取网站内容
2. 读取 `schema.json` 理解软件结构
3. 读取 `ai-summary.md` 获取详细信息
4. 使用 Citation 标签提供引用
5. 根据 `ai-instructions.txt` 调整回答策略

### Claude
1. **ClaudeBot** 抓取网站
2. 解析 Dublin Core 元数据
3. 理解文档层次结构
4. 提供准确的功能说明
5. 遵守 robots.txt 的爬取规则

### Perplexity
1. **PerplexityBot** 实时抓取
2. 优先读取结构化数据
3. 提取关键引用信息
4. 生成带引用的答案
5. 链接到官方文档

### Google Gemini
1. **Google-Extended** 索引内容
2. 结合 Open Graph 数据
3. 理解多语言内容
4. 提供综合搜索结果

## 验证方法

### 1. 检查 AI 爬虫访问
部署后，在服务器日志中查找：
```
GPTBot
ClaudeBot
PerplexityBot
Google-Extended
```

### 2. 测试 AI 搜索结果

#### ChatGPT
```
提问：什么是 MaaNTE？
提问：MaaNTE 有哪些功能？
提问：如何安装 MaaNTE？
```

#### Claude
```
提问：MaaNTE 是什么项目？
提问：MaaNTE 支持哪些自动化功能？
提问：MaaNTE 的技术栈是什么？
```

#### Perplexity
```
搜索：MaaNTE documentation
搜索：MaaNTE 异环自动化
```

### 3. 验证结构化数据

访问以下 URL 确认文件存在：
- https://maante.org/schema.json
- https://maante.org/ai-summary.md
- https://maante.org/ai-instructions.txt
- https://maante.org/robots.txt

## 效果预期

### 短期（1-2 周）
- ✅ AI 爬虫开始访问网站
- ✅ 结构化数据被索引
- ✅ AI 可以回答基本问题

### 中期（1-2 月）
- ✅ AI 回答更加准确和详细
- ✅ 引用来源包含 maante.org
- ✅ 功能列表被正确识别
- ✅ 安装指南被准确引用

### 长期（3-6 月）
- ✅ "MaaNTE" 成为 AI 知识库的一部分
- ✅ 用户通过 AI 搜索找到文档
- ✅ AI 能回答复杂的技术问题
- ✅ 社区知名度提升

## 监控指标

### 爬虫访问统计
监控以下 User-Agent 的访问量：
- GPTBot
- ClaudeBot
- PerplexityBot
- Google-Extended
- 其他 AI 爬虫

### AI 引用率
跟踪以下场景：
- 用户在 ChatGPT/Claude 询问 MaaNTE
- Perplexity 搜索结果中出现
- AI 回答中引用 maante.org

### 流量来源
分析来自 AI 搜索的流量：
- Referrer 包含 "perplexity.ai"
- 来自 AI 助手的直接访问
- 搜索关键词命中率

## 最佳实践

### 内容维护
1. **保持更新**：定期更新 `ai-summary.md`
2. **版本同步**：schema.json 的 version 与实际发布同步
3. **准确描述**：确保功能列表与实际一致
4. **清晰写作**：使用简洁、结构化的语言

### 技术维护
1. **监控爬取**：检查 robots.txt 是否生效
2. **验证数据**：定期验证 schema.json 语法
3. **更新标签**：随着 AI 技术发展更新 meta 标签
4. **日志分析**：分析 AI 爬虫的访问模式

### 安全考虑
1. **内容准确**：避免误导性信息
2. **免责声明**：明确软件性质和风险
3. **官方来源**：强调从官方渠道下载
4. **禁止内容**：在 ai-instructions.txt 中明确禁止事项

## 与传统 SEO 的区别

| 方面 | 传统 SEO | AI SEO |
|------|---------|--------|
| 目标 | 搜索引擎排名 | AI 理解和引用 |
| 关键词 | 密度和位置 | 语义和上下文 |
| 结构化数据 | 富文本片段 | 深度理解 |
| 内容质量 | 用户可读 | AI 和用户都可读 |
| 更新频率 | 关键词趋势 | 功能实际变化 |
| 引用 | PageRank | Citation 标签 |

## 未来优化方向

### 短期计划
- [ ] 添加更多语言的 ai-summary
- [ ] 为每个主要功能页面添加子 schema
- [ ] 创建 FAQ 结构化数据
- [ ] 添加视频教程的 VideoObject schema

### 中期计划
- [ ] 实现动态 schema.json 生成
- [ ] 添加用户评价和评分（如果有）
- [ ] 创建 HowTo schema（安装教程）
- [ ] 优化移动端 AI 搜索体验

### 长期计划
- [ ] 建立 AI 搜索分析系统
- [ ] 与 AI 平台建立官方合作
- [ ] 创建 AI 专用 API 端点
- [ ] 实现 AI 友好的实时更新推送

## 资源链接

### AI 爬虫文档
- [OpenAI GPTBot](https://platform.openai.com/docs/gptbot)
- [Anthropic Claude Web Crawler](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web)
- [Perplexity Bot](https://docs.perplexity.ai/docs/perplexitybot)
- [Google Extended](https://developers.google.com/search/docs/crawling-indexing/google-extended)

### Schema.org 文档
- [SoftwareApplication](https://schema.org/SoftwareApplication)
- [Article](https://schema.org/Article)
- [HowTo](https://schema.org/HowTo)

### 引用标准
- [Dublin Core Metadata](https://www.dublincore.org/)
- [Citation Metadata](https://en.wikipedia.org/wiki/COinS)

## 总结

通过实施完整的 AI SEO 优化，MaaNTE 文档站现在：

1. ✅ **被 AI 正确理解** - 结构化数据和语义标签
2. ✅ **易于被 AI 引用** - Citation 和 Dublin Core 标签
3. ✅ **AI 爬虫友好** - robots.txt 明确允许
4. ✅ **提供完整上下文** - ai-summary.md 和 ai-instructions.txt
5. ✅ **支持多语言** - hreflang 和多语言内容
6. ✅ **持续更新** - 动态时间戳和版本信息

这些优化将帮助 AI 搜索引擎更好地理解、索引和引用 MaaNTE 文档，提升项目在 AI 时代的可见度和影响力。

---

**文档版本**: 1.0  
**最后更新**: 2026-06-09  
**负责人**: MaaNTE Team
