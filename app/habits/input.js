"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Camera, GitCommit } from "lucide-react";

export default function HabitsInputPage() {
  const [habits, setHabits] = useState([]);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch user's habits from the server
    const fetchHabits = async () => {
      try {
        // Example:
        // const response = await fetch("/api/habits");
        // const data = await response.json();
        // setHabits(data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };
    fetchHabits();
  }, []);

  const handleHabitSelect = (habit) => {
    if (selectedHabits.includes(habit)) {
      setSelectedHabits(selectedHabits.filter((h) => h !== habit));
    } else {
      setSelectedHabits([...selectedHabits, habit]);
    }
  };

  const handleSubmit = async () => {
    try {
      // Example:
      // const response = await fetch("/api/habits/input", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ habits: selectedHabits }),
      // });
      // if (response.ok) {
      //   const data = await response.json();
      //   setMessage(data.message);
      // } else {
      //   setMessage("Error submitting habits");
      // }
    } catch (error) {
      setMessage("Error submitting habits");
      console.error("Error submitting habits:", error);
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>Input your daily habits</CardHeader>
        <CardContent>
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Select your habits for today:</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className={`p-4 rounded-lg cursor-pointer ${
                    selectedHabits.includes(habit) ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleHabitSelect(habit)}
                >
                  <div className="flex items-center">
                    {selectedHabits.includes(habit) ? (
                      <GitCommit className="mr-2" />
                    ) : (
                      <Camera className="mr-2" />
                    )}
                    <span>{habit.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {message && (
            <div className="mt-4 text-center text-green-500 font-bold">{message}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}