"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import { PersonaType } from "@/lib/data";
import { CortisolCard } from "@/components/CortisolCard";

interface ResultClientProps {
  persona: PersonaType;
}

export function ResultClient({ persona }: ResultClientProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
      });
      const link = document.createElement("a");
      link.download = `cortisol-${persona.slug}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
    setDownloading(false);
  }, [persona.slug, downloading]);

  const shareUrl = `https://cortisollevel.xyz/result/${persona.slug}`;
  const shareText = `I'm ${persona.name} ${persona.spiritAnimal.emoji}\nWhat's YOUR cortisol type?`;

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl]);

  const handleShare = useCallback(
    async (platform: string) => {
      const encodedText = encodeURIComponent(shareText);
      const encodedUrl = encodeURIComponent(shareUrl);

      const urls: Record<string, string> = {
        whatsapp: `https://wa.me/?text=${encodedText}%0A${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      };

      if (platform === "native" && navigator.share) {
        try {
          await navigator.share({ title: shareText, url: shareUrl });
          return;
        } catch {
          // User cancelled, ignore
        }
      }

      if (urls[platform]) {
        window.open(urls[platform], "_blank", "noopener,noreferrer");
      }
    },
    [shareText, shareUrl]
  );

  return (
    <div className="w-full min-h-dvh flex flex-col items-center justify-start px-4 py-8 md:py-16">
      {/* Background glow */}
      <div
        className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ backgroundColor: persona.accent }}
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <p className="text-muted text-xs font-mono uppercase tracking-[0.2em] mb-1">
          Your Cortisol Type
        </p>
        <h1
          className="text-2xl md:text-3xl font-black"
          style={{ color: persona.accent }}
        >
          {persona.name}
        </h1>
      </motion.div>

      {/* Desktop: side-by-side layout / Mobile: stacked */}
      <div className="w-full max-w-4xl flex flex-col lg:flex-row lg:items-start lg:justify-center gap-6 lg:gap-10">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-shrink-0 mx-auto lg:mx-0"
        >
          <CortisolCard persona={persona} cardRef={cardRef} />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-[400px] md:max-w-[440px] lg:max-w-[360px] mx-auto lg:mx-0 space-y-3"
        >
        {/* Download */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-[0.98]"
          style={{
            backgroundColor: `${persona.accent}15`,
            border: `1px solid ${persona.accent}30`,
            color: persona.accent,
          }}
        >
          {downloading ? (
            <span className="animate-pulse">Generating...</span>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Card
            </>
          )}
        </button>

        {/* Share buttons */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => handleShare("whatsapp")}
            className="flex flex-col items-center gap-1 py-3 rounded-xl bg-surface border border-border hover:border-[#25D366]/40 transition-colors"
          >
            <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-[10px] text-muted">WhatsApp</span>
          </button>

          <button
            onClick={() => handleShare("twitter")}
            className="flex flex-col items-center gap-1 py-3 rounded-xl bg-surface border border-border hover:border-[#1DA1F2]/40 transition-colors"
          >
            <svg className="w-5 h-5 text-[#1DA1F2]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-[10px] text-muted">X</span>
          </button>

          <button
            onClick={() => handleShare("telegram")}
            className="flex flex-col items-center gap-1 py-3 rounded-xl bg-surface border border-border hover:border-[#0088cc]/40 transition-colors"
          >
            <svg className="w-5 h-5 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            <span className="text-[10px] text-muted">Telegram</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center gap-1 py-3 rounded-xl bg-surface border border-border hover:border-foreground/20 transition-colors"
          >
            {copied ? (
              <svg className="w-5 h-5 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            )}
            <span className="text-[10px] text-muted">
              {copied ? "Copied!" : "Link"}
            </span>
          </button>
        </div>

        {/* Native share (mobile) */}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={() => handleShare("native")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-surface border border-border text-foreground text-sm font-medium hover:bg-surface-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        )}

        {/* Phase 2 & 3 teasers */}
        <div className="pt-3 space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-dashed border-border">
            <span className="text-lg">📸</span>
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground/80">
                AI-Styled Avatar Version
              </p>
              <p className="text-[10px] text-muted">Coming soon</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
              SOON
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-dashed border-border">
            <span className="text-lg">🛍️</span>
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground/80">
                Stickers, Keychains & More
              </p>
              <p className="text-[10px] text-muted">Make it real</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neon-orange/10 text-neon-orange border border-neon-orange/20">
              SOON
            </span>
          </div>
        </div>

        {/* Try Again */}
        <Link
          href="/quiz"
          className="block w-full text-center py-3 rounded-xl border border-border text-muted text-sm hover:bg-surface transition-colors"
        >
          Try Again
        </Link>

        {/* Ad placeholder */}
        <div className="h-[250px] rounded-xl border border-dashed border-border/50 flex items-center justify-center text-muted/30 text-xs font-mono">
          AD SPACE
        </div>
      </motion.div>
      </div>
    </div>
  );
}
