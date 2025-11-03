"use client";

import React, { useRef, useState } from "react";
import { CloudArrowUp } from "@phosphor-icons/react";
import { uploadTeacherPack } from "../lib/api";

export function UploadTeacherPack({
  onUploaded,
}: {
  onUploaded: (summary: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState<string | null>(null);

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const res = await uploadTeacherPack(file);
      onUploaded(res.summary);
      setLastName(file.name);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    catch (error: any) {
      alert("Upload lỗi: " + (error?.message ?? "Unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl p-3 bg-slate-50">
      <p className="text-sm font-medium text-slate-700 mb-2">
        Upload đề giáo viên
      </p>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border rounded-lg text-sm hover:bg-slate-50"
        disabled={loading}
      >
        <CloudArrowUp size={16} className="text-brand-400" />
        {loading ? "Đang upload..." : "Chọn file (.docx, .pdf, .txt)"}
      </button>
      <input
        type="file"
        ref={fileRef}
        onChange={handleChange}
        className="hidden"
        accept=".txt,.doc,.docx,.pdf"
      />
      {lastName ? (
        <p className="text-xs text-slate-500 mt-2">Đã tải: {lastName}</p>
      ) : null}
      <p className="text-xs text-slate-400 mt-1">
        Hệ thống sẽ tóm tắt phong cách và trộn vào prompt sinh đề.
      </p>
    </div>
  );
}
