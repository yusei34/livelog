import axios from 'axios';


export async function postExpense(expense, event_id) {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/expenses`,{
            expense,
            event_id,
        });
        return { success : true };
    } catch (error) {
        console.error('登録失敗', error);
        return { message : '登録に失敗しました' };
    }
    
}

/*
{
    "category": "string",
    "item_name": "string",
    "amount": 0,
    "event_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
    
*/