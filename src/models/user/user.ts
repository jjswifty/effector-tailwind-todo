import {createEffect, createStore, forward, guard, restore, split} from "effector";
import { persist } from 'effector-storage/local'
import {appMounted} from "@/models";
/*

    Данный файл обрабатывает два сценария.
    1: Пользователь впервые заходит на сайт. В таком случае генерируем ему случайный id
    и пускаем в приложение.
    2: Пользователь заходит на сайт не впервые. В таком случае сразу пускаем в приложение с id.

    Алгоритм:
    1. Проверка наличия id в localStorage.
    2. При отсутствии - генерация. При наличии - шаг 3.
    3. Используем id в приложении.

 */

const generateUserIdFx = createEffect(() => {
    return Date.now().toString()
    // Сервера нет, просто хардкод для того чтоб работало.
    // можно было еще и uuid но пусть так пока
})

const $userId = createStore<string | null>('')
    .on(generateUserIdFx.doneData, (_, userId) => userId)

/*
    т.к. localStorage синхронный — после вызова persist
    в сторе $userId либо будет, либо не будет значения,
    в зависимости от того, есть оно в localStorage или нет.
 */

persist({
    store: $userId,
    key: 'userId'
})

const $isUserIdGenerated = $userId.map((state) => !state)

guard({
    clock: appMounted,
    filter: $isUserIdGenerated,
    source: $userId,
    target: generateUserIdFx
})

export {
    $isUserIdGenerated,
    $userId
}