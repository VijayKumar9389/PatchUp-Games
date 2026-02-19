export type Region = {
  id: string
  path: string           // SVG path data
  targetColor?: string   // Optional hint color for paint-by-numbers
  currentColor: string   // Current fill color (starts white)
}

export type Template = {
  id: string
  name: string
  viewBox: string
  regions: Region[]
}
