export function get(key) {
  let data = null
  try {
    data = JSON.parse(sessionStorage.getItem(key))
  } catch (e) {
    return null
  }
  return data
}

export function set(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export function clear() {
  sessionStorage.clear()
}
