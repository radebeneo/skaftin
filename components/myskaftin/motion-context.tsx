'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FOOD_METADATA } from '@/lib/skaftin-data'

type FlyTask = {
  id: string
  foodId: string
  sourceRect: DOMRect
  targetId: string
}

type MotionContextType = {
  flyItem: (foodId: string, sourceElement: HTMLElement, targetId: string) => void
  announce: (message: string) => void
}

const MotionContext = createContext<MotionContextType | null>(null)

export function useSkaftinMotion() {
  const ctx = useContext(MotionContext)
  if (!ctx) return { flyItem: () => {}, announce: () => {} } // Fallback if no provider
  return ctx
}

let announceTimeout: ReturnType<typeof setTimeout> | null = null

export function SkaftinMotionProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<FlyTask[]>([])

  const announce = (message: string) => {
    const el = document.getElementById('skaftin-announcer')
    if (el) {
      el.textContent = ''
      if (announceTimeout) clearTimeout(announceTimeout)
      announceTimeout = setTimeout(() => {
        el.textContent = message
      }, 50)
    }
  }

  const flyItem = (foodId: string, sourceElement: HTMLElement, targetId: string) => {
    const sourceRect = sourceElement.getBoundingClientRect()
    const id = Math.random().toString(36).substring(2, 11)
    setTasks((prev) => [...prev, { id, foodId, sourceRect, targetId }])
  }

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <MotionContext.Provider value={{ flyItem, announce }}>
      {children}
      <div aria-live="polite" className="sr-only" id="skaftin-announcer"></div>
      
      {/* Portal/Overlay for flying items */}
      <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
        <AnimatePresence>
          {tasks.map((task) => {
            const meta = FOOD_METADATA[task.foodId]
            if (!meta) return null
            
            const targetEl = document.getElementById(task.targetId)
            const targetRect = targetEl?.getBoundingClientRect() || { 
              top: window.innerHeight / 2, 
              left: window.innerWidth / 2, 
              width: 50, 
              height: 50 
            }

            // Target the center of the target element
            const endTop = targetRect.top + (targetRect.height / 2) - 24
            const endLeft = targetRect.left + (targetRect.width / 2) - 24

            return (
              <motion.div
                key={task.id}
                initial={{
                  position: 'fixed',
                  top: task.sourceRect.top,
                  left: task.sourceRect.left,
                  width: task.sourceRect.width,
                  height: task.sourceRect.height,
                  opacity: 0.2,
                  scale: 0.8,
                }}
                animate={{
                  top: endTop,
                  left: endLeft,
                  width: 48,
                  height: 48,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.25 }}
                onAnimationComplete={() => removeTask(task.id)}
                className={`flex flex-col items-center justify-center rounded-2xl ${meta.placeholderBg} p-2 text-center shadow-lg shadow-black/10`}
              >
                <span className="mb-1 text-2xl leading-none" aria-hidden="true">{meta.emoji}</span>
                <span className="text-[8px] font-bold uppercase leading-tight text-ink">{meta.label}</span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </MotionContext.Provider>
  )
}
