import { axiosClient } from './../axiosClient'
import {Todo} from "@/interfaces";

export const getTodos = () => axiosClient.get<Todo[]>('/todos')