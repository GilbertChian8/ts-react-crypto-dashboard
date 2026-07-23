import ThemeToggle from './ThemeToggle'

type HeaderProps = {
  secondsLeft: number
}

export default function Header({ secondsLeft }: HeaderProps) {
  return (
    <header className='flex items-center justify-between gap-4 mb-6.5'>
      <div className='flex items-center gap-2'>
        <div className='w-8.5 h-8.5 flex items-center justify-center'>
          <img src='/logo.webp' alt='Logo' className='rounded-[9px]' />
        </div>
        <div>
          <p className='text-[19px] font-extrabold tracking-[-0.02em]'>
            CoinBoard
          </p>
          <p className='text-xs text-text-dim'>Live market overview</p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2 text-[12.5px] text-text-dim'>
          <span className='w-1.75 h-1.75 rounded-full bg-up animate-pulse'></span>
          Live · updates in {secondsLeft}s
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
