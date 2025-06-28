"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Play,
  Square,
  Clock,
  Users,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import UserProfileMenu from "@/components/user-profile-menu"

interface Session {
  id: number
  name: string
  description: string
  teacher: string
  startTime: string
  endTime: string
  date: string
  location: string
  capacity: number
  enrolled: number
  status: "scheduled" | "active" | "completed" | "cancelled"
}

export default function SessionsPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      name: "Advanced Mathematics",
      description: "Calculus and Advanced Algebra",
      teacher: "Dr. Sarah Brown",
      startTime: "09:00",
      endTime: "10:30",
      date: "2024-12-26",
      location: "Room 101",
      capacity: 30,
      enrolled: 25,
      status: "scheduled",
    },
    {
      id: 2,
      name: "Physics Laboratory",
      description: "Practical experiments in mechanics",
      teacher: "Prof. Michael Wilson",
      startTime: "11:00",
      endTime: "12:30",
      date: "2024-12-26",
      location: "Lab 201",
      capacity: 20,
      enrolled: 18,
      status: "active",
    },
    {
      id: 3,
      name: "English Literature",
      description: "Shakespeare and Modern Poetry",
      teacher: "Ms. Emily Davis",
      startTime: "14:00",
      endTime: "15:30",
      date: "2024-12-25",
      location: "Room 305",
      capacity: 35,
      enrolled: 32,
      status: "completed",
    },
  ])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newSession, setNewSession] = useState({
    name: "",
    description: "",
    teacher: "",
    startTime: "",
    endTime: "",
    date: "",
    location: "",
    capacity: 30,
  })

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType")
    const authToken = localStorage.getItem("authToken")

    if (!storedUserType || !authToken) {
      router.push("/")
      return
    }

    setUserType(storedUserType)
  }, [router])

  const handleBack = () => {
    if (userType === "admin") {
      router.push("/admin")
    } else {
      router.push("/dashboard")
    }
  }

  const handleCreateSession = () => {
    const session: Session = {
      id: sessions.length + 1,
      ...newSession,
      enrolled: 0,
      status: "scheduled",
    }
    setSessions([...sessions, session])
    setNewSession({
      name: "",
      description: "",
      teacher: "",
      startTime: "",
      endTime: "",
      date: "",
      location: "",
      capacity: 30,
    })
    setIsCreateDialogOpen(false)
    alert("Session created successfully! 🎉")
  }

  const handleStartSession = (sessionId: number) => {
    setSessions(
      sessions.map((session) => (session.id === sessionId ? { ...session, status: "active" as const } : session)),
    )
    alert("Session started! Students can now mark attendance. ▶️")
  }

  const handleEndSession = (sessionId: number) => {
    setSessions(
      sessions.map((session) => (session.id === sessionId ? { ...session, status: "completed" as const } : session)),
    )
    alert("Session ended successfully! 🏁")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500/20 text-blue-400"
      case "active":
        return "bg-green-500/20 text-green-400"
      case "completed":
        return "bg-gray-500/20 text-gray-400"
      case "cancelled":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="w-4 h-4" />
      case "active":
        return <Play className="w-4 h-4" />
      case "completed":
        return <Square className="w-4 h-4" />
      case "cancelled":
        return <Trash2 className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-500 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={handleBack} variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">Session Management</h1>
                <p className="text-white/80 text-sm">Create, manage, and monitor class sessions</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Session
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                    Create New Session
                  </DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Set up a new class session with all the necessary details
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Session Name
                    </Label>
                    <Input
                      id="name"
                      value={newSession.name}
                      onChange={(e) => setNewSession({ ...newSession, name: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="e.g., Advanced Mathematics"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher" className="text-gray-300">
                      Teacher
                    </Label>
                    <Input
                      id="teacher"
                      value={newSession.teacher}
                      onChange={(e) => setNewSession({ ...newSession, teacher: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="e.g., Dr. Sarah Brown"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="description" className="text-gray-300">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newSession.description}
                      onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Brief description of the session content"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-gray-300">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-300">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={newSession.location}
                      onChange={(e) => setNewSession({ ...newSession, location: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="e.g., Room 101"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime" className="text-gray-300">
                      Start Time
                    </Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newSession.startTime}
                      onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-gray-300">
                      End Time
                    </Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newSession.endTime}
                      onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity" className="text-gray-300">
                      Capacity
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={newSession.capacity}
                      onChange={(e) => setNewSession({ ...newSession, capacity: Number.parseInt(e.target.value) })}
                      className="bg-gray-700 border-gray-600 text-white"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="border-gray-600 text-white hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateSession}
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                    disabled={!newSession.name || !newSession.teacher || !newSession.date}
                  >
                    Create Session
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <UserProfileMenu userType={userType || "teacher"} userEmail="user@example.com" userName="Current User" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Session Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Scheduled</p>
                  <p className="text-2xl font-bold text-white">
                    {sessions.filter((s) => s.status === "scheduled").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Active</p>
                  <p className="text-2xl font-bold text-white">
                    {sessions.filter((s) => s.status === "active").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-500/20 rounded-lg flex items-center justify-center">
                  <Square className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">
                    {sessions.filter((s) => s.status === "completed").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Enrolled</p>
                  <p className="text-2xl font-bold text-white">{sessions.reduce((sum, s) => sum + s.enrolled, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              All Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Session</TableHead>
                  <TableHead className="text-gray-300">Teacher</TableHead>
                  <TableHead className="text-gray-300">Schedule</TableHead>
                  <TableHead className="text-gray-300">Location</TableHead>
                  <TableHead className="text-gray-300">Enrollment</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id} className="border-gray-700">
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{session.name}</p>
                        <p className="text-gray-400 text-sm">{session.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{session.teacher}</TableCell>
                    <TableCell>
                      <div className="text-gray-300">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="w-3 h-3" />
                          <span className="text-sm">{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span className="text-sm">
                            {session.startTime} - {session.endTime}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-gray-300">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{session.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-300">
                        <span className="text-sm">
                          {session.enrolled}/{session.capacity}
                        </span>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-purple-500 h-1.5 rounded-full"
                            style={{ width: `${(session.enrolled / session.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(session.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(session.status)}
                          <span className="capitalize">{session.status}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {session.status === "scheduled" && (
                          <Button
                            size="sm"
                            onClick={() => handleStartSession(session.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Start
                          </Button>
                        )}
                        {session.status === "active" && (
                          <Button
                            size="sm"
                            onClick={() => handleEndSession(session.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <Square className="w-3 h-3 mr-1" />
                            End
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
