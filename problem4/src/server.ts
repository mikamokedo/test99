import "reflect-metadata";
import "dotenv/config";
import { createApp } from "./app";
import { AppDataSource } from "./configs/data-source";

const port = Number(process.env.PORT ?? 4000);

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");

    const app = createApp();
    app.listen(port, () => {
      console.log(`🚀 API listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
