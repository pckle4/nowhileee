import TechIconCloud from "@/components/tech-icon-cloud"
import AnimatedTitle from "@/components/animated-title"
import SocialMediaIcons from "@/components/social-media-icons"
import SystemActiveButton from "@/components/system-active-button"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeToggle from "@/components/theme-toggle"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-900 flex flex-col items-center justify-center p-3 md:p-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="blob blob-1 absolute -top-10 md:-top-40 -right-10 md:-right-40 w-32 h-32 md:w-80 md:h-80 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70"></div>
          <div className="blob blob-2 absolute -bottom-10 md:-bottom-40 -left-10 md:-left-40 w-32 h-32 md:w-80 md:h-80 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70"></div>
          <div className="blob blob-3 absolute top-10 md:top-40 left-10 md:left-40 w-32 h-32 md:w-80 md:h-80 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70"></div>
        </div>

        {/* Theme Toggle */}
        <div className="absolute top-3 md:top-6 right-3 md:right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto text-center relative z-10 w-full flex-1 flex flex-col justify-center px-2 md:px-4">
          <div className="mb-6 md:mb-12">
            <AnimatedTitle />
          </div>

          <div className="flex justify-center mb-6 md:mb-12">
            <TechIconCloud />
          </div>

          <div className="space-y-3 md:space-y-6">
            <SocialMediaIcons />

            <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-600 dark:text-slate-400 px-4">
              <span>Crafted with</span>
              <span className="text-red-500 text-base md:text-lg heart-beat">❤️</span>
              <span>by</span>
              <span className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-sm md:text-lg">
                Ansh
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 w-full mt-6 md:mt-8 py-3 md:py-4 border-t border-slate-200 dark:border-slate-700">
          <div className="max-w-6xl mx-auto px-3 md:px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              {/* Copyright Info */}
              <div className="text-center md:text-left order-2 md:order-1">
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  © {new Date().getFullYear()} NoWhile.com. All rights reserved.
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Powered by innovation, designed for the future.
                </p>
              </div>

              {/* System Active Button */}
              <div className="flex-shrink-0 order-1 md:order-2">
                <SystemActiveButton />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
