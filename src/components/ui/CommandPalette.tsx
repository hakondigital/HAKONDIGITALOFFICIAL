"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
  module: string;
  description: string;
  href: string;
  isAnchor: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", module: "SYS.001", description: "Back to top", href: "#home", isAnchor: true },
  { id: "websites", label: "Websites", module: "SYS.002", description: "High-performance web systems", href: "#websites", isAnchor: true },
  { id: "software-systems", label: "Software Systems", module: "SYS.003", description: "Custom software engineering and automation", href: "#software-systems", isAnchor: true },
  { id: "odyssey", label: "Odyssey CRM", module: "SYS.004", description: "AI-powered client relationship platform", href: "#odyssey", isAnchor: true },
  { id: "portfolio", label: "Portfolio", module: "SYS.005", description: "Recent projects and deployments", href: "#portfolio", isAnchor: true },
  { id: "process", label: "Process", module: "SYS.006", description: "Strategy, design, build, launch", href: "#process", isAnchor: true },
  { id: "contact", label: "Contact", module: "SYS.009", description: "Start a project — respond within 12 hours", href: "#contact", isAnchor: true },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? NAV_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.module.toLowerCase().includes(query.toLowerCase())
      )
    : NAV_ITEMS;

  const navigate = useCallback(
    (item: NavItem) => {
      if (item.isAnchor) {
        const el = document.getElementById(item.id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = item.href;
      }
      onClose();
    },
    [onClose]
  );

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filtered[activeIndex]) navigate(filtered[activeIndex]);
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, filtered, activeIndex, navigate, onClose]);

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;
    if (active) active.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // Reset activeIndex when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-[18vh] z-[101] w-full max-w-xl -translate-x-1/2 px-4"
            role="dialog"
            aria-label="Command palette"
            aria-modal="true"
          >
            <div className="corner-marks overflow-hidden rounded-lg border border-border-light/60 bg-bg-card shadow-[0_32px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,200,255,0.06)]">
              {/* Header bar */}
              <div className="flex items-center border-b border-border px-4 py-3">
                <div className="flex items-center gap-3 flex-1">
                  <svg className="h-4 w-4 text-accent/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search sections..."
                    className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                    aria-label="Search sections"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="text-text-muted hover:text-text-secondary transition-colors"
                      aria-label="Clear search"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="ml-3 flex items-center gap-1.5">
                  <kbd className="mono-label rounded border border-border px-1.5 py-0.5" style={{ fontSize: "9px", opacity: 0.4 }}>ESC</kbd>
                </div>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-72 overflow-y-auto py-1.5"
                role="listbox"
                aria-label="Navigation options"
              >
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <span className="mono-label" style={{ opacity: 0.35 }}>NO RESULTS FOUND</span>
                  </div>
                ) : (
                  filtered.map((item, i) => (
                    <button
                      key={item.id}
                      data-index={i}
                      role="option"
                      aria-selected={i === activeIndex}
                      onClick={() => navigate(item)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-center gap-4 px-4 py-3 text-left transition-colors ${
                        i === activeIndex ? "bg-bg-elevated" : "hover:bg-bg-elevated/50"
                      }`}
                    >
                      {/* Module tag */}
                      <span
                        className="mono-label shrink-0 w-16"
                        style={{ fontSize: "9px", opacity: i === activeIndex ? 0.7 : 0.35 }}
                      >
                        {item.module}
                      </span>

                      {/* Label + description */}
                      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                        <span className={`text-sm font-medium tracking-tight ${i === activeIndex ? "text-text-primary" : "text-text-secondary"}`}>
                          {item.label}
                        </span>
                        <span className="text-xs text-text-muted truncate">{item.description}</span>
                      </div>

                      {/* Enter indicator */}
                      {i === activeIndex && (
                        <kbd className="mono-label shrink-0 rounded border border-accent/30 bg-accent/8 px-1.5 py-0.5 text-accent" style={{ fontSize: "9px" }}>
                          ENTER
                        </kbd>
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <kbd className="mono-label rounded border border-border px-1 py-0.5" style={{ fontSize: "8px", opacity: 0.4 }}>↑↓</kbd>
                    <span className="mono-label" style={{ fontSize: "8px", opacity: 0.3 }}>navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="mono-label rounded border border-border px-1 py-0.5" style={{ fontSize: "8px", opacity: 0.4 }}>↵</kbd>
                    <span className="mono-label" style={{ fontSize: "8px", opacity: 0.3 }}>select</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="status-dot" style={{ width: "4px", height: "4px" }} />
                  <span className="mono-label" style={{ fontSize: "8px", opacity: 0.3 }}>HAKON DIGITAL NAV</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook to control CommandPalette open state and keyboard trigger.
 * Place the returned <CommandPalette> in a layout component.
 */
export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      // "/" key when not in an input/textarea
      if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return {
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
  };
}
