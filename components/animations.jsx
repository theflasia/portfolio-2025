"use client"

import { motion } from "framer-motion"

// 페이드 인 애니메이션
export const FadeIn = ({ children, delay = 0, duration = 0.5, ...props }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration, delay }} {...props}>
      {children}
    </motion.div>
  )
}

// 슬라이드 업 애니메이션
export const SlideUp = ({ children, delay = 0, duration = 0.5, distance = 50, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 슬라이드 다운 애니메이션
export const SlideDown = ({ children, delay = 0, duration = 0.5, distance = 50, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 슬라이드 인 왼쪽 애니메이션
export const SlideInLeft = ({ children, delay = 0, duration = 0.5, distance = 50, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -distance }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 슬라이드 인 오른쪽 애니메이션
export const SlideInRight = ({ children, delay = 0, duration = 0.5, distance = 50, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: distance }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 스케일 인 애니메이션
export const ScaleIn = ({ children, delay = 0, duration = 0.5, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 스태거 애니메이션 (자식 요소들에 순차적으로 애니메이션 적용)
export const Stagger = ({ children, staggerDelay = 0.1, ...props }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      initial="hidden"
      animate="show"
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 스태거 아이템 (Stagger 컴포넌트의 자식으로 사용)
export const StaggerItem = ({ children, ...props }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 페이지 전환 애니메이션
export const PageTransition = ({ children }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  )
}

// 호버 애니메이션
export const HoverScale = ({ children, scale = 1.05, ...props }) => {
  return (
    <motion.div whileHover={{ scale }} whileTap={{ scale: 0.98 }} {...props}>
      {children}
    </motion.div>
  )
}

// 무한 애니메이션 (예: 부드러운 부유 효과)
export const Float = ({ children, duration = 3, y = 10, ...props }) => {
  return (
    <motion.div
      animate={{
        y: [0, -y, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 스크롤 트리거 애니메이션
export const ScrollRevealMotion = ({ children, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
