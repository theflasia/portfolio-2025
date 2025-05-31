import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/i18n"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "UI 디자이너 포트폴리오",
  description: "UI 디자이너의 작품 포트폴리오 웹사이트",
    generator: 'v0.dev'
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
