import { useCart } from "@/store/cart";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const open = pathname === "/cart";
  const count = useCart((s) => s.cart.reduce((sum, i) => sum + i.amount, 0));
  return (
    < Tabs 
    screenOptions={{
      headerShown: true,
      headerRight: () => (
        <Pressable onPress={() => router.push("/cart")} hitSlop={12} style={{ marginRight: 16 }} accessibilityLabel="Cart">
          <Ionicons name={open ? "cart" : "cart-outline"}size={28} color="#A8A8A8" />
          {count > 0 && (
            <View style={{position: "absolute", top: -6, right: -8, minWidth: 18, paddingHorizontal: 4, borderRadius: 9, backgroundColor: "#920013", alignItems: "center", justifyContent: "center"}}>
              <Text style={{color: "white", fontSize: 11, fontWeight: "bold"}}>
                {count > 99 ? "99+" : count}
              </Text>
            </View>
          )}
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