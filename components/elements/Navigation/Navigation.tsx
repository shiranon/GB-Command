'use client'
import { useEffect } from 'react'
import useSWR from 'swr'

import { Button } from '@/components/ui/button'

export const Navigation = () => {
  const { data: isOpen, mutate: setIsOpen } = useSWR('isOpen', null, {
    fallbackData: false,
  })

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        !event
          .composedPath()
          .some((el) => (el as HTMLElement).classList?.contains('navigation'))
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isOpen, setIsOpen])

  return (
    <>
      <div className="fixed right-0 top-0 z-50 mr-4 mt-1 ">
        <Button
          className={`size-10 ${isOpen ? 'bg-gray-100 text-black hover:bg-white' : ''}`}
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          {`${isOpen ? '×' : '≡'}`}
        </Button>
      </div>
      <div
        className={`fixed right-0 top-0 z-40 h-full w-[30%] bg-slate-200 p-4 pt-14 text-black transition-transform duration-700 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul>
          <li className="mb-4">
            <span className="text-sm font-bold">波動拳</span>
            <br />
            ↓↘→ 🔵
          </li>
          <li className="mb-4">
            <span className="text-sm font-bold">タックル</span>
            <br />
            ↓↘→ 🔴
          </li>
          <li className="mb-4">
            <span className="text-sm font-bold">弱昇竜拳</span>
            <br />
            →↓↘ 🔵
          </li>
          <li className="mb-4">
            <span className="text-sm font-bold">強昇竜拳</span>
            <br />
            →↓↘ 🔴
          </li>
          <li className="mb-4">
            <span className="text-sm font-bold">スライディング</span>
            <br />
            ↓↘→ 🟡
          </li>
          <li className="mb-4">
            <span className="text-sm font-bold">ジャンプキック</span>
            <br />
            ↓↘→ 🟢
          </li>
          <li className="mb-2">
            <span className="text-sm font-bold">パイルドライバー</span>
            <br />
            →↘↓↙←↖↑ <span className="text-red-200">●</span>
          </li>
          <li className="mb-4">
            等等
            <br />
            色々探してみてね
          </li>
          <li className="mb-4 select-none">
            <span className="text-xs text-slate-200">
              同じボタンを押し続けると...
            </span>
          </li>
        </ul>
        <br />
      </div>
    </>
  )
}
