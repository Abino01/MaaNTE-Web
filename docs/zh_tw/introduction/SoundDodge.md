# 音頻閃避與反擊

## 簡介

基於**音訊辨識**的自動閃避與反擊功能。透過辨識遊戲音效即時觸發閃避和反擊操作。

需要使用[color:red]**桌面端-前台**[/color]控制器。

## 功能

### 閃避

即時監聽遊戲音頻，辨識敵方攻擊音效時自動觸發閃避操作。

### 反擊

在閃避成功後辨識反擊音效，自動觸發反擊操作。

## 配置詳解

### 啟用音訊閃避

"音訊閃避"功能的總開關。關閉時會同時關閉閃避和反擊。

**具體實現**：開關 `SoundDodgeEnable`，預設開啟。關閉時將 `SoundDodgeMain` 的 `enable_sound_trigger` 覆寫為 `false`。

### 僅閃避模式

開啟後只執行閃避，不執行反擊。

**具體實現**：開關 `SoundDodgeAllAttacks`，預設僅閃避。開啟時設定 `dodge_all_attacks` 為 `true`（僅閃避）；關閉時設定為 `false`（閃避+反擊）。

### 閃避閾值

閃避音效辨識閾值，範圍 0.0~1.0，**越低越敏感**。若漏閃避，請調低數值；若誤閃避，請調高數值。

**具體實作**：`string` 類型輸入框 `SoundDodgeThreshold`，預設為 `0.13`。經 `^0\.\d+$|^1\.0*$` 校驗。覆寫 `SoundDodgeMain` 的 `custom_action_param.threshold` 參數。

### 反擊閾值

反擊音效辨識閾值，範圍 0.0~1.0，**越低越敏感**。若漏反擊，請調低數值；若誤反擊，請調高數值。

**具體實作**：`string` 類型輸入框 `SoundCounterThreshold`，預設 `0.12`。經 `^0\.\d+$|^1\.0*$` 校驗。覆寫 `SoundDodgeMain` 的 `custom_action_param.counter_attack_threshold` 參數。