/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Clock, Star } from "@phosphor-icons/react";
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PaperPreview({ paper, loading }: { paper: any; loading?: boolean }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-purple-200 border-t-purple-600"
        />
      </div>
    );
  }

  if (!paper) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center"
      >
        <FileText size={64} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-xl font-semibold text-slate-400 mb-2">
          Chưa có đề thi
        </h3>
        <p className="text-slate-400">
          Chọn cấu hình bên trái và bấm Sinh đề bằng AI để tạo đề kiểm tra tiếng Việt.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5 pb-10"
    >
      {/* Header Card */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-effect rounded-3xl p-6 border-2 border-purple-100"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              ĐỀ KIỂM TRA TIẾNG VIỆT
            </h2>
            <p className="text-lg font-semibold text-slate-700">
              Lớp {paper.meta?.grade} • {paper.meta?.difficulty}
            </p>
            {paper.meta?.theme && (
              <p className="text-slate-600 mt-1">📚 Chủ đề: {paper.meta.theme}</p>
            )}
          </div>
          <div className="glass-effect px-4 py-2 rounded-xl border border-purple-200">
            <Clock size={18} className="inline text-purple-600 mr-2" />
            <span className="font-semibold text-purple-600">
              {paper.meta?.estimated_time_minutes} phút
            </span>
          </div>
        </div>
      </motion.div>

    
      {paper.items?.map((item: any, idx: number) => (
        <motion.div
          key={item.id}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="glass-effect rounded-2xl p-6 border-2 border-slate-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/10 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  {item.type === "mcq" ? "Trắc nghiệm" : item.type === "writing" ? "Viết văn" : "Tự luận"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                {item.score} điểm
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                {item.provenance}
              </span>
            </div>
          </div>

          <p className="font-semibold text-slate-800 text-lg mb-4">{item.prompt}</p>

          {item.type === "mcq" && (
            <div className="space-y-2">
              {item.options?.map((opt: string, i: number) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer"
                >
                  <span className="font-bold text-purple-600 mr-3">
                    {["A", "B", "C", "D"][i]}.
                  </span>
                  {opt}
                </motion.div>
              ))}
            </div>
          )}

          {item.type === "writing" && (
            <div className="mt-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <p className="text-sm text-blue-700">
                ✍️ Viết đoạn văn theo hướng dẫn (xem rubric để chấm điểm)
              </p>
            </div>
          )}
        </motion.div>
      ))}

      {/* Answer Sheet */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-effect rounded-3xl p-6 border-2 border-green-100"
      >
        <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
          <Star size={24} weight="fill" />
          Đáp án
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {paper.answer_sheet?.map((ans: any) => (
            <div
              key={ans.id}
              className="flex justify-between items-center bg-green-50 border-2 border-green-200 rounded-xl px-4 py-3"
            >
              <span className="font-semibold text-green-700">Câu {ans.id}</span>
              <span className="font-bold text-green-600 text-lg">{String(ans.key)}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PaperPreview;