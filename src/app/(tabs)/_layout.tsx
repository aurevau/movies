import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const open = pathname === "/cart";
  return (
    < Tabs 
    screenOptions={{
      headerShown: true,
      headerRight: () => (
        <Pressable onPress={() => router.push("/cart")} hitSlop={12} style={{ marginRight: 16 }} accessibilityLabel="Cart">
          <Ionicons name={open ? "cart" : "cart-outline"}size={28} color="#A8A8A8" />
        </Pressable>
      ),
      tabBarActiveTintColor:"#F6F6F6",
    // tabBarInactiveTintColor: "#1A1A1A",
      tabBarStyle: {
  
      },
    }}
    >
      <Tabs.Screen name='(home)/index' options={{
        title: "Home",
        tabBarIcon: ({focused, color, size}) => (
          <Ionicons name = {focused ? "home" : "home-outline"} size={size} color={color}/>
        )
      }} />
      <Tabs.Screen name='(home)/favorites' options={{
        title: "Favorites",
        tabBarIcon: ({focused, color, size}) => (
          <Ionicons name = {focused ? "heart" : "heart-outline"} size={size} color={color}/>
        )
      }}/>

    </Tabs>
  );

}