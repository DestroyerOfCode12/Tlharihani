import { useEffect, useRef, useState } from 'react'

const FRAME_INTERVAL_MS = 900

export function FrameCycleImage({
  images,
  activeIndex,
  alt,
  width,
  height,
  className = '',
}: {
  images: string[]
  activeIndex: number
  alt: string
  width: number
  height: number
  className?: string
}) {
  const [hovering, setHovering] = useState(false)
  const [cycleIndex, setCycleIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  useEffect(() => {
    if (!hovering || images.length < 2) return

    intervalRef.current = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % images.length)
    }, FRAME_INTERVAL_MS)

    return () => clearInterval(intervalRef.current)
  }, [hovering, images.length])

  const displayedIndex = hovering ? cycleIndex : activeIndex

  return (
    <div
      onMouseEnter={() => {
        setCycleIndex(activeIndex)
        setHovering(true)
      }}
      onMouseLeave={() => setHovering(false)}
      className={`relative ${className}`}
    >
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={index === displayedIndex ? alt : ''}
          width={width}
          height={height}
          className={`h-full w-full object-contain transition-opacity duration-300 ${
            index === displayedIndex ? 'opacity-100' : 'absolute inset-0 opacity-0'
          }`}
          draggable={false}
        />
      ))}
      {images.length > 1 ? (
        <div className="pointer-events-none absolute right-3 bottom-3 flex gap-1.5">
          {images.map((src, index) => (
            <span
              key={src}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                index === displayedIndex ? 'bg-accent' : 'bg-grey-400/60'
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
