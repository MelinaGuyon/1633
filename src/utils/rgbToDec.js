export default function rgbToDec (c) {
  return (c[0] << 16) + (c[1] << 8) + (c[2])
}
