import {FC, useEffect} from "react";
import {MainLayout} from "@/components/templates/MainLayout";
import {appMounted} from "@/models";
import {PostsPage} from "@/components/pages/PostsPage";

export const App: FC = () => {

    useEffect(() => {
        appMounted()
    }, [])

    return (
        <MainLayout backgroundColor='bg-neutral-400'>
            <PostsPage />
        </MainLayout>
    )
}

