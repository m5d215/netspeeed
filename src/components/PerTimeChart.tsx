import { Theme } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import yellow from '@material-ui/core/colors/yellow'
import { useTheme } from '@material-ui/styles'
import dayjs from 'dayjs'
import React, { FC, useMemo } from 'react'
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer
} from 'recharts'
import NetworkSpeed from '../entities/NetworkSpeed'
import { average, groupBy } from '../utilities/collection'

interface Props {
  records: NetworkSpeed[]
}

const PerTimeChart: FC<Props> = props => {
  const { records } = props

  const theme = useTheme<Theme>()
  const tick = useMemo<React.CSSProperties>(() => {
    return {
      fill: theme.palette.divider
    }
  }, [theme])

  const m = groupBy(records, ({ timestamp }) => dayjs(timestamp).hour())

  const data = Array.from(m.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([hour, items]) => {
      return {
        hour,
        upload: average(items, record => record.upload),
        download: average(items, record => record.download)
      }
    })

  return (
    <ResponsiveContainer>
      <RadarChart data={data}>
        <PolarGrid stroke={theme.palette.divider} />
        <PolarAngleAxis dataKey="hour" tick={tick} />
        <Radar
          dataKey="download"
          stroke={blue[500]}
          fill={blue[500]}
          fillOpacity={0.6}
        />
        <Radar
          dataKey="upload"
          stroke={yellow[500]}
          fill={yellow[500]}
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default PerTimeChart
