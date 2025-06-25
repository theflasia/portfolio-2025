"use client"

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Briefcase, GraduationCap, Award, Heart, Code, Palette, Smartphone, Monitor, Figma, Newspaper } from "lucide-react"
import Navbar from "@/components/navbar"
import ParallaxHero from "@/components/parallax-hero"
import ScrollReveal from "@/components/scroll-reveal"
import InteractiveCard from "@/components/interactive-card"
import ScrollProgress from "@/components/scroll-progress"
import { useLanguage } from "@/i18n"

// 경력 데이터
const experiences = [
  {
    title: "ジニア UIアニメーションデザイナー",
    company: "株式会社 アカツキゲームス",
    period: "2017 - 現在",
    description:
      "多数のプロジェクトにおいてUIアニメーションセクションのリードとして制作とディレクションを担当しました。そして、職種のマネジャーとしてマネジメント業務も担当しました。",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "インタラクティブデザイナー",
    company: "株式会社 gloops",
    period: "2013 - 2017",
    description:
      "ソーシャルゲーム制作における演出制作とモバイルゲームの新規/運用タイトルにおける演出全般の業務を担当しました。",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "Flash Developer",
    company: "(株)バードマン(BIRDMAN)",
    period: "2011 - 2013",
    description: "WEBサイト制作・モバイルコンテンツの制作を担当しました。",
    icon: <Briefcase className="h-5 w-5" />,
  },
]

// 교육 데이터
const education = [
  {
    degree: "시각디자인학과 학사",
    school: "서울디자인대학교",
    period: "2012 - 2016",
    description: "시각디자인을 전공하며 그래픽 디자인, UI/UX 디자인, 타이포그래피 등을 학습했습니다.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    degree: "UX 디자인 과정",
    school: "디자인 아카데미",
    period: "2017",
    description: "사용자 경험 디자인에 대한 전문 과정을 수료했습니다.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
]

// 인터뷰
const interviews = [
  // {
  //   title: "アカツキ ロジカルクリエイティブ Logic 02：「わかりやすさ」と「体験」を両立するUIアニメーション",
  //   organization: "CGWORLD",
  //   year: "2018",
  //   description: "UIアニメーションに関するインタビュー記事です。",
  //   url: "https://cgworld.jp/interview/201812-akatsuki%20.html",
  //   icon: <Newspaper className="h-5 w-5" />,
  // },
  // {
  //   title: "表情やしぐさで体験の質を高める。ゲームアニメーションの仕事",
  //   organization: "VOICE Akatsuki",
  //   year: "2020",
  //   description: "UIアニメーションに関するインタビュー記事です。",
  //   url: "https://voice.aktsk.jp/5436/",
  //   icon: <Newspaper className="h-5 w-5" />,
  // },
]

// 스킬 데이터
const skills = [
  { name: "UIアニメーション制作", level: 90, icon: <Palette className="h-5 w-5" /> },
  { name: "Unityを用いたモUI画面構築", level: 90, icon: <Smartphone className="h-5 w-5" /> },
  { name: "AfterEffectsを用いた演出制作", level: 75, icon: <Palette className="h-5 w-5" /> },
  { name: "C#を用いたのUIアニメーション制作", level: 60, icon: <Code className="h-5 w-5" /> },
  { name: "UnityのuGUIに向けたShader作成", level: 50, icon: <Smartphone className="h-5 w-5" /> },
  { name: "HTML/CSS/JavaScriptコーディング", level: 75, icon: <Code className="h-5 w-5" /> },
  { name: "Webデザイン", level: 65, icon: <Monitor className="h-5 w-5" /> },
  // { name: "Adobe Creative Suite", level: 85, icon: <Palette className="h-5 w-5" /> },
]

export default function AboutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const skillRefs = useRef([])
  const { t } = useLanguage()

  useEffect(() => {
    // 로딩 상태 업데이트
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault(); // 우클릭 방지
    }
    // document에 이벤트 리스너 추가
    document.addEventListener("contextmenu", handleContextMenu);
    
    // 스킬 바 애니메이션을 위한 Intersection Observer 설정
    if (!isLoading && skillRefs.current.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const bar = entry.target.querySelector(".skill-bar")
              if (bar) {
                const level = bar.getAttribute("data-level")
                bar.style.width = `${level}%`
              }
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )

      skillRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref)
      })

      return () => {
        skillRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref)
        })
      }
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-gradient-light`}>
      <ScrollProgress color={"hsl(var(--primary-color))"} />
      <Navbar />

      {/* 히어로 섹션 */}
      <ParallaxHero
        imageUrl="/images/about-top.png?height=600&width=1200"
        title={t("about.title")}
        subtitle={t("about.subtitle")}
        height="30vh"
        overlayOpacity={0.7}
      />

      <main className="container relative mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 프로필 섹션 */}
          <ScrollReveal direction="left" className="md:col-span-1">
            <InteractiveCard className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30">
              <div className="mb-6 flex flex-col items-center">
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full bg-gradient-to-r from-gray-900 to-gray-700 p-1 dark:from-gray-700 dark:to-gray-500">
                  <img
                    src="/images/about-photo.png?height=256&width=256"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("about.name")}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t("about.job")}</p>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">{t("about.intro")}</h3>
                {t("about.introText").map((text, index) => (
                  <p className="mt-1 text-gray-700 dark:text-gray-300" key={index}>
                  {text}
                </p>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">{t("about.contact")}</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="text-sm">📧 <a href="mailto:shin.jeongsoon.1210@gmail.com">shin.jeongsoon.1210@gmail.com</a></li>
                  {/* <li>📱 010-1234-5678</li> */}
                  <li className="text-sm">🌐 <a href="http://theflasia.cafe24.com/">http://theflasia.cafe24.com/</a></li>
                </ul>
              </div>

              {/* <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">{t("about.interests")}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    UIアニメーション
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    UIエフェクト
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    映像
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    Front-End 
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    WebDesign
                  </span>
                </div>
              </div> */}
            </InteractiveCard>
          </ScrollReveal>

          {/* 경력 및 스킬 섹션 */}
          <div className="md:col-span-1">
            {/* 경력 */}
            <ScrollReveal direction="right" /*delay={0.1}*/>
              <InteractiveCard className="mb-8 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{t("about.experience")}</h2>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white dark:from-gray-700 dark:to-gray-500">
                        {exp.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{exp.company}</span>
                          <span>•</span>
                          <span>{exp.period}</span>
                        </div>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </InteractiveCard>
            </ScrollReveal>

            {/* 교육 */}
            {/* <ScrollReveal direction="right">
              <InteractiveCard className="mb-8 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{t("about.education")}</h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white dark:from-gray-700 dark:to-gray-500">
                        {edu.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{edu.school}</span>
                          <span>•</span>
                          <span>{edu.period}</span>
                        </div>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{edu.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </InteractiveCard>
            </ScrollReveal> */}

            {/* 인터뷰 경력 */}
            {interviews.length >= 1 && (
              <ScrollReveal direction="right">
                <InteractiveCard className="mb-8 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{t("about.interviews")}</h2>
                  <div className="space-y-6">
                    {interviews.map((interview, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white dark:from-gray-700 dark:to-gray-500">
                          {interview.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{interview.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>{interview.organization}</span>
                            <span>•</span>
                            <span>{interview.year}</span>
                          </div>
                          {/* <p className="mt-2 text-gray-700 dark:text-gray-300">{interview.description}</p> */}
                          <p className="mt-2 text-xs text-gray-700 dark:text-gray-300">🌐 <a href={interview.url} target="_blank">{interview.url}</a></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </InteractiveCard>
              </ScrollReveal>
            )}

            {/* 스킬 */}
            <ScrollReveal direction="right">
              <InteractiveCard className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{t("about.skills")}</h2>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2" ref={(el) => (skillRefs.current[index] = el)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white dark:from-gray-700 dark:to-gray-500">
                            {skill.icon}
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                        <div
                          className="skill-bar h-full bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-500"
                          data-level={skill.level}
                          style={{ width: "0%", transition: "width 1s ease-out" }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </InteractiveCard>
            </ScrollReveal>
          </div>
        </div>

        {/* <ScrollReveal delay={0.5}>
          <div className="mt-12 flex justify-center">
            <Button
              className="rounded-full bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-2 text-white hover:from-gray-800 hover:to-gray-600 dark:from-gray-700 dark:to-gray-500 dark:hover:from-gray-600 dark:hover:to-gray-400"
              onClick={() => router.push("/contact")}
            >
              {t("about.contactButton")}
            </Button>
          </div>
        </ScrollReveal> */}
      </main>
    </div>
  )
}
