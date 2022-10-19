import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Image, Text } from "react-native";

interface Props {
  comment: any;
}
export default function CommentCard({ comment }: Props) {
  console.log(comment);
  return (
    <View className="flex flex-row p-2 w-full bg-stone-900">
      <View className="flex flex-col">
        <Image
          className="w-6 h-6 rounded-full mt-2 "
          source={{
            uri: comment?.snippet.topLevelComment.snippet.authorProfileImageUrl,
          }}
        />
      </View>
      <View className="flex flex-col ml-4 w-full pr-24">
        <View className="flex flex-row items-center">
          <Text className="text-sm text-gray-400">
            {comment?.snippet.topLevelComment.snippet.authorDisplayName}
          </Text>
          <Text className="text-xs text-gray-400"> ● </Text>
          <Text className="text-sm text-gray-400">
            {comment?.snippet.topLevelComment.snippet.publishedAt.substring(
              0,
              10
            )}
          </Text>
        </View>
        <Text className="text-sm text-white mt-1">
          {comment?.snippet.topLevelComment.snippet.textDisplay}
        </Text>
        <View className="flex flex-row mt-2 w-16 justify-between">
          <View className="flex flex-row">
            <Ionicons name="ios-thumbs-up-sharp" size={14} color="gray" />
            {comment?.snippet.topLevelComment.snippet.likeCount > 0 ? (
              <Text className="text-xs text-gray-400 ml-1">
                {comment?.snippet.topLevelComment.snippet.likeCount}
              </Text>
            ) : null}
          </View>
          <Ionicons name="ios-thumbs-down-sharp" size={14} color="gray" />
        </View>
        {/* <Text className="text-sm text-white mt-1">RESPUESTAS</Text> */}
        {comment?.snippet.totalReplyCount >= 1 ? (
          <View className="flex flex-row mt-2">
            <Text className="text-sm text-blue-500 mt-1 mr-1">
              {comment?.snippet.totalReplyCount}
            </Text>
            <Text className="text-sm text-blue-500 mt-1">RESPUESTAS</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
