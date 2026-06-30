import React, { useState, useRef, useCallback, useEffect } from "react"
import {
  Paperclip,
  Send,
  Moon,
  Sun,
  X,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Bot,
  User
} from "lucide-react"
import "./ChatBot.css"

const FileUploadChat = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Welcome to NexBot! 👋 How can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState(() => generateUUID())
  const fileInputRef = useRef(null)
  const chatEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Generate UUID for session
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px"
    }
  }, [inputValue])

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop()?.toLowerCase()
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext))
      return <Image size={16} />
    if (["mp4", "avi", "mkv", "mov", "webm"].includes(ext))
      return <Video size={16} />
    if (["mp3", "wav", "flac", "ogg", "aac"].includes(ext))
      return <Music size={16} />
    if (["zip", "rar", "7z", "tar", "gz"].includes(ext))
      return <Archive size={16} />
    return <FileText size={16} />
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFileSelect = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }))
    setUploadedFiles((prev) => [...prev, ...newFiles])

    const fileNames = newFiles.map((f) => f.name).join(", ")
    const systemMessage = {
      id: Date.now(),
      type: "system",
      content: `📎 Added ${newFiles.length} file(s): ${fileNames}`,
      timestamp: new Date()
    }
    setMessages((prev) => [...prev, systemMessage])
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) handleFileSelect(files)
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  // ✅ Send message to NexBot backend
  const sendMessage = async () => {
    const userMessage = inputValue.trim()

    // Validate input
    if (!userMessage && uploadedFiles.length === 0) {
      return
    }

    // Add user message to chat
    const userMsg = {
      id: Date.now(),
      type: "user",
      content: userMessage,
      files: uploadedFiles.length > 0 ? uploadedFiles : null,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue("")
    setUploadedFiles([])
    setIsTyping(true)

    try {
      // ✅ Call NexBot backend API
      const response = await fetch("http://localhost:8080/api/query/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage,  // ✅ camelCase
          sessionId: sessionId    // ✅ camelCase
        })
      })

      const result = await response.json()

      setIsTyping(false)

      // ✅ Extract reply from response structure
      let botReply = "Sorry, I didn't get a proper response. Please try again."

      if (result.success && result.data) {
        botReply = result.data.reply || botReply
      } else if (result.message) {
        botReply = result.message
      }

      // Add bot response to chat
      const botMsg = {
        id: Date.now() + 1,
        type: "ai",
        content: botReply,
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      setIsTyping(false)

      const errorMsg = {
        id: Date.now() + 1,
        type: "ai",
        content: "Sorry, the assistant is currently unavailable. Please try again later.",
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, errorMsg])
      console.error("❌ Chat error:", err)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()  // ✅ Call sendMessage properly
    }
  }

  return (
    <div className={`ChatBot${isDarkMode ? "" : " ChatBot-light"}`}>
      {/* Hidden native file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileSelect(e.target.files)}
        multiple
        style={{ display: "none" }}
      />

      <div className="ChatBot-shell">
        {/* ── Files-ready panel (only when files are queued) ── */}
        {uploadedFiles.length > 0 && (
          <div className="ChatBot-files-panel">
            <div className="ChatBot-files-header">
              <h4 className="ChatBot-files-title">
                Files ready to send ({uploadedFiles.length})
              </h4>
              <button
                className="ChatBot-clear-btn"
                onClick={() => setUploadedFiles([])}
              >
                Clear all
              </button>
            </div>

            <div className="ChatBot-files-grid">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="ChatBot-file-chip">
                  <span className="ChatBot-file-icon">
                    {getFileIcon(file.name)}
                  </span>
                  <div className="ChatBot-file-meta">
                    <p className="ChatBot-file-name">{file.name}</p>
                    <p className="ChatBot-file-size">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    className="ChatBot-file-remove"
                    onClick={() => removeFile(file.id)}
                    title="Remove file"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Main chat card ── */}
        <div
          className="ChatBot-main"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {/* Header */}
          <div className="ChatBot-header">
            <div className="ChatBot-header-left">
              <span className="ChatBot-status-dot" />
              <h3 className="ChatBot-header-title">Resolve Your Query With NexBot</h3>
              <span className="ChatBot-header-status">Online</span>
            </div>

            {/* Theme toggle */}
            <button
              className="ChatBot-toggle"
              onClick={() => setIsDarkMode((prev) => !prev)}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Messages */}
          <div className="ChatBot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`ChatBot-row ${message.type}`}
              >
                {/* AI avatar (left side) */}
                {message.type === "ai" && (
                  <div className="ChatBot-avatar">
                    <Bot size={18} />
                  </div>
                )}

                {/* Bubble */}
                <div className={`ChatBot-bubble ${message.type}`}>
                  {message.content && (
                    <p className="ChatBot-message-text">{message.content}</p>
                  )}

                  {message.files && message.files.length > 0 && (
                    <div className="ChatBot-message-files">
                      {message.files.map((file) => (
                        <div key={file.id} className="ChatBot-message-file">
                          {getFileIcon(file.name)}
                          <span className="ChatBot-message-file-name">
                            {file.name}
                          </span>
                          <span className="ChatBot-message-file-size">
                            ({formatFileSize(file.size)})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="ChatBot-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>

                {/* User avatar (right side) */}
                {message.type === "user" && (
                  <div className="ChatBot-avatar user">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="ChatBot-row ai">
                <div className="ChatBot-avatar">
                  <Bot size={18} />
                </div>
                <div className="ChatBot-bubble ai">
                  <div className="ChatBot-typing">
                    <span className="ChatBot-typing-dot" />
                    <span className="ChatBot-typing-dot" />
                    <span className="ChatBot-typing-dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="ChatBot-input-area">
            <div className="ChatBot-input-row">
              {/* Paperclip / attach button */}
              <button
                className="ChatBot-icon-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Attach files"
              >
                <Paperclip size={20} />
              </button>

              {/* Textarea wrapper */}
              <div className="ChatBot-input-wrap">
                <textarea
                  ref={textareaRef}
                  className="ChatBot-textarea"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                />
                {inputValue.length > 0 && (
                  <span className="ChatBot-charcount">{inputValue.length}</span>
                )}
              </div>

              {/* Send button */}
              <button
                className="ChatBot-send-btn"
                onClick={sendMessage}
                disabled={!inputValue.trim() && uploadedFiles.length === 0}
                title="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUploadChat