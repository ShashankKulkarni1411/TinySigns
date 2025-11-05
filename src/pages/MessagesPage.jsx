import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  MessageCircleIcon,
  SendIcon,
  UserIcon,
  ClockIcon,
  SearchIcon
} from 'lucide-react';

export function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    // Generate floating emoji
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: ['💬', '✉️', '📱', '💌', '✨', '📧', '💫', '🗨️', '📬', '🎯', '⭐', '💝'][i],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 25 + Math.random() * 15,
      delay: Math.random() * 10,
      scale: 0.4 + Math.random() * 0.4
    }));
    setFloatingElements(elements);

    // Mock conversations
    const mockConversations = [
      {
        id: 1,
        teacherName: 'Ms. Sarah Williams',
        subject: 'Mathematics',
        avatar: 'SW',
        lastMessage: 'Emma is doing great with addition!',
        time: '2 hours ago',
        unread: 2,
        messages: [
          { id: 1, sender: 'teacher', text: 'Hello! Just wanted to update you on Emma\'s progress.', time: '3 hours ago' },
          { id: 2, sender: 'teacher', text: 'Emma is doing great with addition!', time: '2 hours ago' },
          { id: 3, sender: 'parent', text: 'That\'s wonderful to hear! Thank you for the update.', time: '2 hours ago' }
        ]
      },
      {
        id: 2,
        teacherName: 'Mr. John Davis',
        subject: 'ISL',
        avatar: 'JD',
        lastMessage: 'Great progress on sign language lessons',
        time: '1 day ago',
        unread: 0,
        messages: [
          { id: 1, sender: 'teacher', text: 'Both Emma and Alex are excelling in ISL!', time: '1 day ago' },
          { id: 2, sender: 'teacher', text: 'Great progress on sign language lessons', time: '1 day ago' },
          { id: 3, sender: 'parent', text: 'Thank you! They practice at home too.', time: '1 day ago' }
        ]
      },
      {
        id: 3,
        teacherName: 'Dr. Emily Chen',
        subject: 'Science',
        avatar: 'EC',
        lastMessage: 'Alex showed excellent understanding of the water cycle',
        time: '3 days ago',
        unread: 0,
        messages: [
          { id: 1, sender: 'teacher', text: 'Alex showed excellent understanding of the water cycle', time: '3 days ago' },
          { id: 2, sender: 'parent', text: 'That\'s great! He was very excited about that lesson.', time: '3 days ago' }
        ]
      }
    ];

    setConversations(mockConversations);
    setSelectedConversation(mockConversations[0]);
  }, []);

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      const newMessage = {
        id: selectedConversation.messages.length + 1,
        sender: 'parent',
        text: messageText,
        time: 'Just now'
      };

      const updatedConversations = conversations.map(conv => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: messageText,
            time: 'Just now'
          };
        }
        return conv;
      });

      setConversations(updatedConversations);
      setSelectedConversation({
        ...selectedConversation,
        messages: [...selectedConversation.messages, newMessage]
      });
      setMessageText('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white relative overflow-hidden">
      {/* Floating emoji background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute text-4xl opacity-15"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              fontSize: `${el.scale * 2.5}rem`
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {el.emoji}
          </motion.div>
        ))}
      </div>

      {/* Animated gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <Header />

      <main className="flex-grow relative z-10 p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <Link
            to="/parent-dashboard"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold px-6 py-3 rounded-full mb-6 transition-all border-2 border-white/30"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Dashboard
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 mb-8 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-2xl shadow-xl">
                <MessageCircleIcon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Messages 💬
                </h1>
                <p className="text-xl text-white/90 font-medium">
                  Chat with your children's teachers
                </p>
              </div>
            </div>
          </motion.div>

          {/* Messages Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl overflow-hidden shadow-2xl"
            style={{ height: '600px' }}
          >
            <div className="flex h-full">
              {/* Conversations List */}
              <div className="w-1/3 border-r border-white/20 flex flex-col">
                {/* Search */}
                <div className="p-4 border-b border-white/20">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                    />
                  </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-4 border-b border-white/10 cursor-pointer transition-all ${
                        selectedConversation?.id === conv.id
                          ? 'bg-white/20'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg flex-shrink-0">
                          <span className="font-black text-sm">{conv.avatar}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-black truncate">{conv.teacherName}</h3>
                            {conv.unread > 0 && (
                              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-xs font-black px-2 py-1 rounded-full">
                                {conv.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white/70 font-medium mb-1">{conv.subject}</p>
                          <p className="text-sm text-white/80 truncate font-medium">{conv.lastMessage}</p>
                          <p className="text-xs text-white/60 mt-1 font-medium">🕐 {conv.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-white/20 bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                          <span className="font-black text-sm">{selectedConversation.avatar}</span>
                        </div>
                        <div>
                          <h3 className="font-black text-lg">{selectedConversation.teacherName}</h3>
                          <p className="text-sm text-white/70 font-medium">{selectedConversation.subject} Teacher</p>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {selectedConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs md:max-w-md rounded-2xl p-4 ${
                              message.sender === 'parent'
                                ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                                : 'bg-white/20 backdrop-blur-md'
                            }`}
                          >
                            <p className="font-medium mb-1">{message.text}</p>
                            <p className="text-xs text-white/70 font-medium flex items-center gap-1">
                              <ClockIcon className="w-3 h-3" />
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-white/20 bg-white/5">
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type your message..."
                          className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-gray-900 font-black p-3 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <SendIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageCircleIcon className="w-16 h-16 mx-auto mb-4 text-white/40" />
                      <p className="text-white/60 font-medium">Select a conversation to start chatting</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}