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

interface UserProfileMenuProps {
  userType: "student" | "teacher" | "admin"
  userEmail: string
  userName?: string
}

export default function UserProfileMenu({ userType, userEmail, userName }: UserProfileMenuProps) {
  const router = useRouter()

  // Generate user name from email if not provided
  const displayName = userName || userEmail.split("@")[0].charAt(0).toUpperCase() + userEmail.split("@")[0].slice(1)

  // Generate initials for avatar
  const initials = displayName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  const handleProfile = () => {
    alert("Profile page coming soon! 👤")
  }

  const handleSettings = () => {
    alert("Settings page coming soon! ⚙️")
  }

  const handleSupport = () => {
    alert("Support page coming soon! 🆘")
  }

  const getUserTypeColor = () => {
    switch (userType) {
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
    switch (userType) {
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
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={displayName} />
            <AvatarFallback className={`bg-gradient-to-br ${getUserTypeColor()} text-white font-semibold`}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-white font-medium text-sm">{displayName}</span>
            <span className="text-gray-400 text-xs">{userEmail}</span>
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
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt={displayName} />
              <AvatarFallback className={`bg-gradient-to-br ${getUserTypeColor()} text-white font-bold text-lg`}>
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">{displayName}</h3>
              <p className="text-gray-400 text-sm mb-2">{userEmail}</p>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUserTypeBadge()}`}
              >
                {userType.charAt(0).toUpperCase() + userType.slice(1)}
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
