"use client"

import { useState, useEffect } from "react"

export default function MouseParallax({ children, depth = 20 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [movement, setMovement] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // 윈도우 크기 초기화 및 업데이트
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // 마우스 움직임 추적
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    // 초기 설정
    handleResize()

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    // 클린업
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // 마우스 위치에 따른 이동 계산 (-1 ~ 1 범위)
  useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return

    const x = (mousePosition.x / windowSize.width - 0.5) * depth
    const y = (mousePosition.y / windowSize.height - 0.5) * depth

    setMovement({ x, y })
  }, [mousePosition, windowSize, depth])

  return (
    <div
      style={{
        transform: `translate(${movement.x}px, ${movement.y}px)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {children}
    </div>
  )
}
