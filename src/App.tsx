import {FC} from "react";
import {MainLayout} from "@/components/Layouts/MainLayout";
import {TodoPage} from "@/pages/TodoPage";



export const App: FC = () => {
    return (
        <MainLayout backgroundColor='#'>
            <TodoPage />
        </MainLayout>
    )
}

