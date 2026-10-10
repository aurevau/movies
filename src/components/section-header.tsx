import { StyleSheet, Text, View } from "react-native";

const SectionHeader = ({title}:{title: string}) => {
    return (
        <View style={styles.sectionHeader}>
            <Text style={{color: "#F6F6F6", fontWeight: "600", fontSize: 16}}>{title}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 14
    }
})

export default SectionHeader;