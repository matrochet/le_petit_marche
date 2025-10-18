"use client";

import { useEffect } from "react";

// Lightweight DOM pass to enforce French typographic spaces (NBSP) before : ; ! ?
// Applies once on hydration. Skips script/style/noscript/textarea.
export default function TypographyFixes() {
  useEffect(() => {
    try {
      const ROOT = document.querySelector("main") || document.body;
      const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE"]);

      const walker = document.createTreeWalker(ROOT, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (SKIP.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
          const text = node.nodeValue || "";
          // Quick reject for performance
          return /[:;!?]/.test(text) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
      });

      const toFix: Text[] = [];
      let n: Node | null = walker.nextNode();
      while (n) {
        toFix.push(n as Text);
        n = walker.nextNode();
      }

      for (const t of toFix) {
        const orig = t.nodeValue || "";
        // Insert NBSP (\u00A0) before French high punctuation when preceded by a non-space char
        const fixed = orig
          .replace(/(\S)\s*:/g, "$1\u00A0:")
          .replace(/(\S)\s*;/g, "$1\u00A0;")
          .replace(/(\S)\s*!/g, "$1\u00A0!")
          .replace(/(\S)\s*\?/g, "$1\u00A0?");
        if (fixed !== orig) t.nodeValue = fixed;
      }
    } catch {
      // no-op
    }
  }, []);

  return null;
}
