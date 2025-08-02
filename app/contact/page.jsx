"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, Linkedin, Github, Instagram, Twitter } from "lucide-react"
import Navbar from "@/components/navbar"
import ParallaxHero from "@/components/parallax-hero"
import ScrollReveal from "@/components/scroll-reveal"
import InteractiveCard from "@/components/interactive-card"
import ScrollProgress from "@/components/scroll-progress"
import { useTheme } from "next-themes"
import { useLanguage } from "@/i18n"

export default function ContactPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const { theme } = useTheme()
  const { t } = useLanguage()

  useEffect(() => {
    // 로딩 상태 업데이트
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 폼 제출 시뮬레이션
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <ScrollProgress color="var(--color-primary)" />
      <Navbar />

      {/* 히어로 섹션 */}
      <ParallaxHero
        imageUrl="/placeholder.svg?height=1080&width=1920"
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        height="30vh"
        overlayOpacity={0.7}
      />

      <main className="container relative mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 연락처 정보 */}
          <ScrollReveal direction="left">
            <InteractiveCard className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{t("contact.info")}</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white dark:from-gray-700 dark:to-gray-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t("contact.email")}</h3>
                    <p className="text-gray-700 dark:text-gray-300">email@example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white dark:from-gray-700 dark:to-gray-500">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t("contact.phone")}</h3>
                    <p className="text-gray-700 dark:text-gray-300">010-1234-5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white dark:from-gray-700 dark:to-gray-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t("contact.addresstitle")}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{t("contact.address")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{t("contact.socialMedia")}</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white transition-transform hover:scale-110 dark:from-gray-700 dark:to-gray-500"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white transition-transform hover:scale-110 dark:from-gray-700 dark:to-gray-500"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white transition-transform hover:scale-110 dark:from-gray-700 dark:to-gray-500"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white transition-transform hover:scale-110 dark:from-gray-700 dark:to-gray-500"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </InteractiveCard>
          </ScrollReveal>

          {/* 연락 폼 */}
          <ScrollReveal direction="right" /*delay={0.2}*/>
            <InteractiveCard className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{t("contact.sendMessage")}</h2>

              {submitSuccess ? (
                <div className="animate-scale-in flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-700">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">메시지가 전송되었습니다!</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">빠른 시일 내에 답변 드리겠습니다.</p>
                  <Button
                    className="mt-6 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-2 text-white hover:from-gray-800 hover:to-gray-600 dark:from-gray-700 dark:to-gray-500 dark:hover:from-gray-600 dark:hover:to-gray-400"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    새 메시지 작성
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      이름
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white/50 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-gray-400 dark:focus:ring-gray-400"
                      placeholder="이름을 입력하세요"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      이메일
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white/50 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-gray-400 dark:focus:ring-gray-400"
                      placeholder="이메일을 입력하세요"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      제목
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white/50 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-gray-400 dark:focus:ring-gray-400"
                      placeholder="제목을 입력하세요"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      메시지
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-1 block h-32 w-full rounded-md border-gray-200 bg-white/50 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-gray-400 dark:focus:ring-gray-400"
                      placeholder="메시지를 입력하세요"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 px-4 py-2 text-white hover:from-gray-800 hover:to-gray-600 dark:from-gray-700 dark:to-gray-500 dark:hover:from-gray-600 dark:hover:to-gray-400"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        전송 중...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        메시지 전송
                      </>
                    )}
                  </Button>
                </form>
              )}
            </InteractiveCard>
          </ScrollReveal>
        </div>

        {/* 지도 섹션 */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12">
            <h2 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400">
              찾아오시는 길
            </h2>
            <InteractiveCard className="overflow-hidden rounded-xl">
              <div className="aspect-[16/9] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4515690893825!2d127.0282632!3d37.4996453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1c32408f9b7%3A0x4e3761a4f356d1eb!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDthYztl6TrnoDroZwgNDIz!5e0!3m2!1sko!2skr!4v1652333545199!5m2!1sko!2skr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </InteractiveCard>
          </div>
        </ScrollReveal>
      </main>
    </div>
  )
}
