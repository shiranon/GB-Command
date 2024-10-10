import React, { useEffect, useState } from 'react'

export const Warning = () => {
  const [text, setText] = useState('すぐにけせ')

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) => `${prevText} すぐにけせ すぐにけせ すぐにけせ`)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-0 z-50 flex size-full items-center justify-center overflow-hidden bg-black">
      <div className="rotate-1 select-none items-center justify-center text-red-500">
        <div className="w-full whitespace-normal break-words">{text}</div>
      </div>
    </div>
  )
}
