# HomeLog 演示素材 · 生图 Prompt

给第一期（房东 / 租客、按间出租 + 整套联合租约）准备的图片素材。

## 使用说明

- **用英文 prompt：** 生图模型对英文理解更好，所以 prompt 都写成英文。每条 prompt 前面都要加上下面的「通用风格」。
- **生成后放进 `HomeLog/demo/` 文件夹：** 文件名按表格里的来（`.jpg` 或 `.webp` 都可以），我会按这些文件名接进代码。
- **尺寸：**
  - 房间照片：4:3，约 1200×900；
  - 物品特写：1:1，约 1024×1024；
  - 外观照片：16:9，约 1600×900。
- **维修前后照片要成对生成：** 先生成「维修前」，再把它作为参考图，用图生图 / 编辑功能生成「维修后」。这样两张的角度和构图才会一致。
- **同一套房子的照片尽量在同一个对话里连续生成：** 把同一段「房屋设定」放在每条 prompt 里，地板、墙色、门窗风格才会统一。
- **房屋名称和地址都是虚构的：** 新的演示房产用虚构名称和地址，避免和真实楼盘重名。
- **数量：** 总共 36 张（第 6 节的 3 张是第二期补充的）。时间紧的话，标「可选」的可以先跳过，代码里会复用其他图片。

---

## 通用风格（每条 prompt 前面都加上）

```
Realistic smartphone photo taken by a tenant during a UK rental check-in inspection. Natural daylight, slightly wide-angle phone lens, eye level, neutral colours, tidy but lived-in and unstaged, no people, no text, no watermarks, no logos, no brand names. Ordinary UK student rental standard, not luxury, not dirty.
```

## 房屋设定

**A. 12 Alder Road（按间出租的学生合租房，HMO）**

```
House: a Victorian terraced house in East London converted into a 5-bedroom student house share. Light grey carpet in bedrooms, pale oak-effect laminate in kitchen and living room, white walls, white painted wooden doors and skirting, white uPVC sash-style windows, white panel radiators.
```

**B. Riverside Flat（两居室公寓，两人联合租约）**

```
Flat: a 2-bedroom flat in a 2010s purpose-built block in South London. Open-plan kitchen and living room, light wood-effect laminate floors, soft warm-white walls, grey kitchen units, large aluminium-framed windows, white radiators.
```

---

## 1. 房产外观（2 张）

| 文件名 | Prompt（在通用风格之后接） |
|---|---|
| `alder-road-exterior` | A two-storey Victorian brick terraced house on a quiet East London residential street, white bay window, black front door with house number 12, small front garden wall, overcast sky, photo taken from the pavement. 16:9. |
| `riverside-flat-exterior` | A modern 6-storey residential block in South London, light brick with large windows and small balconies, entrance with glass door, trees on the pavement, cloudy daylight, photo taken from across the street. 16:9. |

## 2. 12 Alder Road 房间照片（9 张）

每条都在前面加「通用风格 + 房屋设定 A」。

| 文件名 | Prompt |
|---|---|
| `alder-bedroom-1` | Bedroom 1, a large front room with the bay window, double bed with plain grey bedding, white wardrobe, desk and chair under the window. Wide shot from the doorway. |
| `alder-bedroom-2` | Bedroom 2, medium room, double bed, chest of drawers, small desk against the wall, one sash window. Wide shot from the doorway. |
| `alder-bedroom-3` | Bedroom 3, small room, single bed, narrow wardrobe, wall shelf, desk, window overlooking the back garden. Wide shot from the doorway. |
| `alder-bedroom-4` | Bedroom 4, top-floor room with a sloping ceiling and a skylight, double bed, desk under the skylight. Wide shot from the doorway. （可选） |
| `alder-bedroom-5` | Bedroom 5, top-floor small room, single bed, wardrobe, desk, small window. Wide shot from the doorway. （可选） |
| `alder-kitchen` | Shared kitchen, white gloss units, laminate worktop, 4-ring electric hob with oven, stainless steel sink under the window, tall fridge-freezer, washing machine under the counter. Wide shot. |
| `alder-living` | Shared living room, grey fabric sofa, coffee table, TV unit, rug on laminate floor, fireplace surround painted white, bay window at the back. Wide shot. |
| `alder-bathroom-1` | Bathroom 1 on the first floor, bath with shower over it and glass screen, white tiles, pedestal washbasin with mirror cabinet, toilet, extractor fan. Wide shot from the door. |
| `alder-bathroom-2` | Bathroom 2 on the top floor, small shower cubicle, wall-hung washbasin, toilet, white tiles with grey grout. Wide shot from the door. |

## 3. Riverside Flat 房间照片（4 张）

每条都在前面加「通用风格 + 房屋设定 B」。

| 文件名 | Prompt |
|---|---|
| `riverside-bedroom-1` | Main bedroom, double bed, built-in mirrored wardrobe, bedside table, large window with blinds. Wide shot from the doorway. |
| `riverside-bedroom-2` | Second bedroom, single bed, desk and chair, freestanding wardrobe, window with blinds. Wide shot from the doorway. |
| `riverside-kitchen-living` | Open-plan kitchen and living room, grey kitchen units with breakfast bar, integrated oven and induction hob, two-seater sofa, small dining table, large window leading to a balcony. Wide shot. |
| `riverside-bathroom` | Bathroom with bath and shower over, glass screen, large white wall tiles, vanity unit washbasin with mirror, toilet, heated towel rail. Wide shot from the door. |

## 4. 物品特写（10 张）：入住时状况

户型图上的编号标记点开后显示这些特写。每条都在前面加「通用风格」，再加对应的房屋设定，比例 1:1。

| 文件名 | 房屋 | Prompt |
|---|---|---|
| `item-alder-hob` | A | Close-up of the 4-ring electric hob and oven door in a shared kitchen, clean with light everyday wear. |
| `item-alder-fridge` | A | Close-up of a tall white fridge-freezer with the door open, shelves clean, small crack on one door shelf. |
| `item-alder-boiler` | A | Close-up of a white wall-mounted combi boiler inside an open kitchen cupboard, pressure gauge visible. |
| `item-alder-shower` | A | Close-up of a bath with shower over and glass screen, silicone sealant along the bath edge in good condition. |
| `item-alder-b1-window` | A | Close-up of a white sash-style bay window with handle and lock, small chip on the windowsill paint. |
| `item-alder-b3-desk` | A | Close-up of a simple wooden desk in a small bedroom, two light scratches on the surface. |
| `item-riverside-washer` | B | Close-up of an integrated washing machine under the kitchen worktop, door open, clean drum. |
| `item-riverside-hob` | B | Close-up of a black induction hob set into a grey worktop, clean. |
| `item-riverside-window` | B | Close-up of a large aluminium-framed window with handle and roller blind, minor scuff on the frame. |
| `item-riverside-basin` | B | Close-up of a vanity unit washbasin with chrome mixer tap, small hairline crack near the overflow. |

## 5. 维修前后对比（4 对，8 张）

这些用来替换现在外链到 Magicman 网站的示例照片。先生成 `-before`，再用它作参考图生成 `-after`。

**维修后的编辑 prompt（通用）：**

```
Same photo, same camera angle, framing and lighting. The issue has been professionally repaired and looks clean and new. Keep everything else in the scene identical.
```

| 文件名（before / after） | 维修前 Prompt（接在「通用风格」之后） |
|---|---|
| `repair-mould-before` / `-after` | Close-up of black mould spots on the silicone sealant and grout along the edge of a bath in a UK rental bathroom, slightly yellowed silicone. |
| `repair-leak-before` / `-after` | Close-up inside an open kitchen sink cupboard, a dripping pipe joint under the sink, a small puddle and water stain on the cupboard base, a bowl catching drips. |
| `repair-wardrobe-before` / `-after` | Close-up of a white bedroom wardrobe door hanging crooked because of a broken hinge, gap visible at the top of the door. |
| `repair-carpet-before` / `-after` | Close-up of a light grey bedroom carpet with a large dark coffee stain near the bed leg. |

---

## 6. 补充素材（3 张）

第二期加的演示数据用到这 3 张。还没放进 `demo/` 之前，页面上显示"照片即将添加"的占位图。

| 文件名 | 房屋 | 比例 | Prompt（接在「通用风格」之后） |
|---|---|---|---|
| `check-alder-b1-windowsill` | A | 1:1 | Close-up of a white painted wooden windowsill under a sash bay window, with a paint chip about 3 cm wide exposing the wood underneath, a coin placed next to the chip for scale. Taken by a tenant to show the damage is larger than recorded. |
| `repair-tap-before` | B | 4:3 | Close-up of a chrome mixer tap on a white bathroom vanity basin, the tap visibly twisted at an angle because its base fitting has come loose, a small gap and water marks around the base. |
| `repair-tap-after` | B | 4:3 | 用 `repair-tap-before` 作参考图，套用第 5 节「维修后的编辑 prompt」生成：水龙头已经扶正、底座拧紧、周围擦干净。 |

`repair-tap-after` 不会自动显示，留着课堂演示时用：房东把这个报修标记为"已完成"时上传。

---

## 7. 备选：AI 生成户型图（不推荐，优先用我画的 SVG）

AI 生成的户型图常常墙体对不上、文字是乱码，我也拿不到准确的房间坐标，所以没法点击单个房间、也没法按出租状态着色。下面这条仅作备用。

```
Clean 2D architectural floor plan, top-down orthographic view, flat vector style, white background, walls in solid royal blue (#0f6cbd), room floors filled with very pale blue (#e8f2ff), door swings and windows drawn as thin blue lines, simple furniture symbols (beds, sofa, kitchen counter, bath, toilet, basin). NO text, NO labels, NO numbers, NO dimensions, NO compass. Layout: [在这里描述户型，例如 "ground floor: living room at the back, kitchen beside it, hallway with stairs at the front; first floor: two bedrooms and a bathroom"]. Portrait 3:4.
```
