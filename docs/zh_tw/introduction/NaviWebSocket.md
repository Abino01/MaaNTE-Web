# Navi 本地 WebSocket

`navi_websocket` custom action 會在同一個截圖循環中執行 NCC 定位和方向預測，再把兩個結果當作同一狀態廣播給本地地圖前端。 Maa 同時只能運行一個 action，因此即時地圖應直接運行組合 action：

```json
{
 "NaviWebSocket": {
 "action": "Custom",
 "custom_action": "navi_websocket",
 "custom_action_param": {
 "host": "0.0.0.0",
 "port": 14514,
 "debug": false,
 "frame_interval": "0.1",
 "angle_backend": "auto"
 }
 }
}
```

此入口位於 `assets/resource/base/pipeline/NaviWebSocket.json`，任務設定位於 `assets/resource/tasks/NaviWebSocket.json`。

預設監聽位址：

```text
ws://127.0.0.1:14514
```

可在任務設定中覆寫監聽位址、連接埠、取樣間隔、偵錯模式，並在 `auto`、`cpu` 和 `directml` 三個方向推理後端之間選擇。

訊息格式：

```json
{
 "type": "navi-state",
 "version": 1,
 "position": {
  "pixelX": 5788,
  "pixelY": 8902,
  "score": 0.82,
  "mode": "local",
  "sourceWidth": 11264,
  "sourceHeight": 11264
 },
 "angle": 123.4,
 "angleConfidence": 0.96,
 "timestamp": 1770000000.0
}
```

當某一幀沒有辨識到位置或方向時，對應欄位為 `null`。 WebSocket 服務在首次產生 Navi 結果時啟動；頁面會自動重連。

`sourceWidth` 和 `sourceHeight` 表示 NCC 底圖尺寸。前端會以自身線上地圖尺寸縮放座標，例如 `11264 x 11264` 的 NCC 底圖座標映射到 `22528 x 22528` 線上地圖時會放大 2 倍。