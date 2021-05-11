export default function json(text = '') {
  try {
    return JSON.parse(text)
  } catch (e) {
    return {}
  }
}
