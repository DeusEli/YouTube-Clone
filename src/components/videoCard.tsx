import React, { useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {
  video: any;
}

export default function VideoCard({ video }: Props) {
  const navigation = useNavigation();
  const channelId = video.item.snippet.channelId;
  const [channel, setChannel] = React.useState();
  const ytKey = "AIzaSyBPudxjI2PCl-_MDnWp3M4gnxS5hGjfct0";

  const fetchChannel = async () => {
    const response = await fetch(
      "https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=brandingSettings%2CcontentDetails%2Cstatistics&id=" +
        channelId +
        "&key=" +
        ytKey
    );
    const data = await response.json();
    setChannel(data.items[0]);
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  console.log(video);
  return (
    <View className="w-full mb-4">
      <Pressable
        className=""
        onPress={() => {
          navigation.navigate("VideoPlayer", {
            selectedVideo: video,
          });
        }}
      >
        <Image
          className="w-full h-52"
          //source={{ uri: "https://i.ytimg.com/vi/G_tn9h8InGM/default_live.jpg" }}
          source={{
            // uri: "https://i.ytimg.com/vi/G_tn9h8InGM/hqdefault_live.jpg",
            uri: video.item.snippet.thumbnails.high.url,
          }}
        />
      </Pressable>

      <View className="flex flex-row p-2 w-full bg-stone-900">
        <Pressable
          onPress={() => {
            navigation.navigate("Channel", { selectedChannel: channel });
          }}
        >
          <Image
            className="w-12 h-12 rounded-full mt-2 "
            source={{
              //   uri: "https://yt3.ggpht.com/ipwuju0y7t8vzr1FY99Q1XSeuf1fcf9fvP2GcAGFvj9VtIlbLY9FcuFglxADwsxzUi-rhxIVR1Y=s800-c-k-c0xffffffff-no-rj-mo",
              uri: channel?.snippet.thumbnails.default.url,
            }}
          />
        </Pressable>
        <View className="flex flex-col ml-4 w-full pr-24">
          <Text className="text-sm font-semibold text-white w-72 flex-wrap">
            {video.item.snippet.title}
          </Text>
          <View className="flex flex-row w-40 items-center">
            <Text className="text-sm text-gray-400">
              {video.item.snippet.channelTitle}
            </Text>
            {/* <Text className="text-sm text-gray-400"> ● </Text>
            <Text className="text-sm text-gray-400">7M de visitas</Text> */}
            <Text className="text-xs text-gray-400"> ● </Text>
            <Text className="text-sm text-gray-400">
              {video.item.snippet.publishTime.substring(0, 10)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
