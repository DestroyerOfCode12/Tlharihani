import { useEffect, useRef } from 'react'

/** Runs the effect on dependency change, but skips the initial mount. */
export function useEffectAfterMount(effect: () => void, deps: unknown[]) {
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
