"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Lock, Bell, Palette, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  })
  const [theme, setTheme] = useState("dark")
  const [language, setLanguage] = useState("en")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Simulate loading settings from localStorage or an API
    const savedSettings = localStorage.getItem("userSettings")
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings)
      setNotifications(parsedSettings.notifications || notifications)
      setTheme(parsedSettings.theme || theme)
      setLanguage(parsedSettings.language || language)
    }
  }, [])

  const handlePasswordChange = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.")
      return
    }
    setIsSaving(true)
    setTimeout(() => {
      // In a real app, this would be an API call to update password
      console.log("Password changed:", password)
      setPassword("")
      setConfirmPassword("")
      setIsSaving(false)
      alert("Password updated successfully!")
    }, 1000)
  }

  const handleNotificationChange = (type: keyof typeof notifications, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [type]: checked }))
  }

  const handleSaveNotifications = () => {
    setIsSaving(true)
    setTimeout(() => {
      const currentSettings = JSON.parse(localStorage.getItem("userSettings") || "{}")
      localStorage.setItem("userSettings", JSON.stringify({ ...currentSettings, notifications }))
      setIsSaving(false)
      alert("Notification preferences saved!")
    }, 1000)
  }

  const handleSaveAppearance = () => {
    setIsSaving(true)
    setTimeout(() => {
      const currentSettings = JSON.parse(localStorage.getItem("userSettings") || "{}")
      localStorage.setItem("userSettings", JSON.stringify({ ...currentSettings, theme, language }))
      setIsSaving(false)
      alert("Appearance settings saved!")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => router.back()} variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <div className="w-16"></div> {/* Spacer */}
        </div>

        <div className="space-y-8">
          {/* Account Security */}
          <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm shadow-lg">
            <CardHeader className="border-b border-gray-700/50 p-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Lock className="w-5 h-5" /> Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  New Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                  placeholder="••••••••"
                />
              </div>
              <Button
                onClick={handlePasswordChange}
                disabled={isSaving || !password || !confirmPassword}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl text-lg h-12 shadow-lg disabled:opacity-50"
              >
                <Save className="w-5 h-5 mr-2" />
                {isSaving ? "Saving..." : "Change Password"}
              </Button>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm shadow-lg">
            <CardHeader className="border-b border-gray-700/50 p-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5" /> Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="text-gray-300">
                  Email Notifications
                </Label>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications" className="text-gray-300">
                  SMS Notifications
                </Label>
                <Switch
                  id="sms-notifications"
                  checked={notifications.sms}
                  onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications" className="text-gray-300">
                  Push Notifications
                </Label>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                />
              </div>
              <Button
                onClick={handleSaveNotifications}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl text-lg h-12 shadow-lg disabled:opacity-50"
              >
                <Save className="w-5 h-5 mr-2" />
                {isSaving ? "Saving..." : "Save Notifications"}
              </Button>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm shadow-lg">
            <CardHeader className="border-b border-gray-700/50 p-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Palette className="w-5 h-5" /> Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme" className="text-gray-300">
                  Theme
                </Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="bg-gray-900/80 border-gray-700 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language" className="text-gray-300">
                  Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-gray-900/80 border-gray-700 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleSaveAppearance}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl text-lg h-12 shadow-lg disabled:opacity-50"
              >
                <Save className="w-5 h-5 mr-2" />
                {isSaving ? "Saving..." : "Save Appearance"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
