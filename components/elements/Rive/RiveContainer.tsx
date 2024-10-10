'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Warning } from '@/components/warning/Warning'

import { RiveController } from './RiveController'

export const RiveContainer = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [commandName, setCommandName] = useState('')
  const [texts, setTexts] = useState<string[]>([])
  const [warning, setWarning] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const handleContextMenu = (event: { preventDefault: () => void }) => {
      event.preventDefault()
    }

    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('contextmenu', handleContextMenu)
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('contextmenu', handleContextMenu)
      }
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopoverOpen(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setTexts([])
      setWarning(false)
    }, 12000)
  }, [])

  const getRandomValue = () => Math.random() * 100 - 50

  const spring = {
    type: 'spring',
    damping: 5,
    stiffness: 2000,
  }

  const variants = {
    initial: { x: 0, y: 0 },
    animate: { x: getRandomValue(), y: getRandomValue() },
  }

  const controls = useAnimationControls()

  useEffect(() => {
    if (animate) {
      controls.start(variants.animate)
      setTimeout(() => {
        controls.start(variants.initial)
        setAnimate(false)
      }, 100)
    }
  }, [animate, controls, variants.animate, variants.initial])

  return (
    <>
      {warning ? (
        <Warning />
      ) : (
        <>
          <motion.div transition={spring} animate={controls}>
            <RiveController
              setCommandName={setCommandName}
              setAnimate={setAnimate}
              setTexts={setTexts}
              texts={texts}
              setWarning={setWarning}
            />
          </motion.div>
          <div className="select-none font-misaki-gothic">
            <div className="h-10 text-center">{commandName}</div>
          </div>
          <div className="flex w-full justify-center p-10">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button className="font-misaki-gothic">遊び方</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="text-center">
                  格ゲーとかのコマンドを
                  <br />
                  入力してね
                  <br />
                  <span className="text-sm">・例 ↓↘→ 🔵</span>
                  <br />
                  <span className="text-sm text-red-400">※ 音声が出ます ※</span>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}
    </>
  )
}
