import axios from 'axios';

export async function putEvent(event, actor_ids) {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/events`,{
            event,
            actor_ids,
        });
        return { success : true };
    } catch (error) {
        console.error('登録失敗', error);
        return { message : '登録に失敗しました' };
    }
    
}