import { connect } from 'react-redux'
import NetworkSpeedChart from '../components/NetworkSpeedChart'
import State from '../modules/State'

export default connect(
  (state: State) => {
    const {
      records,
      viewport: { resolution }
    } = state
    return { records, resolution }
  },
  {}
)(NetworkSpeedChart)
