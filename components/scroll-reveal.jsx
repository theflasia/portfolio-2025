"use client"

import { useRef, useEffect, useState } from "react"

export default function ScrollReveal({
  children,
  threshold = 0.1,
  direction = "up", // up, down, left, right
  delay = 0,
  duration = 0.5,
  distance = 50,
  once = true,
  className = "",
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, once])

  // 방향에 따른 클래스 설정
  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0"

    switch (direction) {
      case "up":
        return "animate-fade-in-up"
      case "down":
        return "animate-fade-in-down"
      case "left":
        return "animate-fade-in-left"
      case "right":
        return "animate-fade-in-right"
      default:
        return "animate-fade-in-up"
    }
  }

  const getStyle = () => {
    const delayStyle = delay ? { animationDelay: `${delay}s` } : {}
    const durationStyle = { animationDuration: `${duration}s` }

    return {
      ...delayStyle,
      ...durationStyle,
    }
  }

  return (
    <div ref={ref} className={className}>
      <div className={`${getAnimationClass()} ${isVisible ? "opacity-100" : "opacity-0"}`} style={getStyle()}>
        {children}
      </div>
    </div>
  )
}
