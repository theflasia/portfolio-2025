"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }) {
  const [themeTransition, setThemeTransition] = useState(false)

  // 테마 변경 시 전환 효과를 위한 클래스 추가
  useEffect(() => {
    const handleThemeChange = () => {
      setThemeTransition(true)
      setTimeout(() => setThemeTransition(false), 400)
    }

    window.addEventListener("themechange", handleThemeChange)
    return () => window.removeEventListener("themechange", handleThemeChange)
  }, [])

  return (
    <NextThemesProvider {...props}>
      <div className={themeTransition ? "theme-transitioning" : ""}>{children}</div>
    </NextThemesProvider>
  )
}
