"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Camera, Save, User, Mail, BadgeIcon as IdCard, Book, Users, Phone, Building } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserData {
  userType: "student" | "teacher" | "admin"
  firstName: string
  lastName: string
  email: string
  avatarUrl?: string
  studentId?: string
  class?: string
  section?: string
  employeeId?: string
  department?: string
  subject?: string
  phone?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [editedData, setEditedData] = useState<UserData | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      const parsedUser: UserData = JSON.parse(storedUser)
      setUserData(parsedUser)
      setEditedData(parsedUser)
      if (parsedUser.avatarUrl) {
        setAvatarPreview(parsedUser.avatarUrl)
      }
    } else {
      // Redirect to login if no user data is found
      router.push("/")
    }
  }, [router])

  const handleInputChange = (field: keyof UserData, value: string) => {
    setEditedData((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveChanges = () => {
    if (!editedData) return

    setIsSaving(true)
    setTimeout(() => {
      const updatedUserData = { ...editedData }
      if (avatarPreview) {
        updatedUserData.avatarUrl = avatarPreview
      }
      localStorage.setItem("currentUser", JSON.stringify(updatedUserData))
      setUserData(updatedUserData)
      setIsSaving(false)
      alert("Profile updated successfully!")
    }, 1000)
  }

  if (!userData || !editedData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading profile...</div>
    )
  }

  const getUserTypeColor = () => {
    switch (userData.userType) {
      case "student":
        return "from-blue-500 to-cyan-500"
      case "teacher":
        return "from-green-500 to-emerald-500"
      case "admin":
        return "from-purple-500 to-pink-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getUserTypeBadge = () => {
    switch (userData.userType) {
      case "student":
        return "bg-blue-500/20 text-blue-400"
      case "teacher":
        return "bg-green-500/20 text-green-400"
      case "admin":
        return "bg-purple-500/20 text-purple-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const displayName =
    editedData.firstName && editedData.lastName
      ? `${editedData.firstName} ${editedData.lastName}`
      : editedData.email.split("@")[0].charAt(0).toUpperCase() + editedData.email.split("@")[0].slice(1)

  const fallbackInitials =
    (editedData.firstName?.charAt(0) || "") + (editedData.lastName?.charAt(0) || "") || displayName.charAt(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => router.back()} variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-white">Your Profile</h1>
          <div className="w-16"></div> {/* Spacer */}
        </div>

        <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm shadow-lg">
          <CardHeader className="flex flex-col items-center p-6 border-b border-gray-700/50">
            <div className="relative mb-4">
              <Avatar className="w-28 h-28 border-4 border-white/20">
                <AvatarImage
                  src={avatarPreview || "/placeholder.svg?height=112&width=112&query=user profile"}
                  alt={displayName}
                />
                <AvatarFallback className={`bg-gradient-to-br ${getUserTypeColor()} text-white font-bold text-3xl`}>
                  {fallbackInitials.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-600 transition-colors border border-gray-600"
              >
                <Camera className="w-5 h-5 text-white" />
                <Input id="avatar-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </Label>
            </div>
            <CardTitle className="text-2xl font-semibold text-white">{displayName}</CardTitle>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getUserTypeBadge()}`}
            >
              {userData.userType.charAt(0).toUpperCase() + userData.userType.slice(1)}
            </span>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" /> First Name
                </Label>
                <Input
                  id="firstName"
                  value={editedData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" /> Last Name
                </Label>
                <Input
                  id="lastName"
                  value={editedData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                value={editedData.email}
                readOnly
                className="bg-gray-900/80 border-gray-700 text-gray-400 placeholder:text-gray-400 h-12 rounded-xl cursor-not-allowed"
              />
            </div>

            {userData.userType === "student" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-gray-300 flex items-center gap-2">
                    <IdCard className="w-4 h-4" /> Student ID
                  </Label>
                  <Input
                    id="studentId"
                    value={editedData.studentId || ""}
                    onChange={(e) => handleInputChange("studentId", e.target.value)}
                    className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="class" className="text-gray-300 flex items-center gap-2">
                      <Book className="w-4 h-4" /> Class
                    </Label>
                    <Select value={editedData.class || ""} onValueChange={(value) => handleInputChange("class", value)}>
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
                    <Label htmlFor="section" className="text-gray-300 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Section
                    </Label>
                    <Select
                      value={editedData.section || ""}
                      onValueChange={(value) => handleInputChange("section", value)}
                    >
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
              </>
            )}

            {userData.userType === "teacher" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="employeeId" className="text-gray-300 flex items-center gap-2">
                    <IdCard className="w-4 h-4" /> Employee ID
                  </Label>
                  <Input
                    id="employeeId"
                    value={editedData.employeeId || ""}
                    onChange={(e) => handleInputChange("employeeId", e.target.value)}
                    className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-gray-300 flex items-center gap-2">
                      <Building className="w-4 h-4" /> Department
                    </Label>
                    <Select
                      value={editedData.department || ""}
                      onValueChange={(value) => handleInputChange("department", value)}
                    >
                      <SelectTrigger className="bg-gray-900/80 border-gray-700 text-white h-12 rounded-xl">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="computer">Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-300 flex items-center gap-2">
                      <Book className="w-4 h-4" /> Subject
                    </Label>
                    <Input
                      id="subject"
                      value={editedData.subject || ""}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={editedData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                  />
                </div>
              </>
            )}

            <Button
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl text-lg h-14 shadow-lg disabled:opacity-50 mt-6"
            >
              <Save className="w-5 h-5 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
