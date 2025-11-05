import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeftIcon, MessageCircleIcon, SendIcon, SearchIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export function TeacherMessages() {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [selectedContact, setSelectedContact] = useState(studentId || null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const contacts = [
    { id: '1', name: 'Emma Johnson (Parent)', lastMessage: 'Thank you for the update!', time: '2h ago', unread: 2 },
    { id: '2', name: 'Alex Johnson (Parent)', lastMessage: 'How is Alex doing?', time: '1d ago', unread: 0 },
    { id: '3', name: 'Sarah Wilson (Parent)', lastMessage: 'Can we schedule a meeting?', time: '2d ago', unread: 1 }
  ];

  const messages = [
    { id: 1, sender: 'Emma Johnson', text: 'Hello! How is my daughter doing in class?', time: '2h ago', isSent: false },
    { id: 2, sender: 'You', text: 'Hi! Emma is doing great. She\'s very engaged in all lessons.', time: '1h ago', isSent: true },
    { id: 3, sender: 'Emma Johnson', text: 'Thank you for the update!', time: '30m ago', isSent: false }
  ];

  const handleSend = () => {
    if (message.trim()) {
      alert(`Message sent: ${message}`);
      setMessage('');
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <button
            onClick={() => navigate('/teacher-dashboard')}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-semibold"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
            <div className="flex items-center p-6 border-b border-gray-200">
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-4 mr-4">
                <MessageCircleIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
                <p className="text-gray-600">Communicate with parents and students</p>
              </div>
            </div>

            <div className="flex h-[600px]">
              {/* Contacts List */}
              <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
                <div className="p-4">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2 px-2">
                  {filteredContacts.map(contact => (
                    <button
                      key={contact.id}
                      onClick={() => setSelectedContact(contact.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedContact === contact.id
                          ? 'bg-indigo-100 border-2 border-indigo-500'
                          : 'hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-800">{contact.name}</span>
                        {contact.unread > 0 && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">{contact.time}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedContact ? (
                  <>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] ${msg.isSent ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-2xl p-4`}>
                            {!msg.isSent && <p className="text-sm font-semibold mb-1">{msg.sender}</p>}
                            <p>{msg.text}</p>
                            <p className={`text-xs mt-2 ${msg.isSent ? 'text-indigo-200' : 'text-gray-500'}`}>{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                        />
                        <button
                          onClick={handleSend}
                          className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
                        >
                          <SendIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <MessageCircleIcon className="w-20 h-20 mx-auto mb-4 opacity-50" />
                      <p className="text-xl">Select a contact to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}