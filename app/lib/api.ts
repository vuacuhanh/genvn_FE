const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generatePaper(payload: any) {
  const res = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Generate failed");
  }
  return res.json();
}

export async function uploadTeacherPack(file: File): Promise<{ summary: string }> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE_URL}/upload-teacher-pack`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Upload failed");
  }
  return res.json();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function exportPaper(paper: any, format: string) {
  const res = await fetch(`${BASE_URL}/export`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paper, format }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    alert(err.detail || "Export failed");
    return;
  }
  // download
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `de-tieng-viet.${format}`;
  a.click();
  window.URL.revokeObjectURL(url);
}
