export function get(key) {
  let data = null
  try {
    data = JSON.parse(localStorage.getItem(key))
  } catch (e) {
    return null
  }
  return data
}

export function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function clear() {
  localStorage.clear()
}
