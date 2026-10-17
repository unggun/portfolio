export function CtaButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="cta inline-flex items-center gap-2.5 whitespace-nowrap rounded-[var(--r)] bg-accent px-[18px] py-[11px] font-bold text-on-accent no-underline transition-transform duration-150 active:translate-y-px active:scale-[.98]"
    >
      <span className="size-[9px] rounded-full bg-current" aria-hidden="true" />
      {label}
    </a>
  );
}
