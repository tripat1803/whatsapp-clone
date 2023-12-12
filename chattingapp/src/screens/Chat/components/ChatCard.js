import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Color } from "../../../utils/Color";


export default function ChatCard({ name, message, time, avatar, unseen, user_id }) {

  const navigation = useNavigation();

  return (
    <Pressable onPress={() => {
      if(!user_id) return;
      navigation.navigate("PersonalChat", { name, user_id });
    }} style={styles.chatCard} android_ripple={{ color: "#BFC0C1" }}>
      <View style={styles.avatar}>
        <Image style={{ width: "100%", height: "100%" }} source={require("../../../../assets/logo.png")} />
      </View>
      <View style={styles.textContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
          <Text style={styles.text}>{name}</Text>
          {time && <Text style={{ ...styles.time, color: unseen ? Color.primary : "#84939A" }}>{time}</Text>}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
          <Text style={styles.message}>{String(message).substring(0, 40)}</Text>
          {unseen && <View style={styles.unseen}>
            <Text style={{ fontSize: 10, color: "#fff", fontWeight: "500" }}>{unseen}</Text>
          </View>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chatCard: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 14
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 0,
    justifyContent: "center"
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000"
  },
  message: {
    color: "#889095",
    fontSize: 13
  },
  time: {
    fontSize: 12,
    fontWeight: "600"
  },
  unseen: {
    backgroundColor: Color.primary,
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});