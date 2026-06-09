# Custom 動作與識別

以下 Custom Action 位於 `agent/custom/action/Common/`，可在 Pipeline 中直接使用。

## click_override

自訂點擊。透過 `custom_action_param` 指定目標 rect，或使用目前識別結果的 box。

- 註冊名：`click_override`
- 參數 `custom_action_param`：`{ "target": [x, y, w, h] }`
- 若未提供 `custom_action_param`，則使用 `argv.box`（識別結果 box）

```jsonc
{
 "action": {
 "type": "Custom",
 "param": {
 "custom_action": "click_override",
 "custom_action_param": { "target": [100, 200, 50, 50] }
 }
 }
}
```

## alt_click

Alt + 點選。先按下 Alt 鍵，再點選辨識結果 box 位置，最後放開 Alt。

- 註冊名：`alt_click`
- 無需額外參數，點擊位置由識別結果的 `box` 決定

```jsonc
{
 "recognition": { "type": "TemplateMatch", "param": { "template": "xxx.png" } },
 "action": {
 "type": "Custom",
 "param": { "custom_action": "alt_click" }
 }
}
```

## Common 工具函數

`agent/custom/action/Common/utils.py` 提供常用輔助函數：

| 函數 | 說明 |
|------|------|
| `get_image(controller)` | 截圖，回傳 numpy array |
| `click_rect(controller, rect, delay)` | 點選指定 rect 的中心 |
| `match_template_in_region(img, region, template, min_similarity, green_mask)` | 在區域內做模板匹配，返回 `(hit, score, x, y)` |

『`python
from Common.utils import get_image, click_rect, match_template_in_region

img = get_image(controller)
hit, score, x, y = match_template_in_region(img, [0, 0, 1280, 720], template, 0.8)
if hit:
 click_rect(controller, [x, y, 50, 50])
```

## 寫新的 Custom Action

詳細的 CustomAction 編寫參考 `agent/custom/action/` 下的現有實作。核心原則：

- **流程控制由 Pipeline JSON 負責，Python 只處理困難**
- 所有座標基於 **1280×720**
- 使用者訊息使用 `maafocus.PrintT()`，偵錯日誌使用 `utils.logger`
- 在長循環中檢查 `context.tasker.stopping`