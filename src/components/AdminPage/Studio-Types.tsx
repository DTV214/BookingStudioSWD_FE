// src/components/AdminPage/Studio-Types.tsx
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { StudioType } from "@/domain/models/studio-type/studioType";

type Props = {
  studioTypes: StudioType[];
  onCreate?: (payload: Omit<StudioType, "id">) => Promise<StudioType | null>;
  onUpdate?: (id: string, payload: Partial<StudioType>) => Promise<StudioType | null>;
  onDelete?: (id: string) => Promise<boolean>;
};

export default function StudioTypesForm({ studioTypes, onCreate, onUpdate, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [detail, setDetail] = useState<StudioType | null>(null);
  const [editing, setEditing] = useState<StudioType | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortKey, setSortKey] = useState<"name" | "minArea" | "maxArea" | "bufferTime">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return studioTypes;
    return studioTypes.filter((t) =>
      [t.name, t.description, `${t.minArea}-${t.maxArea}`, t.bufferTime ?? ""].some((x) =>
        (x ?? "").toString().toLowerCase().includes(s)
      )
    );
  }, [search, studioTypes]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let va: string | number = "";
      let vb: string | number = "";
      switch (sortKey) {
        case "name":
          va = a.name.toLowerCase();
          vb = b.name.toLowerCase();
          break;
        case "minArea":
          va = a.minArea; vb = b.minArea; break;
        case "maxArea":
          va = a.maxArea; vb = b.maxArea; break;
        case "bufferTime":
          va = (a.bufferTime || "").toLowerCase();
          vb = (b.bufferTime || "").toLowerCase();
          break;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortDir, sortKey]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const [form, setForm] = useState<Omit<StudioType, "id">>({
    name: "",
    description: "",
    minArea: 0,
    maxArea: 0,
    bufferTime: "",
    services: [],
  });

  const [editForm, setEditForm] = useState<Partial<StudioType>>({});

  const resetCreateForm = () =>
    setForm({ name: "", description: "", minArea: 0, maxArea: 0, bufferTime: "", services: [] });

  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onCreate) return;
    try {
      setCreating(true);
      await onCreate(form);
      resetCreateForm();
      setShowCreate(false);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/admin/dashboard" className="menu-link">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/bookinglist" className="menu-link">Bookings List</Link>
            </li>
            <li>
              <Link href="/admin/account" className="menu-link">Account Management</Link>
            </li>
            <li>
              <Link href="/admin/studios" className="menu-link">Studios</Link>
            </li>
            <li>
              <Link href="/admin/studio-types" className="menu-link">Studio Types</Link>
            </li>
            <li>
              <Link href="/admin/location" className="menu-link">Location Management</Link>
            </li>
            <li>
              <Link href="/admin/service" className="menu-link">Service Management</Link>
            </li>
            <li>
              <Link href="/admin/pricing" className="menu-link">Pricing Management</Link>
            </li>
            <li>
              <Link href="/admin/studio-assign" className="menu-link">Studio Assign</Link>
            </li>
            <li>
              <Link href="/admin/notifications" className="menu-link">Notifications</Link>
            </li>
            <li>
              <Link href="/admin/profile-setting" className="menu-link">Profile & Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <section className="dashboard-root">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1>Studio Types</h1>
            <p className="text-gray-500 mt-1">Quản lý các loại studio: tên, diện tích, thời lượng và mô tả.</p>
          </div>
          <div className="actions">
            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              onClick={() => setShowCreate(true)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Studio Type
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="dashboard-actions max-w-5xl mx-auto">
          <div className="flex items-center gap-3 w-full">
            <div className="relative flex-1">
              <input
                className="input pl-10"
                placeholder="Search by name, description, area, duration..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z" />
              </svg>
            </div>
            <button className="btn">Filters</button>
          </div>
        </div>

        {/* Table */}
        <div className="dashboard-card max-w-5xl mx-auto mt-4">
          <div className="px-6 py-4 border-b bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">Danh sách loại studio</h2>
              <div className="text-sm text-gray-500">{total} items</div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-[var(--table-sticky-offset,0px)] z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <button className="inline-flex items-center gap-1 hover:text-gray-900" onClick={() => toggleSort("name")}>Name {sortKey === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <button className="inline-flex items-center gap-1 hover:text-gray-900" onClick={() => toggleSort("minArea")}>Area (m²) {sortKey === "minArea" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <button className="inline-flex items-center gap-1 hover:text-gray-900" onClick={() => toggleSort("bufferTime")}>Duration {sortKey === "bufferTime" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginated.map((t, idx) => (
                  <tr key={t.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{t.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-medium">
                        {t.minArea} - {t.maxArea}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                        {t.bufferTime && t.bufferTime !== '' ? `${t.bufferTime} phút` : "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <div className="line-clamp-2 text-gray-700" title={t.description}>{t.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                          title="View details"
                          aria-label="View details"
                          onClick={() => setDetail(t)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>

                        <button
                          className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-amber-200 text-amber-600 hover:bg-amber-600 hover:text-white transition"
                          title="Edit"
                          aria-label="Edit"
                          onClick={() => { setEditing(t); setEditForm({ ...t }); }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5h2m-9 7h7m-7 4h7m4-14l4 4m-6 2l4-4a2.828 2.828 0 10-4-4l-4 4v0a2.828 2.828 0 104 4z" />
                          </svg>
                        </button>

                        <button
                          className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition"
                          title="Delete"
                          aria-label="Delete"
                          onClick={() => onDelete?.(t.id)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-9 0h10" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No studio types found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t bg-white flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button className="btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button>
              <button className="btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
              <select className="input" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Create Modal */}
        {showCreate && (
          <div className="dialog-overlay fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
            <div className="dialog max-w-xl w-full rounded-xl shadow-2xl border bg-white">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Add Studio Type</h3>
                <button
                  className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100"
                  onClick={() => setShowCreate(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <form className="px-6 py-5" onSubmit={handleSubmitCreate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input required className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                    <input
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="number"
                      min={0}
                      placeholder="e.g., 120"
                      value={form.bufferTime || ''}
                      onChange={(e) => setForm({ ...form, bufferTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Area (m²)</label>
                    <input required type="number" min={0} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.minArea} onChange={(e) => setForm({ ...form, minArea: Number(e.target.value) })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Area (m²)</label>
                    <input required type="number" min={0} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.maxArea} onChange={(e) => setForm({ ...form, maxArea: Number(e.target.value) })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea required rows={4} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-end gap-2">
                  <button type="button" className="inline-flex items-center px-4 py-2 rounded-md border hover:bg-gray-50" onClick={() => setShowCreate(false)}>Cancel</button>
                  <button type="submit" className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50" disabled={creating}>Create</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Detail Modal (view only) */}
        {detail && (
          <div className="dialog-overlay fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
            <div className="dialog max-w-xl w-full rounded-xl shadow-2xl border bg-white">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Studio Type Details</h3>
                <button
                  className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100"
                  onClick={() => setDetail(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="px-6 py-4">
                <div className="rounded-lg border overflow-hidden">
                  <table className="min-w-full">
                    <tbody className="divide-y">
                      <tr>
                        <td className="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600 w-40">Name</td>
                        <td className="px-4 py-3 text-gray-900">{detail.name}</td>
                      </tr>
                      <tr>
                        <td className="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">Area</td>
                        <td className="px-4 py-3 text-gray-900">{detail.minArea} - {detail.maxArea} m²</td>
                      </tr>
                      <tr>
                        <td className="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">Duration</td>
                        <td className="px-4 py-3 text-gray-900">{detail.bufferTime && detail.bufferTime !== '' ? `${detail.bufferTime} phút` : "—"}</td>
                      </tr>
                      <tr>
                        <td className="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600 align-top">Description</td>
                        <td className="px-4 py-3 text-gray-900"><p className="whitespace-pre-wrap leading-relaxed">{detail.description}</p></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="px-6 py-4 border-t flex items-center justify-end gap-2">
                <button className="inline-flex items-center px-4 py-2 rounded-md border hover:bg-gray-50" onClick={() => setDetail(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editing && (
          <div className="dialog-overlay fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
            <div className="dialog max-w-xl w-full rounded-xl shadow-2xl border bg-white">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Edit Studio Type</h3>
                <button
                  className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100"
                  onClick={() => setEditing(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <form
                className="px-6 py-5"
                onSubmit={(e) => { e.preventDefault(); onUpdate?.(editing.id, editForm).then(() => setEditing(null)); }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={editForm.name ?? ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                    <input
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="number"
                      min={0}
                      placeholder="e.g., 120"
                      value={editForm.bufferTime ?? ""}
                      onChange={(e) => setEditForm({ ...editForm, bufferTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Area (m²)</label>
                    <input type="number" min={0} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={editForm.minArea ?? 0} onChange={(e) => setEditForm({ ...editForm, minArea: Number(e.target.value) })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Area (m²)</label>
                    <input type="number" min={0} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={editForm.maxArea ?? 0} onChange={(e) => setEditForm({ ...editForm, maxArea: Number(e.target.value) })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea rows={4} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={editForm.description ?? ""} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-end gap-2">
                  <button type="button" className="inline-flex items-center px-4 py-2 rounded-md border hover:bg-gray-50" onClick={() => setEditing(null)}>Cancel</button>
                  <button type="submit" className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}


