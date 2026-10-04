import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

interface ButtonProps {
    title: string;
    icon?: any;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    disabled?: boolean;
}

const Button = ({ title, icon, style, onPress, disabled = false }: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.6} style={[styles.container, style, disabled && styles.disabled]}
        >
            <View style={{ flexDirection: "row" }}>
                <Text style={[styles.text, disabled && styles.disabledText]}>{title}</Text>
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
    },
    disabled: { opacity: 0.4, backgroundColor: "#555" },
    disabledText: {
        color: "#999"
    }
})