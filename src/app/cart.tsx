import Button from "@/components/button";
import CartRow from "@/components/cart-row";
import { useCart } from "@/store/cart";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function CartScreen() {
    const cart = useCart((s) => s.cart);
    const addToCart = useCart((s) => s.addToCart);
    const decrease = useCart((s) => s.decrease);
    const clearCart = useCart((s) => s.clearCart);

    const total = cart.reduce((sum, item) => sum + item.price * item.amount, 0);
    const router = useRouter();

    const goToCheckout = () => {
        router.dismiss()
        router.push("/checkout");
    }


    if (cart.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white" }}>Kundvagnen är tom</Text>
            </View>
        )
    }

    return (
        <>
            <FlatList data={cart}
                keyExtractor={(m) => String(m.movie.id)}
                contentContainerStyle={{ padding: 16, gap: 12 }}
                renderItem={({ item }) => <CartRow item={item} onIncrease={() => addToCart(item.movie, item.price)} onDecrease={() => decrease(item.movie.id)} />}
                ListHeaderComponent={
                    <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
                    <Ionicons name="trash" onPress={clearCart} size={24} color="white"></Ionicons>
                    </View>

                } ListFooterComponent={
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <View style={{flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "center" }}>
                         <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Totalt: </Text>
                        <Text style={{ color: "white", fontSize: 18 }}>{total} kr</Text>
                    </View>
                    
                    <Button style={{backgroundColor: "#1A1A1A", marginTop: 18}} title="Till kassan" onPress={() => goToCheckout()
                    }></Button>
                    </View>
                }

            />


        </>


    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#F6F6F6"
    },
    sub: {
        marginTop: 24,
        color: "#666",
    }
})