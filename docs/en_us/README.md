---
home: true
title: MaaNTE
topAlert:
  enabled: true
  label: Notice
  text: Please only download MaaNTE from official channels. Beware of third-party repacks, scam groups, fake repositories, and paid download scams.
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
      text: An automation tool for Neverness to Everness powered by MaaFramework
      tagline: MAA NTE Assistant
      image:
        src: /images/logo_256x256.png
        alt: MaaNTE Logo
      actions:
        - text: Quick Start
          icon: mdi:file-document-outline
          link: /en_us/introduction/
          type: primary
        - text: Online Map
          icon: fa7-solid:map-location-dot
          link: https://map.maante.org/
          type: primary
        - text: Download
          icon: fa7-solid:download
          type: primary
          children:
            - text: GitHub Releases
              link: https://github.com/1bananachicken/MaaNTE/releases
              type: secondary
            - text: Mirror Chan
              link: https://mirrorchan.com/en/projects?rid=MaaNTE
              type: secondary
        - text: Contact Us
          icon: fa7-solid:external-link-alt
          type: primary
          children:
            - text: Discord
              link: https://discord.com/invite/e6mPMRYQpR
              type: secondary
            - text: QQ Group
              link: /en_us/qq-group/
              type: secondary
        - text: More
          icon: heroicons:ellipsis-horizontal-circle-16-solid
          children:
            - text: GitHub
              link: https://github.com/1bananachicken/MaaNTE
              type: primary
            - text: YouTube
              link: https://youtube.com/@MaaNTE-Official
              type: primary
            - text: Bilibili
              link: https://space.bilibili.com/3546893080594665/
              type: primary
  - type: HomeIntro
    items:
      - title: Advanced Framework, Rock-Solid Stability
        content: MaaNTE is built on <strong>MaaFramework</strong>, using image recognition and simulated input to automate tasks.<br/>Unlike traditional script recording, you won't suffer from "accidentally leaving the game screen and draining all your resources."
        align: left
      - title: Open Source, Transparent Code
        content: MaaNTE is open-sourced under <strong>AGPL-3.0</strong>. All source code is published on GitHub.<br/>Unlike closed-source projects with unknown risks, every line of our code is reviewable and open to scrutiny by anyone, anytime.
        align: right
        link:
          href: "https://github.com/1bananachicken/MaaNTE/"
          text: Review the Code →
          alt: View Source Code
      - title: Community-Driven, Feature-Rich
        content: <strong>Anyone</strong> can submit code and add new features to MaaNTE.<br/>We have dozens of features already in the stable release, covering daily tasks, city activities, and more.
        align: left
        link:
          href: "/en_us/introduction/"
          text: Learn More →
          alt: View Features
  - type: features
    features:
      - title: Auto Fishing
        details: Automatically catch big fish, with support for auto-selling, auto-buying bait, and infinite loops
        icon: icon-park-outline:fishing
      - title: Auto Dodge & Counter
        details: Real-time dodge system based on audio recognition. Listens for game sound effects and automatically triggers dodge and counter moves for smoother combat
        icon: fa7-solid:bolt
      - title: Real-Time Assistance
        details: Auto-pickup, auto-skip cutscenes, auto-click teleport — reduce tedious actions for a smoother gameplay experience
        icon: fa7-solid:clock
      - title: Pink Paw Heist
        details: Automatically farm the "Pink Paw Heist" event to earn rewards effortlessly and free up your hands
        icon: streamline-plump:pet-paw-solid
      - title: Reward Collection
        details: Automatically claim daily rewards
        icon: fa7-solid:gift
      - title: Auto Coffee Making
        details: Automate the "Manager's Special" activity — make coffee and spend city stamina on Fons farming, fully automatic
        icon: mdi:coffee-maker-check-outline
      - title: Super Sonic
        details: Auto-play the "Super Sonic" rhythm game, with support for auto song selection, continuous play, and framerate adjustment. Earn rhythm game rewards effortlessly
        icon: fa7-solid:music
      - title: And More
        details: Auto music playing, quick pickup, reward claiming, money withdrawal... more automation features continuously updated
        icon: heroicons:ellipsis-horizontal-circle-16-solid
  - type: HomeIntro
    items:
      - title: Open Source Driven, Well Documented
        content: MaaNTE is built on <strong>MaaFramework</strong> with a hybrid architecture of <strong>Pipeline task orchestration + Python custom actions</strong>.<br/>Declare node flows via JSON, with support for template matching, OCR text recognition, custom recognition, and more.<br/>Developers can easily extend functionality and adapt to new resolutions.
        align: center
        link:
          href: "/en_us/develop/"
          text: Developer Guide →
          alt: Developer Guide
  - type: custom
---
<CardGrid>
  <LinkCard icon="fa7-brands:github" title="GitHub" href="https://github.com/1bananachicken/MaaNTE/" />
  <LinkCard icon="fa7-brands:bilibili" title="Bilibili" href="https://space.bilibili.com/3546893080594665/" />
  <LinkCard icon="fa7-brands:qq" title="QQ" href="/en_us/qq-group/" />
  <LinkCard icon="fa7-brands:discord" title="Discord" href="https://discord.com/invite/e6mPMRYQpR" />
</CardGrid>
