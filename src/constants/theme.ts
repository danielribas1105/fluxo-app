/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native"

const tintColorGreen = "#22C55E"
const tintColorRed = "#EF4444"

export const Colors = {
   light: {
      text: "#11181C",
      background: "#fff",
      tint: tintColorGreen,
      icon: "#687076",
      tabIconDefault: "#687076",
      tabIconSelected: tintColorGreen,
   },
   dark: {
      text: "#ECEDEE",
      background: "#151718",
      tint: tintColorRed,
      icon: "#9BA1A6",
      tabIconDefault: "#9BA1A6",
      tabIconSelected: tintColorRed,
   },
   theme: {
      title: "#F1F3F6",
      text: "#8894A7",
      background: "#0D1321",
      tintGreen: "#4ADE80",
      tintRed: "#4ADE80",
      icon: "#9BA1A6",
      tabIconDefault: "#9BA1A6",
      tabIconSelected: tintColorGreen,
      income: tintColorGreen,
      expense: tintColorRed,
   },
}

export const Fonts = Platform.select({
   ios: {
      /** iOS `UIFontDescriptorSystemDesignDefault` */
      sans: "system-ui",
      /** iOS `UIFontDescriptorSystemDesignSerif` */
      serif: "ui-serif",
      /** iOS `UIFontDescriptorSystemDesignRounded` */
      rounded: "ui-rounded",
      /** iOS `UIFontDescriptorSystemDesignMonospaced` */
      mono: "ui-monospace",
   },
   default: {
      sans: "normal",
      serif: "serif",
      rounded: "normal",
      mono: "monospace",
   },
   web: {
      sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      serif: "Georgia, 'Times New Roman', serif",
      rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
      mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
   },
})
