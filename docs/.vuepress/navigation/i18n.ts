export interface Locale {
  name: string
  htmlLang: string
  siteTitle: string
  siteDescription: string
}

export const locales: Locale[] = [
  {
    name: 'zh_cn',
    htmlLang: 'zh-CN',
    siteTitle: 'MaaNTE 文档站',
    siteDescription: 'MaaNTE | MAA 异环小助手 — 由 MaaFramework 强力驱动的《异环》自动化辅助工具',
  },
  {
    name: 'zh_tw',
    htmlLang: 'zh-TW',
    siteTitle: 'MaaNTE 文檔站',
    siteDescription: 'MaaNTE | MAA 異環小助手 — 由 MaaFramework 強力驅動的《異環》自動化輔助工具',
  },
  {
    name: 'en_us',
    htmlLang: 'en-US',
    siteTitle: 'MaaNTE Docs',
    siteDescription: 'MaaNTE | MAA Neverness to Everness Assistant — Automation tool for Neverness to Everness powered by MaaFramework',
  },
  {
    name: 'ja_jp',
    htmlLang: 'ja-JP',
    siteTitle: 'MaaNTE ドキュメント',
    siteDescription: 'MaaNTE | MAA 異環アシスタント — MaaFramework で駆動する「異環」自動化サポートツール',
  },
]
