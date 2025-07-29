"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageCircleQuestion } from "lucide-react"

export default function SupportPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setTimeout(() => {
      console.log("Support message sent:", formData)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSending(false)
      alert("Your message has been sent! We'll get back to you soon.")
    }, 1500)
  }

  const faqs = [
    {
      question: "How do I mark attendance?",
      answer:
        "You can mark attendance from your dashboard by clicking the 'Mark Attendance' button. Ensure you are within the designated time window.",
    },
    {
      question: "Where can I view my attendance reports?",
      answer:
        "Attendance reports are available on the 'Reports' page, accessible from your dashboard. You can filter by date and view detailed statistics.",
    },
    {
      question: "I forgot my password, what should I do?",
      answer:
        "Please go to the login page and click on 'Forgot Password'. Follow the instructions to reset your password.",
    },
    {
      question: "How do I update my profile information?",
      answer:
        "You can update your profile details, including your photo, on the 'Profile' page, which is accessible from the user menu in the top right corner.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => router.back()} variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-white">Support</h1>
          <div className="w-16"></div> {/* Spacer */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm shadow-lg">
            <CardHeader className="border-b border-gray-700/50 p-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Send className="w-5 h-5" /> Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 rounded-xl min-h-[120px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl text-lg h-12 shadow-lg disabled:opacity-50"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & FAQ */}
          <div className="space-y-8">
            <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm shadow-lg">
              <CardHeader className="border-b border-gray-700/50 p-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <MessageCircleQuestion className="w-5 h-5" /> Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-gray-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span>support@attendify.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                  <span>123 Attendance Lane, Schoolville, ST 98765</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm shadow-lg">
              <CardHeader className="border-b border-gray-700/50 p-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <MessageCircleQuestion className="w-5 h-5" /> Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-semibold text-white">{faq.question}</h3>
                    <p className="text-gray-300 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
