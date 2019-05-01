export default function decToRgb (c) {
  return [
    (c & 0xff0000) >> 16,
    (c & 0x00ff00) >> 8,
    (c & 0x0000ff)
  ]
}
