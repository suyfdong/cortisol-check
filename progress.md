# Cortisol Check — 开发进度

> 项目：cortisollevel.xyz
> 最后更新：2026-04-03

---

## 2026-04-08 完成

### 1. Google Analytics (GA4) 接入
- 在 `layout.tsx` 中通过 Next.js `<Script>` 组件添加 GA4 跟踪代码
- Measurement ID：`G-3J422JZE41`
- 使用 `afterInteractive` 策略，不阻塞页面加载

### 2. Sitemap 添加
- 在 `public/sitemap.xml` 添加静态站点地图（静态导出不支持动态 sitemap 路由）
- 包含 10 个页面：首页、quiz 页、8 个结果页

### 3. Google Search Console 配置
- 添加验证文件 `public/google9b410392de760fe0.html`，验证通过
- 已提交 sitemap.xml，等待 Google 首次抓取

### 改动的文件
| 文件 | 说明 |
|---|---|
| `src/app/layout.tsx` | 添加 GA4 跟踪脚本（Script 组件） |
| `public/sitemap.xml` | 新增静态站点地图 |
| `public/google9b410392de760fe0.html` | 新增 Search Console 验证文件 |

---

## 2026-04-03 完成

### 1. 代码清理 & 桌面端优化
- 删除废弃的 `src/components/StatBar.tsx`（已被圆形数据块替代）
- 结果页桌面端双栏布局：左边卡片 + 右边操作按钮（`lg:flex-row`），移动端保持纵向堆叠
- 启用 `output: "export"` 静态导出（`next.config.ts`）

### 2. 部署上线
- GitHub 仓库：`suyfdong/cortisol-check`（昨日已推送，今日补记）
- 部署平台：Cloudflare Pages（Next.js Static HTML Export）
- 自定义域名：**cortisollevel.xyz** — Active，SSL enabled
- 自动部署：push to main → Cloudflare 自动构建

### 改动的文件
| 文件 | 说明 |
|---|---|
| `src/components/StatBar.tsx` | 删除（废弃组件） |
| `src/app/result/[slug]/ResultClient.tsx` | 桌面端双栏布局（lg:flex-row） |
| `next.config.ts` | 添加 `output: "export"` |

---

## 2026-04-02 完成

### 1. 产品策划（从趋势分析到 PRD）
- 深度分析 Google Trends + YouTube 搜索数据，确认 "low cortisol" meme 趋势
- 确定产品方向：病毒式 cortisol 人格测试工具
- 完成详细 PRD → `prd.md`
- 域名注册：**cortisollevel.xyz**（Cloudflare）

### 2. Phase 1 MVP 开发
- 搭建 Next.js 16 + Tailwind v4 项目
- 完成全部核心页面和组件

### 3. 设计迭代（V1 → V2 → V3 → V4）
- V1：暗黑赛博朋克风 → 反馈：太像健康App，不好玩
- V2：改为明亮渐变背景，每个类型独立配色 → 反馈：更好但描述风格单一
- V3：重写全部8个人格描述为不同文案格式（POV体/对话体/列表体等）
- V4：仪表盘改为大号色块分段式（参考 sticker 风格），加 CORTISOL 大字

---

## 改动的文件清单

### 项目配置
| 文件 | 说明 |
|---|---|
| `app/package.json` | dev 命令改为 `next dev --webpack`（避免 Turbopack 内存爆炸） |
| `app/.claudeignore` | 排除 node_modules/.next/out/ |

### 数据层
| 文件 | 说明 |
|---|---|
| `app/src/lib/data.ts` | 8个人格类型定义（slug/名称/描述/数据/渐变色/accent）+ 18道题库 + 随机抽题逻辑 + 计分算法 |

### 页面
| 文件 | 说明 |
|---|---|
| `app/src/app/layout.tsx` | 全局布局（Outfit + JetBrains Mono 字体、SEO meta、footer 免责声明） |
| `app/src/app/globals.css` | 全局样式（暗色主题变量、noise overlay、glitch 动画、meter 渐变） |
| `app/src/app/page.tsx` | 落地页（animated meter + hero CTA + 3个预览卡片） |
| `app/src/app/quiz/page.tsx` | 测试页（3题流式答题 + framer-motion 动画 + 随机抽题） |
| `app/src/app/result/[slug]/page.tsx` | 结果页服务端（generateStaticParams + OG meta） |
| `app/src/app/result/[slug]/ResultClient.tsx` | 结果页客户端（卡片 + 下载PNG + 分享按钮 + Phase 2/3 teaser） |
| `app/src/app/result/page.tsx` | /result 重定向到 /quiz |

### 组件
| 文件 | 说明 |
|---|---|
| `app/src/components/CortisolCard.tsx` | 分享卡片（渐变背景 + 大 meter + emoji + 描述 + 3圆形数据 + 品牌footer） |
| `app/src/components/CortisolMeter.tsx` | 仪表盘组件（5色块分段 + CORTISOL大字 + 指针动画 + glitch模式） |
| `app/src/components/MeterPreview.tsx` | 落地页用的动画仪表盘（同样5色块风格） |
| `app/src/components/StatBar.tsx` | 数据条组件（V1遗留，已被圆形数据块替代，可删除） |

### 文档
| 文件 | 说明 |
|---|---|
| `prd.md` | 完整 PRD（产品定位、用户画像、4阶段功能、流程图、8人格类型、技术方案、变现模型、时间线） |

---

## 当前状态

- **已上线**：https://cortisollevel.xyz（Cloudflare Pages，自动部署）
- `npm run build` 通过，全部 8 个结果页静态生成成功
- 落地页、测试页、结果页核心功能完整
- 桌面端结果页双栏布局已优化
- 18 道题库 + 随机抽 3 题 + 计分逻辑正常
- 下载 PNG（html-to-image）+ 分享按钮（WhatsApp/X/Telegram/Copy Link）已实现
- 每个人格类型独立渐变配色 + 不同风格的 Gen Z 文案
- **GA4 已接入**（G-3J422JZE41）
- **Sitemap 已提交** Google Search Console，等待首次抓取
- **Google AdSense 暂缓**：流量不足，等有流量后再接入

---

## 待解决的问题

1. ~~**桌面端布局**~~：已优化为双栏布局（2026-04-03）
2. **卡片视觉还可以继续优化**：目前 PM 评分 6-7/10，可以更好玩/更有冲击力
3. ~~**StatBar.tsx 可以删掉**~~：已删除（2026-04-03）
4. **Google AdSense 接入**：暂缓，等流量起来后再接
5. **Search Console sitemap 抓取**：已提交，状态"无法抓取"，等待 Google 处理

---

## 下一步

### 优先级 1：Phase 2 — AI 风格化（本周开始）
- [ ] 照片上传 + AI 风格转换（Replicate API）
- [ ] 付费解锁：$1.99-2.99
- [ ] 看广告解锁备选方案

### 优先级 2：传播优化
- [ ] OG Image 生成（每个类型独立的社交分享预览图）
- [ ] 验证分享循环：分享回流系数是否 > 0.5
- [ ] 落地页增加更多社交证明/示例卡片

### 优先级 3：视觉打磨
- [ ] 卡片设计继续打磨（更有冲击力、更好玩）

### 优先级 4：Phase 3 — 实体定制
- [ ] 接入 Printful/Gelato API
- [ ] 实物 Mockup 预览
- [ ] 产品线：贴纸 / 挂件 / 手机壳

### 优先级 5：Phase 4 — 品类扩展
- [ ] 西班牙语版本
- [ ] Dopamine / Serotonin / Melatonin 维度扩展
- [ ] "Daily Cortisol Check" 回访机制
