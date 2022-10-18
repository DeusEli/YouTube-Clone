import React from "react";
import { View, Text, Pressable } from "react-native";
import Header from "../components/header";
import VideoCard from "../components/videoCard";

const HomeScreen = () => {
  return (
    <View className="bg-black h-full">
      <Header />
      <Text>Home Screen</Text>

      <VideoCard />
    </View>
  );
};

export default HomeScreen;
