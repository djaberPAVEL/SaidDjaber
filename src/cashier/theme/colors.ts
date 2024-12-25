export const themeColors = {
  primary: {
    base: "rgb(113, 75, 103)",
    darker: "rgb(93, 55, 83)",
    lighter: "rgb(133, 95, 123)",
    light: "rgb(153, 115, 143)",
  },
  // Add more color schemes as needed
  secondary: {
    base: "rgb(75, 103, 113)",
    darker: "rgb(55, 83, 93)",
    lighter: "rgb(95, 123, 133)",
  },
  // You can add more color variations and schemes here
} as const;

export type ThemeColors = typeof themeColors;
