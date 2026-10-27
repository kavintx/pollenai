"use client"

import * as React from "react"

/*
 * Smooth fade-up as things scroll into view.
 *  - [data-reveal]          → the element fades up on its own
 *  - [data-reveal-stagger]  → each direct child fades up, one after another
 * Only elements still below the fold are hidden, so the first screen never flickers. Once an element has
 * finished revealing, the .rv class is removed so its own hover transitions work exactly as before.
 */

const STEP = 90 // ms between staggered children
const MAX_DELAY = 450
const DURATION = 900

export function ScrollReveal() {
  React.useEffect(() => {
    if (!("IntersectionObserver" in window)) return

    const items: HTMLElement[] = []
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => items.push(el))
    document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((parent) => {
      Array.from(parent.children).forEach((child, i) => {
        if (child instanceof HTMLElement) {
          child.style.setProperty("--rv-delay", `${Math.min(i * STEP, MAX_DELAY)}ms`)
          items.push(child)
        }
      })
    })

    const timers: ReturnType<typeof setTimeout>[] = []
    const finish = (el: HTMLElement) => {
      el.classList.remove("rv", "rv-in")
      el.style.removeProperty("--rv-delay")
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          io.unobserve(el)
          el.classList.add("rv-in")
          const delay = parseFloat(el.style.getPropertyValue("--rv-delay")) || 0
          timers.push(setTimeout(() => finish(el), DURATION + delay + 50))
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    )

    const vh = window.innerHeight
    for (const el of items) {
      // already on screen → leave it alone
      if (el.getBoundingClientRect().top < vh * 0.92) {
        el.style.removeProperty("--rv-delay")
        continue
      }
      el.classList.add("rv")
      io.observe(el)
    }

    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
      items.forEach(finish)
    }
  }, [])

  return null
}
