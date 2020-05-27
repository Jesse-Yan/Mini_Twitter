import axios from "axios";

const axiosTweet = axios.create({
  baseURL: "https://react-mini-twitter.firebaseio.com/",
});

export default axiosTweet;
