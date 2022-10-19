import React from "react";
import { View, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

interface Props {
  route: any;
}

const VideoPlayer = ({ route }: Props) => {
  const selectedVideoData = route.params.selectedVideo;
  const [playing, setPlaying] = React.useState(true);
  // console.log(selectedVideoData);
  return (
    <View className="h-full pt-12 bg-black">
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={selectedVideoData.item.id.videoId}
      />
      <View className="flex flex-col ml-4 w-full pr-24">
        <Text className="text-sm font-semibold text-white w-72 flex-wrap">
          {selectedVideoData.item.snippet.title}
        </Text>
        <View className="flex flex-row w-40 items-center">
          <Text className="text-sm text-gray-400">
            {selectedVideoData.item.snippet.channelTitle}
          </Text>
          {/* <Text className="text-sm text-gray-400"> ● </Text>
            <Text className="text-sm text-gray-400">7M de visitas</Text> */}
          <Text className="text-xs text-gray-400"> ● </Text>
          <Text className="text-sm text-gray-400">
            {selectedVideoData.item.snippet.publishTime.substring(0, 10)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VideoPlayer;
