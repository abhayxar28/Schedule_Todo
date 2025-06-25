"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Avatar1 from "./ui/avatar/avatar1"
import Avatar2 from "./ui/avatar/avatar2"
import Avatar3 from "./ui/avatar/avatar3"
import Link from "next/link"
import Skeleton from "./ui/skeleton"

export default function LandingPage() {
  const { status } = useSession()
  const router = useRouter()
    const [, setRedirecting] = useState(false)

    useEffect(() => {
        if (status === "authenticated") {
        setRedirecting(true)
        router.replace("/todos")
        }
    }, [status, router])

    if (status === 'loading') {
    return (
      <Skeleton/>
    )
    }
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#f3f0ff] via-[#f8f4ff] to-[#f4faff] text-gray-900">
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer">TaskVerse</h1>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          <button
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:underline cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:underline cursor-pointer"
          >
            Benefits
          </button>
        </nav>
        <Link href="/signin">
          <button className="px-4 py-2 bg-black text-white text-sm rounded-md cursor-pointer">Get Started</button>
        </Link>
      </header>

      <section className="relative text-center py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-semibold leading-tight mb-4"
          >
            Task Management Reimagined,<br className="hidden md:block" />
            Productivity Amplified
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 text-lg mb-6"
          >
            Plan your present. Schedule your future. Reflect on your past — all in one place.
          </motion.p>

          <Link href="/signin">
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition text-sm cursor-pointer"
            >
              Get started →
            </motion.button>
          </Link>
        </div>

        <div className="relative mt-20 flex justify-center items-center">
          <div className="absolute w-64 h-44 bg-orange-300 rounded-xl scale-90 -translate-x-36 z-0 shadow-md" />
          <div className="absolute w-64 h-44 bg-green-300 rounded-xl scale-90 translate-x-36 z-0 shadow-md" />
          <div className="relative bg-purple-400 text-white w-80 md:w-96 h-52 rounded-2xl shadow-xl p-6 z-10 flex flex-col justify-center items-start gap-3">
            <div className="flex justify-between items-center w-full text-sm font-semibold">
              <span>Todo Community</span>
              <span className="text-xs text-white/70">20K+ users</span>
            </div>
            <p className="text-sm text-white/90">Join the productivity tribe and unleash your task flow.</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-6 h-6 rounded-full bg-white border border-purple-300">
                <Avatar1 />
              </div>
              <div className="w-6 h-6 rounded-full bg-white border border-purple-300 -ml-2">
                <Avatar2 />
              </div>
              <div className="w-6 h-6 rounded-full bg-white border border-purple-300 -ml-2">
                <Avatar3 />
              </div>
              <span className="text-xs text-white/80 ml-2">+ Add yours</span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white rounded-t-3xl px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Features for 🎯 Focused Minds</h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {[
            {
              title: "📅 Schedule Your Future",
              desc: "Plan upcoming tasks and never miss a deadline again with future-oriented todos.",
            },
            {
              title: "✅ Track Today's Goals",
              desc: "Stay on top of the present by managing and completing what matters now.",
            },
            {
              title: "📜 Reflect on the Past",
              desc: "View your completed tasks and evaluate your productivity over time.",
            },
            {
              title: "📊 Progress Insights",
              desc: "Visualize your productivity trends and task completion ratios with ease.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-6 border rounded-xl shadow-sm"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="benefits" className="py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Built for 🧠 thinkers and 🛠️ doers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-purple-600">Efficiency</h4>
            <p className="text-sm text-gray-600">Reduce planning time by 60% using structured todo flows.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-orange-600">Engagement</h4>
            <p className="text-sm text-gray-600">Get reminded at the right moment for the right task.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-green-600">Speed</h4>
            <p className="text-sm text-gray-600">Complete your tasks 2x faster with contextual suggestions.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6 rounded-t-3xl">
        <h3 className="text-3xl font-bold text-center mb-8">What Our Users Are Saying</h3>
        <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-xl shadow-sm text-center">
          <blockquote className="italic text-gray-700">
            “TaskVerse gave me the structure I needed. From scheduling future tasks to reflecting on past wins—it's like therapy for productivity.”
          </blockquote>
          <div className="mt-4 text-sm text-gray-500">— A happy user</div>
        </div>
      </section>
    </div>
  )
}
