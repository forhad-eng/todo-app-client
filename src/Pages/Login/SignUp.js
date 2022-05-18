import React from 'react'
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../Firebase/firebase.init'
import useToken from '../../hooks/useToken'
import LoadingSpinner from '../Shared/LoadingSpinner'

const SignUp = () => {
    const [createUserWithEmailAndPassword, eUser, eLoading, eErr] = useCreateUserWithEmailAndPassword(auth)
    const [signInWithGoogle, gUser, gLoading, gErr] = useSignInWithGoogle(auth)
    const [updateProfile, uploading, upErr] = useUpdateProfile(auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()
    const navigate = useNavigate()
    const [token] = useToken(eUser || gUser)

    let errorMessage
    if (eErr || gErr || upErr) {
        errorMessage = <p className='text-red-500'>{eErr?.message || gErr?.message || upErr?.message}</p>
    }

    if (token) {
        navigate('/')
    }

    if (eLoading || gLoading || uploading) {
        return <LoadingSpinner />
    }

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name })
        reset()
    }

    return (
        <div class="lg:w-1/2 mx-auto lg:max-w-md rounded-lg shadow-2xl bg-base-100 mt-14">
            <div class="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-2xl text-center">Sign Up</h2>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Name</span>
                        </label>
                        <input
                            {...register('name', {
                                required: { value: true, message: 'Name is required!' }
                            })}
                            type="text"
                            placeholder="Your name"
                            class="input input-bordered"
                        />
                        {errors?.name?.type === 'required' && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input
                            {...register('email', {
                                required: { value: true, message: 'Email is required!' },
                                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
                            })}
                            type="email"
                            placeholder="Email"
                            class="input input-bordered"
                        />
                        {errors?.email?.type === 'required' && <p className="text-red-500">{errors.email.message}</p>}
                        {errors?.email?.type === 'pattern' && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input
                            {...register('password', {
                                required: { value: true, message: 'Password is required!' },
                                minLength: { value: 6, message: 'Password requires minimum 6 characters length' }
                            })}
                            type="password"
                            placeholder="Password"
                            class="input input-bordered"
                        />
                        {errors?.password?.type === 'required' && (
                            <p className="text-red-500">{errors.password.message}</p>
                        )}
                        {errors?.password?.type === 'minLength' && (
                            <p className="text-red-500">{errors.password.message}</p>
                        )}
                        {errorMessage}
                    </div>
                    <div class="form-control mt-4">
                        <button class="btn btn-primary">Sign Up</button>
                    </div>
                    <div>
                        <p className="text-sm">
                            Already have an account?{' '}
                            <Link to="/login">
                                <span className="text-primary">Login</span>
                            </Link>
                        </p>
                    </div>
                </form>
                <div class="divider">OR</div>
                <div class="form-control">
                    <button onClick={() => signInWithGoogle()} class="btn btn-accent">
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUp
