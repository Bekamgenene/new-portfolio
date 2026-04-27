"use client"

import { useRef, useState } from "react"
import { motion, useMotionTemplate, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  glareColor?: string
}

export function TiltCard({ children, className, glareColor = "cyan" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  const x = useSpring(0, { stiffness: 500, damping: 50 })
  const y = useSpring(0, { stiffness: 500, damping: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const rotateX = ((mouseY - height / 2) / height) * -20
    const rotateY = ((mouseX - width / 2) / width) * 20
    x.set(rotateX)
    y.set(rotateY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovering(false)
  }

  const glareX = useMotionTemplate`${x}deg`
  const glareY = useMotionTemplate`${y}deg`

  const glareColors: Record<string, string> = {
    cyan: "rgba(34, 211, 238, 0.15)",
    purple: "rgba(168, 85, 247, 0.15)",
    pink: "rgba(236, 72, 153, 0.15)",
    blue: "rgba(59, 130, 246, 0.15)",
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: x,
        rotateY: y,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-2xl transition-shadow duration-300",
        hovering && "shadow-2xl shadow-cyan-500/20",
        className
      )}
    >
      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glareColors[glareColor] || glareColors.cyan}, transparent 50%)`,
          opacity: hovering ? 1 : 0,
        }}
      />
      
      {/* Border gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 p-[1px]">
        <div className="h-full w-full rounded-2xl bg-card/90 backdrop-blur-xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  )
}
