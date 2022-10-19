import React from "react";
import { FlatList } from "react-native-gesture-handler";
import VideoCard from "./videoCard";

interface Props {
  video: any;
}

export default function VideoList({ video }: Props) {
  return (
    <FlatList
      horizontal={false}
      data={video}
      renderItem={({ item }) => <VideoCard video={{ item }} />}
    />
  );
}
