export function animateCounter(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number = 2000,
  suffix: string = ""
) {
  const range = end - start
  const startTime = performance.now()

  function update(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.floor(start + range * eased)
    element.textContent = `${current}${suffix}`

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      element.textContent = `${end}${suffix}`
    }
  }

  requestAnimationFrame(update)
}
