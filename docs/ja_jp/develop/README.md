---
title: 開発ガイド
dir:
  order: 2
index: true
---

# 開発ガイド

MaaNTE の開発に参加しませんか！

MaaNTE は [MaaFramework](https://github.com/MaaXYZ/MaaFramework) を基盤とし、Pipeline タスク編成と Python カスタムアクションのハイブリッドアーキテクチャを採用しています。

## ドキュメント

| ドキュメント | 説明 |
|--------------|------|
| 開発方法 | 開発環境のセットアップと新機能の開発フロー |
| カスタム設定 | Pipeline とカスタムアクションの設定説明 |
| FAQ | 開発中によくある質問 |

## アーキテクチャ概要

MaaNTE の自動化機能は2層に分かれています：

- **Pipeline 層**：JSON ベースの宣言型タスクフロー、認識ノード・アクションノード・フロー制御を定義
- **カスタムアクション層**：Python による複雑なロジックの実装

Pipeline の詳細なガイドは [MaaFramework ドキュメント](https://github.com/MaaXYZ/MaaFramework) をご参照ください。
