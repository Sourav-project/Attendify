"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Shield,
  Users,
  BookOpen,
  BarChart3,
  AlertTriangle,
  Clock,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import UserProfileMenu from "@/components/user-profile-menu"

export default function AdminDashboard() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", class: "10A", attendance: "92%", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", class: "10B", attendance: "88%", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", class: "11A", attendance: "76%", status: "Flagged" },
  ])
  const [sessions, setSessions] = useState([
    { id: 1, name: "Mathematics", teacher: "Dr. Brown", time: "09:00-10:30", students: 25, status: "Active" },
    { id: 2, name: "Science Lab", teacher: "Prof. Wilson", time: "11:00-12:30", students: 20, status: "Scheduled" },
    { id: 3, name: "English Literature", teacher: "Ms. Davis", time: "14:00-15:30", students: 30, status: "Completed" },
  ])
  const [anomalies, setAnomalies] = useState([
    {
      id: 1,
      student: "Mike Johnson",
      session: "Mathematics",
      issue: "Contradictory presence statement",
      severity: "High",
      time: "2 hours ago",
    },
    {
      id: 2,
      student: "Sarah Wilson",
      session: "Science Lab",
      issue: "Possible proxy attendance",
      severity: "Medium",
      time: "4 hours ago",
    },
    {
      id: 3,
      student: "Tom Brown",
      session: "English",
      issue: "Location inconsistency",
      severity: "Low",
      time: "1 day ago",
    },
  ])

  useEffect(() => {
    // Check admin authentication
    const userType = localStorage.getItem("userType")
    const authToken = localStorage.getItem("authToken")

    if (userType !== "admin" || !authToken) {
      router.push("/")
      return
    }

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-500/20 text-red-400"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "Low":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-500 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                <span className="text-purple-200">Admin</span>
                <span className="text-cyan-200"> Dashboard</span>
              </h1>
              <p className="text-white/80 text-sm">Attendify Management Console</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-white font-medium">{currentTime.toLocaleTimeString()}</div>
              <div className="text-white/80 text-sm">{currentTime.toLocaleDateString()}</div>
            </div>
            <UserProfileMenu userType="admin" userEmail="admin@example.com" userName="Admin User" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Students</p>
                  <p className="text-2xl font-bold text-white">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Active Sessions</p>
                  <p className="text-2xl font-bold text-white">23</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Avg Attendance</p>
                  <p className="text-2xl font-bold text-white">87.3%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">AI Anomalies</p>
                  <p className="text-2xl font-bold text-white">{anomalies.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-gray-700">
              Students
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-gray-700">
              Sessions
            </TabsTrigger>
            <TabsTrigger value="anomalies" className="data-[state=active]:bg-gray-700">
              AI Anomalies
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-gray-700">
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">New session created: Advanced Physics</p>
                        <p className="text-gray-400 text-xs">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">AI flagged suspicious attendance pattern</p>
                        <p className="text-gray-400 text-xs">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Bulk attendance update completed</p>
                        <p className="text-gray-400 text-xs">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Critical Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {anomalies.slice(0, 3).map((anomaly) => (
                      <div
                        key={anomaly.id}
                        className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                      >
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <div className="flex-1">
                          <p className="text-white text-sm">
                            {anomaly.student} - {anomaly.issue}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {anomaly.session} • {anomaly.time}
                          </p>
                        </div>
                        <Badge className={getSeverityColor(anomaly.severity)}>{anomaly.severity}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Student Management
                  </CardTitle>
                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Name</TableHead>
                      <TableHead className="text-gray-300">Email</TableHead>
                      <TableHead className="text-gray-300">Class</TableHead>
                      <TableHead className="text-gray-300">Attendance</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id} className="border-gray-700">
                        <TableCell className="text-white">{student.name}</TableCell>
                        <TableCell className="text-gray-300">{student.email}</TableCell>
                        <TableCell className="text-gray-300">{student.class}</TableCell>
                        <TableCell className="text-gray-300">{student.attendance}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              student.status === "Active"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Session Management
                  </CardTitle>
                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Session
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Session Name</TableHead>
                      <TableHead className="text-gray-300">Teacher</TableHead>
                      <TableHead className="text-gray-300">Time</TableHead>
                      <TableHead className="text-gray-300">Students</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.id} className="border-gray-700">
                        <TableCell className="text-white">{session.name}</TableCell>
                        <TableCell className="text-gray-300">{session.teacher}</TableCell>
                        <TableCell className="text-gray-300">{session.time}</TableCell>
                        <TableCell className="text-gray-300">{session.students}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              session.status === "Active"
                                ? "bg-green-500/20 text-green-400"
                                : session.status === "Scheduled"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-gray-500/20 text-gray-400"
                            }
                          >
                            {session.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  AI Anomaly Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {anomalies.map((anomaly) => (
                    <div key={anomaly.id} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                            <h3 className="text-white font-semibold">{anomaly.student}</h3>
                            <Badge className={getSeverityColor(anomaly.severity)}>{anomaly.severity}</Badge>
                          </div>
                          <p className="text-gray-300 mb-1">
                            <strong>Session:</strong> {anomaly.session}
                          </p>
                          <p className="text-gray-300 mb-1">
                            <strong>Issue:</strong> {anomaly.issue}
                          </p>
                          <p className="text-gray-400 text-sm">{anomaly.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                            Investigate
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Attendance Analytics</h3>
                  <p className="text-gray-400 text-sm">Comprehensive attendance reports and trends</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Student Performance</h3>
                  <p className="text-gray-400 text-sm">Individual and class performance metrics</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Anomaly Reports</h3>
                  <p className="text-gray-400 text-sm">AI-detected patterns and fraud prevention</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Session Reports</h3>
                  <p className="text-gray-400 text-sm">Detailed session attendance and engagement</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Time-based Analytics</h3>
                  <p className="text-gray-400 text-sm">Daily, weekly, and monthly attendance patterns</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Settings className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Custom Reports</h3>
                  <p className="text-gray-400 text-sm">Create and schedule custom report templates</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
