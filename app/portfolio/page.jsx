"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Play, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import ParallaxHero from "@/components/parallax-hero"
import InteractiveCard from "@/components/interactive-card"
import ScrollProgress from "@/components/scroll-progress"
import MouseParallax from "@/components/mouse-parallax"
import { useTheme } from "next-themes"
import { useLanguage } from "@/i18n"
import { motion } from "framer-motion"
import { PageTransition, Stagger, StaggerItem, ScrollRevealMotion } from "@/components/animations"
import OptimizedImage from "@/components/optimized-image"
import { useBreakpoint } from "@/hooks/use-media-query"

// 포트폴리오 데이터 (실제로는 API에서 가져올 수 있습니다)
const portfolioItems = [
  {
    id: "1",
    title: "新規プロジェクト",
    category: "ゲーム",
    thumbnail: "/images/portfolio-thumb-kaijyu8.png?height=400&width=762",
    description: "新規開発プロジェクトでUIアニメーションのセクションリードとして制作を担当しています。",
  },
  {
    id: "2",
    title: "TRIBE NINE",
    category: "ゲーム",
    thumbnail: "/images/portfolio-thumb-tribenine.png?height=400&width=762",
    description: "「TRIBE NINE」でUIアニメーションのセクションリードとして制作を担当しました。",
  },
  {
    id: "3",
    title: "KonMari Spark Joy!",
    category: "ゲーム",
    thumbnail: "/images/portfolio-thumb-konmari.png?height=400&width=600",
    description: "「KonMari Spark Joy!」でUIアニメーションの制作を担当しました。",
  },
  {
    id: "4",
    title: "HoneyWorks Premium Live",
    category: "ゲーム",
    thumbnail: "/images/portfolio-thumb-honeyworks.png?height=400&width=600",
    description: "「HoneyWorks Premium Live」でUIアニメーションの制作を担当しました。",
  },
  {
    id: "5",
    title: "ONE PIECE ボン！ボン！ジャーニー!!",
    category: "ゲーム",
    thumbnail: "/images/portfolio-thumb-bonbonjourney.png?height=400&width=600",
    description: "「ONE PIECE ボン！ボン！ジャーニー!!」でUIアニメーションの制作を担当しました。",
  },
  {
    id: "6",
    title: "アイドルマスター SideM LIVE ON ST@GE!",
    category: "ゲーム",
    thumbnail: "/images/portfolio-thumb-idolmastersidem.png?height=400&width=600",
    description: "「アイドルマスター SideM LIVE ON ST@GE!」でUIアニメーションの制作を担当しました。",
  },
  {
    id: "7",
    title: "サモンソウルバトル",
    category: "ゲーム",
    thumbnail: "/images/portfolio-thumb-summonsoulbattle.png?height=424&width=600",
    description: "「サモンソウルバトル」でUIアニメーションの制作を担当しました。",
  },
  {
    id: "8",
    title: "Wake Up, Girls! ステージの天使",
    category: "ゲーム",
    thumbnail: "/images/portfolio-thumb-wakeupgirls.png?height=375&width=600",
    description: "「Wake Up, Girls! ステージの天使」でゲーム内の演出制作を担当しました。",
  },
  {
    id: "9",
    title: "SKYLOCK(スカイロック)",
    category: "ゲーム",
    thumbnail: "/images/portfolio-thumb-skylock.png?height=280&width=600",
    description: "「ONE PIECE ボン！ボン！ジャーニー!!」でUIアニメーションの制作を担当しました。",
  },
]

export default function PortfolioPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("全て")
  const [filteredItems, setFilteredItems] = useState(portfolioItems)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const { t } = useLanguage()
  const { isMobile, isTablet } = useBreakpoint()

  useEffect(() => {
    if (selectedCategory === "全て" || selectedCategory === t("portfolio.categories.all")) {
      setFilteredItems(portfolioItems)
    } else {
      setFilteredItems(portfolioItems.filter((item) => item.category === selectedCategory))
    }
  }, [selectedCategory, t])

  // 카테고리 목록
  const categories = [
    t("portfolio.categories.all"),
    t("portfolio.categories.game"),
    t("portfolio.categories.web"),
    // t("portfolio.categories.interview"),
  ]

  // 애니메이션 변수
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <PageTransition>
      <div
        className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-gradient-dark" : "bg-gradient-light"}`}
      >
        <ScrollProgress color={isDark ? "hsl(var(--primary-color))" : "hsl(var(--primary-color))"} />
        <Navbar />

        {/* 히어로 섹션 */}
        <ParallaxHero
          imageUrl="/images/page-top-bg.png?height=630&width=1200"
          title={t("portfolio.title")}
          subtitle={t("portfolio.subtitle")}
          height="30vh"
          overlayOpacity={0.7}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className={`rounded-full px-6 py-2 text-white ${
                isDark
                  ? "bg-gradient-primary hover:shadow-lg hover:shadow-primary-color/20"
                  : "bg-gradient-primary hover:shadow-lg hover:shadow-primary-color/20"
              }`}
              onClick={() => {
                const portfolioSection = document.getElementById("portfolio-section")
                if (portfolioSection) {
                  portfolioSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              {t("portfolio.viewWorks")}
            </Button>
          </motion.div>
        </ParallaxHero>

        <main className="container relative mx-auto px-4 py-12">
          <div id="portfolio-section">
            <ScrollRevealMotion>
              <div className="mb-12 text-center">
                {/* <h2
                  className={`title-responsive font-bold tracking-tight ${
                    isDark
                      ? "bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                  }`}
                >
                  {t("portfolio.worksCollection")}
                </h2> */}
                <p className={`mt-4 text-responsive ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {t("portfolio.description")}
                </p>
              </div>
            </ScrollRevealMotion>

            {/* 카테고리 필터 */}
            <ScrollRevealMotion delay={0.2}>
              <div className="mb-10 flex flex-wrap justify-center gap-2">
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Button
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        selectedCategory === category
                          ? isDark
                            ? "bg-gradient-primary text-white"
                            : "bg-gradient-primary text-white"
                          : isDark
                            ? "border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                            : "border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </ScrollRevealMotion>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredItems.map((item, index) => (
                <motion.div key={item.id} variants={itemVariants} className="hover-lift">
                  <InteractiveCard
                    className={`shadow-lg transition-all duration-300 ${isDark ? "bg-card" : "bg-white"}`}
                    backgroundImage={item.thumbnail}
                    backgroundOpacity={0.05}
                    enhanced={true}
                  >
                    <div className="group relative overflow-hidden rounded-xl">
                      <div className="relative aspect-video overflow-hidden">
                        <OptimizedImage
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                          <Button
                            onClick={() => router.push(`/portfolio/${item.id}`)}
                            variant="outline"
                            className="flex items-center gap-2 rounded-full border-white bg-white/20 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                          >
                            <Play className="h-4 w-4" />
                            {t("portfolio.viewProject")}
                          </Button>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="mb-2 flex items-center justify-between">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              isDark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.category}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => router.push(`/portfolio/${item.id}`)}
                            className={`rounded-full p-1.5 transition-colors ${
                              isDark
                                ? "text-gray-500 hover:bg-gray-700 hover:text-gray-100"
                                : "text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.button>
                        </div>
                        <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                          {item.title}
                        </h3>
                        <p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </InteractiveCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* 중간 배경 이미지 섹션 */}
          {/* <div className="my-20">
            <ParallaxHero imageUrl="/images/placeholder.svg?height=1080&width=1920" height="400px" overlayOpacity={0.6}>
              <MouseParallax>
                <div className="max-w-3xl">
                  <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${isDark ? "text-enhanced" : ""}`}>
                    {t("portfolio.quote")}
                  </h2>
                  <p className="text-lg text-gray-200">- Steve Jobs</p>
                </div>
              </MouseParallax>
            </ParallaxHero>
          </div> */}

          {/* 디자인 철학 섹션 */}
          <div className="my-20">
            <ScrollRevealMotion>
              <div className="mb-12 text-center">
                <h2
                  className={`title-responsive font-bold tracking-tight ${
                    isDark
                      ? "bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                  }`}
                >
                  {t("portfolio.designPhilosophy")}
                </h2>
                <p className={`mt-4 text-responsive ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {t("portfolio.designApproach")}
                </p>
              </div>
            </ScrollRevealMotion>

            <Stagger>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <StaggerItem>
                  <InteractiveCard
                    className={`h-full p-6 ${isDark ? "bg-card" : "bg-white"} hover-lift`}
                    enhanced={true}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white ${
                          isDark ? "bg-gradient-primary" : "bg-gradient-primary"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </div>
                      <h3 className={`mb-2 text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                        {t("portfolio.userCentric")}
                      </h3>
                      <p className={isDark ? "text-gray-400" : "text-gray-500"}>{t("portfolio.userCentricDesc")}</p>
                    </div>
                  </InteractiveCard>
                </StaggerItem>

                <StaggerItem>
                  <InteractiveCard
                    className={`h-full p-6 ${isDark ? "bg-card" : "bg-white"} hover-lift`}
                    enhanced={true}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white ${
                          isDark ? "bg-gradient-secondary" : "bg-gradient-secondary"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                      </div>
                      <h3 className={`mb-2 text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                        {t("portfolio.accessibility")}
                      </h3>
                      <p className={isDark ? "text-gray-400" : "text-gray-500"}>{t("portfolio.accessibilityDesc")}</p>
                    </div>
                  </InteractiveCard>
                </StaggerItem>

                <StaggerItem>
                  <InteractiveCard
                    className={`h-full p-6 ${isDark ? "bg-card" : "bg-white"} hover-lift`}
                    enhanced={true}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white ${
                          isDark ? "bg-gradient-accent" : "bg-gradient-accent"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                          <line x1="6" y1="1" x2="6" y2="4"></line>
                          <line x1="10" y1="1" x2="10" y2="4"></line>
                          <line x1="14" y1="1" x2="14" y2="4"></line>
                        </svg>
                      </div>
                      <h3 className={`mb-2 text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                        {t("portfolio.innovation")}
                      </h3>
                      <p className={isDark ? "text-gray-400" : "text-gray-500"}>{t("portfolio.innovationDesc")}</p>
                    </div>
                  </InteractiveCard>
                </StaggerItem>
              </div>
            </Stagger>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}
