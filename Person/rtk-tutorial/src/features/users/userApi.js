// module imports
import axios from 'axios';

// named exports
export const getUsers = async () => {
    try {
        const { data } = await axios.get('http://localhost:3600/users')
        return data;
    } catch (error) {
        console.log(error.message)
    }
}

export const createUser = async (name) => {
    try {
        const { data } = await axios.post('http://localhost:3600/users', { name })
        return data;
    } catch (error) {
        console.log(error.message)
    }
}