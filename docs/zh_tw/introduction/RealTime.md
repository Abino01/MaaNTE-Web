# 即時輔助

## 簡介

這是一個**即時輔助**功能，會無限次循環運行。

需要使用前台控制器。 ~~（好像是廢話）~~

## 功能

### 偵測間隔

每輪偵測之間等待的時間，單位為毫秒。一般情況下無需改動。

### 自動傳送

處於地圖介面時 ，會在你選取傳送點時自動點選「傳送」按鈕。

目前支援下列傳送點：

- “維特海默塔”
- “ReroRero電話亭”

### 自動跳過劇情

當處於可以跳過的劇情時，自動點擊跳過按鈕。

支援下列功能：

- 自動勾選“今日不再提示”

## 配置詳解

### 自動劇情

“[自動跳過劇情](#自動跳過劇情)”功能的總開關。關閉時會同時關閉「自動勾選『今日不再提示』」功能。

**具體實作**：開關 `RealTimeAutoSkipStory` ，開啟時提供 `RealTimeAutoSkipStoryDialog` 子選項入口，將 `RealTimeSkipStory` 、 `RealTimeSkipStoryDialogConfirm` 覆寫為 `"enabled": `Renabled": `Re ； `RealTimeSkipStoryDialog` 、 `RealTimeSkipStoryDialogConfirm` 、 `RealTimeSkipStoryDialogCheckbox` 覆寫為 `"enabled": false` 。

### 自動勾選“今日不再提示”

「自動勾選『今日不再提示』」功能開關。

### 自動傳送

“自動傳送”功能的總開關。關閉時會同時關閉所有子傳送點的偵測。

**具體實作**：開關 `RealTimeAutoTeleport` ，開啟時提供 `RealTimeAutoTeleportWitte` 和 `RealTimeAutoTeleportPhone` 子選項入口；關閉時將 `RealTimeTeleportWitte` 、 `RealTimeConfirmTeleportWiRecon`val `Rescon`al、Y均覆寫為 `"enabled": false` 。

#### 維特海默塔

單獨控制是否偵測並自動傳送至「維特海默塔」傳送點。開啟後，軟體會辨識該傳送點詳情頁並自動點選傳送按鈕。

**具體實現**：開關 `RealTimeAutoTeleportWitte` ，將 `RealTimeTeleportWitte` 、 `RealTimeConfirmTeleportWitte` 覆寫為 `"enabled": true` ；關閉時將 `RealTimeTeleportWitte` 、 `RealTimeConfirmTeleportWitte` 覆寫為 `"enabled": false` 。

#### ReroRero電話亭

單獨控制是否偵測並自動傳送至「ReroRero電話亭」傳送點。開啟後，軟體會辨識該傳送點詳情頁並自動點選傳送按鈕。

**具體實作**：開關 `RealTimeAutoTeleportPhone` ，將 `RealTimeTeleportPhone` 、 `RealTimeConfirmTeleportPhone` 覆寫為 `"enabled": true` ；關閉時將 `RealTimeTeleportPhone` 、 `RealTime `False `Fal：Telejable `Fal `Fal `Fal3: 寫為 `Tele」(Confirm`F 、 `RealTime `M

### 偵測間隔

每輪檢查的循環間隔

**具體實作**：`int` 類型輸入框 `RealTimeCheckInterval` ，透過 `^\\d+$` 校驗資料。覆寫 `RealTimeSleep` 的 `post_delay` 參數實作。