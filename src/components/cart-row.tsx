import { CartItem } from "@/domain/cart-item";
import { useCart } from "@/store/cart";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
    item: CartItem;
    onIncrease: () => void;
    onDecrease: () => void;
}

const IMAGE_BASE = "https://image.tmdb.org/t/p/w154";
export default function CartRow({ item, onDecrease, onIncrease }: Props) {
    const deleteFromCart = useCart((s) => s.deleteFromCart);

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
                    {item.amount} x {item.price}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <Pressable onPress={onDecrease} hitSlop={12}>
                        <Ionicons name="remove-circle-outline" size={26} color={"white"} />
                    </Pressable>
                    <Text style={{ color: "white", minWidth: 20, textAlign: "center" }}>{item.amount}</Text>
                    <Pressable onPress={onIncrease} hitSlop={12}>
                        <Ionicons name="add-circle-outline" size={26} color={"white"} />
                    </Pressable>
                    <Ionicons name="trash" onPress={() => deleteFromCart(item.movie.id)} size={18} color="white"></Ionicons>

                </View>
            </View>
        </View>
    );
}