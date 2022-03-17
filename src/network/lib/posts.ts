import { axiosClient } from './../axiosClient'
import {Todo} from "@/interfaces";

export const getPosts = (id: string = '') => axiosClient.get<Todo[]>('/posts')