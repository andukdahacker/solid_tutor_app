import createClient from "openapi-fetch";
import { paths } from "../schema/schema";
import { ACCESS_TOKEN_KEY } from "../common/constants";

const client = createClient<paths>({
  baseUrl: "http://localhost:4000",
  headers: {
    get Authorization() {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);

      return token ? `Bearer ${token}` : undefined;
    },
  },
});

export default client;
