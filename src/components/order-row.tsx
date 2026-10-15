import { CartItem } from "@/domain/cart-item";
import { Image, Text, View } from "react-native";


type Props = {
    item: CartItem
}

const IMAGE_BASE = "https://image.tmdb.org/t/p/w154";
export default function OrderRow({ item }: Props) {
    return (
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center", }}>
            {item.movie.poster_path && (
                <Image source={{ uri: `${IMAGE_BASE}${item.movie.poster_path}` }} style={{ width: 50, aspectRatio: 2 / 3, borderRadius: 6 }} />
            )}
            <View style={{ flex: 1 }}>
                <Text style={{ color: "white", fontWeight: "bold" }} numberOfLines={1}>
                    {item.movie.title}
                </Text>
                <Text style={{ color: "white" }}>
                    {item.amount} x {item.price} kr
                </Text>
            </View>
        </View>

    )
}