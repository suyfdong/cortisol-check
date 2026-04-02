# Cortisol Check — cortisollevel.xyz

病毒式 cortisol 人格测试工具。用户做 3 道趣味题 → 得到 cortisol 人格卡片 → 截图/下载分享到社交媒体。

## 技术栈

- Next.js 16.2.2 + TypeScript + App Router
- Tailwind CSS v4（`@theme inline` 语法定义设计变量）
- framer-motion（页面切换动画）
- html-to-image（卡片导出为 PNG）
- 部署目标：Cloudflare Pages

## 重要：开发注意事项

- **必须用 `npm run dev`**（已配置 `--webpack`），不要用 turbopack，会内存爆炸
- **不要写任何健康/医学内容**，这是娱乐工具不是医疗站，避免触发 Google YMYL
- 全站纯静态，无后端、无数据库、无用户系统
- 所有结果页通过 `generateStaticParams` 预渲染
- 移动端优先设计（90%+ 用户来自 TikTok/Instagram）

## 项目结构

```
src/
├── lib/
│   └── data.ts              # 核心数据：8个人格类型 + 18道题库 + 计分逻辑 + 随机抽题
├── components/
│   ├── CortisolCard.tsx      # 分享卡片（渐变背景 + meter + emoji + 描述 + 数据）
│   ├── CortisolMeter.tsx     # 仪表盘（5色块分段 + CORTISOL文字 + 指针 + glitch模式）
│   ├── MeterPreview.tsx      # 落地页动画仪表盘
│   └── StatBar.tsx           # [废弃] 已被圆形数据块替代，可删除
├── app/
│   ├── layout.tsx            # 根布局（Outfit + JetBrains Mono 字体、meta、footer）
│   ├── globals.css           # 全局样式（暗色主题、noise overlay、动画 keyframes）
│   ├── page.tsx              # 落地页 /
│   ├── quiz/page.tsx         # 测试页 /quiz（"use client"，随机3题）
│   └── result/
│       ├── page.tsx          # /result → 重定向到 /quiz
│       └── [slug]/
│           ├── page.tsx      # 结果页 SSG（generateStaticParams + OG meta）
│           └── ResultClient.tsx  # 结果页交互（下载、分享、"use client"）
```

## 数据架构（data.ts）

### PersonaType — 8个人格类型
每个类型包含：slug、name、meterPosition(0-100)、tags、description、stats(3项)、spiritAnimal、gradient(渐变色)、textColor、accent

**计分规则**：3题各4选项（low=1, medium=2, high=3, chaotic=随机）→ 总分3-9映射到7个类型。选2个以上 chaotic → 特殊类型 "Cortisol Glitch"。

### 题库 — 18道题，每次随机抽3道
`getRandomQuestions(3)` 使用 Fisher-Yates shuffle。题目在 quiz 页 `useMemo` 中初始化，保证单次测试内不变。

## 卡片设计要点

- 每个人格类型有独立的**明亮渐变背景**（不是统一暗色）
- 仪表盘是**核心视觉**：5色块分段（绿→黄绿→黄→橙→红），中间有 CORTISOL 大字
- 描述文案是 **Gen Z internet-speak**，每个类型用不同的文案格式（POV体/对话体/列表体等）
- 卡片底部有品牌 footer "cortisollevel.xyz" 作为传播水印
- 下载通过 `html-to-image` 的 `toPng()` 实现，pixelRatio=3 保证清晰度

## 路由

| 路径 | 类型 | 说明 |
|---|---|---|
| `/` | Static | 落地页 |
| `/quiz` | Static (CSR) | 测试页，纯客户端交互 |
| `/result` | Redirect | → /quiz |
| `/result/[slug]` | SSG | 8个结果页，各有独立 OG meta |

## Phase 路线图

- **Phase 1（当前）**：测试 + 卡片 + 分享 + AdSense
- **Phase 2**：照片上传 + AI 风格转换（Replicate API）→ 付费 $1.99
- **Phase 3**：实体定制（Printful/Gelato API）→ 贴纸/挂件/手机壳
- **Phase 4**：西语版 + dopamine/serotonin 扩展维度
