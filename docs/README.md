---
home: true
title: MaaNTE
config:
  - type: hero
    full: true
    hero:
      name: MaaNTE
      text: 由 MaaFramework 强力驱动的《异环》自动化辅助工具
      tagline: MAA 异环小助手
      image:
        src: /images/logo_256x256.png
        alt: MaaNTE Logo
      actions:
        - text: 快速开始
          link: /zh_cn/introduction/
          type: primary
        - text: 下载
          link: "javascript:void(0)"
          type: primary
        - text: GitHub 下载
          link: https://github.com/1bananachicken/MaaNTE/releases
          type: secondary
        - text: Mirror酱 下载
          link: https://mirrorchan.com/zh/projects?rid=MaaNTE
          type: secondary
        - text: GitHub
          link: https://github.com/1bananachicken/MaaNTE
          type: primary
  - type: features
    features:
      - title: 自动钓鱼
        details: 自动循环抛竿、等钩、收杆，支持自动卖鱼和自动购买鱼饵。新版重构支持无限钓鱼，挂机无忧
        icon: mdi:fish
      - title: 音频闪避与反击
        details: 基于音频识别的实时闪避系统。监听游戏音效，自动触发闪避和反击操作，让战斗更加从容
        icon: mdi:shield-lightning
      - title: 超强音
        details: 自动演奏音游「超强音」，支持自动选曲、连续演奏和帧率调节。轻松获取音游奖励
        icon: mdi:music-circle
      - title: 实时辅助
        details: 自动跳过剧情对话、自动传送，减少繁琐操作，让游戏体验更加流畅自然
        icon: mdi:fast-forward
      - title: 自动做咖啡
        details: 循环执行咖啡制作小游戏——选择关卡、开始营业、等待目标达成、领取奖励，全自动完成
        icon: mdi:coffee-maker
      - title: 喷泉打卡
        details: 自动前往喷泉完成每日打卡，轻松获取每日奖励
        icon: mdi:fountain
      - title: 粉爪劫案
        details: 自动完成粉爪劫案活动任务，解放双手
        icon: mdi:paw
      - title: 更多功能
        details: 自动弹琴、快速拾取、领取奖励、取钱……更多自动化功能持续更新中
        icon: mdi:dots-horizontal-circle
  - type: text
    text:
      tagline: "开源与技术"
      title: 开源驱动，文档完善
      description: MaaNTE 基于 **MaaFramework** 构建，采用 **Pipeline 任务编排 + Python 自定义动作** 的混合架构。<br/>通过 JSON 声明节点流程，支持模板匹配、OCR 文字识别、自定义识别等多种算法。<br/>开发者可以轻松扩展新功能、适配新分辨率。<br/><br/>[开发指南 →](/zh_cn/develop/)
  - type: text
    text:
      content: |
        <div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; margin: 32px 0;">
          <a href="https://github.com/1bananachicken/MaaNTE" target="_blank" style="display: flex; align-items: center; gap: 8px; padding: 10px 24px; border: 1px solid var(--vp-c-border); border-radius: 8px; text-decoration: none; color: var(--vp-c-text-1); transition: border-color 0.2s, color 0.2s;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            <span>GitHub</span>
          </a>
          <a href="https://discord.gg/EjwrrGzy" target="_blank" style="display: flex; align-items: center; gap: 8px; padding: 10px 24px; border: 1px solid var(--vp-c-border); border-radius: 8px; text-decoration: none; color: var(--vp-c-text-1); transition: border-color 0.2s, color 0.2s;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>
            <span>Discord</span>
          </a>
          <a href="https://space.bilibili.com/3546893080594665" target="_blank" style="display: flex; align-items: center; gap: 8px; padding: 10px 24px; border: 1px solid var(--vp-c-border); border-radius: 8px; text-decoration: none; color: var(--vp-c-text-1); transition: border-color 0.2s, color 0.2s;">
            <span style="font-size: 18px;">📺</span>
            <span>Bilibili</span>
          </a>
        </div>
  - type: footer
    footer:
      content: |
        <div style="text-align: center; padding: 24px 0; color: var(--vp-c-text-2); font-size: 14px;">
          MaaNTE 为开源项目，以 AGPL-3.0 协议发布。<br/>
          本软件与《异环》开发商及发行商无关。
        </div>
---
