import axios from "axios";

export async function deleteEvent(id) {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);
    return { success: true };
  } catch (error) {
    console.error("削除失敗", error);
    return { message: "削除失敗" };
  }
}
