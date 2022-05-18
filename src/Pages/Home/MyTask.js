import React from 'react'
import { useQuery } from 'react-query'
import axiosPrivate from '../../api/axiosPrivate'

const MyTask = () => {
    const getMyTask = async () => {
        const { data } = await axiosPrivate.get('http://localhost:5000/task')
        return data
    }

    const { data } = useQuery('tasks', getMyTask)

    return (
        <div>
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-center justify-center">
                    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
                        Open drawer
                    </label>
                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li>
                            <button>My ToDo List</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyTask
