function ChartContainer({ height = 'h-72', children }) {
  return (
    <div className={`${height}`}>
      {children}
    </div>
  )
}

export default ChartContainer



