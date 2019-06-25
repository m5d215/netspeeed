import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { FC } from 'react'
import Navigation from './containers/Navigation'
import NetworkSpeedChart from './containers/NetworkSpeedChart'
import PerTimeChart from './containers/PerTimeChart'
import ReferenceDatePicker from './containers/ReferenceDatePicker'

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <Navigation />
      <Box padding={1}>
        <ReferenceDatePicker />
      </Box>
      <NetworkSpeedChart />
      <PerTimeChart />
    </>
  )
}

export default App
