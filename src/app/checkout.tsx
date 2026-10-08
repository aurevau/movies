import Button from "@/components/button";
import OrderRow from "@/components/order-row";
import { useCart } from "@/store/cart";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

export default function CheckoutScreen() {
    const cart = useCart((s) => s.cart);
    const placeOrder = useCart((s) => s.placeOrder);
    const [name, onChangeName] = useState("Name");
    const [email, onChangeEmail] = useState("Email");

    const disabled = name === "Name" && email === "Email";

    const router = useRouter();

    useEffect(() => {
        if (cart.length === 0) {
            router.canGoBack() ? router.back() : router.replace("/");
        }
    }, [cart.length]);
    

    

    return (
        <FlatList data={cart}
            keyExtractor={(item) => String(item.movie.id)}
            contentContainerStyle={{ padding: 16, gap: 12 }}
            contentInsetAdjustmentBehavior="automatic"
            renderItem={({ item }) => <OrderRow item={item} />}
            ListFooterComponent={
                <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                    <TextInput style={styles.input} onChangeText={onChangeName} value={name} />
                    <TextInput style={styles.input} onChangeText={onChangeEmail} value={email} />

                    <Button disabled={disabled} style={{backgroundColor: "#1A1A1A", marginTop: 18}} title="Lägg beställning" onPress={() => placeOrder(name, email)
                    }></Button>


                </View>
            }>

        </FlatList>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 48,
        margin: 4,
        borderWidth: 1,
        color: "#A8A8A8",
        padding: 10,
        width: "100%",
        borderRadius: 12,
        borderColor: "#A8A8A8",
        backgroundColor: "1A1A1A"
    
    }
});