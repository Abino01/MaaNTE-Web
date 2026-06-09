# 超強音

## 簡介

自動演奏音遊"超強音"小遊戲，支援選曲、自動連打和幀率調節。

## 功能

### 自動選曲

自動選擇目標歌曲進行演奏。啟用後自動選擇預設歌曲（迷星叫），關閉後可手動指定目標歌曲。

### 自動連打

啟用後連續演奏指定次數，關閉則僅演奏一次。支援連打直到活力耗盡，或使用固定次數。

### 目標幀率

演奏循環的每秒幀率，影響辨識與按鍵的反應速度。

## 配置詳解

### 自動選曲

"自動選曲"功能開關。啟用後自動選擇"迷星叫"，關閉時需手動指定目標歌曲。

**具體實現**：開關 `自動選曲`，預設關閉。開啟時設定 `RhythmSelectSong` 的 `auto_select` 為 `true`；關閉時提供 `演奏目標歌曲選擇` 子選項。

#### 目標歌曲

手動選擇要演奏的歌曲。僅在關閉"自動選曲"時可用。

**具體實現**：下拉選擇框 `演奏目標歌曲選擇`，支援以下歌曲：

- `Heroic_Appearance`
- `Destiny`
- `Everlasting_Dazing_Summer(Short_Ver.)`
- `Everlasting_Dazing_Summer`
- `迷星叫`

覆寫 `RhythmSelectSong` 的 `custom_action_param.song_name` 參數。

### 自動連打

"自動連打"功能開關。啟用後連續演奏，關閉則僅演奏一次。

**具體實現**：開關 `自動連打`，預設關閉。開啟時提供 `連打模式` 子選項；關閉時設定 `RhythmRepeatCheck` 的 `auto_repeat_count` 為 `0`、`auto_repeat_max` 為 `false`。

#### 連打模式

- **Max（連打直到活力耗盡）**：自動連打直到活力耗盡
- **固定次數**：使用固定次數，需額外設定連打次數

**具體實現**：開關 `連打模式`，預設關閉。 Max 模式設定 `RhythmRepeatCheck` 的 `auto_repeat_max` 為 `true`；固定次數模式提供 `連打次數` 子選項。

##### 連打次數

連續演奏的次數。

**具體實作**：`int` 類型輸入框 `連打次數`，預設 `5`。覆寫 `RhythmRepeatCheck` 的 `custom_action_param` 中的 `auto_repeat_count` 和 `auto_repeat_max`。

### 目標幀率

演奏循環的每秒幀率，建議設定在 30~120 之間。

**具體實作**：`int` 類型輸入框 `目標幀率`，預設 `60`。覆寫 `RhythmPlaying` 的 `custom_action_param.target_fps` 參數。