"use client"

import { useState } from "react"
import Image from "next/image"

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = "blur",
  blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTjwAAAABJRU5ErkJggg==",
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  // 이미지 로드 상태 추적
  const handleLoad = () => {
    setIsLoaded(true)
  }

  // 이미지 로드 오류 처리
  const handleError = () => {
    setError(true)
    console.error(`Failed to load image: ${src}`)
  }

  // 실제 이미지 소스 또는 플레이스홀더
  const imageSrc = error ? "/placeholder.svg" : src

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: width / height }}>
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        {...props}
      />

      {/* 로딩 인디케이터 */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-gray-100"></div>
        </div>
      )}

      {/* 오류 표시 */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-sm">이미지를 불러올 수 없습니다</span>
        </div>
      )}
    </div>
  )
}
