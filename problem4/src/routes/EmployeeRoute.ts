import EmployeeController from "../controllers/EmployeeController";
import { validationMiddleware } from "../middleware/validateRequest";
import { CreateEmployeeDto } from "../dtos/EmployeeDto";
import { Router } from "express";

export const EmployeeRoutes = Router();


EmployeeRoutes.get("/", EmployeeController.all);
EmployeeRoutes.post("/", validationMiddleware(CreateEmployeeDto), EmployeeController.save);
EmployeeRoutes.put("/:id", validationMiddleware(CreateEmployeeDto), EmployeeController.update);
EmployeeRoutes.delete("/:id", EmployeeController.remove);
EmployeeRoutes.get("/:id", EmployeeController.one); 