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
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CommentCard from "../components/commentCard";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoList from "../components/videoList";
import variables from "../../global";

interface Props {
  route: any;
}

const VideoPlayer = ({ route }: Props) => {
  const navigation = useNavigation();
  const selectedVideoData = route.params.selectedVideo;
  const videoId = route.params.idVideo;
  const [playing, setPlaying] = useState(true);
  const channelId = selectedVideoData.item.snippet.channelId;
  const [channel, setChannel] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const [comments, setComments] = useState();
  const [showComments, setShowComments] = useState<boolean>(true);
  const ytKey = variables.getApiKey();

  const fetchVideoComments = async () => {
    const response = await fetch(
      "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=15&order=relevance&videoId=" +
        videoId +
        "&key=" +
        ytKey
    );
    const data = await response.json();
    setComments(data.items);
    // console.log(comments);
  };

  const fetchRelatedVideos = async () => {
    const response = await fetch(
      "https://www.googleapis.com/youtube/v3/search?key=" +
        ytKey +
        "&channelId=" +
        channelId +
        "&part=snippet&maxResults=4"
    );
    const data = await response.json();
    setRelatedVideos(data.items);
    // console.log(relatedVideos);
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
    fetchRelatedVideos();
  }, []);

  {
    /* <Ionicons name="md-eye" size={18} color="gray" />
        <Ionicons name="md-eye-off" size={18} color="gray" /> */
  }

  // console.log("Ola", relatedVideos);

  // console.log(comments[0]?.snippet);
  return (
    <SafeAreaView className="h-full bg-stone-900">
      <YoutubePlayer height={225} play={playing} videoId={videoId} />
      <ScrollView className="flex flex-col w-full">
        <View className="flex flex-col p-4 w-full pr-18">
          <Text className="text-xl font-semibold text-white w-72 flex-wrap">
            {selectedVideoData.item.snippet.title}
          </Text>
          <View className="flex flex-row w-full h-16 pl-4 pr-4 justify-between items-center border-b border-white mt-2">
            <View className="flex flex-col items-center">
              <Ionicons name="ios-thumbs-up-sharp" size={24} color="white" />
              <Text className="text-white text-xs">Me gusta</Text>
            </View>
            <View className="flex flex-col items-center">
              <Ionicons name="ios-thumbs-down-sharp" size={24} color="white" />
              <Text className="text-white text-xs">No me gusta</Text>
            </View>
            <View className="flex flex-col items-center">
              <Fontisto name="share-a" size={24} color="white" />
              <Text className="text-white text-xs">Compartir</Text>
            </View>
            <View className="flex flex-col items-center">
              <Octicons name="download" size={24} color="white" />
              <Text className="text-white text-xs">Descargar</Text>
            </View>
            <View className="flex flex-col items-center">
              <MaterialIcons name="library-add" size={28} color="white" />
              <Text className="text-white text-xs">Guardar</Text>
            </View>
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
          {showComments ? (
            <View className="flex flex-col w-full">
              <Text
                className="text-red-600 text-sm mt-2 self-end"
                onPress={() => {
                  setShowComments(false);
                }}
              >
                Show related videos
              </Text>
              <FlatList
                data={comments}
                renderItem={({ item }) => <CommentCard comment={item} />}
              />
            </View>
          ) : (
            <View className="flex flex-col">
              <Text
                className="text-red-600 text-sm mt-2 self-end mb-2"
                onPress={() => {
                  setShowComments(true);
                }}
              >
                Show comments
              </Text>
              <VideoList video={relatedVideos} id={"fromChannel"} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoPlayer;
