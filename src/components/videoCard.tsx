import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {
  video: any;
}

export default function VideoCard() {
  const navigation = useNavigation();

  return (
    <View className="w-full">
      <Pressable
        className=""
        onPress={() => {
          navigation.navigate("VideoPlayer");
        }}
      >
        <Image
          className="w-full h-56"
          //source={{ uri: "https://i.ytimg.com/vi/G_tn9h8InGM/default_live.jpg" }}
          source={{
            uri: "https://i.ytimg.com/vi/G_tn9h8InGM/hqdefault_live.jpg",
          }}
        />
      </Pressable>

      <View className="flex flex-row p-2 pt-4 w-full">
        <Pressable onPress={() => console.log("Channel pressed")}>
          <Image
            className="w-12 h-12 rounded-full"
            source={{
              uri: "https://yt3.ggpht.com/ipwuju0y7t8vzr1FY99Q1XSeuf1fcf9fvP2GcAGFvj9VtIlbLY9FcuFglxADwsxzUi-rhxIVR1Y=s800-c-k-c0xffffffff-no-rj-mo",
            }}
          />
        </Pressable>
        <View className="flex flex-col ml-4 w-full">
          <Text className="text-sm font-semibold text-white flex-wrap">
            ONE PIECE BRUH QUESO PANQUEQUE
          </Text>
          <View className="flex flex-row h-44 w-40">
            <Text className="text-sm text-gray-400">Canal de música</Text>
            <Text className="text-sm text-gray-400"> ● </Text>
            <Text className="text-sm text-gray-400">7M de visitas</Text>
            <Text className="text-sm text-gray-400"> ● </Text>
            <Text className="text-sm text-gray-400">Hace 2 años</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
