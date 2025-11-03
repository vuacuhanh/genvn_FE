// SidebarControls.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Ghost, Lightning } from "@phosphor-icons/react";
import { UploadTeacherPack } from "../components/upload-teacher-pack";

type Config = {
  grade: number;
  focus: string[];
  counts: { mcq: number; short_answer: number; writing: number };
  difficulty: string;
  theme: string;
  teacher_pack_summary?: string;
};

export function SidebarControls({
  value,
  onChange,
  onGenerate,
  loading,
  onTeacherSummaryChange,
}: {
  value: Config;
  onChange: (v: Config) => void;
  onGenerate: () => void;
  loading: boolean;
  onTeacherSummaryChange: (s: string) => void;
}) {
  const toggleFocus = (key: string) => {
    const set = new Set(value.focus);
    if (set.has(key)) set.delete(key);
    else set.add(key);
    onChange({ ...value, focus: Array.from(set) });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <motion.aside 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="w-96 glass-effect p-6 space-y-6 overflow-y-auto shadow-2xl"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Khối lớp
        </label>
        <select
          value={value.grade}
          onChange={(e) => onChange({ ...value, grade: Number(e.target.value) })}
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 font-medium focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
        >
          {[1, 2, 3, 4, 5].map((g) => (
            <option key={g} value={g}>Lớp {g}</option>
          ))}
        </select>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
          Trọng tâm kiến thức
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "danh_tu", label: "Danh từ" },
            { key: "dong_tu", label: "Động từ" },
            { key: "tinh_tu", label: "Tính từ" },
            { key: "trang_tu", label: "Trạng từ" }
          ].map(({ key, label }) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleFocus(key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                value.focus.includes(key)
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-3">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
          Cấu trúc đề thi
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { key: "mcq", label: "Trắc nghiệm", color: "blue" },
            { key: "short_answer", label: "Tự luận", color: "purple" },
            { key: "writing", label: "Viết văn", color: "pink" }
          ].map(({ key, label }) => (
            <div key={key} className="space-y-1">
              <p className="text-xs text-slate-600 font-medium">{label}</p>
              <input
                type="number"
                min={0}
                value={value.counts[key as keyof typeof value.counts]}
                onChange={(e) =>
                  onChange({
                    ...value,
                    counts: { ...value.counts, [key]: Number(e.target.value) }
                  })
                }
                className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-center font-bold focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Lightning size={14} weight="fill" className="text-amber-500" />
          Độ khó
        </label>
        <select
          value={value.difficulty}
          onChange={(e) => onChange({ ...value, difficulty: e.target.value })}
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 font-medium focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
        >
          <option value="easy">Dễ</option>
          <option value="medium">Trung bình</option>
          <option value="hard">Khó</option>
        </select>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Ghost size={14} weight="fill" className="text-yellow-500" />
          Chủ đề 
        </label>
        <input
          type="text"
          value={value.theme || ""}
          onChange={(e) => onChange({ ...value, theme: e.target.value })}
          placeholder="Gia đình, trường lớp, thiên nhiên..."
          className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <UploadTeacherPack onUploaded={onTeacherSummaryChange} />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Ghi chú thêm
        </label>
        <textarea
          value={value.teacher_pack_summary || ""}
          onChange={(e) => onTeacherSummaryChange(e.target.value)}
          rows={3}
          className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
          placeholder="Thêm yêu cầu đặc biệt..."
        />
      </motion.div>

      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGenerate}
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Ghost size={20} weight="fill" />
            </motion.div>
            Đang sinh đề...
          </>
        ) : (
          <>
            <Ghost size={20} weight="fill" />
            Sinh đề bằng AI
          </>
        )}
      </motion.button>
    </motion.aside>
  );
}