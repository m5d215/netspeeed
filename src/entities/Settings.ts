export default interface Settings {
  serverURL: string
  user: string
}

export const defaultSettings: Settings = {
  serverURL: 'http://127.0.0.1',
  user: 'default'
}
