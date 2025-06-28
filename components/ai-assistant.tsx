"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, Send, X, Minimize2, Maximize2, Mic, MicOff } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your Attendify AI Assistant. I can help you with attendance tracking, answer questions about the system, or guide you through features. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("attendance") || input.includes("mark")) {
      return "To mark attendance, simply log in to your dashboard and click the 'Mark Attendance' button when your session is active. The system uses AI to detect any anomalies for security."
    }
    if (input.includes("login") || input.includes("sign in")) {
      return "You can log in using your email and password. We have demo accounts available: student@example.com/student123, teacher@example.com/teacher123, or admin@example.com/admin123."
    }
    if (input.includes("features") || input.includes("what can")) {
      return "Attendify offers smart attendance tracking, real-time analytics, AI-powered fraud detection, session management, comprehensive reports, and instant notifications. Would you like to know more about any specific feature?"
    }
    if (input.includes("help") || input.includes("support")) {
      return "I'm here to help! You can ask me about login issues, attendance marking, system features, reports, or any other questions about Attendify. What would you like to know?"
    }
    if (input.includes("admin") || input.includes("teacher")) {
      return "Teachers and admins have additional features like session management, student oversight, attendance reports, and AI anomaly monitoring. Would you like to explore the admin dashboard?"
    }

    return "That's a great question! Attendify is designed to make attendance tracking seamless and secure. You can ask me about login, attendance marking, reports, or any other features. How else can I help you?"
  }

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    // Voice recognition would be implemented here
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000) // Auto-stop after 3 seconds for demo
    }
  }

  return (
    <>
      {/* Floating AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 shadow-2xl transition-all duration-300 transform hover:scale-110 group"
          >
            {/* Main Circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 animate-pulse"></div>

            {/* Outer Glow Ring */}
            <div className="absolute -inset-2 rounded-full border-2 border-cyan-400/30 animate-spin-slow"></div>

            {/* Small Green Indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-bounce"></div>

            {/* Bot Icon */}
            <Bot className="w-8 h-8 text-white relative z-10 group-hover:animate-bounce" />

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping"></div>
          </Button>
        )}

        {/* AI Assistant Chat Window */}
        {isOpen && (
          <Card className="w-80 h-96 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gradient-to-r from-purple-600/20 to-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                  <p className="text-gray-400 text-xs">Online & Ready to Help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setIsMinimized(!isMinimized)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white w-6 h-6 p-0"
                >
                  {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white w-6 h-6 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto max-h-64 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                            : "bg-gray-800/80 text-gray-200 border border-gray-700/50"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800/80 border border-gray-700/50 p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                {/* Input */}
                <div className="p-4 border-t border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Ask me anything about Attendify..."
                        className="bg-gray-800/60 border-gray-600/50 text-white placeholder:text-gray-400 pr-10"
                      />
                      <Button
                        onClick={handleVoiceToggle}
                        variant="ghost"
                        size="sm"
                        className={`absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0 ${
                          isListening ? "text-red-400" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 w-10 h-10 p-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  {isListening && (
                    <div className="mt-2 flex items-center gap-2 text-red-400 text-xs">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      Listening... Speak now
                    </div>
                  )}
                </div>
              </>
            )}
          </Card>
        )}
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </>
  )
}
