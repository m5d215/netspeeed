import { makeStyles, Theme } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import yellow from '@material-ui/core/colors/yellow'
import dayjs from 'dayjs'
import { round } from 'number-precision'
import React, { FC, useCallback } from 'react'
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'
import NetworkSpeed from '../entities/NetworkSpeed'
import { DateResolution } from '../entities/Viewport'

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fill: theme.palette.text.hint
  }
}))

interface Props {
  records: NetworkSpeed[]
  resolution: DateResolution
}

const NetworkSpeedChart: FC<Props> = props => {
  const { records, resolution } = props
  const classes = useStyles()

  const selectTimestamp = useCallback(
    resolution !== 'day'
      ? ({ timestamp }: NetworkSpeed) => dayjs(timestamp).format('MM/DD')
      : ({ timestamp }: NetworkSpeed) => dayjs(timestamp).format('HH:mm'),
    [resolution]
  )

  return (
    <ResponsiveContainer>
      <LineChart data={records}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={selectTimestamp} interval="preserveStartEnd" />
        <YAxis yAxisId="MB" orientation="left">
          <Label angle={270} className={classes.label}>
            Mbps
          </Label>
        </YAxis>
        <YAxis yAxisId="ms" orientation="right">
          <Label angle={270} className={classes.label}>
            ms
          </Label>
        </YAxis>
        <Legend verticalAlign="bottom" height={36} />
        <Line
          name="upload"
          type="monotone"
          yAxisId="MB"
          dataKey={dataKeys.upload}
          stroke={yellow[500]}
          fill={yellow[500]}
        />
        <Line
          name="download"
          type="monotone"
          yAxisId="MB"
          dataKey={dataKeys.download}
          stroke={blue[500]}
          fill={blue[500]}
        />
        <Line
          name="ping"
          type="monotone"
          yAxisId="ms"
          dataKey={dataKeys.ping}
          stroke={pink[500]}
          fill={pink[500]}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default NetworkSpeedChart

const dataKeys: Record<
  Exclude<keyof NetworkSpeed, 'timestamp'>,
  (record: NetworkSpeed) => number
> = {
  upload: record => round(record.upload / 1000000, 1),
  download: record => round(record.download / 1000000, 1),
  ping: record => round(record.ping, 2)
}
