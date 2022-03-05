import {createEffect, createEvent, createStore, forward, restore, sample} from "effector";
import {getTodos} from "@/network/lib/todos";
import {Todo} from "@/interfaces";

const componentMounted = createEvent<boolean>()

const newTodoAdded = createEvent<Todo>()
const newTodoTextChanged = createEvent<string>('')

const idChanged = createEvent<number>()
const idConfirmed = createEvent()

const getIdFromLocalStorageFx = createEffect(() => {
    return Number(localStorage.getItem('userId'))
})

const getTodosFx = createEffect(async () => {
    const res = await getTodos()
    return res.data
})

const setIdToLocalStorageFx = createEffect((userId: number) => {
    return localStorage.setItem('userId', userId.toString())
})

forward({
    from: componentMounted,
    to: [getIdFromLocalStorageFx, getTodosFx],
})

const $isIdExist = createStore<boolean>(false)
    .on(getIdFromLocalStorageFx.doneData, (_, payload) => {
        return !!payload
    })
    .on(idConfirmed, () => true)

const $userId = createStore<number>(Number(localStorage.getItem('userId')))
    .on(idChanged, (_, next) => next)
    .on(getIdFromLocalStorageFx.doneData, (_, userId) => userId)


forward({
    from: $userId,
    to: setIdToLocalStorageFx
})

const $newTodo = createStore<Todo>({
    title: '',
    id: 0,
    completed: false,
    userId: 0,
}).on(newTodoTextChanged, (prev, next) => ({
    ...prev,
    title: next
}))

const $todos = createStore<Todo[]>([])
    .on(getTodosFx.doneData, (_, payload) => payload)
    .on(newTodoAdded, (todos, todo) => [...todos, todo])

export {$todos, $userId, idChanged, $isIdExist, componentMounted, idConfirmed}

