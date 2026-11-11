import { SERVICES, STANDARDS, type StandardId } from '../data/services'

export type CalcType = 'house' | 'interior' | 'adaptation'
export const AREA = { min: 20, max: 800 }
/** Minimalne wynagrodzenie za projekt (zł netto). */
const MIN_FEE: Record<CalcType, number> = { house: 18000, interior: 6000, adaptation: 15000 }

export function estimate(type: CalcType, area: number, standard: StandardId) {
  const service = SERVICES.find((s) => s.id === type)!
  const { min, max } = service.rate!
  const factor = STANDARDS.find((s) => s.id === standard)!.factor
  const spread = max - min
  const lowRate = min + spread * factor * 0.6
  const highRate = lowRate + spread * 0.4
  const round = (v: number) => Math.round(v / 100) * 100
  return {
    service,
    low: Math.max(MIN_FEE[type], round(lowRate * area)),
    high: Math.max(MIN_FEE[type] * 1.3, round(highRate * area)),
  }
}
