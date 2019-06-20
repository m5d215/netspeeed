import { makeStyles, Theme } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Tab from '@material-ui/core/Tab'
import Tabs, { TabsProps } from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck'
import SettingsIcon from '@material-ui/icons/Settings'
import React, { FC, useCallback } from 'react'
import SettingsDialog from '../containers/SettingsDialog'
import Viewport, { DateResolution } from '../entities/Viewport'
import useBoolean from './useBoolean'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginLeft: theme.spacing(1),
    flexGrow: 1
  }
}))

interface Props {
  resolution: DateResolution
  onChange: (viewport: Partial<Viewport>) => void
}

const Navigation: FC<Props> = props => {
  const { resolution, onChange } = props
  const classes = useStyles()

  const [open, openDialog, closeDialog] = useBoolean(false)

  const handleChange = useCallback<Required<TabsProps>['onChange']>(
    (_, value: DateResolution) => {
      onChange({ resolution: value })
    },
    [onChange]
  )

  return (
    <AppBar color="primary" position="static">
      <Toolbar variant="dense">
        <NetworkCheckIcon />
        <Typography
          className={classes.title}
          color="inherit"
          component="h1"
          variant="h5"
        >
          netspeeed
        </Typography>
        <IconButton onClick={openDialog}>
          <SettingsIcon fontSize="small" />
        </IconButton>
        <SettingsDialog open={open} onClose={closeDialog} />
      </Toolbar>
      <Tabs
        centered={true}
        indicatorColor="secondary"
        value={resolution}
        variant="fullWidth"
        onChange={handleChange}
      >
        <Tab label="Month" value="month" />
        <Tab label="Week" value="week" />
        <Tab label="Day" value="day" />
      </Tabs>
    </AppBar>
  )
}

export default Navigation
