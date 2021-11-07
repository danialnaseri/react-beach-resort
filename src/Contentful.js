import { createClient } from "contentful";

console.log('testing env.development', process.env)

export default createClient({
  space: process.env.REACT_APP_API_SPACE,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
});
