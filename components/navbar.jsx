"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTheme } from "next-themes"
import { useLanguage } from "@/i18n"
import { motion } from "framer-motion"
import { useBreakpoint } from "@/hooks/use-media-query"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { theme } = useTheme()
  const { t } = useLanguage()
  const { isMobile } = useBreakpoint()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const isActive = (path) => {
    return pathname === path
  }

  // 네비게이션 애니메이션 변수
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        // duration: 0.5,
        duration: 0,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${"border-gray-100 bg-white/90 backdrop-blur-md"} ${scrolled ? "shadow-sm" : ""}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div variants={itemVariants} className="flex items-center">
            <Link href="/portfolio">
              <span className={`text-xl font-bold tracking-tight transition-colors duration-300 text-gray-900`}>Shin JeongSoon</span><span className={`text-xl font-light tracking-tight transition-colors duration-300 text-gray-600`}>'s Portfolio</span>
            </Link>
          </motion.div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              <motion.div variants={itemVariants}>
                <Link
                  href="/portfolio"
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/portfolio")
                      ? "text-gray-900"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {t("nav.portfolio")}
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="/about"
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/about")
                      ? "text-gray-900"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {t("nav.about")}
                </Link>
              </motion.div>
              
              {/* <motion.div variants={itemVariants}>
                <Link
                  href="/contact"
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/contact")
                      ? "text-gray-900"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {t("nav.contact")}
                </Link>
              </motion.div> */}
              
              {/*
              <motion.div variants={itemVariants}>
                <LanguageSwitcher />
              </motion.div>
              */}
              {/*}
              <motion.div variants={itemVariants}>
                <ThemeToggle />
              </motion.div>
              */}
            </div>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="flex md:hidden">
            <div className="flex items-center space-x-1">
              {/* <LanguageSwitcher />
              <ThemeToggle /> */}
              <button
                type="button"
                className={`inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">메뉴 열기</span>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/portfolio"
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive("/portfolio")
                  ? "text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.portfolio")}
            </Link>
            <Link
              href="/about"
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive("/about")
                  ? "text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            {/* <Link
              href="/contact"
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive("/contact")
                  ? "text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link> */}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
