import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  Fontisto,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import MaterialComunityIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

interface Props {
  route: any;
}

const VideoPlayer = ({ route }: Props) => {
  const navigation = useNavigation();
  const selectedVideoData = route.params.selectedVideo;
  const [playing, setPlaying] = useState(true);
  const channelId = selectedVideoData.item.snippet.channelId;
  const [channel, setChannel] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const [comments, setComments] = useState();
  const ytKey = "AIzaSyBxQDTl1aZzcJyyrdg-gTwfCSyRvEYIQvE";

  const fetchVideoComments = async () => {
    const response = await fetch(
      "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=2&order=relevance&videoId=" +
        selectedVideoData.item.id.videoId +
        "&key=" +
        ytKey
    );
    const data = await response.json();
    setComments(data.items);
  };

  const fetchChannel = async () => {
    const response = await fetch(
      "https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=brandingSettings%2CcontentDetails%2Cstatistics&id=" +
        channelId +
        "&key=" +
        ytKey
    );
    const data = await response.json();
    setChannel(data.items[0]);
    // console.log("ola");
    // console.log(channel.statistics.subscriberCount);
  };

  useEffect(() => {
    fetchChannel();
    fetchVideoComments();
  }, []);

  // console.log(comments[0]?.snippet.topLevelComment.snippet.textDisplay);
  return (
    <View className="h-full pt-12 bg-stone-900">
      <YoutubePlayer
        height={225}
        play={playing}
        videoId={selectedVideoData.item.id.videoId}
      />
      <View className="flex flex-col p-4 w-full pr-18">
        <Text className="text-xl font-semibold text-white w-72 flex-wrap">
          {selectedVideoData.item.snippet.title}
        </Text>
        <View className="flex flex-row w-full h-16 pl-4 pr-4 justify-between items-center border-b border-white">
          <Ionicons name="ios-thumbs-up-sharp" size={28} color="gray" />
          <Ionicons name="ios-thumbs-down-sharp" size={28} color="gray" />
          <Fontisto name="share-a" size={28} color="gray" />
          <Octicons name="download" size={28} color="gray" />
          <MaterialIcons name="library-add" size={28} color="gray" />
        </View>
        <View className="flex flex-row w-full h-20 items-center justify-between border-b border-white">
          <View className="flex flex-row items-center">
            <Pressable
              onPress={() => {
                navigation.navigate("Channel", { selectedChannel: channel });
              }}
            >
              <Image
                className="w-12 h-12 rounded-full"
                source={{
                  //   uri: "https://yt3.ggpht.com/ipwuju0y7t8vzr1FY99Q1XSeuf1fcf9fvP2GcAGFvj9VtIlbLY9FcuFglxADwsxzUi-rhxIVR1Y=s800-c-k-c0xffffffff-no-rj-mo",
                  uri: channel?.snippet.thumbnails.default.url,
                }}
              />
            </Pressable>
            <View className="flex flex-col ml-4">
              <Text className="text-white font-semibold">
                {selectedVideoData.item.snippet.channelTitle}
              </Text>
              <Text className="text-gray-400 text-sm">
                {channel?.statistics.subscriberCount} subscribers
              </Text>
            </View>
          </View>
          <Text className="text-red-600 text-sm mr-2">SUBSCRIBE</Text>
        </View>
        <Ionicons name="md-eye" size={18} color="gray" />
        <Ionicons name="md-eye-off" size={18} color="gray" />
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <Text className="text-white">
              {item.snippet.topLevelComment.snippet.textDisplay}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

export default VideoPlayer;
