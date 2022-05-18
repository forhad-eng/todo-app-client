import React from 'react'
import { Link } from 'react-router-dom'
import todo from '../../assets/todo-illustrator.jpg'

const Banner = () => {
    return (
        <div class="lg:my-14">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <img src={todo} class="lg:w-1/2 lg:max-w-md rounded-lg shadow-xl" alt="To-Do" />
                <div className="lg:w-1/2">
                    <h1 class="text-5xl font-bold">My ToDo App</h1>
                    <p class="py-6">Keep your activities smooth with My ToDo.</p>
                    <Link to="/add-task">
                        <button class="btn btn-primary text-white">Add Task</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Banner
