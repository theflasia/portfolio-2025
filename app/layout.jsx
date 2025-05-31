import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/i18n"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "UIアニメーションデザイナーのポートフォリオ",
  description: "UIアニメーションデザイナーのポートフォリオ用ウェブサイト",
    generator: ''
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
