import React from "react";
import { FlatList } from "react-native-gesture-handler";
import VideoCard from "./videoCard";

interface Props {
  video: any;
  id: string;
}

export default function VideoList({ video, id }: Props) {
  //   console.log(video);

  return (
    <FlatList
      horizontal={false}
      data={video}
      renderItem={({ item }) => <VideoCard video={{ item }} idProp={id} />}
    />
  );
}
