import { Link, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider, DarkTheme } from '@react-navigation/native'
import RealmCustomProvider from '@/src/providers/Realm'
import { FontAwesome } from '@expo/vector-icons'

export default function RootLayout() {
    return (
        <>
            <ThemeProvider value={DarkTheme}>
                <RealmCustomProvider>
                    <Stack screenOptions={{
                        // headerRight: () => (
                        //     <Link href={"/login"}>
                        //         <FontAwesome name="user-circle-o" size={24} color="lightgray" />
                        //     </Link>
                        // )
                    }}>

                    </Stack>
                </RealmCustomProvider>
            </ThemeProvider>
            <StatusBar style="light" />
        </>
    )
}