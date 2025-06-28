"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  ArrowLeft,
  BarChart3,
  CalendarIcon,
  Download,
  Filter,
  TrendingUp,
  Users,
  Clock,
  AlertTriangle,
  BookOpen,
  GraduationCap,
  CheckCircle,
  XCircle,
} from "lucide-react"
import UserProfileMenu from "@/components/user-profile-menu"

export default function ReportsPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })
  const [selectedClass, setSelectedClass] = useState("all")
  const [reportType, setReportType] = useState("attendance")

  // Sample data for charts
  const attendanceData = [
    { name: "Mon", present: 85, absent: 15 },
    { name: "Tue", present: 92, absent: 8 },
    { name: "Wed", present: 78, absent: 22 },
    { name: "Thu", present: 88, absent: 12 },
    { name: "Fri", present: 95, absent: 5 },
    { name: "Sat", present: 82, absent: 18 },
    { name: "Sun", present: 90, absent: 10 },
  ]

  const studentAttendanceData = [
    { name: "Week 1", attendance: 95 },
    { name: "Week 2", attendance: 88 },
    { name: "Week 3", attendance: 92 },
    { name: "Week 4", attendance: 87 },
    { name: "Week 5", attendance: 91 },
    { name: "Week 6", attendance: 89 },
  ]

  const subjectData = [
    { name: "Mathematics", attendance: 95, color: "#8884d8" },
    { name: "Science", attendance: 87, color: "#82ca9d" },
    { name: "English", attendance: 92, color: "#ffc658" },
    { name: "History", attendance: 89, color: "#ff7300" },
    { name: "Physics", attendance: 85, color: "#00ff88" },
  ]

  const classData = [
    { name: "Class 9A", value: 95, color: "#8884d8" },
    { name: "Class 9B", value: 87, color: "#82ca9d" },
    { name: "Class 10A", value: 92, color: "#ffc658" },
    { name: "Class 10B", value: 89, color: "#ff7300" },
    { name: "Class 11A", value: 85, color: "#00ff88" },
  ]

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType")
    const storedEmail = localStorage.getItem("userEmail")
    const authToken = localStorage.getItem("authToken")

    if (!storedUserType || !storedEmail || !authToken) {
      router.push("/")
      return
    }

    setUserType(storedUserType)
    setUserEmail(storedEmail)
  }, [router])

  const handleExportReport = () => {
    alert("Report exported successfully! 📊")
  }

  const handleBack = () => {
    if (userType === "admin") {
      router.push("/admin")
    } else {
      router.push("/dashboard")
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
              <BarChart3 className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {userType === "student" ? "My Attendance Report" : "Class Reports & Analytics"}
                </h1>
                <p className="text-white/80 text-sm">
                  {userType === "student"
                    ? "Track your attendance progress and performance"
                    : "Comprehensive attendance insights and analytics"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleExportReport}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <UserProfileMenu
              userType={userType as "student" | "teacher" | "admin"}
              userEmail={userEmail}
              userName={userType === "student" ? "Student User" : "Teacher User"}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Filters - Only show for teachers */}
        {userType === "teacher" && (
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Report Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Report Type</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="attendance">Attendance Overview</SelectItem>
                      <SelectItem value="trends">Attendance Trends</SelectItem>
                      <SelectItem value="class">Class Comparison</SelectItem>
                      <SelectItem value="anomalies">AI Anomalies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Class Filter</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="9A">Class 9A</SelectItem>
                      <SelectItem value="9B">Class 9B</SelectItem>
                      <SelectItem value="10A">Class 10A</SelectItem>
                      <SelectItem value="10B">Class 10B</SelectItem>
                      <SelectItem value="11A">Class 11A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Date From</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? format(dateRange.from, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => date && setDateRange((prev) => ({ ...prev, from: date }))}
                        initialFocus
                        className="bg-gray-800 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Date To</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                      <Calendar
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) => date && setDateRange((prev) => ({ ...prev, to: date }))}
                        initialFocus
                        className="bg-gray-800 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{userType === "student" ? "My Average" : "Class Average"}</p>
                  <p className="text-2xl font-bold text-white">{userType === "student" ? "91.2%" : "89.2%"}</p>
                  <p className="text-green-400 text-xs">+2.3% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  {userType === "student" ? (
                    <BookOpen className="w-6 h-6 text-blue-400" />
                  ) : (
                    <Users className="w-6 h-6 text-blue-400" />
                  )}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{userType === "student" ? "Total Classes" : "Total Students"}</p>
                  <p className="text-2xl font-bold text-white">{userType === "student" ? "156" : "1,247"}</p>
                  <p className="text-blue-400 text-xs">
                    {userType === "student" ? "This semester" : "Active learners"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">
                    {userType === "student" ? "Present Days" : "Sessions This Month"}
                  </p>
                  <p className="text-2xl font-bold text-white">{userType === "student" ? "142" : "156"}</p>
                  <p className="text-purple-400 text-xs">{userType === "student" ? "Out of 156" : "23 active today"}</p>
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
                  <p className="text-gray-400 text-sm">{userType === "student" ? "Absent Days" : "AI Anomalies"}</p>
                  <p className="text-2xl font-bold text-white">{userType === "student" ? "14" : "12"}</p>
                  <p className="text-red-400 text-xs">{userType === "student" ? "This semester" : "3 high priority"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Attendance Chart */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                {userType === "student" ? "My Weekly Attendance" : "Daily Attendance Overview"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {userType === "student" ? (
                  <LineChart data={studentAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Bar dataKey="present" fill="#10B981" name="Present" />
                    <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject/Class Performance */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                {userType === "student" ? "Subject-wise Attendance" : "Class Performance"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userType === "student" ? subjectData : classData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey={userType === "student" ? "attendance" : "value"}
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {(userType === "student" ? subjectData : classData).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userType === "student" ? (
                  <>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white text-sm">Mathematics</p>
                          <p className="text-gray-400 text-xs">Today, 9:00 AM</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Present</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white text-sm">Science Lab</p>
                          <p className="text-gray-400 text-xs">Yesterday, 11:00 AM</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Present</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="text-white text-sm">English Literature</p>
                          <p className="text-gray-400 text-xs">Dec 23, 2:00 PM</p>
                        </div>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400">Absent</Badge>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Class 10A attendance recorded</p>
                        <p className="text-gray-400 text-xs">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">AI detected suspicious pattern</p>
                        <p className="text-gray-400 text-xs">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">New session created</p>
                        <p className="text-gray-400 text-xs">Yesterday</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                {userType === "student" ? "My Performance" : "Top Performers"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userType === "student" ? (
                  <>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Mathematics</p>
                        <p className="text-gray-400 text-sm">Advanced Algebra</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">95%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">English</p>
                        <p className="text-gray-400 text-sm">Literature & Grammar</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">92%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Science</p>
                        <p className="text-gray-400 text-sm">Physics & Chemistry</p>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400">87%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">History</p>
                        <p className="text-gray-400 text-sm">World History</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">89%</Badge>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Sarah Johnson</p>
                        <p className="text-gray-400 text-sm">Class 10A</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">98%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Michael Chen</p>
                        <p className="text-gray-400 text-sm">Class 11A</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">96%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Emma Davis</p>
                        <p className="text-gray-400 text-sm">Class 9B</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">95%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Alex Rodriguez</p>
                        <p className="text-gray-400 text-sm">Class 10B</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">94%</Badge>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Insights & Recommendations */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                {userType === "student" ? "Recommendations" : "At-Risk Students"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userType === "student" ? (
                  <>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 font-medium text-sm">Study Tip</span>
                      </div>
                      <p className="text-white text-sm">
                        Your Science attendance is lower. Consider attending lab sessions for better understanding.
                      </p>
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium text-sm">Great Job!</span>
                      </div>
                      <p className="text-white text-sm">Excellent attendance in Mathematics! Keep up the good work.</p>
                    </div>
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400 font-medium text-sm">Progress</span>
                      </div>
                      <p className="text-white text-sm">Your overall attendance improved by 2.3% this month!</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Jake Wilson</p>
                        <p className="text-gray-400 text-sm">Class 9A</p>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400">65%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Lisa Brown</p>
                        <p className="text-gray-400 text-sm">Class 10A</p>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400">72%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Tom Anderson</p>
                        <p className="text-gray-400 text-sm">Class 11B</p>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400">74%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Nina Patel</p>
                        <p className="text-gray-400 text-sm">Class 9B</p>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400">76%</Badge>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
