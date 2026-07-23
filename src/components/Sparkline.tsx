import { memo, useMemo } from 'react'
import { LineChart, Line, YAxis } from 'recharts'

const Sparkline = memo(function Sparkline({ prices }: { prices: number[] }) {
  const data = useMemo(() => prices.map((price, i) => ({ i, price })), [prices])
  const isUp = prices[prices.length - 1] >= prices[0]

  return (
    <div className={isUp ? 'text-up' : 'text-down'}>
      <LineChart width={120} height={40} data={data}>
        <YAxis hide domain={['dataMin', 'dataMax']} />
        <Line
          dataKey='price'
          stroke='currentColor'
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </div>
  )
})

export default Sparkline
