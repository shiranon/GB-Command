import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/public/images/icon.png'

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 w-screen select-none border-b-2 bg-slate-50 py-2">
      <div className="flex items-center justify-between pl-10 pr-2">
        <Link href="/" scroll={false}>
          <div className="flex items-center">
            <Image
              src={Icon}
              alt={'Icon'}
              height={40}
              width={40}
              className="mr-4 rounded-xl"
              priority
            />
            <h1 className="text-left text-xl font-semibold">GB Command</h1>
          </div>
        </Link>
      </div>
    </header>
  )
}
