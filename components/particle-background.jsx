"use client"

import { useEffect, useRef } from "react"

const ParticleBackground = () => {
const canvasRef = useRef(null)
const animationRef = useRef(null)
const particlesRef = useRef([])
const mouseRef = useRef({ x: 0, y: 0 })

useEffect(() => {
  const canvas = canvasRef.current
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  let particles = []

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  const createParticle = (x, y) => {
    return {
      x: x || Math.random() * canvas.width,
      y: y || Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      life: Math.random() * 100 + 50,
      maxLife: Math.random() * 100 + 50,
    }
  }

  const initParticles = () => {
    particles = []
    const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000))

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle())
    }
    particlesRef.current = particles
  }

  const updateParticles = () => {
    particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Mouse interaction
      const dx = mouseRef.current.x - particle.x
      const dy = mouseRef.current.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        const force = (100 - distance) / 100
        particle.vx += (dx / distance) * force * 0.01
        particle.vy += (dy / distance) * force * 0.01
      }

      // Apply friction
      particle.vx *= 0.99
      particle.vy *= 0.99

        // Boundary check
    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x))
      particle.y = Math.max(0, Math.min(canvas.height, particle.y))

      // Update life
      particle.life--
      particle.opacity = (particle.life / particle.maxLife) * 0.5

      // Remove dead particles
      if (particle.life <= 0) {
        particles[index] = createParticle()
      }
    })
  }

  const drawParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections
    particles.forEach((particle, i) => {
      particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(128, 128, 128, ${0.1 * (1 - distance / 100)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      })
    })

    // Draw particles
    particles.forEach((particle) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(128, 128, 128, ${particle.opacity})`
      ctx.fill()

      // Add glow effect
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(128, 128, 128, ${particle.opacity * 0.1})`
      ctx.fill()
    })
  }

  const animate = () => {
    updateParticles()
    drawParticles()
    animationRef.current = requestAnimationFrame(animate)
  }

  const handleMouseMove = (e) => {
    mouseRef.current.x = e.clientX
    mouseRef.current.y = e.clientY
  }

  const handleResize = () => {
    resizeCanvas()
    initParticles()
  }

  // Initialize
  resizeCanvas()
  initParticles()
  animate()

  // Event listeners
  window.addEventListener("resize", handleResize)
  window.addEventListener("mousemove", handleMouseMove)

  return () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    window.removeEventListener("resize", handleResize)
    window.removeEventListener("mousemove", handleMouseMove)
  }
}, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}

export default ParticleBackground
