import {ChangeEvent, FC, useEffect} from "react";
import {useStore} from "effector-react";
import {$isIdExist, $todos, $userId, componentMounted, idChanged, idConfirmed} from "@/components/Todos/todos";

export const Todos: FC = ({}) => {

    const todos = useStore($todos)
    const isIdExist = useStore($isIdExist)
    const userId = useStore($userId)

    useEffect(() => {
        componentMounted(true)
    }, [])

    const idChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        idChanged(Number(e.target.value))
    }

    const idConfirmedHandler = () => {
        idConfirmed()
    }

    return <div
        className={`min-w-[700px] min-h-${isIdExist ? '[500px]' : 'fit'} flex flex-col items-center justify-between`}
    >
        {
            isIdExist ? <>
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
            : <>
                <p>Give yourself a numeric ID</p>
                <input type="number" onChange={idChangeHandler} value={userId?.toString()}/>
                <button onClick={idConfirmedHandler}>OK</button>
            </>
        }

    </div>
}