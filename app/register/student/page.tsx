"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, UserPlus, ArrowLeft, Sparkles } from "lucide-react"

export default function StudentRegister() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    class: "",
    section: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    setIsLoading(true)

    // Simulate registration and securely save data
    setTimeout(() => {
      const userData = {
        userType: "student",
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        studentId: formData.studentId,
        class: formData.class,
        section: formData.section,
        // In a real app, password would be hashed and stored securely on a backend
      }
      localStorage.setItem("userType", "student")
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem("authToken", `token_student_${Date.now()}`)
      localStorage.setItem("currentUser", JSON.stringify(userData)) // Store comprehensive user data
      router.push("/dashboard")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl opacity-90"></div>

          <div className="relative bg-gray-900/20 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={() => router.back()}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"></div>
                </div>
                <h1 className="text-2xl font-bold text-white">
                  Student <span className="text-cyan-400">Sign Up</span>
                </h1>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white font-medium text-sm">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white font-medium text-sm">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                  placeholder="john.doe@school.edu"
                  required
                />
              </div>

              {/* Student ID */}
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-white font-medium text-sm">
                  Student ID
                </Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange("studentId", e.target.value)}
                  className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                  placeholder="STU2024001"
                  required
                />
              </div>

              {/* Class and Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-medium text-sm">Class</Label>
                  <Select onValueChange={(value) => handleInputChange("class", value)}>
                    <SelectTrigger className="bg-gray-900/80 border-gray-700 text-white h-12 rounded-xl">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="11">Class 11</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-medium text-sm">Section</Label>
                  <Select onValueChange={(value) => handleInputChange("section", value)}>
                    <SelectTrigger className="bg-gray-900/80 border-gray-700 text-white h-12 rounded-xl">
                      <SelectValue placeholder="Section" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                      <SelectItem value="C">Section C</SelectItem>
                      <SelectItem value="D">Section D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Password Fields */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium text-sm">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white font-medium text-sm">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 rounded-xl text-lg h-14 shadow-lg disabled:opacity-50 mt-6"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-300">
                Already have an account?{" "}
                <button
                  onClick={() => router.push("/")}
                  className="text-white font-semibold underline hover:text-cyan-400 transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Secure & AI-Powered Attendance Tracking</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
