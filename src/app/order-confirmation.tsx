import Button from "@/components/button";
import OrderRow from "@/components/order-row";
import { useCurrentUser } from "@/store/user";
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { FlatList, Text, View } from "react-native";

export default function OrderConfirmationScreen() {
    const { orderId } = useLocalSearchParams<{ orderId: string }>();
    const user = useCurrentUser();
    const order = user?.orders.find((o) => o.id === orderId);
    const router = useRouter();

    const close = () => (router.canDismiss() ? router.dismiss() : router.replace("/"));


    if (!order) {
        return (
            <View style={{ flex: 1, backgroundColor: "#0F0F0F", alignItems: "center", justifyContent: "center", padding: 24 }}>
                <Text style={{ color: "white", marginBottom: 16 }}>
                    Kunde inte hitta din order
                </Text>
                <Button style={{ backgroundColor: "#1A1A1A", marginTop: 18 }} title="Stäng" onPress={close}></Button>
            </View>
        )
    }
    return (
        <FlatList
            style={{ flex: 1 }}
            data={order.items}
            keyExtractor={(item) => String(item.movie.id)}
            contentContainerStyle={{ padding: 16, gap: 12, paddingTop: 60 }}
            ListHeaderComponent={
                <View style={{ alignItems: "center", marginBottom: 16 }}>
                    <LottieView source={require("../../assets/animations/order_placed.json")} autoPlay loop={false} style={{ width: 200, height: 200 }} />
                    <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>Tack, {order.name}!</Text>
                    <Text style={{ color: "#A8A8A8", marginTop: 4 }}>För din beställning</Text>
                </View>
            }
            renderItem={({ item }) => <OrderRow item={item} />}
            ListFooterComponent={

                <View style={{ padding: 16, paddingBottom: 32 }}>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", textAlign: "right", marginTop: 8 }}>
                        Totalt: {order?.totalAmount} kr
                    </Text>
                    <Button style={{ backgroundColor: "#1A1A1A", marginTop: 18 }} title="Stäng" onPress={close}></Button>
                </View>}/>
    )
}