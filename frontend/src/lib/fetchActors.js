import axios from "axios";

export async function fetchActors() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/actors`);
    return res.data.data;
  } catch (error) {
    console.log("取得失敗", error);
    throw new Error("データ取得エラー");
  }
}
