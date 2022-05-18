import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'
import { auth } from '../../Firebase/firebase.init'
import LoadingSpinner from '../Shared/LoadingSpinner'

const AddTask = () => {
    const [user, loading] = useAuthState(auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    if (loading) {
        return <LoadingSpinner />
    }

    const onSubmit = async task => {
        const email = user?.email
        if (email) {
            const taskInfo = { ...task, email }
            const { data } = await axiosPrivate.post('https://aqueous-spire-02615.herokuapp.com/task', taskInfo)
            if (data.success) {
                toast.success(data.message, { toastId: 'success' })
            }
            reset()
        }
    }

    return (
        <div class="mt-14">
            <div class="hero-content flex-col lg:flex-row-reverse lg:justify-between">
                <div class="lg:w-1/2 text-center lg:text-left">
                    <h1 class="text-5xl font-bold">Do Task In Right Time</h1>
                    <p class="py-6">
                        <q>
                            There is a saying that every nice piece of work needs the right person in the right place at
                            the right time.{' '}
                        </q>{' '}
                        - <span className="text-blue-800 font-bold">Benoit Mandelbrot</span>
                    </p>
                </div>
                <div class="card w-full lg:w-1/2 lg:max-w-md shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} class="card-body">
                        <h3 className="text-2xl text-center">Add Task</h3>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input
                                {...register('taskName', {
                                    required: { value: true, message: 'Name is required!' }
                                })}
                                type="text"
                                placeholder="Task name"
                                class="input input-bordered input-info"
                            />
                            {errors?.taskName?.type === 'required' && (
                                <p className="text-red-500">{errors.taskName.message}</p>
                            )}
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Description</span>
                            </label>
                            <input
                                {...register('description', {
                                    required: { value: true, message: 'Description is required!' }
                                })}
                                type="text"
                                placeholder="Description"
                                class="input input-bordered input-info pt-5 pb-14"
                            />
                            {errors?.description?.type === 'required' && (
                                <p className="text-red-500">{errors.description.message}</p>
                            )}
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTask
