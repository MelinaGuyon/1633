import { damp } from '@internet/maths'

export default function preciseDamp (v, target, smooth, dt, threshold = 0.1) {
  if (target === v) return target
  const damped = damp(v, target, smooth, dt)
  return Math.abs(damped - target) <= threshold ? target : damped
}
