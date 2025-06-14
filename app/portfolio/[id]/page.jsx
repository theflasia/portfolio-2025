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
import * as SimpleIcons from "react-icons/si"
import * as BoxIcons from "react-icons/bi"

// 포트폴리오 데이터 (실제로는 API에서 가져올 수 있습니다)
const portfolioItems = [
  {
    id: 1,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-thumb-kaijyu8.png?height=400&width=762",
    videoUrl: "",
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
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="40px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="40px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="40px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="40px" className="mb-2" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="40px" className="mb-2" />, name :"Visual Studio Code"},
    ],
    duration: "6ヶ月~",
    client: "-",
    year: "2025",
  },
  {
    id: 2,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-thumb-tribenine-top.png?height=420&width=762",
    videoUrl: "/movies/TribeNine_720p.mp4",
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
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="40px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="40px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="40px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="40px" className="mb-2" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="40px" className="mb-2" />, name :"Visual Studio Code"},
      {icon : <SimpleIcons.SiAutodeskmaya size="40px" className="mb-2" />, name :"Maya"},
    ],
    duration: "3年~",
    client: "-",
    year: "2022",
  },
  {
    id: 3,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-thumb-konmari.png?height=400&width=600",
    videoUrl: "/movies/KonMari_720p.mp4",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "KonMariメソッドは、物を「ときめくかどうか（Spark Joy）」で判断して整理し、感謝の気持ちを込めて不要な物を手放すことで、自分の理想の暮らしに近づける片づけ術です。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般",
      "プロモーションムービー制作",
    ],
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="40px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="40px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="40px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="40px" className="mb-2" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="40px" className="mb-2" />, name :"Visual Studio Code"},
    ],
    duration: "1年~",
    client: "-",
    year: "2021",
  },
  {
    id: 4,
    title: "HoneyWorks Premium Live",
    thumbnail: "/images/portfolio-thumb-honeyworks.png?height=400&width=600",
    videoUrl: "/movies/HoneyWorks_720p.mp4",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『HoneyWorks Premium Live』は、HoneyWorksの世界観をリズムゲームとして体験できるよう開発した青春音楽ゲームです。MV連動の演出やフルボイスストーリーを通じて、ファンがキャラと楽曲に深く没入できる設計にしました。2023年3月、約2年4ヵ月の運営を経てサービスを終了しました。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般",
      "外部の制作会社さんとの連携",
    ],
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="40px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="40px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="40px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="40px" className="mb-2" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="40px" className="mb-2" />, name :"Visual Studio Code"},
    ],
    duration: "2年~",
    client: "-",
    year: "2020",
  },
    {
    id: 5,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-thumb-bonbonjourney.png?height=400&width=600",
    videoUrl: "/movies/BonBonJourney_720p.mp4",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『ONE PIECE ボン！ボン！ジャーニー!!』は、人気アニメ「ONE PIECE」を題材にしたパズルRPGで、キャラクターが“ボンボン”と呼ばれる可愛いデフォルメ姿で登場し、タップ操作で敵を倒しながら原作の物語を追体験できるスマホゲームです。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般・ディレクションを担当",
      "プロモーションムービー制作",
      "外部の制作会社さんとの連携",
    ],
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="40px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="40px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="40px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="40px" className="mb-2" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="40px" className="mb-2" />, name :"Visual Studio Code"},
    ],
    duration: "2年~",
    client: "-",
    year: "2018",
  },
    {
    id: 6,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-thumb-idolmastersidem.png?height=400&width=600",
    videoUrl: "/movies/IdolMasterSideM_720p.mp4",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『アイドルマスター SideM LIVE ON ST@GE!』は、アイドルたちのドラマと成長を丁寧に描くため、2D演出と豊富なストーリー構成にこだわって開発しました。プロデューサーとの一体感や“共に歩む”感覚を重視し、ユニットごとの魅力を深く掘り下げました。ライブ演出や感情表現にも細やかな工夫を加え、実在感あるアイドル体験を追求しました。2017年から約4年間、ファンと共に進化しながら運営しました。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般・ディレクションを担当",
    ],
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="40px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="40px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="40px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="40px" className="mb-2" />, name :"GitHub"},
    ],
    duration: "1年~",
    client: "-",
    year: "2017",
  },
    {
    id: 7,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-thumb-idolmastersidem.png?height=400&width=600",
    videoUrl: "/movies/IdolMasterSideM_720p.mp4",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『サモンソウルバトル』は、gloopsが手がけたリアルタイム3ポジション制ギルドバトル特化のスマホ向けカードRPGです。前衛・中衛・後衛という新たな配置概念を導入し、戦術の幅と協力プレイの深さを追求しました。クエスト中は“仮想ギルド”機能で、他プレイヤーとリアルタイムに協力できる工夫を実装しました。iOS/Android向けに2014年末リリース予定で、無料+アイテム課金制として開発され、10万人超の事前登録者を集めました。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般",
    ],
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="40px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="40px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="40px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiAutodeskmaya size="40px" className="mb-2" />, name :"Maya"},
      {icon : <SimpleIcons.SiGithub size="40px" className="mb-2" />, name :"GitHub"},
    ],
    duration: "1年~",
    client: "-",
    year: "2017",
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

        {portfolio.videoUrl && (
        <ScrollReveal /*delay={0.1}*/>
          <div className="mb-6 m-4 overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl">
            <div className="aspect-video">
              {/* 비디오 플레이어 */}
              <ReactPlayer
              url = {portfolio.videoUrl}
              muted
              controls
              pip
              width = {"100%"}
              height = {"auto"}
            />
            </div>
          </div>
        </ScrollReveal>
        )}

        <ScrollReveal /*delay={0.2}*/>
          <div className="mb-12 m-4 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="prose max-w-none dark:prose-invert">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("project.tools")}</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {portfolio.tools.map((tool, index) => (
                  <InteractiveCard
                    key={index}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-900/30"
                  >
                    {tool.icon}
                    <span className="font-medium text-gray-900 dark:text-white">{tool.name}</span>
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
