---
title: 开发指南
dir:
  order: 2
index: true
---

# 开发指南

欢迎参与 MaaNTE 的开发！

MaaNTE 基于 [MaaFramework](https://github.com/MaaXYZ/MaaFramework) 构建，采用 Pipeline 任务编排与 Python 自定义动作的混合架构。

## 文档导航

| 文档 | 说明 |
|------|------|
| [如何开发](how_to_develop.md) | 开发环境搭建与新功能开发流程 |
| [自定义配置](custom_configure.md) | Pipeline 与自定义动作配置说明 |
| [常见问题](faq.md) | 开发过程中常见问题汇总 |

## 架构概述

MaaNTE 的自动化功能分为两层：

- **Pipeline 层**：基于 JSON 声明式任务流，定义识别节点、动作节点和流程控制
- **自定义动作层**：通过 Python 编写自定义动作，实现 Pipeline 无法直接处理的复杂逻辑

详细的 Pipeline 编写指南请参考 [MaaFramework 文档](https://github.com/MaaXYZ/MaaFramework)。
