import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../components/header";
import VideoList from "../components/videoList";

interface Props {
  route: any;
}

const Channel = ({ route }: Props) => {
  const selectedChannelData = route.params.selectedChannel;
  const [videos, setVideos] = React.useState([]);
  const ytKey = "AIzaSyBPudxjI2PCl-_MDnWp3M4gnxS5hGjfct0";
  const channelId = selectedChannelData.id;

  const fetchVideos = async () => {
    const response = await fetch(
      "https://www.googleapis.com/youtube/v3/search?key=" +
        ytKey +
        "&channelId=" +
        channelId +
        "&part=snippet,id&order=date&maxResults=2"
    );
    const data = await response.json();
    setVideos(data.items);
    console.log(response);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const banner = {
    uri: selectedChannelData.brandingSettings.image?.bannerExternalUrl,
  };
  return (
    <SafeAreaView className="flex flex-col w-full h-full bg-stone-900">
      <ScrollView>
        <Header />
        {/* <Text>{selectedChannelData.snippet.title}</Text> */}
        {/* <Image
        className="object-cover h-28 w-full"
        source={{
          uri: selectedChannelData.brandingSettings.image?.bannerExternalUrl,
        }}
      ></Image> */}
        <ImageBackground
          className="w-full h-16"
          source={banner}
          resizeMode="cover"
        ></ImageBackground>
        <View className="w-full h-full bg-stone-900 pl-2 pr-2">
          <View className="flex flex-col items-center p-2">
            <Image
              className="w-16 h-16 rounded-full mt-2"
              source={{
                uri: selectedChannelData.snippet.thumbnails.default.url,
              }}
            ></Image>
            <Text className="text-xl font-bold text-white">
              {selectedChannelData.snippet.title}
            </Text>
            <Text className="font-bold text-red-600 mt-2">SUBSCRIBE</Text>
            <View className="flex flex-row mt-2 items-center">
              <Text className="text-xs text-white">
                {selectedChannelData.statistics.subscriberCount} subscribers
              </Text>
              <Text className="text-xs ml-2 mr-2 text-gray-400"> ● </Text>
              <Text className="text-xs text-white">
                {selectedChannelData.statistics.videoCount} videos
              </Text>
            </View>
            <Text className="text-zinc-500 font-bold text-sm mt-2 text-center">
              {selectedChannelData.snippet.description.substring(0, 125)}...
            </Text>
          </View>
          <VideoList video={videos} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Channel;

//CHANNEL VIDEOS API
//https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCT4Jg8h03dD0iN3Pb5L0PMA&key=AIzaSyBPudxjI2PCl-_MDnWp3M4gnxS5hGjfct0
