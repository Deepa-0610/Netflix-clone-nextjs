"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Search, Filter, Plus } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  type: "movie" | "series";
  release_year: number;
  rating: string;
  is_featured: boolean;
  is_trending: boolean;
  thumbnail_url: string;
  // This comes from a relation in your GET:
  // categories ( name )
  categories: { name: string } | null;
  created_at: string;
}

interface ContentTableProps {
  content: ContentItem[];
}

type FormState = {
  title: string;
  type: "movie" | "series";
  release_year: number | string;
  rating: string;
  thumbnail_url: string;
  is_featured: boolean;
  is_trending: boolean;
};

export function ContentTable({ content }: ContentTableProps) {
  // local working list (initially from server props, then refreshed via API)
  const [rows, setRows] = useState<ContentItem[]>(content || []);
  const [loading, setLoading] = useState(false);

  // search + filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "movie" | "series">("all");

  // modal state
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ContentItem | null>(null);
  const [form, setForm] = useState<FormState>({
    title: "",
    type: "movie",
    release_year: new Date().getFullYear(),
    rating: "",
    thumbnail_url: "",
    is_featured: false,
    is_trending: false,
  });

  // GET list from API (so we stay in sync after add/edit/delete)
  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content", { method: "GET" });
      const data = await res.json();
      if (res.ok && Array.isArray(data.content)) {
        setRows(data.content);
      } else {
        console.error("GET /api/admin/content failed", data);
      }
    } finally {
      setLoading(false);
    }
  };

  // keep initial server data, but refresh once on mount to match API shape
  useEffect(() => {
    setRows(content || []);
    // optional refresh so actions always see the latest
    fetchList().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredContent = useMemo(() => {
    return rows.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || item.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [rows, searchTerm, filterType]);

  const getTypeBadge = (type: string) => (
    <Badge variant={type === "movie" ? "default" : "secondary"} className="text-xs">
      {type === "movie" ? "Movie" : "Series"}
    </Badge>
  );

  function openNewModal() {
    setEditing(null);
    setForm({
      title: "",
      type: "movie",
      release_year: new Date().getFullYear(),
      rating: "",
      thumbnail_url: "",
      is_featured: false,
      is_trending: false,
    });
    setOpen(true);
  }

  function openEditModal(item: ContentItem) {
    setEditing(item);
    setForm({
      title: item.title ?? "",
      type: item.type ?? "movie",
      release_year: item.release_year ?? "",
      rating: item.rating ?? "",
      thumbnail_url: item.thumbnail_url ?? "",
      is_featured: !!item.is_featured,
      is_trending: !!item.is_trending,
    });
    setOpen(true);
  }

  async function handleSubmit() {
    const payload = {
      title: form.title,
      type: form.type,
      release_year: Number(form.release_year) || null,
      rating: form.rating,
      thumbnail_url: form.thumbnail_url,
      is_featured: !!form.is_featured,
      is_trending: !!form.is_trending,
    };

    const isEdit = !!editing;
    const res = await fetch("/api/admin/content", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isEdit ? { id: editing!.id, ...payload } : payload),
    });
    const data = await res.json();

    if (!res.ok) {
      console.error(isEdit ? "PUT" : "POST", data);
      alert(data?.error || "Something went wrong");
      return;
    }

    setOpen(false);
    setEditing(null);
    await fetchList();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this content?")) return;
    const res = await fetch("/api/admin/content", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("DELETE", data);
      alert(data?.error || "Failed to delete");
      return;
    }
    await fetchList();
  }

  return (
    <Card className="shadow-xl rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Content</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 opacity-60" />
            <Input
              className="pl-8 w-48"
              placeholder="Search title…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 opacity-60" />
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
            >
              <option value="all">All</option>
              <option value="movie">Movies</option>
              <option value="series">Series</option>
            </select>
          </div>

          <Button onClick={openNewModal} className="bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading…</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredContent.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-16 relative rounded overflow-hidden">
                          <Image
                            src={item.thumbnail_url || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs opacity-60">{new Date(item.created_at).toLocaleString()}</div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{getTypeBadge(item.type)}</TableCell>

                    <TableCell>{item.release_year ?? "-"}</TableCell>

                    <TableCell>{item.categories?.name ?? "-"}</TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {item.is_featured && <Badge className="text-xs">Featured</Badge>}
                        {item.is_trending && (
                          <Badge variant="secondary" className="text-xs">
                            Trending
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(item)} title="Edit">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredContent.length === 0 && (
              <div className="text-center py-8 text-gray-500">No content found matching your criteria.</div>
            )}
          </>
        )}
      </CardContent>

      {/* Add / Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Content" : "Add Content"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  className="w-full border rounded-md h-10 px-2"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as "movie" | "series" })}
                >
                  <option value="movie">Movie</option>
                  <option value="series">Series</option>
                </select>
              </div>

              <div>
                <Label htmlFor="release_year">Release Year</Label>
                <Input
                  id="release_year"
                  type="number"
                  value={form.release_year}
                  onChange={(e) => setForm({ ...form, release_year: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="thumb">Thumbnail URL</Label>
                <Input
                  id="thumb"
                  value={form.thumbnail_url}
                  onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                />
                Featured
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_trending}
                  onChange={(e) => setForm({ ...form, is_trending: e.target.checked })}
                />
                Trending
              </label>
            </div>

            <Button className="w-full" onClick={handleSubmit}>
              {editing ? "Save Changes" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
