# 線上地圖即時定位

`MapWebViewLocator` 會開啟線上地圖，並在網頁原生 Leaflet 圖層中顯示角色位置和朝向。它開啟的主 WebView 只負責面向使用者展示地圖，不提供偵錯狀態欄，也不在網頁內執行標定。需要標定時，單獨執行 `MapWebViewCalibration` 開啟專用標定 WebView。

## 檔案結構

| 文件 | 職責 |
| --- | --- |
| `agent/custom/action/map_webview/locator/action.py` | 截圖循環、NCC 定位、方向預測、座標轉換、本地只讀狀態服務和 WebView 生命週期。 |
| `agent/custom/action/map_webview/locator/window.py` | 開啟線上地圖、輪詢唯讀狀態並注入展示腳本。 |
| `agent/custom/action/map_webview/locator/overlay.js` | 尋找 Leaflet 地圖、建立 marker、更新位置和旋轉角度。 |
| `agent/custom/action/map_webview/calibration/action.py` | 獨立標定 custom action、即時 NCC 定位、座標擬合、標定檔案儲存與重設。 |
| `agent/custom/action/map_webview/calibration/window.py` | 開啟專用標定視窗、輪詢標定狀態並提交網頁點選結果。 |
| `agent/custom/action/map_webview/calibration/overlay.js` | 在專用標定視窗內擷取 Leaflet 點選座標並顯示操作提示。 |
| `assets/resource/base/image/map/map_webview_pointer.png` | 網頁地圖所使用的方向指標。 |
| `config/map_webview_calibration.json` | 本機標定資料。該文件屬於運行時配置，不提交到倉庫。 |

## 運行入口

`assets/resource/base/pipeline/MapLocator.json` 提供兩個 custom action：

```json
{
 "MapWebViewLocator": {
 "action": "Custom",
 "custom_action": "map_webview_locator"
 },
 "MapWebViewCalibration": {
 "action": "Custom",
 "custom_action": "map_webview_calibration"
 }
}
```

執行 `MapWebViewLocator` 時，程式會從 Maa controller 取得遊戲截圖，使用​​ `MapLocatorNcc` 計算本地 `map.jpg` 座標，使用 `AnglePredictor` 計算朝向，再將座標轉換為 Leaflet 座標傳送給 WebView。

WebView 僅輪詢：

```text
GET /state.json
```

狀態內容只包含展示所需欄位：

```json
{
 "onlinePoint": [7.984375, 59.09375],
 "angle": 123.4
}
```

## 標定

本機 `map.jpg` 像素座標和線上地圖 Leaflet 座標需要透過標定建立映射。每個標定點格式如下：

```json
{
 "local": [14034.0, 9768.0],
 "online": [7.984375, 59.09375]
}
```

至少需要三個有效標定點。建議在不同方向上採樣，並使用六個以上點降低誤差。

標定由 `map_webview_calibration` custom action 獨立處理。直接執行 `MapWebViewCalibration` 時會開啟專用標定 WebView：

1. 在遊戲中移動到容易確認的地標。
2. 等待標定視窗提示已經辨識到遊戲位置。
3. 在線上地圖中找到相同地標。
4. 按住 `Shift` 點選線上地圖中的對應位置。
5. 移動到其他地標並重複操作，至少採集三個有效點。
6. 如需清空舊點，按住 `Ctrl + Shift` 點選標定地圖。

主定位視窗 `MapWebViewLocator` 仍只用於使用者查看即時位置，不包含標定入口或偵錯狀態列。

如需腳本化維護標定文件，也可以透過 `pair` 增加一個點：

```json
{
 "pair": {
 "local": [14034.0, 9768.0],
 "online": [7.984375, 59.09375]
 }
}
```

也可以透過 `pairs` 批量增加或取代鄰近點：

```json
{
 "pairs": [
 {
 "local": [14034.0, 9768.0],
 "online": [7.984375, 59.09375]
 }
 ]
}
```

設定 `"replace": true` 會先清空舊點再寫入新點。設定 `"reset": true` 會清空標定檔案。

標定檔案預設路徑：

```text
config/map_webview_calibration.json
```

`MapWebViewLocator` 啟動時只讀取標定文件，不會修改它。也可以透過 `online_transform` 直接傳入六個轉換係數。

## 參數

`MapWebViewLocator` 支援以下參數：

| 參數 | 預設值 | 說明 |
| --- | --- | --- |
| `map_url` | `https://www.ghzs666.com/yh-map#/` | 線上地圖地址。 |
| `update_interval` | `0.1` | 狀態更新最小間隔，單位為秒。 |
| `title` | `MaaNTE Online Map` | WebView 標題。 |
| `width` | `1280` | WebView 寬度。 |
| `height` | `820` | WebView 高度。 |
| `webview_debug` | `false` | 是否啟用 pywebview 偵錯模式。 |
| `pointer_image` | 內建指標 | 自訂指標圖片路徑。 |
| `calibration_path` | `config/map_webview_calibration.json` | 標定檔案路徑。 |
| `online_transform` | 無 | 手工指定六個轉換係數。 |
| `big_map_path` | 內建 `map.jpg` | 自訂本地大地圖路徑。 |
| `angle_backend` | 環境變數或 `cpu` | ONNX 方向模型後端。 |
| `pointer_roi` | `[73, 60, 64, 64]` | 方向模型截圖區。 |
| `angle_threshold` | `0.0` | 方向結果最低置信度。 |

## 驗證

```powershell
.\.venv\Scripts\python.exe -m py_compile `
 agent\custom\action\map_webview\calibration\action.py `
 agent\custom\action\map_webview\calibration\window.py `
 agent\custom\action\map_webview\locator\action.py `
 agent\custom\action\map_webview\locator\window.py `
 agent\custom\action\__init__.py

node --check agent\custom\action\map_webview\locator\overlay.js
node --check agent\custom\action\map_webview\calibration\overlay.js

git diff --check
```