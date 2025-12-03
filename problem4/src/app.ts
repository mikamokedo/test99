import * as express from "express";
import { router } from "./routes";
import { errorHandler } from "./middleware/errorHandler";

export const createApp = (): express.Application => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", router);

  app.use(errorHandler);

  return app;
};
