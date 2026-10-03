import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

interface ButtonProps {
    title: string; 
    icon?: any;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

const Button = ({title, icon, style, onPress}: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[styles.container, style]}>
        <View style={{flexDirection: "row"}}>
            <Text style={styles.text}>{title}</Text>
            {icon}
        </View>
        </TouchableOpacity>
    )
}

export default Button; 

const styles = StyleSheet.create({
    container: {
        borderColor: "#A8A8A8",
        height: 45,
        width: "100%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        backgroundColor: "#920013"


    },
    text: {
        color: "#F6F6F6",
        fontWeight: "600",
    }
})