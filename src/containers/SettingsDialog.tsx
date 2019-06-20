import { connect } from 'react-redux'
import SettingsDialog from '../components/SettingsDialog'
import { changeSettings } from '../modules/actions'
import State from '../modules/State'

export default connect(
  (state: State) => {
    const { settings } = state
    return { settings }
  },
  { onChangeSettings: changeSettings }
)(SettingsDialog)
