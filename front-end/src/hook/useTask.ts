import { useState } from "react";
import { Card } from "../constant/types";
import { GET, POST, PATCH } from "../services"
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK, GET_ALL_TASK } from "../services/path"





export const UseTask = () => {
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState<Card[]>([]);

    const getAllTask = async () => {
        setLoading(true)
        try {
            const response = await GET(GET_ALL_TASK);
            if (response.success) {
                setTask(response.result)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const createTask = async (payload: Card) => {
        setLoading(true)
        try {
            const response = await POST(CREATE_TASK, payload);
            return response
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const updateTask = async (payload: Card) => {
        setLoading(true)
        try {
            const response = await PATCH(UPDATE_TASK, payload);
            return response
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const deleteTask = async (taskID: string) => {
        setLoading(true)
        const payload = { "id": taskID }
        try {
            const response = await PATCH(DELETE_TASK, payload);
            return response
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        task,
        setTask,
        getAllTask,
        createTask,
        updateTask,
        deleteTask,
    };
};


