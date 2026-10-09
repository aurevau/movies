import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="cart" options={{
          headerShown: false,
          presentation: "formSheet",
          sheetAllowedDetents: [0.5, 1],
          sheetInitialDetentIndex: 0,
          sheetGrabberVisible: true,
          sheetCornerRadius: 24
        }} />
        <Stack.Screen name="movie-details" options={{
          headerShown: false,
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetCornerRadius: 24
        }} />
        <Stack.Screen name="checkout" options={{
          headerShown: true,
          title: "Kassa",
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetCornerRadius: 24,
          }}/>
        <Stack.Screen name="order-confirmation" options={{
          headerShown: false,
          presentation: "fullScreenModal",
          gestureEnabled: false,
          }}/>
      </Stack>
    </ThemeProvider>
  )

}