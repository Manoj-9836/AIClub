import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Settings,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Users,
  BookOpen,
  Shield,
  Save,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Login from "./Login";

const API_URL = "http://localhost:5000/api";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState<any[]>([]);
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [createType, setCreateType] = useState<"event" | "workshop">("event");

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );

  // ✅ Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await axios.get(`${API_URL}/events`);
        const workshopsRes = await axios.get(`${API_URL}/workshops`);
        setEvents(eventsRes.data);
        setWorkshops(workshopsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsAuthenticated(false);
    toast({ title: "Logged Out", description: "You have been logged out." });
    navigate("/");
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    registered: "",
    featured: false,
    category: "",
    level: "",
    duration: "",
    status: "Draft"
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      fullDescription: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      registered: "",
      featured: false,
      category: "",
      level: "",
      duration: "",
      status: "Draft"
    });
  };

  const handleCreate = () => {
    setEditingItem(null);
    resetForm();
    setIsCreateModalOpen(true);
  };

  const handleEdit = (item: any, type: "event" | "workshop") => {
    setEditingItem({ ...item, type });
    setFormData({
      title: item.title,
      description: item.description || "",
      fullDescription: item.fullDescription || "",
      date: item.date,
      time: item.time || "",
      location: item.location,
      capacity: item.capacity.toString(),
      registered: item.registered?.toString() || "0",
      featured: item.featured || false,
      category: item.category || "",
      level: item.level || "",
      duration: item.duration || "",
      status: item.status
    });
    setIsCreateModalOpen(true);
  };

  // ✅ Create / Update in DB
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newItem = {
      title: formData.title,
      description: formData.description,
      fullDescription: formData.fullDescription,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      capacity: parseInt(formData.capacity),
      registered: parseInt(formData.registered) || 0,
      featured: formData.featured,
      status: formData.status,
      ...(createType === "workshop"
        ? { level: formData.level, duration: formData.duration }
        : { category: formData.category })
    };

    try {
      if (editingItem) {
        // ✅ Update
        if (editingItem.type === "event") {
          const res = await axios.put(`${API_URL}/events/${editingItem._id}`, newItem);
          setEvents(events.map(e => e._id === editingItem._id ? res.data : e));
        } else {
          const res = await axios.put(`${API_URL}/workshops/${editingItem._id}`, newItem);
          setWorkshops(workshops.map(w => w._id === editingItem._id ? res.data : w));
        }
        toast({ title: "Updated Successfully" });
      } else {
        // ✅ Create
        if (createType === "event") {
          const res = await axios.post(`${API_URL}/events`, newItem);
          setEvents([...events, res.data]);
        } else {
          const res = await axios.post(`${API_URL}/workshops`, newItem);
          setWorkshops([...workshops, res.data]);
        }
        toast({ title: "Created Successfully" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Something went wrong" });
    }

    setIsCreateModalOpen(false);
    resetForm();
  };

  // ✅ Delete from DB
   const handleDelete = async (id: string, type: "event" | "workshop") => {
    try {
      if (type === "event") {
        await axios.delete(`${API_URL}/events/${id}`);
        setEvents((prev) => prev.filter((e) => e._id !== id));
      } else {
        await axios.delete(`${API_URL}/workshops/${id}`);
        setWorkshops((prev) => prev.filter((w) => w._id !== id));
      }
      toast({ title: "Deleted Successfully" });
    } catch (err: any) {
      toast({
        title: "Delete failed",
        description: err?.response?.data?.message || "Unable to delete item.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Published"
      ? "bg-green-500/10 text-green-500 border-green-500/20"
      : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
  };

  const ItemRow = ({ item, type }: { item: any; type: "event" | "workshop" }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-1 space-y-1">
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold">{item.title}</h3>
          <Badge className={getStatusColor(item.status)}>
            {item.status}
          </Badge>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{item.date}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{item.registered}/{item.capacity}</span>
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEdit(item, type)}
        >
          <Edit3 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDelete(item._id, type)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage events and workshops</p>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Button
                onClick={handleLogout}
                className="top-4 right-4"
                variant="destructive"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="events" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="events" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </TabsTrigger>
              <TabsTrigger value="workshops" className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Workshops</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Events Management</h2>
                <Button
                  onClick={() => {
                    setCreateType("event");
                    handleCreate();
                  }}
                  variant="hero"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>
              <div className="space-y-4">
                {events.map((event) => (
                  <ItemRow key={event.id} item={event} type="event" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workshops" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Workshops Management</h2>
                <Button
                  onClick={() => {
                    setCreateType("workshop");
                    handleCreate();
                  }}
                  variant="hero"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Workshop
                </Button>
              </div>
              <div className="space-y-4">
                {workshops.map((workshop) => (
                  <ItemRow key={workshop.id} item={workshop} type="workshop" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Create/Edit Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit" : "Create"} {editingItem?.type || createType}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to {editingItem ? "update" : "create"} the {editingItem?.type || createType}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Event/Workshop title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description for cards"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullDescription">Full Description</Label>
              <Textarea
                id="fullDescription"
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                placeholder="Detailed description for modal"
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  placeholder="March 15, 2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="2:00 PM - 6:00 PM"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  required
                  placeholder="100"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2 space-x-2">
                <Label htmlFor="featured">Featured *</Label>
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                  className="h-4 w-4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Registered *</Label>
                <Input
                  id="registered"
                  type="number"
                  value={formData.registered}
                  onChange={(e) => setFormData({ ...formData, registered: e.target.value })}
                  required
                  placeholder="100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                placeholder="Auditorium A, Science Building"
              />
            </div>

            {/* Conditional fields based on type */}
            {(editingItem?.type === "event" || createType === "event") && (
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Competition">Competition</SelectItem>
                    <SelectItem value="Ethics">Ethics</SelectItem>
                    <SelectItem value="Networking">Networking</SelectItem>
                    <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {(editingItem?.type === "workshop" || createType === "workshop") && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="6 hours"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="hero">
                <Save className="w-4 h-4 mr-2" />
                {editingItem ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;