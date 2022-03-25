import { axiosClient } from './../axiosClient'
import {Todo} from "@/interfaces";

export const getTodos = (id: string = '') => axiosClient.get<Todo[]>('/todos')