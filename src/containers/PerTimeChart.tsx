import { connect } from 'react-redux'
import PerTimeChart from '../components/PerTimeChart'
import State from '../modules/State'

export default connect(
  (state: State) => {
    const { records } = state
    return { records }
  },
  {}
)(PerTimeChart)
