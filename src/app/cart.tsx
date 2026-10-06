import Button from "@/components/button";
import CartRow from "@/components/cart-row";
import { useCart } from "@/store/cart";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function CartScreen() {
    const cart = useCart((s) => s.cart);
    const addToCart = useCart((s) => s.addToCart);
    const decrease = useCart((s) => s.decrease);
    const clearCart = useCart((s) => s.clearCart);
    
    if (cart.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white" }}>Kundvagnen är tom</Text>
            </View>
        )
    }

    return (
        <FlatList data={cart}
            keyExtractor={(m) => String(m.movie.id)}
            contentContainerStyle={{ padding: 16, gap: 12 }}
            renderItem={({ item }) => <CartRow item={item} onIncrease={() => addToCart(item.movie, item.price)} onDecrease={() => decrease(item.movie.id)}/>}
            ListHeaderComponent={
                <Button title="Töm kundvagnen" onPress={clearCart} style={{marginTop: 16}}/>
            } />

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