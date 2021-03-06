import React from 'react'
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../../Firebase/firebase.init'
import useToken from '../../hooks/useToken'
import LoadingSpinner from '../Shared/LoadingSpinner'

const Login = () => {
    const [signInWithEmailAndPassword, eUser, eLoading, eErr] = useSignInWithEmailAndPassword(auth)
    const [signInWithGoogle, gUser, gLoading, gErr] = useSignInWithGoogle(auth)
    const [token] = useToken(eUser || gUser)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    if (token) {
        navigate(from, { replace: true })
    }

    let errorMessage
    if (eErr || gErr) {
        errorMessage = <p className="text-red-500">{eErr?.message || gErr?.message}</p>
    }

    if (eLoading || gLoading) {
        return <LoadingSpinner />
    }

    const onSubmit = async data => {
        await signInWithEmailAndPassword(data.email, data.password)
        reset()
    }

    return (
        <div class="lg:w-1/2 mx-auto lg:max-w-md rounded-lg shadow-2xl bg-base-100 mt-14">
            <div class="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-2xl text-center">Login</h2>
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
                        <label class="label">
                            <Link to="/" class="label-text-alt link link-hover">
                                Forgot password?
                            </Link>
                        </label>
                    </div>
                    {errorMessage}
                    <div class="form-control">
                        <button class="btn btn-primary">Login</button>
                    </div>
                    <div>
                        <p className="text-sm">
                            New user?{' '}
                            <Link to="/signup">
                                <span className="text-primary">Create an account</span>
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

export default Login
