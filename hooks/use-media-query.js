"use client"

import { useState, useEffect } from "react"

// 미디어 쿼리 훅
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // 초기 상태 설정
    setMatches(media.matches)

    // 리스너 설정
    const listener = (e) => {
      setMatches(e.matches)
    }

    // 미디어 쿼리 변경 감지
    media.addEventListener("change", listener)

    // 클린업
    return () => {
      media.removeEventListener("change", listener)
    }
  }, [query])

  return matches
}

// 일반적인 브레이크포인트 훅
export function useBreakpoint() {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")
  const isDesktop = useMediaQuery("(min-width: 1025px)")

  return { isMobile, isTablet, isDesktop }
}

// 방향 감지 훅
export function useOrientation() {
  const isPortrait = useMediaQuery("(orientation: portrait)")
  const isLandscape = useMediaQuery("(orientation: landscape)")

  return { isPortrait, isLandscape }
}

// 다크 모드 감지 훅
export function usePrefersDarkMode() {
  return useMediaQuery("(prefers-color-scheme: dark)")
}

// 감소된 모션 선호 감지 훅
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)")
}
