"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, HelpCircle, LogOut, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

interface UserProfileMenuProps {
  userType: "student" | "teacher" | "admin"
  userEmail: string
  userName?: string
}

interface StoredUserData {
  firstName?: string
  lastName?: string
  email: string
  userType: "student" | "teacher" | "admin"
  avatarUrl?: string
}

export default function UserProfileMenu({
  userType: propUserType,
  userEmail: propUserEmail,
  userName: propUserName,
}: UserProfileMenuProps) {
  const router = useRouter()
  const [currentUserData, setCurrentUserData] = useState<StoredUserData | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUserData(JSON.parse(storedUser))
    } else {
      // Fallback if currentUser is not set (e.g., old login session)
      setCurrentUserData({
        email: propUserEmail,
        userType: propUserType,
        firstName: propUserName?.split(" ")[0] || "",
        lastName: propUserName?.split(" ")[1] || "",
      })
    }
  }, [propUserEmail, propUserType, propUserName])

  if (!currentUserData) {
    return null // Or a loading spinner
  }

  const displayName =
    currentUserData.firstName && currentUserData.lastName
      ? `${currentUserData.firstName} ${currentUserData.lastName}`
      : currentUserData.email.split("@")[0].charAt(0).toUpperCase() + currentUserData.email.split("@")[0].slice(1)

  // Generate initials for avatar
  const initials = (currentUserData.firstName?.charAt(0) || "") + (currentUserData.lastName?.charAt(0) || "")
  const fallbackInitials = initials.length > 0 ? initials.toUpperCase() : displayName.charAt(0).toUpperCase()

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  const handleProfile = () => {
    router.push("/profile")
  }

  const handleSettings = () => {
    router.push("/settings")
  }

  const handleSupport = () => {
    router.push("/support")
  }

  const getUserTypeColor = () => {
    switch (currentUserData.userType) {
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
    switch (currentUserData.userType) {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 p-2 h-auto hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
        >
          <Avatar className="w-10 h-10 border-2 border-white/20">
            <AvatarImage
              src={currentUserData.avatarUrl || "/placeholder.svg?height=40&width=40&query=user profile"}
              alt={displayName}
            />
            <AvatarFallback className={`bg-gradient-to-br ${getUserTypeColor()} text-white font-semibold`}>
              {fallbackInitials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-white font-medium text-sm">{displayName}</span>
            <span className="text-gray-400 text-xs">{currentUserData.email}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl"
        sideOffset={8}
      >
        {/* User Info Header */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-white/20">
              <AvatarImage
                src={currentUserData.avatarUrl || "/placeholder.svg?height=64&width=64&query=user profile"}
                alt={displayName}
              />
              <AvatarFallback className={`bg-gradient-to-br ${getUserTypeColor()} text-white font-bold text-lg`}>
                {fallbackInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">{displayName}</h3>
              <p className="text-gray-400 text-sm mb-2">{currentUserData.email}</p>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUserTypeBadge()}`}
              >
                {currentUserData.userType.charAt(0).toUpperCase() + currentUserData.userType.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          <DropdownMenuItem
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors focus:bg-gray-800/50"
            onClick={handleProfile}
          >
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium">Profile</p>
              <p className="text-gray-400 text-xs">Manage your account</p>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors focus:bg-gray-800/50"
            onClick={handleSettings}
          >
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white font-medium">Settings</p>
              <p className="text-gray-400 text-xs">Preferences and privacy</p>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors focus:bg-gray-800/50"
            onClick={handleSupport}
          >
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white font-medium">Support</p>
              <p className="text-gray-400 text-xs">Help and documentation</p>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-700/50 my-2" />

          <DropdownMenuItem
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-red-500/10 transition-colors group focus:bg-red-500/10"
            onClick={handleLogout}
          >
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
              <LogOut className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-white font-medium group-hover:text-red-400 transition-colors">Log out</p>
              <p className="text-gray-400 text-xs">Sign out of your account</p>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
