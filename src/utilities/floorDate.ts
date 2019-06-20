const MS_PER_DAY = 24 * 60 * 60 * 1000

export default function floorDate(timestamp: number): number {
  return timestamp - (timestamp % MS_PER_DAY)
}
