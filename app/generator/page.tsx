"use client";
import React, { useState } from "react";
import { Topbar } from "../components/topbar";
import { SidebarControls } from "../components/sidebar-controls";
import PaperPreview from "../components/paper-preview";
import { generatePaper, exportPaper } from "../lib/api";

export default function GeneratorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paper, setPaper] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  type Config = {
    grade: number;
    focus: string[];
    counts: { mcq: number; short_answer: number; writing: number };
    difficulty: string;
    theme: string;
    teacher_pack_summary?: string;
  };

  const [config, setConfig] = useState<Config>({
    grade: 3,
    focus: ["danh_tu", "dong_tu"],
    counts: { mcq: 5, short_answer: 4, writing: 1 },
    difficulty: "medium",
    theme: "Trường lớp",
    teacher_pack_summary: "",
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generatePaper(config);
      setPaper(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert("Lỗi sinh đề: " + (error?.message ?? "Unknown"));
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: string) => {
    if (!paper) {
      alert("Chưa có đề để xuất");
      return;
    }
    await exportPaper(paper, format);
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar onExport={handleExport} hasPaper={!!paper} />
      <div className="flex flex-1 overflow-hidden">
        <SidebarControls
          value={config}
          onChange={(v) => setConfig(v)} 
          onGenerate={handleGenerate}
          loading={loading}
          onTeacherSummaryChange={(s) =>
            setConfig((prev) => ({ ...prev, teacher_pack_summary: s }))
          }
        />
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <h2 className="text-xl font-semibold">Xem trước đề</h2>
          <PaperPreview paper={paper} loading={loading} />
        </div>
      </div>
    </div>
  );
}
