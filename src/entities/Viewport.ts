import dayjs from 'dayjs'

export default interface Viewport {
  resolution: DateResolution
  timestamp: number
}

export type DateResolution = 'month' | 'week' | 'day'

export interface TimestampRange {
  begin: number
  end: number
}

export function transformRange(viewport: Viewport): TimestampRange {
  const d = dayjs(viewport.timestamp)
  switch (viewport.resolution) {
    case 'month':
      return {
        begin: d.add(-1, 'month').valueOf(),
        end: d.add(1, 'day').valueOf()
      }

    case 'week':
      return {
        begin: d.add(-1, 'week').valueOf(),
        end: d.add(1, 'day').valueOf()
      }

    case 'day':
      return {
        begin: viewport.timestamp,
        end: d.add(1, 'day').valueOf()
      }
  }
}
