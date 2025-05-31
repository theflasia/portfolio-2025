"use client"

import { useState, useEffect } from "react"

export default function ScrollProgress({ color = "#000", height = 4 }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const currentScroll = window.scrollY
      const progress = currentScroll / totalScroll
      setScrollProgress(progress)
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 origin-left transition-opacity duration-300"
      style={{
        transform: `scaleX(${scrollProgress})`,
        height: `${height}px`,
        backgroundColor: color,
        transformOrigin: "0%",
        opacity: isScrolled ? 1 : 0,
      }}
    />
  )
}
