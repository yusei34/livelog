import axios from 'axios';

export async function putEvent(id,data) {
    try {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,data);
        return { success : true };
    } catch (error) {
        console.error('failure PUTrequest', error);
        throw error;
    }
}

