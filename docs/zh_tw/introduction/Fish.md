# 釣魚任務

## 簡介

自動執行釣魚任務的掛機功能。包含舊版和新版兩套任務入口。

## 功能

### 釣魚任務

自動循環執行釣魚：拋竿、等待上鉤、收桿，並支援自動賣魚和自動買魚餌。

### 釣魚任務（新）

重構的釣魚功能，理論上能無限釣魚。

> [!WARNING]
> 仍無法直接處理被月卡打斷的跨夜釣魚，可以嘗試設定定時任務來繼續釣魚，實際效果無法保證。
> 釣魚功能只自動買魚餌和自動賣魚會搶佔滑鼠。

## 配置詳解

### 循環次數

設定釣魚任務的循環次數。僅在不啟用"無限循環"時生效。

**具體實作**：`int` 類型輸入框 `FishLoopTime`，透過 `^\d+$` 校驗資料。覆寫 `FishStart` 的 `max_hit` 參數。

### 每次釣魚數量

設定每次循環自動釣魚的次數，建議不超過 99。

**具體實作**：`int` 類型輸入框 `FishNumber`，預設 `99`。覆寫 `FishGameStart` 的 `custom_action_param.count` 和 `FishNewCast` 的 `max_hit` 參數。

### 無限循環

啟用後釣魚任務將無限循環，直到手動停止。啟用時會忽略"循環次數"設定。

**具體實作**：開關 `FishLoopInfinite`，預設為停用。啟用時修改 `FishEntrance`、`FishGameStart`、`AutoSellFish`、`AutoBuyFishBait`、`FishBaitHandled` 的 `next` 指向 `FishLoopStart` 形成循環。

### 自動賣魚

是否啟用自動賣魚功能。在魚鱗幣不足時自動出售背包中的魚。

**具體實作**：開關 `FishSellAuto`。覆寫 `AutoSellFish` 和 `FishNewOpenFishMaster` 的 `enabled` 狀態。

### 自動買魚餌

每次自動購買 99 個魚餌（上限）。辨識到魚餌不足時購買，若當前魚餌用完則切換為萬用魚餌。

**具體實作**：開關 `FishBuyBaitAuto`。覆寫 `AutoBuyFishBait`、`FishGotoBuyBait`、`FishNewGotoBuyBait` 的 `enabled` 狀態。啟用時提供 `FishBaitThreshold` 子選項。

### 魚餌辨識閾值

如果無法辨識點擊魚餌位置，請調低該數值。

**具體實作**：下拉選擇框 `FishBaitThreshold`，可選值 `0.8`、`0.7`、`0.6`。覆寫 `AutoBuyFishBait` 的 `custom_action_param.found_bait_threshold` 參數。