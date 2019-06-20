export function groupBy<T, K>(items: T[], keyof: (item: T) => K): Map<K, T[]> {
  const m = new Map<K, T[]>()
  items.forEach(item => {
    const key = keyof(item)
    const value = m.get(key)
    if (value === undefined) {
      m.set(key, [item])
    } else {
      value.push(item)
    }
  })
  return m
}

export function average<T>(items: T[], selector: (item: T) => number): number {
  return items.reduce((s, x) => s + selector(x), 0) / items.length
}
