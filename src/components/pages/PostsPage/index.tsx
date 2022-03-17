import {FC, useEffect} from "react";
import {useStore} from "effector-react";
import {$todos, componentMounted} from "@/models/posts/posts";
import {$isUserIdGenerated} from "@/models/user/user";


export const PostsPage: FC = ({}) => {

    const todos = useStore($todos)
    const isIdExist = useStore($isUserIdGenerated)

    useEffect(() => {
        componentMounted(true)
    }, [])

    return <div
        className={`min-w-[700px] min-h-${isIdExist ? '[500px]' : 'fit'} flex flex-col items-center justify-between`}
    >
        {
            <>
                <h1 className='text-3xl'>Your todos</h1>
                {
                    todos.length > 0
                        ? todos.map(e => <div>
                            <p>{e.title}</p>
                        </div>)
                        : <h1 className='text-4xl'>
                            Nothing here. Get them now!
                        </h1>
                }
                <input/>
            </>
        }

    </div>
}