# MaaNTE 文档站

[MaaNTE](https://github.com/1bananachicken/MaaNTE) 的文档站点，基于 [VuePress 2](https://v2.vuepress.vuejs.org/) 构建。

## 本地开发

```bash
# 同步文档（首次需要）
# Windows
powershell -ExecutionPolicy Bypass -File tools/sync-docs.ps1
# Linux/macOS
bash tools/sync-docs.sh

# 安装依赖
pnpm install

# 启动开发服务器
pnpm docs:dev
```

## 构建

```bash
pnpm docs:build
```

构建产物位于 `docs/.vuepress/dist/`。

## 文档来源

文档内容同步自 [1bananachicken/MaaNTE](https://github.com/1bananachicken/MaaNTE) 仓库 `dev` 分支的 `docs/` 目录。
