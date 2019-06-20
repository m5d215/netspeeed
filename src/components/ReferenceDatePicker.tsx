import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import FastForwardIcon from '@material-ui/icons/FastForward'
import FastRewindIcon from '@material-ui/icons/FastRewind'
import dayjs from 'dayjs'
import React, { FC, useCallback } from 'react'
import Viewport from '../entities/Viewport'

interface Props {
  timestamp: number
  onChange: (viewport: Partial<Viewport>) => void
}

const ReferenceDatePicker: FC<Props> = props => {
  const { timestamp, onChange } = props

  const change = useCallback(
    (value: number, unit: dayjs.OpUnitType) => {
      onChange({
        timestamp: dayjs(timestamp)
          .add(value, unit)
          .valueOf()
      })
    },
    [timestamp, onChange]
  )

  const prevW = useCallback(() => change(-1, 'week'), [change])
  const prevD = useCallback(() => change(-1, 'day'), [change])
  const nextW = useCallback(() => change(+1, 'week'), [change])
  const nextD = useCallback(() => change(+1, 'day'), [change])

  return (
    <Grid container={true} justify="center" alignItems="center">
      <IconButton onClick={prevW}>
        <FastRewindIcon />
      </IconButton>
      <IconButton onClick={prevD}>
        <ArrowLeftIcon />
      </IconButton>
      <Typography variant="h6">
        {dayjs(timestamp).format('YYYY/MM/DD')}
      </Typography>
      <IconButton onClick={nextD}>
        <ArrowRightIcon />
      </IconButton>
      <IconButton onClick={nextW}>
        <FastForwardIcon />
      </IconButton>
    </Grid>
  )
}

export default ReferenceDatePicker
