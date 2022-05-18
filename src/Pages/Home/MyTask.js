import React from 'react'
import { useQuery } from 'react-query'
import axiosPrivate from '../../api/axiosPrivate'
import LoadingSpinner from '../Shared/LoadingSpinner'
import TaskRow from './TaskRow'

const MyTask = () => {
    const getMyTask = async () => {
        const { data } = await axiosPrivate.get('http://localhost:5000/task')
        return data
    }

    const { data: tasks, isLoading, refetch } = useQuery('tasks', getMyTask)

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div class="drawer drawer-mobile">
            <input id="task-bar" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col mt-6">
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Mark Complete</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.result.map((task, index) => (
                                <TaskRow key={task._id} task={task} index={index} refetch={refetch} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="drawer-side">
                <label for="task-bar" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                    <li>
                        <button>To-Do List</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MyTask
