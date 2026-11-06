"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Music,
  Users,
  LogOut,
  Upload,
  Trash2,
  Plus,
  Edit3,
  Save,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Menu,
} from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  filename: string;
  file_url: string;
  storage_path: string;
  uploaded_at: string;
}

interface SpotifyItem {
  id: string;
  title: string;
  description: string;
  url: string;
  embedUrl: string;
}

interface TeamInfo {
  coordinator: {
    name: string;
    title: string;
    bio: string;
    photo: string;
  };
}

type TabType = "overview" | "resources" | "spotify" | "team";

function Toast({
  msg,
  type,
  onClose,
}: {
  msg: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white text-sm font-medium transition-all ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      {msg}
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X size={16} />
      </button>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<TabType>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // Resources state
  const [resources, setResources] = useState<Resource[]>([]);
  const [resLoading, setResLoading] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: "", description: "" });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Spotify state
  const [spotifyItems, setSpotifyItems] = useState<SpotifyItem[]>([]);
  const [spotForm, setSpotForm] = useState({
    title: "",
    description: "",
    url: "",
    embedUrl: "",
  });
  const [editingSpot, setEditingSpot] = useState<SpotifyItem | null>(null);

  // Team state
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  const [teamForm, setTeamForm] = useState({
    name: "",
    title: "",
    bio: "",
  });
  const [teamPhoto, setTeamPhoto] = useState<File | null>(null);
  const teamPhotoRef = useRef<HTMLInputElement>(null);
  const [teamSaving, setTeamSaving] = useState(false);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
  };

  // Load resources
  const loadResources = async () => {
    setResLoading(true);
    try {
      const r = await fetch("/api/admin/resources");
      if (r.ok) setResources(await r.json());
    } finally {
      setResLoading(false);
    }
  };

  // Load Spotify
  const loadSpotify = async () => {
    const r = await fetch("/api/admin/spotify");
    if (r.ok) setSpotifyItems(await r.json());
  };

  // Load Team
  const loadTeam = async () => {
    const r = await fetch("/api/admin/team");
    if (r.ok) {
      const data: TeamInfo = await r.json();
      setTeamInfo(data);
      setTeamForm({
        name: data.coordinator.name,
        title: data.coordinator.title,
        bio: data.coordinator.bio,
      });
    }
  };

  useEffect(() => {
    loadResources();
    loadSpotify();
    loadTeam();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  // Upload PDF
  const handleUploadPDF = async (e: FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return showToast("Please select a PDF file", "error");
    const fd = new FormData();
    fd.append("file", uploadFile);
    fd.append("title", uploadForm.title);
    fd.append("description", uploadForm.description);
    setResLoading(true);
    try {
      const r = await fetch("/api/admin/resources", { method: "POST", body: fd });
      if (r.ok) {
        showToast("PDF uploaded successfully!", "success");
        setUploadForm({ title: "", description: "" });
        setUploadFile(null);
        if (fileRef.current) fileRef.current.value = "";
        await loadResources();
      } else {
        const d = await r.json();
        showToast(d.error || "Upload failed", "error");
      }
    } finally {
      setResLoading(false);
    }
  };

  // Delete resource
  const handleDeleteResource = async (id: string) => {
    if (!confirm("Delete this resource permanently?")) return;
    const r = await fetch("/api/admin/resources", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (r.ok) {
      showToast("Resource deleted", "success");
      await loadResources();
    } else {
      showToast("Delete failed", "error");
    }
  };

  // Add/Edit Spotify
  const handleSaveSpotify = async (e: FormEvent) => {
    e.preventDefault();
    const isEdit = !!editingSpot;
    const method = isEdit ? "PUT" : "POST";
    const body = isEdit
      ? { ...spotForm, id: editingSpot!.id }
      : spotForm;

    const r = await fetch("/api/admin/spotify", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) {
      showToast(isEdit ? "Link updated!" : "Link added!", "success");
      setSpotForm({ title: "", description: "", url: "", embedUrl: "" });
      setEditingSpot(null);
      await loadSpotify();
    } else {
      showToast("Failed to save", "error");
    }
  };

  const handleDeleteSpotify = async (id: string) => {
    if (!confirm("Remove this Spotify link?")) return;
    const r = await fetch("/api/admin/spotify", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (r.ok) {
      showToast("Removed", "success");
      await loadSpotify();
    }
  };

  // Update team
  const handleSaveTeam = async (e: FormEvent) => {
    e.preventDefault();
    setTeamSaving(true);
    const fd = new FormData();
    fd.append("name", teamForm.name);
    fd.append("title", teamForm.title);
    fd.append("bio", teamForm.bio);
    if (teamPhoto) fd.append("photo", teamPhoto);

    const r = await fetch("/api/admin/team", { method: "PUT", body: fd });
    if (r.ok) {
      showToast("Team info updated!", "success");
      setTeamPhoto(null);
      if (teamPhotoRef.current) teamPhotoRef.current.value = "";
      await loadTeam();
    } else {
      showToast("Update failed", "error");
    }
    setTeamSaving(false);
  };

  const navItems: { id: TabType; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "resources", label: "Resources", icon: FileText },
    { id: "spotify", label: "Spotify Links", icon: Music },
    { id: "team", label: "Team Info", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-30 w-64 bg-[#0F2557] flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400">
              <Image src="/logo/logo.jpeg" alt="RMI" fill className="object-cover" />
            </div>
            <div>
              <p className="text-white font-heading font-bold text-sm">RMI Admin</p>
              <p className="text-yellow-400 text-xs">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                tab === item.id
                  ? "bg-yellow-400 text-[#0F2557] shadow-md"
                  : "text-blue-200/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
          <a
            href="/"
            className="mt-2 w-full flex items-center justify-center text-xs text-blue-200/40 hover:text-yellow-400 transition-colors pt-2"
          >
            ← View main site
          </a>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="font-heading font-bold text-[#0F2557] text-lg capitalize">
                {tab === "overview" ? "Dashboard Overview" : tab === "resources" ? "Resource Manager" : tab === "spotify" ? "Spotify Links" : "Team Info"}
              </h1>
              <p className="text-xs text-gray-400">
                Renewed Minds International — Admin
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 max-w-5xl w-full mx-auto">
          {/* Overview Tab */}
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { label: "PDF Resources", value: resources.length, icon: FileText, color: "text-blue-600 bg-blue-50" },
                  { label: "Spotify Links", value: spotifyItems.length, icon: Music, color: "text-green-600 bg-green-50" },
                  { label: "Team Members", value: 1, icon: Users, color: "text-purple-600 bg-purple-50" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                      <stat.icon size={22} />
                    </div>
                    <p className="text-3xl font-heading font-black text-[#0F2557]">{stat.value}</p>
                    <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#0F2557] rounded-2xl p-8 text-white text-center">
                <h2 className="text-2xl font-heading font-bold mb-2">Welcome, Jeremiah 👋</h2>
                <p className="text-blue-200/70 mb-6">Manage your content, resources and media from this dashboard.</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {navItems.slice(1).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className="bg-white/10 hover:bg-yellow-400 hover:text-[#0F2557] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                    >
                      <item.icon size={15} />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {tab === "resources" && (
            <div className="space-y-6">
              {/* Upload form */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-heading font-bold text-[#0F2557] text-lg mb-5 flex items-center gap-2">
                  <Upload size={20} className="text-yellow-500" />
                  Upload New PDF
                </h2>
                <form onSubmit={handleUploadPDF} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title *</label>
                      <input
                        type="text"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm((p) => ({ ...p, title: e.target.value }))}
                        placeholder="Resource title"
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2557]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">PDF File *</label>
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2557] file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#0F2557] file:text-white file:text-xs file:font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                    <textarea
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Brief description of this resource"
                      rows={2}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2557] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={resLoading}
                    className="bg-[#0F2557] hover:bg-[#0A1A42] disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all flex items-center gap-2 shadow-md"
                  >
                    {resLoading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    Upload PDF
                  </button>
                </form>
              </div>

              {/* Resources list */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-heading font-bold text-[#0F2557] text-lg mb-5">
                  Existing Resources ({resources.length})
                </h2>
                {resLoading && resources.length === 0 ? (
                  <div className="flex justify-center py-10">
                    <Loader2 size={28} className="animate-spin text-[#0F2557]" />
                  </div>
                ) : resources.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <FileText size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No resources uploaded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {resources.map((res) => (
                      <div key={res.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText size={18} className="text-[#0F2557]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#0F2557] text-sm truncate">{res.title}</p>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {res.filename} · {new Date(res.uploaded_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {res.file_url && (
                            <a
                              href={res.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 bg-blue-50 rounded-lg transition-colors"
                            >
                              View
                            </a>
                          )}
                          <button
                            onClick={() => handleDeleteResource(res.id)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Spotify Tab */}
          {tab === "spotify" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-heading font-bold text-[#0F2557] text-lg mb-5 flex items-center gap-2">
                  <Plus size={20} className="text-green-500" />
                  {editingSpot ? "Edit Spotify Link" : "Add Spotify Link"}
                </h2>
                <form onSubmit={handleSaveSpotify} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title *</label>
                      <input
                        type="text"
                        value={spotForm.title}
                        onChange={(e) => setSpotForm((p) => ({ ...p, title: e.target.value }))}
                        placeholder="Episode / playlist title"
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Spotify URL *</label>
                      <input
                        type="url"
                        value={spotForm.url}
                        onChange={(e) => setSpotForm((p) => ({ ...p, url: e.target.value }))}
                        placeholder="https://open.spotify.com/..."
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                    <input
                      type="text"
                      value={spotForm.description}
                      onChange={(e) => setSpotForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Brief description"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Embed URL{" "}
                      <span className="text-gray-400 font-normal">(optional — for inline player)</span>
                    </label>
                    <input
                      type="url"
                      value={spotForm.embedUrl}
                      onChange={(e) => setSpotForm((p) => ({ ...p, embedUrl: e.target.value }))}
                      placeholder="https://open.spotify.com/embed/..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all flex items-center gap-2 shadow-md"
                    >
                      <Save size={16} />
                      {editingSpot ? "Save Changes" : "Add Link"}
                    </button>
                    {editingSpot && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSpot(null);
                          setSpotForm({ title: "", description: "", url: "", embedUrl: "" });
                        }}
                        className="border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold px-5 py-3 rounded-xl text-sm transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Spotify list */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-heading font-bold text-[#0F2557] text-lg mb-5">
                  Spotify Links ({spotifyItems.length})
                </h2>
                {spotifyItems.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <Music size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No links added yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {spotifyItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Music size={18} className="text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#0F2557] text-sm truncate">{item.title}</p>
                          <p className="text-gray-400 text-xs truncate">{item.url}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => {
                              setEditingSpot(item);
                              setSpotForm({ title: item.title, description: item.description, url: item.url, embedUrl: item.embedUrl });
                            }}
                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteSpotify(item.id)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Team Tab */}
          {tab === "team" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-heading font-bold text-[#0F2557] text-lg mb-6 flex items-center gap-2">
                <Users size={20} className="text-purple-500" />
                Update Team / Coordinator Info
              </h2>

              {teamInfo && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl flex items-center gap-5 border border-gray-100">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-yellow-400 flex-shrink-0">
                    <Image
                      src={teamInfo.coordinator.photo + `?v=${Date.now()}`}
                      alt="Coordinator"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-[#0F2557]">{teamInfo.coordinator.name}</p>
                    <p className="text-yellow-500 text-sm font-medium">{teamInfo.coordinator.title}</p>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{teamInfo.coordinator.bio}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSaveTeam} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={teamForm.name}
                      onChange={(e) => setTeamForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title / Role</label>
                    <input
                      type="text"
                      value={teamForm.title}
                      onChange={(e) => setTeamForm((p) => ({ ...p, title: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
                  <textarea
                    value={teamForm.bio}
                    onChange={(e) => setTeamForm((p) => ({ ...p, bio: e.target.value }))}
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Update Photo{" "}
                    <span className="text-gray-400 font-normal">(JPEG/PNG, optional)</span>
                  </label>
                  <input
                    ref={teamPhotoRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setTeamPhoto(e.target.files?.[0] || null)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:text-xs file:font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={teamSaving}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all flex items-center gap-2 shadow-md"
                >
                  {teamSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
