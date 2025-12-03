import { Request, Response } from "express";
import EmployeeService from "../services/EmployService";

class EmployeeController {

  async all(request: Request, response: Response) {
    const employess = await EmployeeService.getAllEmployee(request.query);
    response.status(200).json({ data: employess });
  }

  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    const employee = await EmployeeService.getEmployeeById(id);

    if (!employee) {
      return response.status(404).json({ message: "Employee not found" });
    }
    return response.status(200).json({ data: employee });
  }

  async save(request: Request, response: Response) {
    const { firstName, lastName, age, sex } = request.body;

    const employee = await EmployeeService.createEmployee({ firstName, lastName, age, sex });

    return response.status(201).json({ data: employee });
  }

  async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { firstName, lastName, age, sex } = request.body;
    const updatedEmployee = await EmployeeService.updateEmployee(id, { firstName, lastName, age, sex });
    return response.status(200).json({ data: updatedEmployee });
  }

  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    let employeeToRemove = await EmployeeService.getEmployeeById(id);

    if (!employeeToRemove) {
      return response.status(404).json({ message: "Employee not found" });
    }

    await EmployeeService.deleteEmployee(id);

    return response.status(200).json({ message: "Employee has been removed" });
  }
}


export default new EmployeeController();