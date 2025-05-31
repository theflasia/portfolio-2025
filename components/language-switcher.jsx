"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/i18n"

export function LanguageSwitcher() {
  const { language, changeLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "ko", name: t("language.ko"), flag: "🇰🇷" },
    { code: "en", name: t("language.en"), flag: "🇺🇸" },
    { code: "ja", name: t("language.ja"), flag: "🇯🇵" },
  ]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="언어 선택"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">언어 선택</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-scale-in">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              changeLanguage(lang.code)
              setIsOpen(false)
            }}
            className="flex cursor-pointer items-center gap-2"
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
            {language === lang.code && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-500"></span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
