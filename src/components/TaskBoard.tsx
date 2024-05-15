import { View, Text, StyleSheet } from 'react-native';
import TaskList from './TaskList';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TaskBoard() {
    return (
        <View style={{ padding: 10, flex: 1, }}>
            <LinearGradient
                colors={['#8711c1', '#2472fc',]}
                style={StyleSheet.absoluteFill}
            />
            <SafeAreaView>
                <TaskList />
            </SafeAreaView>
        </View>
    )
}