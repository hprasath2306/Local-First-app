import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import TaskListItem from './TaskListItem';
import { useState } from 'react';
import { useQuery, useRealm, useUser } from '@realm/react';
import { Task } from '../models/Task';

export default function TaskList() {

    const realm = useRealm();
    const tasks = useQuery(Task)


    const user = useUser();

    const [newTask, setNewTask] = useState('');
    const createTask = () => {
        if (newTask) {
            realm.write(() => {
                realm.create('Task', { description: newTask, user_id: user.id});
            });
            setNewTask('');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Todo</Text>
            <FlatList
                data={tasks}
                contentContainerStyle={{ gap: 5 }}
                renderItem={({ item }) => <TaskListItem task={item} />}
                keyExtractor={(item, index) => index.toString()}
            />

            <TextInput
                style={{ backgroundColor: '#1D2125', padding: 15, borderRadius: 5, color: 'white' }}
                placeholder="New task..."
                placeholderTextColor="gray"
                value={newTask}
                onChangeText={setNewTask}
            />
            <Button title="Add Task" onPress={createTask} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#101112',
        padding: 10,
        borderRadius: 5,
        gap: 5,
    },
    text: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    }
});