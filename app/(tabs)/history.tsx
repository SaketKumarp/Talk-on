import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const conversations = [
  {
    id: 1,
    title: "Career Guidance",
    preview: "How do I become a full-stack developer?",
    time: "2h ago",
  },
  {
    id: 2,
    title: "React Native Help",
    preview: "Fixing NativeWind configuration...",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "DSA Practice",
    preview: "House Robber DP explanation",
    time: "2 days ago",
  },
];

export default function History() {
  return (
    <View className="flex-1 bg-black px-5 pt-14">
      {/* Header */}
      <Text className="text-3xl font-bold text-white">
        Conversation History
      </Text>

      <Text className="mt-2 text-gray-400">Review your previous chats</Text>

      {/* Chat List */}
      <ScrollView showsVerticalScrollIndicator={false} className="mt-8">
        {conversations.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            className="mb-4 flex-row items-center rounded-3xl bg-zinc-900 p-4"
          >
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20">
              <Ionicons name="chatbubble-ellipses" size={24} color="#00d4aa" />
            </View>

            <View className="ml-4 flex-1">
              <Text className="text-lg font-semibold text-white">
                {chat.title}
              </Text>

              <Text numberOfLines={1} className="mt-1 text-gray-400">
                {chat.preview}
              </Text>
            </View>

            <Text className="text-xs text-gray-500">{chat.time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
