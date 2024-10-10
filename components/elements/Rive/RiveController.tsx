'use client'
import {
  type Event,
  EventType,
  useRive,
  useStateMachineInput,
} from '@rive-app/react-canvas'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

import commandList from '@/constants/commandList'
import { playSound } from '@/lib/utils'

const STATE_MACHINE_NAME = 'State Machine 1'
const INPUT_NAME = 'Command'

type RiveControllerProps = {
  setCommandName: Dispatch<SetStateAction<string>>
  setTexts: Dispatch<SetStateAction<string[]>>
  setWarning: Dispatch<SetStateAction<boolean>>
  setAnimate: Dispatch<SetStateAction<boolean>>
  texts: string[]
}

export const RiveController = ({
  setCommandName,
  setTexts,
  setWarning,
  setAnimate,
  texts,
}: RiveControllerProps) => {
  const [isSame, setIsSame] = useState<number>(0)
  const { rive, RiveComponent } = useRive({
    src: 'rive/controller.riv',
    artboard: 'Controller',
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  })

  const animationInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME,
  )

  useEffect(() => {
    if (texts.length <= 0 || !animationInput) return
    const matchIndex = commandList.findIndex((combination) =>
      combination.value.every((value, index) => value === texts[index]),
    )
    if (matchIndex !== -1) {
      console.log(`Command ${commandList[matchIndex].key} matched!`)
      setCommandName(`Command ${commandList[matchIndex].key} matched!`)
      animationInput.value = matchIndex + 1
      playSound(commandList[matchIndex].key)
      if (matchIndex === 8) {
        setAnimate(true)
      }
      setTexts([])
      setTimeout(() => {
        animationInput.value = 0
      }, 1500)
      setTimeout(() => {
        setCommandName('')
      }, 2000)
    } else {
      if (texts[0].match(/[a-zA-Z]/)) {
        playSound('button')
      } else if (texts[0].match(/[0-9]/)) {
        playSound('stick')
      }
    }
    if (texts.length > 20 && isSame === 0) {
      if (texts.every((text) => text === texts[0])) {
        setIsSame(1)
        animationInput.value = 20
        setTimeout(() => {
          animationInput.value = 0
        }, 1500)
      }
    } else if (texts.length > 50 && isSame === 1) {
      if (texts.every((text) => text === texts[0])) {
        setIsSame(2)
        animationInput.value = 21
        setTimeout(() => {
          animationInput.value = 0
        }, 1500)
      }
    } else if (texts.length > 100 && isSame === 2) {
      if (texts.every((text) => text === texts[0])) {
        setWarning(true)
        setIsSame(0)
      }
      setTexts((prevText) => prevText.slice(0, -1))
    }

    if (texts.length > 100) {
      setTexts((prevTexts) => prevTexts.slice(0, 100))
    }
  }, [
    animationInput,
    isSame,
    setAnimate,
    setCommandName,
    setTexts,
    setWarning,
    texts,
  ])

  useEffect(() => {
    if (rive) {
      const handleStateChange = (event: Event) => {
        const data = event.data
        if (Array.isArray(data) && typeof data[0] === 'string') {
          if (!data[0].includes('Idle') && !data[0].includes('command')) {
            console.log(`Type: ${typeof data[0]}, Value: ${data[0]}`)
            setTexts((prevText) => [data[0], ...prevText])
          }
        }
      }
      rive.on(EventType.StateChange, (event) => {
        handleStateChange(event)
      })
      return () => {
        rive.off(EventType.StateChange, handleStateChange)
      }
    }
  }, [rive, setTexts])

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="h-96 w-11/12">
          <RiveComponent />
        </div>
      </div>
    </>
  )
}
