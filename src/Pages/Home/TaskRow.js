import React from 'react'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'

const TaskRow = ({ task, index, refetch }) => {
    const { _id, taskName, description } = task

    const taskCompleteHandle = async () => {
        const { data } = await axiosPrivate.patch(`https://aqueous-spire-02615.herokuapp.com/task/${_id}`)
        if (data.success) {
            refetch()
            toast.success(data.message)
        }
    }

    const taskDeleteHandle = async () => {
        const { data } = await axiosPrivate.delete(`https://aqueous-spire-02615.herokuapp.com/task/${_id}`)
        if (data.success) {
            refetch()
            toast.success(data.message)
        }
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{task.complete ? <s>{taskName}</s> : taskName}</td>
            <td>{task.complete ? <s>{description}</s> : description}</td>
            <td>
                <button disabled={task.complete} onClick={taskCompleteHandle} className="btn btn-sm btn-success">
                    Complete
                </button>
            </td>
            <td>
                <button onClick={taskDeleteHandle} className="btn btn-sm btn-error">
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default TaskRow
