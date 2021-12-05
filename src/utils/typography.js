import Typography from "typography"

const theme = {
  baseFontSize: "16px",
  baseLineHeight: 1.75,
  scaleRatio: 2,
  googleFonts: [
    {
      name: 'M+PLUS+Rounded+1c',
      styles: ['400'],
    },
    {
      name: 'Noto+Sans+JP',
      styles: ['400'],
    },
  ],
  headerFontFamily: [
    "M PLUS Rounded 1c",
    "sans-serif",
  ],
  bodyFontFamily: [
    "Noto Sans JP",
    "sans-serif",
  ],
  bodyColor: "hsl(0,0%,0%,0.8)",
}


const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
