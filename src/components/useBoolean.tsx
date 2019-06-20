import { useCallback, useState } from 'react'

export default function useBoolean(
  initialState: boolean | (() => boolean)
): [boolean, () => void, () => void] {
  const [state, setState] = useState(initialState)
  return [
    state,
    useCallback(() => setState(true), []),
    useCallback(() => setState(false), [])
  ]
}
