"use client"

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Briefcase, GraduationCap, Award, Heart, Code, Palette, Smartphone, Monitor, Figma } from "lucide-react"
import Navbar from "@/components/navbar"
import ParallaxHero from "@/components/parallax-hero"
import ScrollReveal from "@/components/scroll-reveal"
import InteractiveCard from "@/components/interactive-card"
import ScrollProgress from "@/components/scroll-progress"
import { useTheme } from "next-themes"
import { useLanguage } from "@/i18n"

// 경력 데이터
const experiences = [
  {
    title: "시니어 UI/UX 디자이너",
    company: "디자인 에이전시 A",
    period: "2021 - 현재",
    description:
      "다양한 클라이언트를 위한 웹사이트 및 모바일 앱 디자인 프로젝트를 주도하고 있습니다. 디자인 시스템 구축 및 팀 관리를 담당하고 있습니다.",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "UI 디자이너",
    company: "테크 스타트업 B",
    period: "2018 - 2021",
    description:
      "핀테크 서비스의 사용자 인터페이스 디자인 및 사용자 경험 개선을 담당했습니다. 프로덕트 팀과 협업하여 새로운 기능을 디자인했습니다.",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "주니어 디자이너",
    company: "디지털 마케팅 회사 C",
    period: "2016 - 2018",
    description: "웹사이트, 소셜 미디어 그래픽, 마케팅 자료 등 다양한 디지털 콘텐츠를 제작했습니다.",
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

// 수상 경력
const awards = [
  {
    title: "베스트 UI 디자인 어워드",
    organization: "디자인 어워드",
    year: "2022",
    description: "핀테크 앱 UI 디자인으로 수상했습니다.",
    icon: <Award className="h-5 w-5" />,
  },
  {
    title: "이노베이션 디자인 어워드",
    organization: "디지털 디자인 협회",
    year: "2020",
    description: "혁신적인 사용자 인터페이스 디자인으로 수상했습니다.",
    icon: <Award className="h-5 w-5" />,
  },
]

// 스킬 데이터
const skills = [
  { name: "UI 디자인", level: 95, icon: <Palette className="h-5 w-5" /> },
  { name: "UX 디자인", level: 90, icon: <Heart className="h-5 w-5" /> },
  { name: "웹 디자인", level: 85, icon: <Monitor className="h-5 w-5" /> },
  { name: "모바일 앱 디자인", level: 90, icon: <Smartphone className="h-5 w-5" /> },
  { name: "프로토타이핑", level: 80, icon: <Code className="h-5 w-5" /> },
  { name: "Figma", level: 95, icon: <Figma className="h-5 w-5" /> },
  { name: "Adobe Creative Suite", level: 85, icon: <Palette className="h-5 w-5" /> },
]

export default function AboutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const skillRefs = useRef([])
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const { t } = useLanguage()

  useEffect(() => {
    // 로딩 상태 업데이트
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
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
    <div
        className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-gradient-dark" : "bg-gradient-light"}`}
      >
      <ScrollProgress color={isDark ? "hsl(var(--primary-color))" : "hsl(var(--primary-color))"} />
      <Navbar />

      {/* 히어로 섹션 */}
      <ParallaxHero
        imageUrl="/images/about-top.png?height=760&width=1980"
        title={t("about.title")}
        subtitle={t("about.subtitle")}
        height="25vh"
        overlayOpacity={0.7}
      />

      <main className="container relative mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* 프로필 섹션 */}
          <ScrollReveal direction="left" className="md:col-span-1">
            <InteractiveCard className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30">
              <div className="mb-6 flex flex-col items-center">
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full bg-gradient-to-r from-gray-900 to-gray-700 p-1 dark:from-gray-700 dark:to-gray-500">
                  <img
                    src="/images/about-photo.png?height=256&width=256"
                    alt="프로필 이미지"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("about.name")}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t("about.job")}</p>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">{t("about.intro")}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("about.introText")}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">{t("about.contact")}</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>📧 email@example.com</li>
                  <li>📱 010-1234-5678</li>
                  <li>🌐 www.portfolio.com</li>
                </ul>
              </div>

              <div>
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
              </div>
            </InteractiveCard>
          </ScrollReveal>

          {/* 경력 및 스킬 섹션 */}
          <div className="md:col-span-2">
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
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
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
            <ScrollReveal direction="right" /*delay={0.2}*/>
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
            </ScrollReveal>

            {/* 수상 경력 */}
            <ScrollReveal direction="right" /*delay={0.3}*/>
              <InteractiveCard className="mb-8 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{t("about.awards")}</h2>
                <div className="space-y-6">
                  {awards.map((award, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white dark:from-gray-700 dark:to-gray-500">
                        {award.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{award.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{award.organization}</span>
                          <span>•</span>
                          <span>{award.year}</span>
                        </div>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{award.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </InteractiveCard>
            </ScrollReveal>

            {/* 스킬 */}
            <ScrollReveal direction="right" /*delay={0.4}*/>
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
                          <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
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

        <ScrollReveal delay={0.5}>
          <div className="mt-12 flex justify-center">
            <Button
              className="rounded-full bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-2 text-white hover:from-gray-800 hover:to-gray-600 dark:from-gray-700 dark:to-gray-500 dark:hover:from-gray-600 dark:hover:to-gray-400"
              onClick={() => router.push("/contact")}
            >
              {t("about.contactButton")}
            </Button>
          </div>
        </ScrollReveal>
      </main>
    </div>
  )
}
