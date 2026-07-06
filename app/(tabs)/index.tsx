import {   useRouter } from "expo-router";
import { View, Text, Button } from "react-native";
import { isLoggedIn } from "../../hooks/IsLoggedin";

export default function HomeScreen() {
    const router = useRouter();
    if(!isLoggedIn()){
        router.push("/auth/sign-in");
        return;
    }


    return (
      <View className="flex-1 items-center justify-center bg-black px-6">
        <Text className="text-4xl font-bold text-emerald-400">Talk-On</Text>

        <Text className="mt-4 text-center text-white-300">
          Welcome to your AI voice assistant app.
        </Text>

        <View className="mt-8 rounded-2xl bg-zinc-900 p-6 w-full">
          <Text
            className="text-xl font-semibold text-white"
            onPress={() => router.push("/auth/sign-in")}
          >
            Start a Conversation
          </Text>

          <Text className="mt-2 text-gray-400">
            Tap the microphone button and begin chatting with AI.
          </Text>
        </View>
      </View>
    );
}
