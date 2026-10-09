import Button from "@/components/button";
import OrderRow from "@/components/order-row";
import { useCart } from "@/store/cart";
import { useCurrentUser, useUser } from "@/store/user";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function CheckoutScreen() {
    const cart = useCart((s) => s.cart);
    const placeOrder = useUser((s) => s.placeOrder);

    const user = useCurrentUser();
    const [name, onChangeName] = useState(user?.name ?? "");
    const [email, onChangeEmail] = useState(user?.email ?? "");

    const orderPlaced = useRef(false);
    const router = useRouter();

    const isEmailValid = /^\S+@\S+\.\S+$/.test(email.trim());
    const disabled = name.trim() === "" || !isEmailValid || cart.length === 0;


    const onSubmit = () => {
        orderPlaced.current = true;
        const order = placeOrder(name, email);
        if (!order) {
            orderPlaced.current = false;
            return;
        }

        router.dismissAll();
        setTimeout(() => {
            router.push({
                pathname: "/order-confirmation",
                params: { orderId: String(order.id) }
            });
        }, 350)

    };

    useEffect(() => {
        if (!useCart.persist.hasHydrated()) return;

        if (cart.length === 0 && !orderPlaced.current) {
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

                    <Button disabled={disabled} style={{ backgroundColor: "#1A1A1A", marginTop: 18 }} title="Lägg beställning"
                        onPress={onSubmit

                        }></Button>

                    {!user && (
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                            <Text style={{ color: "white" }}>Har du ingen användare?</Text>
                            <Text style={{ color: "white" }}>Ett konto skapas när du placerar en order.</Text>
                        </View>
                    )}

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
        backgroundColor: "#1A1A1A"

    }
});