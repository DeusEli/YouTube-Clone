import React, { useEffect } from "react";
import { View, Text, FlatList, ScrollView, SafeAreaView } from "react-native";
import Header from "../components/header";
import VideoList from "../components/videoList";
import variables from "../../global";

const HomeScreen = () => {
  const [videos, setVideos] = React.useState([]);
  const ytKey = variables.getApiKey();

  const fetchVideos = async () => {
    const response = await fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=15&type=video&key=" +
        ytKey
    );
    // "https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=2&key=" +
    //   ytKey
    const data = await response.json();
    setVideos(data.items);
  };

  console.log(videos);

  //https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&type=video&key=AIzaSyAhZ9OXl38H3SOo-BxuZyCtZPzSWPLeBuk

  //https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=2&type=video&key=AIzaSyCCWG3OzEB8q6D2OgFg-ywK-3o5TQtzz54

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
          <VideoList video={videos} id={""} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
