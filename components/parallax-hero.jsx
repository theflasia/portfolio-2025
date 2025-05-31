"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export default function ParallaxHero({
  imageUrl = "/placeholder.svg?height=1080&width=1920",
  title,
  subtitle,
  height = "500px",
  overlayOpacity = 0.5,
  children,
}) {
  const parallaxRef = useRef(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      const scrollPosition = window.scrollY
      parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 다크 모드에서 오버레이 조정
  const adjustedOpacity = isDark ? overlayOpacity + 0.1 : overlayOpacity

  return (
    <div className="relative overflow-hidden" style={{ height }}>
      {/* 패럴랙스 배경 이미지 */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${imageUrl})`,
          height: `calc(${height} + 200px)`,
          top: "-100px",
          filter: isDark ? "brightness(0.85)" : "none",
        }}
      />

      {/* 오버레이 */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500`}
        style={{ opacity: adjustedOpacity }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        {title && (
          <h1
            className={`animate-fade-in-down mb-4 text-4xl font-bold md:text-5xl lg:text-6xl ${isDark ? "text-enhanced" : ""}`}
          >
            {title}
          </h1>
        )}

        {subtitle && (
          <p
            className={`animate-fade-in-down-delay mb-8 max-w-2xl text-lg text-gray-200 md:text-xl ${isDark ? "text-enhanced" : ""}`}
          >
            {subtitle}
          </p>
        )}

        {children && <div className="animate-fade-in-up">{children}</div>}
      </div>
    </div>
  )
}
