import { average, groupBy } from '../utilities/collection'

export default interface NetworkSpeed {
  timestamp: number
  upload: number
  download: number
  ping: number
}

export function smooth(
  records: NetworkSpeed[],
  smoothTimestamp: (timestamp: number) => number
): NetworkSpeed[] {
  const byDate = groupBy(records, ({ timestamp }) => {
    return smoothTimestamp(timestamp)
  })
  return Array.from(byDate.keys())
    .sort()
    .map<NetworkSpeed>(date => {
      const e = byDate.get(date)!
      return {
        timestamp: date,
        upload: average(e, ({ upload }) => upload),
        download: average(e, ({ download }) => download),
        ping: average(e, ({ ping }) => ping)
      }
    })
}
