import { StyleSheet, Text, View } from "react-native"

export default function CartScreen () {
    
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>
        <Text style={styles.sub}>Your cart is empty</Text>
        </View>

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