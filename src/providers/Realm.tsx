import { PropsWithChildren } from "react";
import { RealmProvider } from "@realm/react";
import { Task } from "@/src/models/Task";
import { AppProvider, UserProvider } from "@realm/react";
import Login from "../components/Login";

const appId = "application-0-qbevxor";


export default function RealmCustomProvider({ children }: PropsWithChildren) {
    return (
        <AppProvider id={appId}>
            <UserProvider fallback={Login}>
                <RealmProvider
                 schema={[Task]}
                 sync={{
                    flexible: true,
                    initialSubscriptions : {
                        update(subs,realm){
                            subs.add(realm.objects('Task'));
                        },
                        rerunOnOpen: true,
                    }
                 }}
                 >
                    {children}
                </RealmProvider>
            </UserProvider>
        </AppProvider>
    )
}