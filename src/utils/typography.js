import Typography from "typography"

const theme = {
  baseFontSize: "16px",
  baseLineHeight: 1.75,
  scaleRatio: 2,
  googleFonts: [
    {
      name: 'JetBrains+Mono',
      styles: ['400', '700'],
    },
    {
      name: 'Noto+Sans+JP',
      styles: ['400', '700'],
    },
  ],
  headerFontFamily: [
    "JetBrains Mono",
    "Noto Sans JP",
    "monospace",
  ],
  bodyFontFamily: [
    "Noto Sans JP",
    "sans-serif",
  ],
  bodyColor: "#e6edf3",
}

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
