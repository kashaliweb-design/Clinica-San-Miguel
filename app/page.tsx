'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, X, MessageCircle } from 'lucide-react'
import Fuse from 'fuse.js'

interface QA {
  id: number
  question: string
  answer: string
  category: string
  keywords: string[]
}

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [qaData, setQaData] = useState<QA[]>([])
  const [fuse, setFuse] = useState<Fuse<QA> | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Q&A database
    fetch('/api/qa')
      .then(res => res.json())
      .then(data => {
        setQaData(data)
        
        // Initialize Fuse.js for fuzzy search
        const fuseInstance = new Fuse<QA>(data, {
          keys: ['question', 'keywords', 'answer'],
          threshold: 0.4,
          includeScore: true,
          minMatchCharLength: 2,
        })
        setFuse(fuseInstance as Fuse<QA>)
      })
      .catch(err => console.error('Error loading Q&A data:', err))

    // Add welcome message
    setMessages([{
      id: 1,
      text: "¡Hola! Welcome to Clinica San Miguel! 👋\n\nI'm here to help you with information about our services, pricing, locations, and more. We offer affordable healthcare starting at just $19!\n\nHow can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const findBestAnswer = (query: string): string => {
    if (!fuse || !query.trim()) {
      return "I'm sorry, I didn't understand that. Could you please rephrase your question?"
    }

    const results = fuse.search(query)
    
    if (results.length > 0 && results[0].score! < 0.5) {
      return results[0].item.answer
    }

    // Check for keywords in query
    const lowerQuery = query.toLowerCase()
    
    // Pricing keywords
    if (lowerQuery.includes('cost') || lowerQuery.includes('price') || lowerQuery.includes('$') || lowerQuery.includes('pay')) {
      return "Our visits cost just $19! This affordable price makes quality healthcare accessible to everyone, with no insurance required."
    }
    
    // Location keywords
    if (lowerQuery.includes('location') || lowerQuery.includes('where') || lowerQuery.includes('address') || lowerQuery.includes('find')) {
      return "We have 17 locations across Texas, including Dallas, Houston, and San Antonio. Visit our website at new.clinicsanmiguel.com to find the nearest clinic to you!"
    }
    
    // Appointment keywords
    if (lowerQuery.includes('appointment') || lowerQuery.includes('walk-in') || lowerQuery.includes('schedule')) {
      return "No appointment needed! We offer walk-in care, so you can visit us whenever it's convenient for you. Just come in and we'll take care of you!"
    }
    
    // Insurance keywords
    if (lowerQuery.includes('insurance') || lowerQuery.includes('medicaid') || lowerQuery.includes('medicare')) {
      return "You don't need insurance to visit Clinica San Miguel! Our $19 visits make quality healthcare accessible to everyone, regardless of insurance status."
    }
    
    // Hours keywords
    if (lowerQuery.includes('hour') || lowerQuery.includes('open') || lowerQuery.includes('close') || lowerQuery.includes('time')) {
      return "Clinic hours vary by location. Please contact your nearest Clinica San Miguel location for specific hours of operation. We're here to serve you!"
    }
    
    // Services keywords
    if (lowerQuery.includes('service') || lowerQuery.includes('offer') || lowerQuery.includes('provide') || lowerQuery.includes('treat')) {
      return "We offer comprehensive healthcare services including general check-ups, screenings, vaccinations, lab tests, and treatment for various conditions. All starting at just $19! What specific service are you interested in?"
    }
    
    // Spanish/bilingual keywords
    if (lowerQuery.includes('spanish') || lowerQuery.includes('español') || lowerQuery.includes('bilingual') || lowerQuery.includes('language')) {
      return "¡Sí! Our bilingual team welcomes you like family and can assist you in both English and Spanish. We're here to help!"
    }

    return "I'd be happy to help you with that! For specific information, please:\n\n• Visit our website: new.clinicsanmiguel.com\n• Contact your nearest location\n• Ask me about our services, pricing, locations, or appointments\n\nRemember, our visits are just $19 and no insurance is required!"
  }

  const handleSend = () => {
    if (!input.trim()) return

    setIsLoading(true)
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate typing delay
    setTimeout(() => {
      const answer = findBestAnswer(input)
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: answer,
        isBot: true,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickQuestions = [
    "What is the cost of a visit?",
    "Do I need insurance?",
    "Where are you located?",
    "Do I need an appointment?",
    "What services do you offer?",
    "Do you speak Spanish?"
  ]

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 z-50"
          aria-label="Open chat"
        >
          <MessageCircle size={32} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-slideUp" style={{ height: '600px' }}>
          {/* Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-2">
                <Bot size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Clinica San Miguel</h1>
                <p className="text-xs opacity-90">Healthcare Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {message.isBot && (
                  <div className="bg-primary rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl p-3 ${
                    message.isBot
                      ? 'bg-white text-black border border-gray-200'
                      : 'bg-primary text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {!message.isBot && (
                  <div className="bg-black rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="bg-primary rounded-full p-2 h-8 w-8 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white rounded-2xl p-3 border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="p-4 bg-white border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-600 mb-2">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-gray-100 hover:bg-primary hover:text-white text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-primary text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white rounded-full p-2 transition-colors flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by Clinica San Miguel • 17 Texas Locations
            </p>
          </div>
        </div>
      )}

      {/* Landing Page */}
      {!isOpen && (
        <div className="text-center max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Bot size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              Clinica San Miguel Chatbot
            </h1>
            <p className="text-gray-600 mb-6">
              Get instant answers about our services, pricing, and locations
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-primary mb-1">💰 Affordable Care</h3>
                <p className="text-sm text-gray-600">Just $19 per visit</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-primary mb-1">📍 17 Locations</h3>
                <p className="text-sm text-gray-600">Across Texas</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-primary mb-1">🚶 Walk-In Care</h3>
                <p className="text-sm text-gray-600">No appointment needed</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-primary mb-1">🌎 Bilingual Staff</h3>
                <p className="text-sm text-gray-600">English & Spanish</p>
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            Click the chat button to start asking questions! 💬
          </p>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
