"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, LogIn, Sparkles, AlertCircle, Users, BarChart3, Shield, Zap, Globe } from "lucide-react"
import AIAssistant from "@/components/ai-assistant"

export default function AttendifyLogin() {
  const router = useRouter()
  const [userType, setUserType] = useState<"student" | "teacher" | "admin">("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    { icon: Users, title: "Smart Attendance", desc: "AI-powered attendance tracking" },
    { icon: BarChart3, title: "Real-time Analytics", desc: "Comprehensive reporting dashboard" },
    { icon: Shield, title: "Fraud Detection", desc: "Advanced anomaly detection system" },
    { icon: Zap, title: "Instant Notifications", desc: "Real-time alerts and updates" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSignIn = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const validCredentials = {
        student: { email: "student@example.com", password: "student123" },
        teacher: { email: "teacher@example.com", password: "teacher123" },
        admin: { email: "admin@example.com", password: "admin123" },
      }

      const userCreds = validCredentials[userType]
      if (email === userCreds.email && password === userCreds.password) {
        localStorage.setItem("userType", userType)
        localStorage.setItem("userEmail", email)
        localStorage.setItem("authToken", `token_${Date.now()}`)
        localStorage.setItem("loginTime", new Date().toISOString())

        if (userType === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      } else {
        setError("Invalid email or password. Please try again.")
      }
    } catch (err) {
      setError("Authentication failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = () => {
    router.push(`/register/${userType}`)
  }

  const handleForgotPassword = () => {
    alert("Password reset link sent to your email!")
  }

  const CurrentIcon = features[currentFeature].icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-white">
          <div className="max-w-lg text-center space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-bounce"></div>
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Attendify
                </h1>
                <p className="text-purple-200 text-lg">Smart Attendance System</p>
              </div>
            </div>

            {/* Hero Text */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Attendance Management
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Experience the future of educational attendance tracking with AI-powered insights, real-time analytics,
                and seamless user experience.
              </p>
            </div>

            {/* Animated Feature Showcase */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-4 transition-all duration-500">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <CurrentIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{features[currentFeature].title}</h3>
                  <p className="text-gray-300 text-sm">{features[currentFeature].desc}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">99.9%</div>
                <div className="text-sm text-gray-400">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">10K+</div>
                <div className="text-sm text-gray-400">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
          <div className="w-full max-w-md">
            <div className="relative">
              {/* Glassmorphism Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-3xl backdrop-blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 rounded-3xl"></div>

              <div className="relative bg-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-bounce"></div>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Attendify
                    </h1>
                  </div>
                </div>

                {/* Welcome Text */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
                  <p className="text-gray-300">Sign in to access your dashboard</p>
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert className="mb-6 bg-red-500/20 border-red-500/50 animate-shake">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-red-200">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Form */}
                <form onSubmit={handleSignIn} className="space-y-6">
                  {/* User Type Toggle */}
                  <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-1 flex border border-gray-700/50">
                    {["student", "teacher", "admin"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setUserType(type)}
                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                          userType === type
                            ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg transform scale-105"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Demo Credentials */}
                  <div className="relative overflow-hidden bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-purple-500/30 animate-gradient-rotate-slow">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 animate-gradient-rotate-reverse-slow"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                        <span className="text-sm font-medium text-purple-300">Demo Credentials</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        <span className="font-mono bg-gray-800/50 px-2 py-1 rounded backdrop-blur-sm">
                          {userType}@example.com
                        </span>
                        {" / "}
                        <span className="font-mono bg-gray-800/50 px-2 py-1 rounded backdrop-blur-sm">
                          {userType}123
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-800/60 border-gray-600/50 text-white placeholder:text-gray-400 h-14 rounded-xl text-base backdrop-blur-sm focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder={`${userType}@example.com`}
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-cyan-500/0 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-800/60 border-gray-600/50 text-white placeholder:text-gray-400 h-14 rounded-xl text-base backdrop-blur-sm focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all duration-300"
                        placeholder="••••••••"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors duration-300 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-cyan-600 hover:from-purple-700 hover:via-purple-800 hover:to-cyan-700 text-white font-semibold py-4 rounded-xl text-lg h-16 shadow-2xl disabled:opacity-50 transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/25"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <LogIn className="w-5 h-5" />
                        Sign In to Dashboard
                      </div>
                    )}
                  </Button>
                </form>

                {/* Sign Up Links */}
                {userType !== "admin" && (
                  <div className="text-center mt-8 space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                      <span className="text-gray-400 text-sm">New to Attendify?</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                    </div>
                    <button
                      onClick={handleSignUp}
                      className="text-white font-semibold hover:text-cyan-400 transition-colors duration-300 underline decoration-purple-500 hover:decoration-cyan-400"
                    >
                      Create {userType} account →
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Secure</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>AI-Powered</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>Global</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
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
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-gradient-rotate-slow {
          background-size: 200% 200%;
          animation: gradient-rotate-slow 8s ease infinite;
        }
        
        .animate-gradient-rotate-reverse-slow {
          background-size: 200% 200%;
          animation: gradient-rotate-reverse-slow 8s ease infinite;
        }
      `}</style>
    </div>
  )
}
