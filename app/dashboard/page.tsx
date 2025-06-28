"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Check,
  Calendar,
  Users,
  BookOpen,
  BarChart3,
  Clock,
  UserCheck,
  GraduationCap,
  Bell,
  MapPin,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import UserProfileMenu from "@/components/user-profile-menu"

export default function Dashboard() {
  const router = useRouter()
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null)
  const [userEmail, setUserEmail] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [attendanceComment, setAttendanceComment] = useState("")
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false)
  const [attendanceStatus, setAttendanceStatus] = useState<"present" | "absent" | null>(null)
  const [currentSession, setCurrentSession] = useState<any>(null)

  useEffect(() => {
    // Check authentication
    const storedUserType = localStorage.getItem("userType") as "student" | "teacher" | null
    const storedEmail = localStorage.getItem("userEmail")
    const authToken = localStorage.getItem("authToken")

    if (!storedUserType || !storedEmail || !authToken) {
      router.push("/")
      return
    }

    setUserType(storedUserType)
    setUserEmail(storedEmail)

    // Load current session
    setCurrentSession({
      id: "session_001",
      name: "Mathematics - Algebra",
      startTime: "09:00 AM",
      endTime: "10:30 AM",
      location: "Room 101",
      isActive: true,
    })

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("authToken")
    localStorage.removeItem("loginTime")
    router.push("/")
  }

  const handleMarkAttendance = async () => {
    setIsMarkingAttendance(true)

    try {
      // Simulate attendance marking with AI anomaly detection
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // AI Anomaly Detection Simulation
      const suspiciousPatterns = detectAnomalies(attendanceComment)

      if (suspiciousPatterns.length > 0) {
        alert(`⚠️ Anomaly Detected: ${suspiciousPatterns.join(", ")}. Admin has been notified.`)
      }

      setAttendanceStatus("present")
      setAttendanceComment("")
      alert("✅ Attendance marked successfully!")
    } catch (error) {
      alert("❌ Failed to mark attendance. Please try again.")
    } finally {
      setIsMarkingAttendance(false)
    }
  }

  const detectAnomalies = (comment: string): string[] => {
    const anomalies: string[] = []
    const lowerComment = comment.toLowerCase()

    // AI-powered anomaly detection patterns
    const suspiciousPatterns = [
      { pattern: /not (here|present|attending)/i, message: "Contradictory presence statement" },
      { pattern: /someone else|friend|buddy/i, message: "Possible proxy attendance" },
      { pattern: /fake|pretend|lying/i, message: "Dishonesty indicators" },
      { pattern: /outside|home|away/i, message: "Location inconsistency" },
      { pattern: /sick|ill|doctor/i, message: "Health-related absence claim" },
    ]

    suspiciousPatterns.forEach(({ pattern, message }) => {
      if (pattern.test(lowerComment)) {
        anomalies.push(message)
      }
    })

    return anomalies
  }

  const handleViewReports = () => {
    router.push("/reports")
  }

  const handleManageSessions = () => {
    router.push("/sessions")
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
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                <span className="text-purple-200">Attend</span>
                <span className="text-cyan-200">ify</span>
              </h1>
              <p className="text-white/80 text-sm">Welcome back, {userType === "student" ? "Student" : "Teacher"}!</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-white font-medium">{currentTime.toLocaleTimeString()}</div>
              <div className="text-white/80 text-sm">{currentTime.toLocaleDateString()}</div>
            </div>
            <UserProfileMenu
              userType={userType}
              userEmail={userEmail}
              userName={
                userType === "student" ? "Student User" : userType === "teacher" ? "Teacher User" : "Admin User"
              }
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Current Session Alert */}
        {currentSession && currentSession.isActive && (
          <Alert className="mb-6 bg-green-500/20 border-green-500/50">
            <Clock className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200">
              <strong>Active Session:</strong> {currentSession.name} • {currentSession.startTime} -{" "}
              {currentSession.endTime} • {currentSession.location}
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card bg-gray-800 border-gray-700 animate-card-glow hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center animate-glow-pulse">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Today's Attendance</p>
                  <p className="text-2xl font-bold text-white">
                    {userType === "student" ? (attendanceStatus === "present" ? "Present" : "Not Marked") : "85%"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card bg-gray-800 border-gray-700 animate-card-glow hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-lg flex items-center justify-center animate-glow-pulse">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">This Week</p>
                  <p className="text-2xl font-bold text-white">{userType === "student" ? "4/5" : "92%"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card bg-gray-800 border-gray-700 animate-card-glow hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center animate-glow-pulse">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{userType === "student" ? "Classes" : "Students"}</p>
                  <p className="text-2xl font-bold text-white">{userType === "student" ? "6" : "156"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card bg-gray-800 border-gray-700 animate-card-glow hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center animate-glow-pulse">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Overall</p>
                  <p className="text-2xl font-bold text-white">{userType === "student" ? "88%" : "90%"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Floating gradient orbs */}
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="gradient-orb gradient-orb-3"></div>

          {/* Quick Actions */}
          <Card className="gradient-card bg-gray-800 border-gray-700 animate-card-glow">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center animate-border-rotate">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userType === "student" ? (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full relative overflow-hidden text-white font-semibold py-4 rounded-xl text-lg h-14 border-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 animate-gradient-rotate shimmer hover:scale-105"
                        disabled={!currentSession?.isActive || attendanceStatus === "present"}
                      >
                        <UserCheck className="w-5 h-5 mr-2 relative z-10" />
                        <span className="relative z-10">
                          {attendanceStatus === "present" ? "Attendance Marked" : "Mark Attendance"}
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700 text-white">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <UserCheck className="w-5 h-5 text-green-400" />
                          Mark Attendance
                        </DialogTitle>
                        <DialogDescription className="text-gray-300">
                          Confirm your attendance for {currentSession?.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{currentSession?.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Clock className="w-4 h-4" />
                            <span>
                              {currentSession?.startTime} - {currentSession?.endTime}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">
                            Optional Comment (AI-monitored for anomalies)
                          </label>
                          <Textarea
                            value={attendanceComment}
                            onChange={(e) => setAttendanceComment(e.target.value)}
                            placeholder="Any additional notes about your attendance..."
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                            rows={3}
                          />
                          <p className="text-xs text-gray-400">
                            <AlertTriangle className="w-3 h-3 inline mr-1" />
                            Comments are analyzed by AI for attendance fraud detection
                          </p>
                        </div>

                        <Button
                          onClick={handleMarkAttendance}
                          disabled={isMarkingAttendance}
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                        >
                          {isMarkingAttendance ? (
                            <>
                              <Clock className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Confirm Attendance
                            </>
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    onClick={handleViewReports}
                    className="w-full relative overflow-hidden text-white font-semibold py-4 rounded-xl text-lg h-14 border-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 animate-gradient-rotate-reverse shimmer hover:scale-105"
                  >
                    <BarChart3 className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">View My Reports</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleManageSessions}
                    className="w-full relative overflow-hidden text-white font-semibold py-4 rounded-xl text-lg h-14 border-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 animate-gradient-rotate shimmer hover:scale-105"
                  >
                    <Users className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Manage Sessions</span>
                  </Button>
                  <Button
                    onClick={handleViewReports}
                    className="w-full relative overflow-hidden text-white font-semibold py-4 rounded-xl text-lg h-14 border-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 animate-gradient-rotate-reverse shimmer hover:scale-105"
                  >
                    <BarChart3 className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">View Reports</span>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="gradient-card bg-gray-800 border-gray-700 animate-card-glow">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-border-rotate">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-700/50 to-gray-600/30 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      {userType === "student" ? "Attended Mathematics class" : "Class 10A attendance recorded"}
                    </p>
                    <p className="text-gray-400 text-xs">2 hours ago</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30">
                    Present
                  </Badge>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-700/50 to-gray-600/30 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">AI detected suspicious comment pattern</p>
                    <p className="text-gray-400 text-xs">4 hours ago</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30">
                    Flagged
                  </Badge>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-700/50 to-gray-600/30 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      {userType === "student" ? "Session started: Science Lab" : "New session created"}
                    </p>
                    <p className="text-gray-400 text-xs">Yesterday</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30">
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="gradient-card bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 cursor-pointer group animate-card-glow hover:scale-105">
            <CardContent className="p-6 text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow-pulse group-hover:animate-border-rotate transition-all duration-300">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                {userType === "student" ? "My Sessions" : "Session Management"}
              </h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                {userType === "student"
                  ? "View your enrolled sessions and schedules"
                  : "Create and manage class sessions"}
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 cursor-pointer group animate-card-glow hover:scale-105">
            <CardContent className="p-6 text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow-pulse group-hover:animate-border-rotate transition-all duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                Analytics & Reports
              </h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                {userType === "student"
                  ? "Track your attendance patterns and trends"
                  : "View detailed attendance analytics and reports"}
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 cursor-pointer group animate-card-glow hover:scale-105">
            <CardContent className="p-6 text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow-pulse group-hover:animate-border-rotate transition-all duration-300">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-orange-300 transition-colors">
                AI Monitoring
              </h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                Advanced anomaly detection for attendance fraud prevention
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <style jsx>{`
  @keyframes gradient-rotate {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes gradient-rotate-reverse {
    0% { background-position: 100% 50%; }
    50% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
  
  @keyframes gradient-rotate-slow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes gradient-rotate-reverse-slow {
    0% { background-position: 100% 50%; }
    50% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
  
  @keyframes border-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
    50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6), 0 0 60px rgba(6, 182, 212, 0.4); }
  }
  
  @keyframes card-glow {
    0%, 100% { 
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.2), 
                  0 0 40px rgba(6, 182, 212, 0.1); 
    }
    50% { 
      box-shadow: 0 0 30px rgba(139, 92, 246, 0.4), 
                  0 0 60px rgba(6, 182, 212, 0.3),
                  0 0 80px rgba(16, 185, 129, 0.2); 
    }
  }
  
  .animate-gradient-rotate {
    background-size: 200% 200%;
    animation: gradient-rotate 3s ease infinite;
  }
  
  .animate-gradient-rotate-reverse {
    background-size: 200% 200%;
    animation: gradient-rotate-reverse 3s ease infinite;
  }
  
  .animate-gradient-rotate-slow {
    background-size: 200% 200%;
    animation: gradient-rotate-slow 6s ease infinite;
  }
  
  .animate-gradient-rotate-reverse-slow {
    background-size: 200% 200%;
    animation: gradient-rotate-reverse-slow 6s ease infinite;
  }
  
  .animate-border-rotate {
    animation: border-rotate 8s linear infinite;
  }
  
  .animate-glow-pulse {
    animation: glow-pulse 4s ease-in-out infinite;
  }
  
  .animate-card-glow {
    animation: card-glow 6s ease-in-out infinite;
  }
  
  /* Enhanced card hover effects */
  .gradient-card {
    position: relative;
    overflow: hidden;
  }
  
  .gradient-card::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ef4444, #8b5cf6);
    background-size: 300% 300%;
    border-radius: inherit;
    z-index: -1;
    animation: gradient-rotate-slow 8s ease infinite;
  }
  
  .gradient-card::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: #1f2937;
    border-radius: inherit;
    z-index: -1;
  }
  
  /* Floating gradient orbs */
  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.6;
    animation: float 8s ease-in-out infinite;
  }
  
  .gradient-orb-1 {
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, #8b5cf6, #06b6d4);
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }
  
  .gradient-orb-2 {
    width: 150px;
    height: 150px;
    background: linear-gradient(45deg, #10b981, #f59e0b);
    top: 60%;
    right: 10%;
    animation-delay: 2s;
  }
  
  .gradient-orb-3 {
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #ef4444, #8b5cf6);
    bottom: 20%;
    left: 50%;
    animation-delay: 4s;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
    33% { transform: translateY(-20px) translateX(10px) rotate(120deg); }
    66% { transform: translateY(10px) translateX(-10px) rotate(240deg); }
  }
  
  /* Shimmer effect for buttons */
  .shimmer {
    position: relative;
    overflow: hidden;
  }
  
  .shimmer::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: shimmer 3s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`}</style>
    </div>
  )
}
