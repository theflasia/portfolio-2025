"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect는 클라이언트 사이드에서만 실행됩니다
  useEffect(() => {
    setMounted(true)
  }, [])

  // 마운트되기 전에는 테마 관련 UI를 렌더링하지 않습니다
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <span className="sr-only">테마 전환</span>
        <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="테마 전환"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">테마 전환</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-scale-in">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex cursor-pointer items-center gap-2">
          <Sun className="h-4 w-4" />
          <span>라이트 모드</span>
          {theme === "light" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-500"></span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex cursor-pointer items-center gap-2">
          <Moon className="h-4 w-4" />
          <span>다크 모드</span>
          {theme === "dark" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-500"></span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex cursor-pointer items-center gap-2">
          <Monitor className="h-4 w-4" />
          <span>시스템 설정</span>
          {theme === "system" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-500"></span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
