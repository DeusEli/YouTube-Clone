import React, { useEffect } from "react";
import { View, Text, FlatList, ScrollView, SafeAreaView } from "react-native";
import Header from "../components/header";
import VideoCard from "../components/videoCard";
import VideoList from "../components/videoList";

const HomeScreen = () => {
  const [videos, setVideos] = React.useState([]);
  const ytKey = "AIzaSyBPudxjI2PCl-_MDnWp3M4gnxS5hGjfct0";

  const fetchVideos = async () => {
    const response = await fetch(
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&type=video&key=" +
        ytKey
    );
    const data = await response.json();
    setVideos(data.items);
  };

  useEffect(() => {
    fetchVideos();
    // console.log("Abajo están los videos");
    // console.log(videos);
  }, []);

  return (
    <ScrollView className="bg-stone-900 h-full pb-16">
      <SafeAreaView>
        <Header />
        <View className="flex flex-col items-center mb-8">
          <VideoList video={videos} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
