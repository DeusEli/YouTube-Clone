import React, { useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import variables from "../../global";

interface Props {
  video: any;
  idProp: string;
}

export default function VideoCard({ video, idProp }: Props) {
  const navigation = useNavigation();
  const channelId = video.item.snippet.channelId;
  const [channel, setChannel] = React.useState();
  const ytKey = variables.getApiKey();

  console.log;
  var videoId: String = "";

  if (idProp == "") {
    videoId = video.item.id;
  } else if (idProp == "fromChannel") {
    videoId = video.item.id.videoId;
  }

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

  console.log(videoId);

  //youtube.googleapis.com/youtube/v3/channels?part=snippet&part=brandingSettings%2CcontentDetails%2Cstatistics&id=UCq-Fj5jknLsUf-MWSy4_brA&key=AIzaSyCCWG3OzEB8q6D2OgFg-ywK-3o5TQtzz54

  // console.log(video.item.snippet.channelId);
  // console.log(channel?.snippet?.thumbnails?.default?.url);
  https: return (
    <View className="w-full mb-4">
      <Pressable
        className=""
        onPress={() => {
          navigation.navigate("VideoPlayer", {
            selectedVideo: video,
            idVideo: videoId,
          });
        }}
      >
        <Image
          className="w-full h-60"
          source={{
            uri: video?.item.snippet.thumbnails.high.url,
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
              uri: channel?.snippet?.thumbnails?.default?.url,
            }}
          />
        </Pressable>
        <View className="flex flex-col ml-4 w-full pr-24">
          <Text className="text-sm font-semibold text-white w-72 flex-wrap">
            {video?.item.snippet.title}
          </Text>
          <View className="flex flex-row w-40 items-center">
            <Text className="text-sm text-gray-400">
              {video?.item.snippet.channelTitle}
            </Text>
            <Text className="text-xs text-gray-400"> ● </Text>
            <Text className="text-sm text-gray-400">
              {video?.item.snippet.publishedAt.substring(0, 10)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
