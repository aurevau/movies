import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

export function Favorite() {
    return (
        <TouchableOpacity
        style={styles.button} onPress={() => {}} hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
             <Ionicons name =  "heart-outline" style={{color: "#F6F6F6", fontSize: 20}}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 1,
        width: 42,
        height: 42,
        borderRadius: 999,
        backgroundColor: "#1A1A1A",
        alignItems: "center",
        justifyContent: "center",

    },
})