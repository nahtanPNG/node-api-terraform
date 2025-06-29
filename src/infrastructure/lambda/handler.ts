import serverless from "serverless-http";
import { app } from "../app";

export const handler = serverless(app, {
  binary: false,
  request: (request: any, event: any, context: any) => {
    if (event.path && event.path.startsWith("/dev")) {
      event.path = event.path.replace("/dev", "");
    }

    console.log("Original path:", event.path);
    console.log("Modified path:", event.path);
  },
});
