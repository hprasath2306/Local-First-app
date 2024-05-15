import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import TaskBoard from "@/src/components/TaskBoard";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";


export default function App() {
    return (
        <View style={style.container}>
            <Stack.Screen options={
                { title: "Task Board" }
            }/>
            <TaskBoard />
            <StatusBar style="light" />
        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
});