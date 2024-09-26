'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import DateNavigator from './DateNavigator';
import Link from "next/link";
import { BarChart, Plus, User, MessageSquare, Send } from "lucide-react";

export default function Dashboard() {
  const [aiQuery, setAiQuery] = useState('');
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchUserData(token);
      fetchHabits(token);
    }
  }, [router]); // Add router to the dependency array

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchHabits = async (token) => {
    try {
      const response = await axios.get('/api/habits', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const handleAddHabit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/habits', { name: newHabit }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHabits([...habits, response.data]);
      setNewHabit('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/habits/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHabits(habits.filter(habit => habit._id !== id));
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const handleAiQuery = (e) => {
    e.preventDefault();
    // Here you would typically send the query to your AI service
    console.log('AI Query:', aiQuery);
    setAiQuery('');
  };

  const openModal = () => {
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setNewHabit(''); // Reset the input field
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <header className="w-full py-4 px-4 lg:px-6 flex items-center justify-between bg-white/10 backdrop-blur-md">
        <Link className="flex items-center justify-center" href="#">
          <BarChart className="h-6 w-6 text-white" />
          <span className="ml-2 text-2xl font-bold text-white">HabitHub</span>
        </Link>
        <nav className="flex items-center gap-4">
          <button className="text-white hover:text-white hover:bg-white/20 p-2 rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome back, {user?.firstName} {user?.lastName}
                </h1>
                <p className="mx-auto max-w-[700px] text-white/90 md:text-xl">
                  You&apos;re on a 7-day streak. Keep up the great work!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white/10 backdrop-blur-lg">
          <div className="container px-4 md:px-6 mx-auto">
            <div className='text-white'>
              <DateNavigator />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your Habits</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {habits.map((habit) => (
                <div key={habit._id} className="bg-white/20 backdrop-blur-lg border-none text-white rounded-lg p-4">
                  <h3 className="text-xl font-semibold mb-2">{habit.name}</h3>
                  <div className="text-2xl font-bold">0/7 days</div>
                  <p className="text-xs text-white/70">Last week</p>
                </div>
              ))}

              <div className="bg-white/20 backdrop-blur-lg border-none text-white rounded-lg p-4 flex flex-col items-center justify-center">
                <button
                  onClick={openModal} // Open the modal on button click
                  className="flex items-center justify-center bg-white/20 text-white py-2 px-4 rounded-md hover:bg-white/30 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Habit
                </button>
                {isModalOpen && (
                  <Modal
                    habits={habits}
                    setHabits={setHabits}
                    newHabit={newHabit}
                    setNewHabit={setNewHabit}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    handleAddHabit={handleAddHabit}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">AI Assistant</h2>
            <div className="bg-white/20 backdrop-blur-lg border-none text-white rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <MessageSquare className="h-6 w-6 mr-2" />
                Ask for Advice
              </h3>
              <p className="mb-4">Need help with your habits? Ask our AI for personalized advice!</p>
              <form onSubmit={handleAiQuery} className="flex gap-2">
                <input 
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="E.g., How can I stick to my meditation habit?" 
                  className="flex-grow bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-md px-3 py-2"
                />
                <button type="submit" className="bg-white text-purple-600 hover:bg-white/90 px-4 py-2 rounded-md flex items-center">
                  <Send className="h-4 w-4 mr-2" />
                  Ask
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10">
        <p className="text-xs text-white/70">© 2023 HabitHub. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-white" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-white" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}


const Modal = ({ isModalOpen, setIsModalOpen, habits, setHabits, newHabit, setNewHabit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setHabits([...habits, newHabit]);
    setNewHabit('');
    setIsModalOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-50 flex justify-center items-center ${
        isModalOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-60">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Habit</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            placeholder="Enter new habit name"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



