import { Router } from "express";
import { EmployeeRoutes } from "./EmployeeRoute";


export const router = Router();

router.use("/employees", EmployeeRoutes);

