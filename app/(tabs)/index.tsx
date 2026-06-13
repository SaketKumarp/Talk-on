import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <Text className="text-4xl font-bold text-emerald-400">Talk-On</Text>

      <Text className="mt-4 text-center text-gray-300">
        Welcome to your AI voice assistant app.
      </Text>

      <View className="mt-8 rounded-2xl bg-zinc-900 p-6 w-full">
        <Text className="text-xl font-semibold text-white">
          Start a Conversation
        </Text>

        <Text className="mt-2 text-gray-400">
          Tap the microphone button and begin chatting with AI.
        </Text>
      </View>
    </View>
  );
}
