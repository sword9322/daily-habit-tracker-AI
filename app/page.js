import Link from 'next/link'
import { ArrowRight, Check, BarChart, Zap, Trophy } from 'lucide-react'



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <header className="w-full py-4 px-4 lg:px-6 flex items-center justify-between bg-white/10 backdrop-blur-md">
        <Link className="flex items-center justify-center" href="#">
          <BarChart className="h-6 w-6 text-white" />
          <span className="ml-2 text-2xl font-bold text-white">HabitHub</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-white hover:text-white/80">
            Log in
          </Link>
          <Link href="/signup" className="bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-white/90 transition-colors">
            Sign up
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Build Better Habits, <br />Achieve Your Goals
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl">
          HabitHub helps you create and maintain positive habits, track your progress, and reach your full potential.
        </p>
        <Link 
          href="/signup" 
          className="bg-white text-purple-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-white/90 transition-colors inline-flex items-center"
        >
          Get Started for Free
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>

        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl">
          {[
            { icon: Check, title: "Track Daily Habits", description: "Log and monitor your daily habits with ease" },
            { icon: Zap, title: "Stay Motivated", description: "Get personalized insights and encouragement" },
            { icon: Trophy, title: "Achieve Goals", description: "Turn small habits into big accomplishments" }
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg p-6 rounded-lg">
              <feature.icon className="h-12 w-12 text-white mb-4 mx-auto" />
              <h2 className="text-xl font-semibold text-white mb-2">{feature.title}</h2>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full py-6 px-4 bg-white/10 backdrop-blur-md mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">© 2023 HabitHub. All rights reserved.</p>
          <nav className="flex gap-6">
            <Link href="#" className="text-white/70 hover:text-white text-sm">About</Link>
            <Link href="#" className="text-white/70 hover:text-white text-sm">Privacy</Link>
            <Link href="#" className="text-white/70 hover:text-white text-sm">Terms</Link>
            <Link href="#" className="text-white/70 hover:text-white text-sm">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}