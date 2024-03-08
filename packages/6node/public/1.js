import a from "./2.js";
// import axios from "axios";
axios.get("/a?ID=1234").then(res => {
  console.log(1, a);
});
