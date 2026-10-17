"use client";

import { useRef, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("Copy email");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setLabel("Copied");
      setTimeout(() => setLabel("Copy email"), 1600);
    } catch {
      const el = textRef.current;
      if (el) {
        const sel = getSelection();
        const range = document.createRange();
        range.selectNodeContents(el);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  };

  return (
    <>
      <span ref={textRef} className="select-all font-mono text-[13px]">
        {email}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="cursor-pointer rounded-[var(--r)] border border-line bg-panel-2 px-[9px] py-[3px] text-[12px] font-semibold hover:border-accent"
      >
        {label}
      </button>
    </>
  );
}
