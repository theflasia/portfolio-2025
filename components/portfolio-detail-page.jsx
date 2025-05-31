'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { portfolioItems } from '@/data/portfolioItems'
import {
  ScrollProgress,
  Navbar,
  ParallaxHero,
  ScrollReveal,
  ImageGallery,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  InteractiveCard
} from '@/components' // 컴포넌트 경로는 프로젝트에 맞게 수정

import { ArrowLeft, ExternalLink, Play } from 'lucide-react'

export default function PortfolioDetailPageClient({ id }) {
  const router = useRouter()
  const [portfolio, setPortfolio] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const parsedId = parseInt(id, 10)
    if (isNaN(parsedId)) {
      router.push('/portfolio')
      return
    }

    const item = portfolioItems.find((item) => item.id === parsedId)
    if (item) {
      setPortfolio(item)
    } else {
      router.push('/portfolio')
    }

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [id, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>
    )
  }

  if (!portfolio) return null

  // 🔽 여기에 렌더링 로직 그대로 복붙하시면 됩니다
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* 이하 생략 – 기존 렌더링 JSX */}
    </div>
  )
}