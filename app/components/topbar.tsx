"use client";

import React, { useEffect, useRef, useState } from "react";
import { FileText, DownloadSimple, CaretDown } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

export function Topbar({
  onExport,
  hasPaper,
}: {
  onExport: (fmt: string) => void;
  hasPaper: boolean;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current || menuRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const exportOptions = [
    { label: "DOCX", value: "docx" },
    { label: "PDF",  value: "pdf"  }, // cần BE hỗ trợ
    { label: "TXT",  value: "txt"  },
  ];

  const handleChoose = (fmt: string) => {
    setOpen(false);
    if (!hasPaper) return;
    onExport(fmt);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 glass-effect flex items-center justify-between px-6 sticky top-0 z-50 shadow-lg shadow-purple-500/5"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
        >
          <FileText size={22} weight="bold" className="text-white" />
        </motion.div>
        <div>
          <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Generator 
          </h1>
          <p className="text-xs text-slate-500">Powered by Vy 🐖</p>
        </div>
      </div>

      {/* Single Export Button + Dropdown */}
      <div className="relative" ref={menuRef}>
        <motion.button
          whileHover={{ scale: hasPaper ? 1.03 : 1 }}
          whileTap={{ scale: hasPaper ? 0.97 : 1 }}
          disabled={!hasPaper}
          onClick={() => setOpen((s) => !s)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <DownloadSimple size={20} weight="bold" />
          Export
          <CaretDown size={16} className="opacity-90" />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 8, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.14 }}
              role="menu"
              className="absolute right-0 mt-1 w-40 overflow-hidden rounded-xl border border-purple-100 bg-white/90 backdrop-blur-sm shadow-xl"
            >
              {exportOptions.map((opt) => (
                <button
                  key={opt.value}
                  role="menuitem"
                  onClick={() => handleChoose(opt.value)}
                  className="w-full text-left px-3 py-2.5 text-sm hover:bg-purple-50 flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  <span className="text-xs text-slate-400 uppercase">{opt.value}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
