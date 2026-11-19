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
- **数量：** 照片共 36 张（第 6 节的 3 张是第二期补充的），另加第 7 节的 4 张写实户型图。时间紧的话，标「可选」的可以先跳过，代码里会复用其他图片。

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

## 7. 写实户型图（5 张）

用来替换现在示意性的 SVG 户型图。做法是**图片作底图 + 透明可点击层**：

- **底图：** 由 GPT 生成，**图上不能有任何文字**。
- **叠加层：** 图片放进 `demo/` 后，我看图标出每个房间的区域，房间名（中英文）、出租状态颜色、编号标记都叠加在上面，点击功能保持不变。

**生成要点：**
- **布局照描述来：** 每张图的房间位置要和下面的描述一致，因为演示数据里的房间和物品标记都对应这些位置。
- **三层要对齐：** 12 Alder Road 的三层**外轮廓相同、楼梯在同一位置**（右侧），尽量在同一个对话里连续生成，第二、三张可以上传第一张作参考：「Same house footprint, same staircase position and same drawing style as the attached plan.」
- **图上有文字就重新生成：** 如果出现文字、尺寸或指南针，补一句「Remove all text and labels」重新生成。

### 户型图通用风格（每条前面都加上）

```
Professional UK estate agent floor plan, top-down orthographic 2D view, clean vector line drawing. Solid black walls with realistic thickness (thicker external walls), white floors, door openings with thin quarter-circle swing arcs, windows drawn as thin double lines in the walls, simple grey outline furniture and fixtures. Crisp, high contrast, white background, generous white margin around the building. Absolutely NO text, NO room labels, NO numbers, NO dimensions, NO measurements, NO compass, NO scale bar, NO logo, NO watermark, NO colour fills, NO shadows, NO 3D.
```

### 文件与布局

图中**上方是房子正面（临街）**，下方是后院一侧。

| 文件名 | 比例 | Prompt（接在「户型图通用风格」之后） |
|---|---|---|
| `plan-alder-ground` | 竖版 2:3 | Ground floor of a narrow Victorian terraced house, a tall rectangle about 5 m wide and 12 m deep. Front of the house at the top. TOP-LEFT (about 60% of the width, top third): a front bedroom with a projecting bay window on the front wall, a double bed, wardrobe and desk. RIGHT SIDE (about 40% of the width, from the top down to two thirds of the depth): an entrance hallway with the front door at the top right, and a straight staircase running along the right-hand wall, treads drawn with a direction arrow. MIDDLE-LEFT (below the front bedroom): a living room with a sofa, armchair, coffee table and a chimney breast on the left wall. BOTTOM (full width, last third of the depth): a kitchen across the back of the house: tall fridge-freezer at the top-left corner of the kitchen, worktops along the left and bottom walls, sink under the rear window in the middle of the bottom wall, washing machine under the worktop, a 4-ring hob and oven on the right wall near the top of the kitchen, small dining table, back door to the garden at the bottom right. |
| `plan-alder-first` | 竖版 2:3 | First floor of the same Victorian terraced house: identical outer footprint, staircase in the same position along the right-hand wall arriving at a landing. TOP-LEFT (about 60% of the width, top 37%): a front bedroom with a double bed, chest of drawers, desk and one sash window on the front wall. RIGHT SIDE (top two thirds): landing and staircase. MIDDLE-LEFT: a bathroom with a bath and shower screen along the left wall, a pedestal basin and a toilet. BOTTOM (full width, last third of the depth): a small rear bedroom with a single bed on the left, a wardrobe, and a desk under the rear window on the right side. |
| `plan-alder-second` | 竖版 2:3 | Loft (second) floor of the same Victorian terraced house: identical outer footprint, staircase in the same position along the right-hand wall arriving at a small landing. Show sloping ceilings with thin dashed lines parallel to the front and back walls. TOP-LEFT (about 60% of the width, top 42%): a loft bedroom with a double bed and a skylight drawn as a small rectangle with diagonal hatching, desk under the skylight. RIGHT SIDE (top 57%): landing and staircase. BOTTOM-LEFT (about 60% of the width): a small loft bedroom with a single bed, wardrobe and desk, small rear window. BOTTOM-RIGHT (about 40% of the width): a compact shower room with a square shower tray, wall-hung basin and toilet. |
| `plan-riverside` | 横版 3:2 | A 2-bedroom flat in a modern apartment block, roughly 9 m wide and 6.5 m deep, entrance at the bottom. TOP-LEFT (about 55% of the width, top 60%): an open-plan kitchen and living room: straight kitchen run along the top wall at the left with an integrated washing machine at the far left and an induction hob next to it, a breakfast bar, a two-seater sofa, a small dining table, and a balcony door with a narrow balcony on the left wall. TOP-RIGHT (about 45% of the width, top half): main bedroom with a double bed, built-in sliding wardrobe and a large window on the right wall near the top. BOTTOM-RIGHT (about 45% of the width, bottom half): second bedroom with a single bed, desk and wardrobe. BOTTOM-LEFT (about 30% of the width, bottom 40%): bathroom with a bath along the left wall, vanity basin at the bottom-left corner, toilet and heated towel rail. BOTTOM-MIDDLE: a small entrance hall with the front door in the bottom wall, connecting to all rooms. |
| `plan-harbour` | 方形 1:1 | A 1-bedroom flat in a converted Victorian brick warehouse by the docks, roughly 8 m by 8 m, entrance on the LEFT wall. The outline is NOT a plain rectangle: the bottom-right corner is cut away (an L-shaped flat). Thick external brick walls, two tall arched warehouse windows on the TOP wall and one on the RIGHT wall, and a round structural column standing in the middle of the living area. LEFT EDGE (narrow strip, about 20% of the width, full height): an entrance hallway with the front door in the left wall halfway down and a built-in storage cupboard. TOP (about 80% of the width, top half): a large open-plan living room and kitchen: a galley kitchen run along the top wall at the right with a sink under one arched window, a hob and an integrated fridge-freezer, a kitchen island with two stools, a three-seater sofa facing a TV unit, a rug and the round column between them. BOTTOM-MIDDLE (about 45% of the width, bottom half): a bedroom with a double bed against the bottom wall, two bedside tables and a fitted wardrobe along the left wall of the room. BOTTOM-RIGHT corner: cut away (outside the flat, leave empty white). Between the bedroom and the cut-away corner, a narrow shower room with a walk-in shower, basin and toilet, entered from the living area. |

**尺寸：** 竖版约 1024×1536，横版约 1536×1024，PNG 最好（线条更清晰）。

---

## 8. 旧备选：不推荐的「带颜色」户型图

第 7 节的写实黑白户型图出来以后，这一节就不需要了。保留只是作为记录。


AI 生成的户型图常常墙体对不上、文字是乱码，我也拿不到准确的房间坐标，所以没法点击单个房间、也没法按出租状态着色。下面这条仅作备用。

```
Clean 2D architectural floor plan, top-down orthographic view, flat vector style, white background, walls in solid royal blue (#0f6cbd), room floors filled with very pale blue (#e8f2ff), door swings and windows drawn as thin blue lines, simple furniture symbols (beds, sofa, kitchen counter, bath, toilet, basin). NO text, NO labels, NO numbers, NO dimensions, NO compass. Layout: [在这里描述户型，例如 "ground floor: living room at the back, kitchen beside it, hallway with stairs at the front; first floor: two bedrooms and a bathroom"]. Portrait 3:4.
```

## 9. Inventory close-ups

Close-ups for three inventory lines rated "Fair" (Bedroom 5 wardrobe, living-room floor, Bathroom 2 grout). All three are generated and used in the demo data.

---

## 10. 押金纠纷：地毯污渍（2 张，同一角度）

✅ 已生成并用于演示数据。

用于「已退租」演示账户 Yuki Tanaka（12 Alder Road 卧室 2，2025 年 9 月 – 2026 年 8 月）。入住时地毯上已有一小块污渍，退租时变大了。两张图会在页面上**左右并排**对比，所以**角度、构图、光线必须一致**，只有污渍不同。

**生成要点：**
- 先生成第 1 张；第 2 张在同一个对话里上传第 1 张作参考，并加一句：「Same room, same camera position, same angle and same lighting as the attached photo. Only the stain is different.」
- 横版 4:3（约 1200×900）。
- 两张都接在「通用风格」后面。第 2 张把通用风格里的 "check-in inspection" 改成 "check-out inspection"。

| 文件名 | Prompt |
|---|---|
| `deposit-carpet-movein.jpg` | Close-up phone photo looking down at a light grey short-pile carpet in a UK student bedroom, next to the wooden leg of a single bed at the left edge of the frame and a white skirting board along the top edge. On the carpet, about 20 cm from the bed leg, one small faint light-brown stain about the size of a 2-pence coin, slightly blurred edges. The rest of the carpet is clean with normal light wear. Shot from standing height, angled about 45 degrees down. |
| `deposit-carpet-moveout.jpg` | Same room, same camera position, same angle and same lighting as the attached photo. The stain in the same place next to the bed leg is now clearly larger, about the size of a palm, darker brown in the middle with an irregular, slightly faded edge, as if a drink was spilled on it and not fully cleaned. The rest of the carpet looks the same, with a little more everyday wear. |

---

## 11. Harbour Court（中介代管的公寓，5 张）

用于中介版演示（Harbour Lettings 代管的 Harbour Court 3 号和 7 号）。两套公寓户型相同，共用一套照片即可。户型参考 `demo/plan-harbour.png`：左边一条入户走廊，上方是开放式厨房和客厅（中岛、三人沙发、一根圆柱），下方是卧室，旁边是窄长的淋浴间，顶墙有拱形仓库窗。

**房屋设定（C. Harbour Court，每条 prompt 里都加上）：**

```
Flat: a 1-bedroom flat in a converted Victorian brick warehouse by the docks in East London. Exposed red-brick walls in places, tall arched warehouse windows with slim black frames, dark grey oak-effect floor, white walls, black metal light fittings, a round white structural column in the living area. Modern, clean, mid-range rental standard.
```

| 文件名 | 比例 | Prompt（接在「通用风格」和「房屋设定 C」之后） |
|---|---|---|
| `harbour-court-exterior` | 横版 16:9 | Street view of the converted red-brick warehouse building from the pavement on a bright overcast day. Rows of tall arched windows, a black metal entrance door with a small canopy, a few bicycles locked to railings. No readable signs, no house numbers, no people. Not a phone photo: a clean exterior shot. |
| `harbour-kitchen-living` | 横版 4:3 | Wide shot of the open-plan kitchen and living room. Galley kitchen along the back wall under an arched window with white units, black worktop, sink, induction hob and an integrated fridge. A kitchen island with two stools in the middle. On the left a grey three-seater sofa facing a low TV unit, a rug, and the round white column standing between the sofa and the island. |
| `harbour-bedroom` | 横版 4:3 | Double bedroom with a double bed against the back wall, two small bedside tables with lamps, a tall white fitted wardrobe along the left wall, grey carpet, one exposed-brick wall, a window with a roller blind. |
| `harbour-shower-room` | 横版 4:3 | Narrow shower room: a walk-in shower with a glass screen and a white shower tray on the left, a wall-hung white basin with a mirror cabinet, a white toilet, light grey tiles, a heated towel rail. Clean and in good condition. |
| `repair-harbour-shower-before` | 横版 4:3 | Close-up looking down at the base of the same walk-in shower: a puddle of water spreading out from under the edge of the white shower tray across the grey floor tiles, the silicone seal along the tray edge cracked and lifting in one place. Taken by a tenant to report a leak. |

---

## 12. 安全设施：烟雾和一氧化碳报警器（2 张）

用于设施档案里的「安全」类别（12 Alder Road），会在户型图上加两个设施标记，并配上每年检查的提醒。房屋设定用 A（12 Alder Road）。比例：1:1，约 1024×1024，和其他物品特写一致。

| 文件名 | Prompt（接在「通用风格」和「房屋设定 A」之后） |
|---|---|
| `item-alder-smoke` | Close-up looking up at a round white smoke alarm fixed to the white ceiling of a hallway in a Victorian house, with a small test button in the middle and a tiny green status light. Part of a ceiling rose and the top of the staircase visible at the edge of the frame. No text or brand names readable. |
| `item-alder-co` | Close-up of a small white carbon monoxide alarm mounted on a kitchen wall at head height, next to a tall white boiler cupboard door, with a test button and a small green light. Oak-effect kitchen worktop just visible below. No text or brand names readable. |

---

## 13. 长期使用的积累（34 张）

目的：让演示看起来像 HomeLog 已经用了几年，记录越积越多，而不是只有这一个租期。每一组对应一个能体现「积累」价值的功能。图片到位后，我会补上对应的历史数据：往年的租约、设施的多次维修和保养、反复出现的问题等。

**同一角度的系列照片：** 先生成第一张，然后在同一个对话里上传它作参考，用这句编辑 prompt 生成后面几张：

```
Same room, same camera position, same angle and same lighting as the attached photo. Change only what is described below. Keep everything else identical.
```

所有照片都接在「通用风格」和对应的「房屋设定」（A = 12 Alder Road，B = Riverside，C = Harbour Court）之后。比例：房间 4:3，特写 1:1，外观 16:9。照片里不要出现可读的文字、证书、发票或品牌名（生图写字容易出错，而且不像真实照片）。

### 13.1 同一个房间的多年入住照片（3 张）

**体现的功能：** 一个房间跨越多届租客的历史。房东能看到这间房三年来怎么变化，新租客能看到之前的状况。数据上，卧室 2 会多一段 2024–25 年的过往租约。

| 文件名 | 设定 | Prompt |
|---|---|---|
| `hist-alder-b2-2024` | A | 用 `demo/alder-bedroom-2` 作参考，同一角度。The same bedroom two years earlier, freshly redecorated: brand-new light grey carpet without any wear, crisp white paint, the same furniture looking newer. |
| `hist-alder-b2-2025` | A | 用 `hist-alder-b2-2024` 作参考，同一角度。The same bedroom one year later, after a year of use: slight wear on the carpet near the desk chair, two small scuff marks on the wall beside the desk, a faint coin-sized stain on the carpet by the bed. |
| `hist-riverside-living-2024` | B | 用 `demo/riverside-kitchen-living` 作参考，同一角度。The same open-plan kitchen and living room two years earlier, when the flat was first let: everything new and spotless, a different sofa (light beige), no rug. |

### 13.2 设施的一生（10 张）

**体现的功能：** 设施档案里按时间排列的维修和保养记录：安装、每年保养、故障、维修。房东能据此判断该修还是该换；维修方上门前能看到之前修过什么。

| 文件名 | 设定 | 比例 | Prompt |
|---|---|---|---|
| `fac-boiler-install-2018` | A | 1:1 | 用 `demo/item-alder-boiler` 作参考。The same combi boiler on the day it was installed: brand-new and shiny, new copper pipework below with fresh joints, a protective film still on the front panel, a dust sheet on the worktop. |
| `fac-boiler-service-2024` | A | 1:1 | The same combi boiler during its annual service: the white front cover removed and leaning against the wall, internal parts visible, an open engineer's tool case and a handheld flue gas analyser on the worktop below. No people. |
| `fac-boiler-pressure-2023-before` | A | 1:1 | Close-up of the boiler's round pressure gauge with the needle at zero, and a drip of water from the copper pressure relief pipe below, with a small puddle on the cupboard shelf. |
| `fac-boiler-pressure-2023-after` | A | 1:1 | 用上一张作参考，同一角度。The pressure gauge needle now sits at 1.5 bar, the relief pipe is dry and the shelf has been wiped clean; a new brass valve is visible on the pipe. |
| `fac-fridge-seal-2025-before` | A | 1:1 | Close-up of the bottom corner of a white fridge-freezer door, the rubber door seal torn and hanging loose, with a little frost build-up inside. |
| `fac-fridge-seal-2025-after` | A | 1:1 | 用上一张作参考，同一角度。A new, clean rubber door seal fitted neatly all around the door corner, no frost, door closing flush. |
| `fac-shower-old-2021` | A | 1:1 | 用 `demo/item-alder-shower` 作参考，同一角度。An older electric shower unit in the same place before it was replaced: yellowed plastic casing with a hairline crack, heavy limescale on the shower head and hose. |
| `fac-washer-2024` | B | 1:1 | A washing machine pulled out from its kitchen cabinet space with the back panel removed during a repair, the drum and belt visible, hoses disconnected and a towel on the floor. No people. |
| `fac-window-seal-2023-before` | A | 1:1 | Close-up of a white uPVC double-glazed bay window pane with misty condensation trapped between the two panes of glass, a sign the seal has failed. |
| `fac-window-seal-2023-after` | A | 1:1 | 用上一张作参考，同一角度。The same window with a new sealed glass unit: perfectly clear glass, new black gasket, view outside crisp. |

### 13.3 反复出现的问题（5 张，同一角度系列）

**体现的功能：** 同一个位置的问题年年出现，记录连起来才看得出根源。卫生间 1 的天花板每年冬天发霉，最后发现是排气扇坏了，换掉后问题消失。这个故事很适合答辩讲：「单看一次报修看不出原因，HomeLog 的历史记录让根源浮出水面。」也和英国对潮湿发霉越来越严格的维修要求相关。

| 文件名 | 设定 | Prompt |
|---|---|---|
| `recur-bath1-mould-2024` | A | Bathroom ceiling corner above a bath in winter: patches of black mould spreading across the white ceiling paint near a small square extractor fan grille, the paint slightly bubbled. Shot looking up from the bath. |
| `recur-bath1-mould-2024-after` | A | 用上一张作参考，同一角度。The ceiling has been treated and repainted bright white, no mould visible; the extractor fan grille is the same as before. |
| `recur-bath1-mould-2025` | A | 用 `recur-bath1-mould-2024-after` 作参考，同一角度。One winter later: small new spots of black mould coming back around the edge of the extractor fan grille, dust and grime on the grille slats. |
| `recur-bath1-fan-2025-after` | A | 用上一张作参考，同一角度。The old grille replaced by a new white humidity-sensing extractor fan with a small indicator light; ceiling cleaned and repainted, no mould. |
| `recur-bath1-ceiling-2026` | A | 用上一张作参考，同一角度。A year later in winter: the ceiling is still clean and white with no mould, the new extractor fan in place. Slight condensation on the window just visible at the edge of the frame. |

### 13.4 历届退租检查（6 张，3 对）

**体现的功能：** 往年租约的押金结果，有扣款的也有不扣的，体现「证据对双方都公平」：正常损耗不扣钱，真实损坏有据可查。数据上会多三段过往租约，各有入住和退租照片对照。

| 文件名 | 设定 | Prompt |
|---|---|---|
| `past-b4-2025-wall-movein` | A | Close-up of a clean white bedroom wall above a desk in a loft room with a sloping ceiling, smooth paint, no marks. |
| `past-b4-2025-wall-moveout` | A | 用上一张作参考，同一角度。The same wall at move-out: a few faint greasy marks and two tiny paint lifts where Blu Tack held posters, otherwise fine. Looks like ordinary fair wear and tear. |
| `past-kitchen-2024-worktop-movein` | A | Close-up of an oak-effect laminate kitchen worktop next to a hob, clean and undamaged. |
| `past-kitchen-2024-worktop-moveout` | A | 用上一张作参考，同一角度。The same worktop at move-out with a dark round scorch mark about 10 cm across, where a hot pan was put down, the laminate surface slightly bubbled. Clearly damage, not wear. |
| `past-riverside-sofa-2024-movein` | B | Close-up of the seat cushions of a light beige fabric two-seater sofa in a modern flat, clean and new. |
| `past-riverside-sofa-2026-moveout` | B | 用上一张作参考，同一角度。The same sofa cushions two years later: general softening and slight fading, plus one large dark red wine stain on the middle cushion. |

### 13.5 更多历史维修（6 张，3 对）

**体现的功能：** 让报修列表和设施记录有足够多的历史条目：已验收的、不同维修方的、不同年份的。统计数字（平均维修时长、维修支出）也会更有说服力。

| 文件名（before / after） | 设定 | 维修前 Prompt（维修后用第 5 节的通用编辑 prompt） |
|---|---|---|
| `hist-door-handle-before` / `-after` | A | Close-up of a white bedroom door with its lever handle hanging loose and drooping downwards, a screw missing from the backplate. |
| `hist-radiator-valve-before` / `-after` | A | Close-up of a white radiator valve at floor level leaking: water droplets on the valve, a folded towel and a small bowl underneath, a damp patch on the carpet edge. |
| `hist-front-lock-before` / `-after` | A | Close-up of a white front door lock from the inside: the thumb-turn knob broken off, the lock cylinder scratched, a key stuck in the outside half visible through the gap. |

### 13.6 中介代管的更多房产（4 张外观）

**体现的功能：** 中介的组合概览和团队工作量需要更多房产才显得真实。这几套只放外观照和少量数据（入住率、几条报修、合规状态），分给 Olivia 和 Sam，让「团队工作量」表有内容。

| 文件名 | 比例 | Prompt（外观照，不用「通用风格」里的 phone photo 部分） |
|---|---|---|
| `prop-maple-house-exterior` | 16:9 | An Edwardian semi-detached red-brick house in a North London street, bay windows on two floors, a small front garden with a low wall and wheelie bins. Bright overcast day, no people, no readable house numbers. |
| `prop-canal-view-exterior` | 16:9 | A modern six-storey apartment block beside a canal in East London, grey brick and large windows with small balconies, a towpath and a narrowboat in the foreground. No people, no readable signs. |
| `prop-victoria-terrace-exterior` | 16:9 | A row of three-storey Victorian terraced houses in South London, one house in the middle painted pale blue with a black front door, steps up to the door, railings. No people, no readable numbers. |
| `prop-studio-block-exterior` | 16:9 | A small modern block of student studios near a university campus, light brick and timber cladding, bike racks outside the entrance, young trees. No people, no readable signs. |
