import CssBaseline from '@material-ui/core/CssBaseline'
import React, { FC } from 'react'
import Navigation from './containers/Navigation'
import NetworkSpeedChart from './containers/NetworkSpeedChart'
import ReferenceDatePicker from './containers/ReferenceDatePicker'

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <Navigation />
      <ReferenceDatePicker />
      <NetworkSpeedChart />
    </>
  )
}

export default App
