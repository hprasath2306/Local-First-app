import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput } from 'react-native';
import { useObject, useRealm } from '@realm/react';
import { Task } from '@/src/models/Task';
import { BSON } from 'realm';
import { useState } from 'react';
import { Realm } from 'realm';

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();

    const task = useObject<Task>(Task, new BSON.ObjectID(id as string));



    const [updatedDescription, setUpdatedDescription] = useState(
        task?.description
    );

    const realm = useRealm();

    const updateDescription = () => {
        if(!task) return;
        realm.write(() => {
            task.description = updatedDescription!;
        });
    }


    if (!task) {
        return <Text>Not Found</Text>
    }

    return (
        <View style={{ padding: 10 }}>
            <Stack.Screen options={{ title: 'Task Details' }} />
            <TextInput
                value={updatedDescription}
                onChangeText={setUpdatedDescription}
                onEndEditing={updateDescription}
                style={{ color: 'white', fontSize: 20 }}
            />
            <StatusBar style="light" />
        </View>
    )
}