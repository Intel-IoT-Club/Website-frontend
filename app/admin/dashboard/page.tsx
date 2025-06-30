"use client"
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

interface EventType {
  _id: string;
  image: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
}
interface ProjectType {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
}
interface MemberType {
  _id: string;
  name: string;
  role: string[];
  bio: string;
  image: string;
  github: string;
  linkedin: string;
  email: string;
}
interface TimelineType {
  _id?: string;
  image: string;
  title: string;
  date: string;
  description: string;
  isFirst: boolean;
}



const ROLE_OPTIONS = [
  { value: "faculty coordinator", label: "Faculty coordinator" },
  { value: "student mentor", label: "Student Mentor" },
  { value: "president", label: "President" },
  { value: "co head", label: "Co head" },
  { value: "iot", label: "Iot" },
  { value: "aiot", label: "Aiot" },
  { value: "iort", label: "Iort" }, 
  { value: "iiot", label: "Iiot" },
  { value: "team lead", label: "Team lead" },
  { value: "project lead", label: "Project lead" },
  { value: "core member", label: "Core member" },
  { value: "trainee", label: "Trainee" },
  { value: "web/app dev", label: "Web/App Dev" },
  { value: "marketing team", label: "Marketing team" },
];

export default function AdminDashboard() {
  const [selected, setSelected] = useState<"event" | "project" | "team" | "timeline">("event");
  const [form, setForm] = useState<{
    image: string;
    name: string;
    date: string;
    time: string;
    location: string;
    description: string;
  }>({
    image: "",
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const [projectForm, setProjectForm] = useState<{
    title: string;
    description: string;
    tags: string[];
    github: string;
    demo: string;
  }>({
    title: "",
    description: "",
    tags: [],
    github: "",
    demo: "",
  });

  const [teamForm, setTeamForm] = useState<{
    name: string;
    roles: string[];
    roleCustom: string;
    bio: string;
    image: string;
    github: string;
    linkedin: string;
    email: string;
  }>({
    name: "",
    roles: [],
    roleCustom: "",
    bio: "",
    image: "",
    github: "",
    linkedin: "",
    email: "",
  });
  const [timelineForm, setTimelineForm] = useState({
  image: "",
  title: "",
  date: "",
  description: "",
  isFirst: false,
});


  const [events, setEvents] = useState<EventType[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null);
  const [editingMember, setEditingMember] = useState<MemberType | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ type: null | 'event' | 'project' | 'member' | 'timeline', id: string | null }>({ type: null, id: null });
  const [timelines, setTimelines] = useState<TimelineType[]>([]);
  const [editingTimeline, setEditingTimeline] = useState<TimelineType | null>(null);

  useEffect(() => {
    if (selected === "event") fetchEvents();
    if (selected === "project") fetchProjects();
    if (selected === "team") fetchMembers();
    if (selected === "timeline") fetchTimelines();
  }, [selected]);
  
  const fetchEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };
  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };
  const fetchMembers = async () => {
    const res = await api.get("/members");
    setMembers(res.data);
  };

  const handleEditEvent = (event: EventType) => {
    setEditingEvent(event);
    setForm({
      image: event.image || "",
      name: event.name || "",
      date: event.date ? event.date.slice(0, 10) : "",
      time: event.time || "",
      location: event.location || "",
      description: event.description || "",
    });
  };
  const handleEditProject = (project: ProjectType) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title || "",
      description: project.description || "",
      tags: project.tags || [],
      github: project.github || "",
      demo: project.demo || "",
    });
  };
  const handleEditMember = (member: MemberType) => {
    setEditingMember(member);
    setTeamForm({
      name: member.name || "",
      roles: Array.isArray(member.role) ? member.role : member.role ? [member.role] : [],
      roleCustom: "",
      bio: member.bio || "",
      image: member.image || "",
      github: member.github || "",
      linkedin: member.linkedin || "",
      email: member.email || "",
    });
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await api.delete(`/events/${id}`);
      await fetchEvents();
      toast({ title: "Event deleted successfully!" });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete event");
    }
  };
  const handleDeleteProject = async (id: string) => {
    try {
      await api.delete(`/projects/${id}`);
      await fetchProjects();
      toast({ title: "Project deleted successfully!" });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete project");
    }
  };
  const handleDeleteMember = async (id: string) => {
    try {
      await api.delete(`/members/${id}`);
      await fetchMembers();
      toast({ title: "Member deleted successfully!" });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete member");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === "tags") {
      setProjectForm({ ...projectForm, tags: e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag) });
    } else {
      setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
    }
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "roles" && e.target instanceof HTMLInputElement) {
      const checked = e.target.checked;
      setTeamForm((prev) => {
        if (checked) {
          return { ...prev, roles: [...prev.roles, value] };
        } else {
          return { ...prev, roles: prev.roles.filter((r: string) => r !== value) };
        }
      });
    } else if (name === "roleCustom") {
      setTeamForm({ ...teamForm, roleCustom: value });
    } else {
      setTeamForm({ ...teamForm, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await api.put(`/events/${editingEvent._id}`, form);
        setEditingEvent(null);
        toast({ title: "Event updated successfully!" });
      } else {
        const { _id, ...payload } = form as any;
        payload.date = payload.date ? payload.date.slice(0, 10) : "";
        await api.post("/events", payload);
        toast({ title: "Event added successfully!" });
      }
      await fetchEvents();
      setForm({ image: "", name: "", date: "", time: "", location: "", description: "" });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to submit event");
    }
  };
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, projectForm);
        setEditingProject(null);
        toast({ title: "Project updated successfully!" });
      } else {
        await api.post("/projects", { ...projectForm, tags: projectForm.tags });
        toast({ title: "Project added successfully!" });
      }
      await fetchProjects();
      setProjectForm({ title: "", description: "", tags: [], github: "", demo: "" });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to submit project");
    }
  };
  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...teamForm,
        role: teamForm.roleCustom ? [...teamForm.roles, teamForm.roleCustom] : teamForm.roles,
      };
      const { roleCustom, roles, ...finalData } = submitData;
      if (editingMember) {
        await api.put(`/members/${editingMember._id}`, finalData);
        setEditingMember(null);
        toast({ title: "Member updated successfully!" });
      } else {
        await api.post("/members", finalData);
        toast({ title: "Member added successfully!" });
      }
      await fetchMembers();
      setTeamForm({ name: "", roles: [], roleCustom: "", bio: "", image: "", github: "", linkedin: "", email: "" });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to submit team member");
    }
  };
  const handleTimelineChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name: fieldName, value, type } = e.target;
  setTimelineForm((prev) => ({
    ...prev,
    [fieldName]: type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : value,
  }));
};

const handleEditTimeline = (item: TimelineType) => {
  setEditingTimeline(item);
  setTimelineForm({
    image: item.image,
    title: item.title,
    date: item.date.slice(0, 10),
    description: item.description,
    isFirst: item.isFirst,
  });
};

const fetchTimelines = async () => {
  const res = await api.get("/timeline_events/get");
  setTimelines(res.data);
};

const handleTimelineSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    if (editingTimeline) {
      await api.patch(`/timeline/update/${editingTimeline._id}`, timelineForm);
      setEditingTimeline(null);
      toast({ title: "Timeline updated successfully!" });
    } else {
      await api.post("/timeline/add", timelineForm);
      toast({ title: "Timeline event added successfully!" });
    }
    await fetchTimelines();
    setTimelineForm({ image: "", title: "", date: "", description: "", isFirst: false });
  } catch (err: any) {
    alert(err?.response?.data?.message || "Failed to submit timeline event");
  }
};

const handleDeleteTimeline = async (id: string) => {
  try {
    await api.delete(`/timeline/delete/${id}`);
    await fetchTimelines();
    toast({ title: "Timeline event deleted successfully!" });
  } catch (err: any) {
    alert(err?.response?.data?.message || "Failed to delete timeline event");
  }
};

  return (
    <ProtectedRoute>
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${selected === "event" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          onClick={() => setSelected("event")}
        >
          Add Event
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${selected === "project" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          onClick={() => setSelected("project")}
        >
          Add Project
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${selected === "team" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          onClick={() => setSelected("team")}
        >
          Add Team Member
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${
            selected === "timeline" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
          onClick={() => setSelected("timeline")}
        >
          Add Timeline
        </button>
      </div>

      {selected === "event" && (
        <>
          <section className="w-full max-w-xl mx-auto p-6 bg-card rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Upcoming Events</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="image">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  placeholder="/placeholder.jpg"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="name">Event Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium" htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium" htmlFor="time">Time</label>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                    placeholder="2:00 PM - 5:00 PM"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  rows={3}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition"
              >
                Add Event
              </button>
            </form>
          </section>
          <section className="w-full max-w-xl mx-auto p-6 bg-card rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Existing Events</h3>
            <ul className="space-y-4">
              {events.map(ev => (
                <li key={ev._id!} className="border p-4 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2 transition-shadow shadow hover:shadow-sm">
                  <div>
                    <div className="font-semibold">{ev.name}</div>
                    <div className="text-sm text-muted-foreground">{ev.date} {ev.time} @ {ev.location}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditEvent(ev)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                    {confirmDelete.type === 'event' && confirmDelete.id === ev._id! ? (
                      <>
                        <button onClick={() => handleDeleteEvent(ev._id!)} className="px-3 py-1 bg-red-600 text-white rounded">Confirm?</button>
                        <button onClick={() => setConfirmDelete({ type: null, id: null })} className="px-3 py-1 bg-gray-300 text-black rounded">Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => setConfirmDelete({ type: 'event', id: ev._id! })} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {selected === "project" && (
        <>
          <section className="w-full max-w-xl mx-auto p-6 bg-card rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Project</h2>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="projectTitle">Title</label>
                <input
                  type="text"
                  id="projectTitle"
                  name="title"
                  value={projectForm.title}
                  onChange={handleProjectChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="projectDescription">Description</label>
                <textarea
                  id="projectDescription"
                  name="description"
                  value={projectForm.description}
                  onChange={handleProjectChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="projectTags">Tags (comma separated)</label>
                <input
                  type="text"
                  id="projectTags"
                  name="tags"
                  value={projectForm.tags.join(", ")}
                  onChange={handleProjectChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  placeholder="Intel Edison, Node.js, MQTT"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="projectGithub">GitHub Link</label>
                <input
                  type="url"
                  id="projectGithub"
                  name="github"
                  value={projectForm.github}
                  onChange={handleProjectChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  placeholder="#"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="projectDemo">Demo Link</label>
                <input
                  type="url"
                  id="projectDemo"
                  name="demo"
                  value={projectForm.demo}
                  onChange={handleProjectChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  placeholder="#"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition"
              >
                Add Project
              </button>
            </form>
          </section>
          <section className="w-full max-w-xl mx-auto p-6 bg-card rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Existing Projects</h3>
            <ul className="space-y-4">
              {projects.map(proj => (
                <li key={proj._id} className="border p-4 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2 transition-shadow shadow hover:shadow-sm">
                  <div>
                    <div className="font-semibold">{proj.title}</div>
                    <div className="text-sm text-muted-foreground">{proj.tags?.join(", ")}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditProject(proj)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                    {confirmDelete.type === 'project' && confirmDelete.id === proj._id ? (
                      <>
                        <button onClick={() => handleDeleteProject(proj._id)} className="px-3 py-1 bg-red-600 text-white rounded">Confirm?</button>
                        <button onClick={() => setConfirmDelete({ type: null, id: null })} className="px-3 py-1 bg-gray-300 text-black rounded">Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => setConfirmDelete({ type: 'project', id: proj._id })} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {selected === "team" && (
        <>
          <section className="w-full max-w-xl mx-auto p-6 bg-card rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Team Member</h2>
            <form onSubmit={handleTeamSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="teamName">Name</label>
                <input
                  type="text"
                  id="teamName"
                  name="name"
                  value={teamForm.name}
                  onChange={handleTeamChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Roles</label>
                <div className="flex flex-wrap gap-2">
                  {ROLE_OPTIONS.map(opt => (
                    <label key={opt.value} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        name="roles"
                        value={opt.value}
                        checked={teamForm.roles.includes(opt.value)}
                        onChange={handleTeamChange}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="teamBio">Bio</label>
                <textarea
                  id="teamBio"
                  name="bio"
                  value={teamForm.bio}
                  onChange={handleTeamChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="teamImage">Image URL</label>
                <input
                  type="text"
                  id="teamImage"
                  name="image"
                  value={teamForm.image}
                  onChange={handleTeamChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  placeholder="/placeholder.svg?height=200&width=200"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="teamGithub">GitHub Link</label>
                <input
                  type="url"
                  id="teamGithub"
                  name="github"
                  value={teamForm.github}
                  onChange={handleTeamChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  placeholder="#"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="teamLinkedin">LinkedIn Link</label>
                <input
                  type="url"
                  id="teamLinkedin"
                  name="linkedin"
                  value={teamForm.linkedin}
                  onChange={handleTeamChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  placeholder="#"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="teamEmail">Email</label>
                <input
                  type="email"
                  id="teamEmail"
                  name="email"
                  value={teamForm.email}
                  onChange={handleTeamChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  placeholder="alex@example.com"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition"
              >
                Add Team Member
              </button>
            </form>
          </section>
          <section className="w-full max-w-xl mx-auto p-6 bg-card rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Existing Members</h3>
            <ul className="space-y-4">
              {members.map(mem => (
                <li key={mem._id} className="border p-4 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2 transition-shadow shadow hover:shadow-sm">
                  <div>
                    <div className="font-semibold">{mem.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {Array.isArray(mem.role) && mem.role.length > 0
                        ? mem.role.map(r => ROLE_OPTIONS.find(opt => opt.value === r)?.label || r).join(", ")
                        : ""}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditMember(mem)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                    {confirmDelete.type === 'member' && confirmDelete.id === mem._id ? (
                      <>
                        <button onClick={() => handleDeleteMember(mem._id)} className="px-3 py-1 bg-red-600 text-white rounded">Confirm?</button>
                        <button onClick={() => setConfirmDelete({ type: null, id: null })} className="px-3 py-1 bg-gray-300 text-black rounded">Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => setConfirmDelete({ type: 'member', id: mem._id })} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    {selected === "timeline" && (
  <>
    <section className="w-full max-w-xl mx-auto p-6 bg-card rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Timeline Event</h2>
      <form onSubmit={handleTimelineSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={timelineForm.image}
            onChange={handleTimelineChange}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={timelineForm.title}
            onChange={handleTimelineChange}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={timelineForm.date}
            onChange={handleTimelineChange}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={timelineForm.description}
            onChange={handleTimelineChange}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
            rows={3}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFirst"
            name="isFirst"
            checked={timelineForm.isFirst}
            onChange={handleTimelineChange}
          />
          <label htmlFor="isFirst" className="font-medium">First Event of the Batch</label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition"
        >
          {editingTimeline ? "Update Timeline Event" : "Add Timeline Event"}
        </button>
      </form>
    </section>

    <section className="w-full max-w-xl mx-auto p-6 bg-card rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Existing Timeline Events</h3>
      <ul className="space-y-4">
        {timelines.map((ev) => (
          <li key={ev._id!} className="border p-4 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2 transition-shadow shadow hover:shadow-sm">
            <div>
              <div className="font-semibold">{ev.title}</div>
              <div className="text-sm text-muted-foreground">
                 <span className="font-medium">{ev.title}</span> - {new Date(ev.date).toLocaleDateString()}
                    {ev.isFirst ? " - First Event of Batch" : ""}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEditTimeline(ev)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
              {confirmDelete.type === 'timeline' && confirmDelete.id === ev._id! ? (
                <>
                  <button onClick={() => handleDeleteTimeline(ev._id!)} className="px-3 py-1 bg-red-600 text-white rounded">Confirm?</button>
                  <button onClick={() => setConfirmDelete({ type: null, id: null })} className="px-3 py-1 bg-gray-300 text-black rounded">Cancel</button>
                </>
              ) : (
                <button onClick={() => setConfirmDelete({ type: 'timeline', id: ev._id! })} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  </>
)}

    </div>
    </ProtectedRoute>
  );
}
