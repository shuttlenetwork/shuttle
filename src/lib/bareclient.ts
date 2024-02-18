import { createBareClient } from "@tomphttp/bare-client";

const client = await createBareClient(new URL("/bare/", window.location));//new URL("http://localhost:8080")
export default client;