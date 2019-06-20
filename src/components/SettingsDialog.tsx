import Button from '@material-ui/core/Button'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import React, { FC, useCallback, useRef, useState } from 'react'
import Settings from '../entities/Settings'

interface Props extends DialogProps {
  settings: Settings
  onChangeSettings: (settings: Settings) => void
  onClose: () => void
}

const SettingsDialog: FC<Props> = props => {
  const { settings, onChangeSettings, ...dialogProps } = props
  const { onClose } = dialogProps

  const [dirtySettings, setDirtySettings] = useState<Settings>(settings)
  const dirtySettingsReference = useRef(dirtySettings)

  const editServerURL = useCallback<Required<TextFieldProps>['onChange']>(
    event => {
      const serverURL = event.target.value
      dirtySettingsReference.current = {
        ...dirtySettingsReference.current,
        serverURL
      }
      setDirtySettings(dirtySettingsReference.current)
    },
    []
  )

  const editUser = useCallback<Required<TextFieldProps>['onChange']>(event => {
    const user = event.target.value
    dirtySettingsReference.current = {
      ...dirtySettingsReference.current,
      user
    }
    setDirtySettings(dirtySettingsReference.current)
  }, [])

  const commit = useCallback(() => {
    onClose()
    onChangeSettings(dirtySettingsReference.current)
  }, [onChangeSettings, onClose, dirtySettingsReference])

  return (
    <Dialog fullWidth={true} {...dialogProps}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus={true}
          fullWidth={true}
          label="API endpoint"
          value={dirtySettings.serverURL}
          onChange={editServerURL}
        />
        <TextField
          fullWidth={true}
          label="User"
          value={dirtySettings.user}
          onChange={editUser}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={commit}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SettingsDialog
