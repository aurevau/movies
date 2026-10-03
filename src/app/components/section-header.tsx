import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SectionHeader = ({title}:{title: string}) => {
    return (
        <View style={styles.sectionHeader}>
            <Text style={{color: "#F6F6F6", fontWeight: "600", fontSize: 16}}>{title}</Text>

            <TouchableOpacity activeOpacity={.8} style={{padding: 18}}>
                <Text style={{color: "#920013"}}>See more</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
        marginHorizontal: 14
    }
})

export default SectionHeader;