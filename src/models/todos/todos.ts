import {createEffect, createEvent, createStore, forward, restore, sample} from "effector";
import {getTodos} from "@/network/lib/todos";
import {Todo} from "@/interfaces";

const componentMounted = createEvent<boolean>()

const newTodoAdded = createEvent<Todo>()
const newTodoTextChanged = createEvent<string>('')

const getTodosFx = createEffect(async () => {
    const res = await getTodos()
    return res.data
})

forward({
    from: componentMounted,
    to: [getTodosFx],
})

const $newTodo = createStore<Todo>({
    title: '',
    id: null,
    completed: false,
}).on(newTodoTextChanged, (prev, next) => ({
    ...prev,
    title: next
}))

const $todos = createStore<Todo[]>([])
    .on(getTodosFx.doneData, (_, payload) => payload)
    .on(newTodoAdded, (todos, todo) => [...todos, todo])

export {$todos, componentMounted}

