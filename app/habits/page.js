"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch user's habits and data from the server
    const fetchData = async () => {
      try {
        // Example:
        // const response = await fetch("/api/habits");
        // const data = await response.json();
        // setHabits(data.habits);
        // setData(data.chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddHabit = async () => {
    if (newHabit.trim() !== "") {
      try {
        // Example:
        // const response = await fetch("/api/habits", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ name: newHabit }),
        // });
        // if (response.ok) {
        //   const newHabitData = await response.json();
        //   setHabits([...habits, newHabitData]);
        //   setNewHabit("");
        // } else {
        //   console.error("Error adding habit");
        // }
      } catch (error) {
        console.error("Error adding habit:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>Your Habits</CardHeader>
        <CardContent>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter a new habit"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              onClick={handleAddHabit}
            >
              Add Habit
            </button>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Your Habits:</h2>
            <ul>
              {habits.map((habit) => (
                <li key={habit.id} className="mb-2">
                  {habit.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Your Progress:</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}