import { useRef, useState } from 'react'

const MAX_TILT_DEG = 10

export function TiltImage({
  src,
  alt,
  width,
  height,
  className = '',
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 })

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = containerRef.current?.getBoundingClientRect()
    if (!bounds) return

    const px = (event.clientX - bounds.left) / bounds.width
    const py = (event.clientY - bounds.top) / bounds.height

    const rotateY = (px - 0.5) * MAX_TILT_DEG * 2
    const rotateX = (0.5 - py) * MAX_TILT_DEG * 2

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
    })
    setGlareStyle({
      opacity: 0.16,
      background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.9), transparent 55%)`,
    })
  }

  function handlePointerLeave() {
    setStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' })
    setGlareStyle({ opacity: 0 })
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ ...style, transition: 'transform 250ms ease-out' }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full object-contain"
        draggable={false}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={glareStyle}
      />
    </div>
  )
}
