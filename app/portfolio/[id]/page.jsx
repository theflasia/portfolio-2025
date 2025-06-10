"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import ParallaxHero from "@/components/parallax-hero"
import ScrollReveal from "@/components/scroll-reveal"
import InteractiveCard from "@/components/interactive-card"
import ImageGallery from "@/components/image-gallery"
import ScrollProgress from "@/components/scroll-progress"
import { useTheme } from "next-themes"
import { useLanguage } from "@/i18n"
import ReactPlayer from 'react-player'

// 포트폴리오 데이터 (실제로는 API에서 가져올 수 있습니다)
const portfolioItems = [
  {
    id: 1,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-thumb-kaijyu8.png?height=400&width=762",
    videoUrl: "https://example.com/video1.mp4",
    description: "モバイル・PC向けの新規ゲーム開発におけるUIアニメーション制作内容",
    category: "モバイル・PC",
    details: [
      "『怪獣8号』のモバイル・PCゲーム",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般・ディレクションを担当",
      "外部の制作会社さんとの連携",
      "UI最適化",
    ],
    tools: ["Unity", "Adobe After Effects", "Adobe Photoshop", "Adobe Illustrator", "GitHub", "Visual Studio Code"],
    duration: "3ヶ月~",
    client: "-",
    year: "2025",
  },
  {
    id: 2,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-thumb-tribenine-top.png?height=420&width=762",
    videoUrl: "/movies/tribenine_portfolio_720p.mp4",
    description: "モバイル・PC向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイル・PC",
    details: [
      "アカツキゲームスとトゥーキョーゲームスが共同開発した3DアクションRPG『TRIBE NINE』の開発において、UIアニメーション制作セクションのリードとして、アニメーションの制作およびディレクションを担当しました。",
      "大規模プロジェクトで多岐にわたるセクションと連携を図りながら、長期にわたる開発を経験し、実践的な制作ノウハウとリードとしてのマネジメントスキルを培うことができました。",
    ],
    process: [
      "開発初期からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計とレギュレーション策定",
      "ゲーム内のUIアニメーション制作全般・ディレクションを担当",
      "UIやUIアニメーションの最適化・軽量化",
      "外部の制作会社の開拓と連携",
      "お問い合わせや外部決済サイトのデザイン改修（HTML、CSS、JavaScriptコーディング）",
    ],
    tools: ["Unity", "Adobe After Effects", "Adobe Photoshop", "Adobe Illustrator", "GitHub", "Visual Studio Code"],
    duration: "3ヶ月~",
    client: "-",
    year: "2025",
  },
  {
    id: 3,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-thumb-konmari.png?height=400&width=600",
    videoUrl: "/movies/konmari_portfolio_720p.mp4",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイル",
    details: [
      "KonMariメソッドは、物を「ときめくかどうか（Spark Joy）」で判断して整理し、感謝の気持ちを込めて不要な物を手放すことで、自分の理想の暮らしに近づける片づけ術です。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUI演出設計と制作全般・ディレクションを担当",
      "プロモーションムービー制作",
      "外部の制作会社さんとの連携",
      "UI最適化",
    ],
    tools: ["Unity", "Adobe Photoshop", "Adobe After Effects", "GitHub"],
    duration: "10주",
    client: "테크 스타트업 C사",
    year: "2023",
    gallery: [
      { src: "/images/placeholder.svg?height=600&width=800", alt: "로고 디자인", caption: "로고 디자인" },
      { src: "/images/placeholder.svg?height=600&width=800", alt: "컬러 팔레트", caption: "컬러 팔레트" },
      { src: "/images/placeholder.svg?height=600&width=800", alt: "명함 디자인", caption: "명함 디자인" },
      { src: "/images/placeholder.svg?height=600&width=800", alt: "브랜드 가이드라인", caption: "브랜드 가이드라인" },
    ],
  },
  {
    id: 4,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-thumb-bonbonjourney.png?height=400&width=600",
    videoUrl: "https://example.com/video3.mp4",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイル",
    details: [
      "『ONE PIECE ボン！ボン！ジャーニー!!』は、人気アニメ「ONE PIECE」を題材にしたパズルRPGで、キャラクターが“ボンボン”と呼ばれる可愛いデフォルメ姿で登場し、タップ操作で敵を倒しながら原作の物語を追体験できるスマホゲームです。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUI演出設計と制作全般・ディレクションを担当",
      "プロモーションムービー制作",
      "外部の制作会社さんとの連携",
      "UI最適化",
    ],
    tools: ["Unity", "Adobe Photoshop", "Adobe After Effects", "GitHub"],
    duration: "6주",
    client: "전자제품 제조사 D사",
    year: "2022",
    gallery: [
      { src: "/images/placeholder.svg?height=600&width=800", alt: "스토리보드", caption: "스토리보드" },
      { src: "/images/placeholder.svg?height=600&width=800", alt: "애니메이션 장면 1", caption: "애니메이션 장면 1" },
      { src: "/images/placeholder.svg?height=600&width=800", alt: "애니메이션 장면 2", caption: "애니메이션 장면 2" },
    ],
  },
  // {
  //   id: 5,
  //   title: "インタビュー",
  //   thumbnail: "/images/portfolio-thumb-interview-2.png?height=400&width=600",
  //   url: "https://voice.aktsk.jp/5436/",
  //   videoUrl: "https://example.com/video3.mp4",
  //   description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
  //   category: "モバイル",
  //   details: [
  //     "『ONE PIECE ボン！ボン！ジャーニー!!』は、人気アニメ「ONE PIECE」を題材にしたパズルRPGで、キャラクターが“ボンボン”と呼ばれる可愛いデフォルメ姿で登場し、タップ操作で敵を倒しながら原作の物語を追体験できるスマホゲームです。",
  //   ],
  //   process: [
  //     "開発からプロジェクトに参画",
  //     "ゲーム内のUI演出設計と制作全般・ディレクションを担当",
  //     "プロモーションムービー制作",
  //     "外部の制作会社さんとの連携",
  //     "UI最適化",
  //   ],
  //   tools: ["Unity", "Adobe Photoshop", "Adobe After Effects", "GitHub"],
  //   duration: "14주",
  //   client: "데이터 분석 기업 E사",
  //   year: "2023",
  //   gallery: [
  //     { src: "/images/placeholder.svg?height=600&width=800", alt: "대시보드 메인 화면", caption: "대시보드 메인 화면" },
  //     { src: "/images/placeholder.svg?height=600&width=800", alt: "데이터 시각화 컴포넌트", caption: "데이터 시각화 컴포넌트" },
  //     { src: "/images/placeholder.svg?height=600&width=800", alt: "모바일 대시보드", caption: "모바일 대시보드" },
  //   ],
  // },
  {
    id: 5,
    title: "HoneyWorks Premium Live",
    thumbnail: "/images/portfolio-thumb-honeyworks.png?height=400&width=600",
    videoUrl: "https://example.com/video6.mp4",
    description: "온라인 쇼핑몰 모바일 앱 디자인",
    category: "ゲーム",
    details: [
      "사용자 친화적인 이커머스 모바일 앱 디자인 프로젝트입니다. 상품 탐색, 장바구니, 결제 프로세스 등 쇼핑 경험의 모든 단계를 최적화하여 전환율을 높이는 데 중점을 두었습니다.",
    ],
    process: [
      "경쟁사 분석 및 벤치마킹",
      "사용자 여정 맵 및 플로우 차트 작성",
      "와이어프레임 및 UI 디자인",
      "프로토타입 제작 및 사용성 테스트",
      "디자인 시스템 구축 및 문서화",
    ],
    tools: ["Figma", "Protopie", "Framer", "Hotjar", "Optimizely"],
    duration: "16주",
    client: "패션 리테일 기업 F사",
    year: "2023",
    gallery: [
      { src: "/images/placeholder.svg?height=600&width=800", alt: "앱 메인 화면", caption: "앱 메인 화면" },
      { src: "/images/placeholder.svg?height=600&width=800", alt: "상품 상세 페이지", caption: "상품 상세 페이지" },
      { src: "/images/placeholder.svg?height=600&width=800", alt: "장바구니", caption: "장바구니" },
      { src: "/images/placeholder.svg?height=600&width=800", alt: "결제 프로세스", caption: "결제 프로세스" },
    ],
  },
]

export default function PortfolioDetailPage({ params }) {
  const router = useRouter()
  const [portfolio, setPortfolio] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const { t } = useLanguage()

  useEffect(() => {
    // 포트폴리오 아이템 찾기
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      router.push("/portfolio")
      return
    }
    
    const item = portfolioItems.find((item) => item.id === id)

    if (item) {
      setPortfolio(item)
    } else {
      router.push("/portfolio")
    }

    // 로딩 상태 업데이트
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [params.id, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>
    )
  }

  if (!portfolio) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <ScrollProgress color="var(--color-primary)" />
      <Navbar />

      {/* 히어로 섹션 */}
      <ParallaxHero imageUrl={portfolio.thumbnail} height="30vh" overlayOpacity={0.7}>
        <div className="animate-fade-in-down text-center">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            {portfolio.category}
          </span>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl lg:text-6xl">{portfolio.title}</h1>
          <p className="mt-4 text-xl text-gray-200">{portfolio.description}</p>
        </div>
      </ParallaxHero>

      <main className="container relative mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="animate-fade-in-left">
            <Button
              variant="ghost"
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              onClick={() => router.push("/portfolio")}
            >
              <ArrowLeft className="h-4 w-4" />
              {t("project.viewAll")}
            </Button>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="m-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400">
                  {t("project.overview")}
                </h2>
              </div>
            </div>
          </div>
          <div className="m-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                {portfolio.details.map((detail, index) => (
                  <p className="mt-1 text-gray-700 dark:text-gray-400" key={index}>
                  {detail}
                </p>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-8 m-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="mt-0 prose max-w-none dark:prose-invert">
                <div className="">
                  {portfolio.process.map((step, index) => (
                    <div className="mb-1 flex items-start gap-4" key={index}>
                      <div className="mt-2 flex h-2 w-2 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-sm font-medium text-white dark:from-gray-700 dark:to-gray-500"></div>
                      <div className="pt-0">
                        <p className="font-medium text-gray-900 dark:text-white">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal /*delay={0.1}*/>
          <div className="mb-6 m-4 overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl">
            <div className="aspect-video">
              {/* 비디오 플레이어 */}
              <ReactPlayer
              url = {portfolio.videoUrl}
              muted
              controls
              width = {"100%"}
              height = {"auto"}
            />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal /*delay={0.2}*/>
          <div className="mb-12 m-4 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="prose max-w-none dark:prose-invert">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("project.tools")}</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {portfolio.tools.map((tool, index) => (
                  <InteractiveCard
                    key={index}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-900/30"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-500">
                      <span className="text-lg font-bold text-white">{tool.charAt(0)}</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{tool}</span>
                  </InteractiveCard>
                ))}
              </div>
            </div>
            {/* <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="overview" className="rounded-md">
                  {t("project.detailsTitle")}
                </TabsTrigger>
                <TabsTrigger value="process" className="rounded-md">
                  {t("project.processTitle")}
                </TabsTrigger>
                <TabsTrigger value="tools" className="rounded-md">
                  {t("project.toolsTitle")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <div className="prose max-w-none dark:prose-invert">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("project.details")}</h2>
                  <p className="text-gray-700 dark:text-gray-300">{portfolio.details}</p>
                </div>
              </TabsContent>
              <TabsContent value="process" className="mt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("project.process")}</h2>
                  <div className="mt-6">
                    {portfolio.process.map((step, index) => (
                      <div className="mb-4 flex items-start gap-4" key={index}>
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-sm font-medium text-white dark:from-gray-700 dark:to-gray-500">
                          {index + 1}
                        </div>
                        <div className="pt-1">
                          <p className="text-lg font-medium text-gray-900 dark:text-white">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tools" className="mt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("project.tools")}</h2>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {portfolio.tools.map((tool, index) => (
                      <InteractiveCard
                        key={index}
                        className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-900/30"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-500">
                          <span className="text-lg font-bold text-white">{tool.charAt(0)}</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{tool}</span>
                      </InteractiveCard>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs> */}
          </div>
        </ScrollReveal>

        {/* 갤러리 섹션 */}
        {portfolio.gallery && (
          <ScrollReveal /*delay={0.3}*/>
            <div className="mb-12 m-4">
              <h2 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400">
                {t("project.gallery")}
              </h2>
              <ImageGallery images={portfolio.gallery} />
            </div>
          </ScrollReveal>
        )}

        {portfolio.url && (
          <ScrollReveal /*delay={0.4}*/>
            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => window.open(portfolio.url, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                {t("project.visitWebsite")}
              </Button>
            </div>
          </ScrollReveal>
        )}
      </main>
    </div>
  )
}
