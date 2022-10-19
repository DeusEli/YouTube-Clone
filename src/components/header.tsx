import React from "react";
import { View, Image, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
  return (
    <View className="flex flex-row justify-between pt-12 bg-black h-24 pb-4">
      <View className="flex flex-row items-center">
        <Image
          className="w-12 h-12"
          resizeMode="cover"
          source={require("../../img/yt.png")}
        ></Image>
        <Text className="pl-2 text-base font-bold text-white">Youtube</Text>
      </View>
      <View className="flex flex-row items-center">
        <Text className="">
          <Ionicons name="search" size={22} color="white" />
        </Text>
        <Image
          className="w-8 h-8 self-center ml-2"
          resizeMode="cover"
          source={require("../../img/man.png")}
        ></Image>
      </View>
    </View>
  );
}
