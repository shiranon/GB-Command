import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import soundList from '@/constants/soundList'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 日付をyyyymmdd形式の文字列にフォーマットする関数
 *
 * @param date - フォーマットしたい日付
 * @returns - yyyymmdd形式の文字列
 */
export const formatDate = (timeInMillis: number): string => {
  const date = new Date(timeInMillis)
  const year = date.getFullYear()
  const month = (1 + date.getMonth()).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const formattedDate = `${year}${month}${day}`
  return formattedDate
}

/**
 * 整数nまでの乱数を生成する
 * @param n - 生成する乱数の最大値-1(1以上の整数である必要がある)
 * @returns - 0からn-1までの整数をランダムに生成
 */
export const rand = (n: number) => {
  return Math.floor(Math.random() * n)
}

/**
 * 音声リストからkeyに該当する音声を再生する
 * @param key - 音声リストのkey
 */
export const playSound = (key: string) => {
  const sound = soundList.find((sound) => sound.key === key)
  if (sound) {
    new Audio(sound.value).play()
  } else {
    console.error(`Sound with key ${key} not found in soundList`)
  }
}
