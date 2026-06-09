---
home: true
title: MaaNTE
topAlert:
  enabled: true
  label: 提醒
  text: 請僅從官方渠道下載 MaaNTE。謹防第三方改包、引流群、假倉庫與付費代下載騙局。
  speed: 28
  backgroundColor: "#7f1d1d"
  textColor: "#fff7ed"
  borderColor: "rgba(255, 255, 255, 0.22)"
  badgeBackgroundColor: "#fef08a"
  badgeTextColor: "#7f1d1d"
config:
  - type: HHero
    full: true
    hero:
      name: MaaNTE
      text: 由 MaaFramework 強力驅動的《異環》自動化輔助工具
      tagline: MAA 異環小助手
      image:
        src: /images/logo_256x256.png
        alt: MaaNTE Logo
      actions:
        - text: 快速開始
          icon: mdi:file-document-outline
          link: intro.md
          type: primary
        - text: 在線地圖
          icon: fa7-solid:map-location-dot
          link: https://map.maante.org/
          type: primary
        - text: 下載
          icon: fa7-solid:download
          type: primary
          children:
            - text: GitHub 下載
              link: https://github.com/1bananachicken/MaaNTE/releases
              type: secondary
            - text: Mirror酱 下載
              link: https://mirrorchan.com/zh/projects?rid=MaaNTE
              type: secondary
            - text: 雲端硬碟下載
              type: secondary
              children:
              - text: 百度網盤
                link: https://pan.baidu.com/s/11QMC-aYfjfq52yco_UAwfg?pwd=tkmu
                type: secondary
              - text: 夸克網盤
                link: https://pan.quark.cn/s/4b70d06b913c?pwd=irqh
                type: secondary
            - text: QQ 群下載
              link: /zh_tw/qq-group/
              type: secondary
        - text: 聯繫我們
          icon: fa7-solid:external-link-alt
          type: primary
          children:
            - text: QQ 群
              link: /zh_tw/qq-group/
              type: secondary
            - text: Discord
              link: https://discord.com/invite/e6mPMRYQpR
              type: secondary
        - text: 更多
          icon: heroicons:ellipsis-horizontal-circle-16-solid
          children:
            - text: GitHub
              link: https://github.com/1bananachicken/MaaNTE
              type: primary
            - text: Bilibili
              link: https://space.bilibili.com/3546893080594665/
              type: primary
            - text: 爱发电
              link: https://afdian.com/a/MaaNTE
              type: primary
            - text: YouTube
              link: https://youtube.com/@MaaNTE-Official
              type: primary
  - type: HomeIntro
    items:
      - title: 框架先進，穩定無憂
        content: MaaNTE 基於 <strong>MaaFramework</strong> 開發，通過圖像辨識與模擬輸入技術實現功能。<br>相較於傳統的腳本錄製，不會出現在腳本運行時的"意外退出介面導致資源被消耗"的慘案。
        align: left
      - title: 開源工具，代碼安全
        content: MaaNTE 以 <strong>AGPL-3.0</strong> 開源，源碼均在 GitHub 上發布。<br>相對於閉源項目的不確定性，我們的每一行代碼均經過審查，接受任何人隨時監督。
        align: right
        link:
          href: "https://github.com/1bananachicken/MaaNTE/"
          text: 我要驗碼 →
          alt: 查看源代碼
      - title: 社區驅動，功能豐富
        content: <strong>任何人</strong>均能提交代碼，为 MaaNTE 添加新的功能。<br>我們擁有數十項已經添加至正式版的功能，覆蓋日常任務、都市閒趣等多個方面。
        align: left
        link:
          href: "/zh_tw/introduction/"
          text: 讓我看看 →
          alt: 查看功能介绍
  - type: features
    features:
      - title: 自動釣魚
        details: 自動幫助釣大魚，支援自動賣魚、自動購買魚餌和無限循環
        icon: icon-park-outline:fishing
        link: introduction/HethereauHobbies/Fish.md
      - title: 自動閃避與反應
        details: 基於音訊辨識的即時閃避系統。監聽遊戲音效，自動觸發閃避和反擊操作，讓戰鬥更從容
        icon: fa7-solid:bolt
      - title: 實時輔助
        details: 自動拾取、自動跳過劇情、自動點擊傳送，減少繁瑣操作，讓遊戲體驗更流暢自然
        icon: fa7-solid:clock
        link: introduction/RealTimeAssist/RealTime.md
      - title: 粉爪大劫案
        details: 自動刷取「粉爪大劫案」，輕鬆獲得獎勵，解放你的雙手
        icon: streamline-plump:pet-paw-solid
      - title: 獎勵領取
        details: 自動領取每日獎勵
        icon: fa7-solid:gift
      - title: 自動做咖啡
        details: 進行「店長特供」玩法，自動製作咖啡，全自動完成都會體力刷取方斯
        icon: mdi:coffee-maker-check-outline
      - title: 超強音
        details: 自動演奏音遊「超強音」，支援自動選曲、連續演奏和幀率調節。輕鬆獲得音遊獎勵
        icon: fa7-solid:music
      - title: 更多功能
        details: 自動彈琴、快速拾取、領取獎勵、取錢…更多自動化功能持續更新中
        icon: heroicons:ellipsis-horizontal-circle-16-solid
        link: /zh_tw/introduction/
  - type: HomeIntro
    items:
      - title: 開源驅動，文件完善
        content: MaaNTE 基於 <strong>MaaFramework</strong> 構建，採用 <strong>Pipeline 任務編排 + Python 自訂動作</strong> 的混合架構。 <br/>透過 JSON 聲明節點流程，支援範本匹配、OCR 文字辨識、自訂識別等多種演算法。 <br/>開發者可以輕鬆擴展新功能、適配新解析度。
        align: center
        link:
          href: "/zh_tw/develop/"
          text: 開發指南 →
          alt: 開發指南
  - type: custom
---
<CardGrid>
  <LinkCard icon="fa7-brands:github" title="GitHub" href="https://github.com/1bananachicken/MaaNTE/" />
  <LinkCard icon="fa7-brands:bilibili" title="Bilibili" href="https://space.bilibili.com/3546893080594665/" />
  <LinkCard icon="fa7-brands:qq" title="QQ" href="/zh_cn/qq-group/" />
  <LinkCard icon="fa7-brands:discord" title="Discord" href="https://discord.com/invite/e6mPMRYQpR" />
</CardGrid>
