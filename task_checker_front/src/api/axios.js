import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // サーバーサイドのURLを設定する。
});

export default api;