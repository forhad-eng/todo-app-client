import axios from 'axios'
import { useEffect, useState } from 'react'

const useToken = user => {
    const [token, setToken] = useState('')

    useEffect(() => {
        const getToken = async () => {
            const email = user?.user?.email
            if (email) {
                const { data } = await axios.put(`http://localhost:5000/user/${email}`, {
                    name: user.user.displayName,
                    email: email
                })

                if (data.success) {
                    setToken(data.accessToken)
                    localStorage.setItem('accessToken', data.accessToken)
                }
            }
        }
        getToken()
    }, [user])

    return [token]
}

export default useToken
