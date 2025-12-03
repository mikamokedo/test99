import { Employee } from "../entities/EmployeeEntity";
import { AppDataSource } from "../configs/data-source";
import { CreateEmployeeDto } from "../dtos/EmployeeDto";

class EmployeeService {
    private employeeRepository = AppDataSource.getRepository(Employee);

    async createEmployee(employeeDto: CreateEmployeeDto): Promise<Employee> {
        const employee = this.employeeRepository.create(employeeDto);
        return this.employeeRepository.save(employee);
    }

    async getAllEmployee(filter: any): Promise<Employee[]> {
        const where: any = {};

        if (filter.firstName) {
            where.firstName = filter.firstName;
        }

        if (filter.lastName) {
            where.lastName = filter.lastName;
        }

        if (filter.age) {
            where.age = typeof filter.age === 'string' ? parseInt(filter.age) : filter.age;
        }

        if (filter.sex) {
            where.sex = filter.sex;
        }

        if (Object.keys(where).length === 0) {
            return this.employeeRepository.find();
        }
        return this.employeeRepository.find({ where });
    }

    async getEmployeeById(id: number): Promise<Employee> {
        return this.employeeRepository.findOneBy({ id });
    }

    async updateEmployee(id: number, employeeDto: CreateEmployeeDto): Promise<Employee> {
        const employee = await this.getEmployeeById(id);
        this.employeeRepository.merge(employee, employeeDto);
        return this.employeeRepository.save(employee);
    }

    async deleteEmployee(id: number): Promise<void> {
        await this.employeeRepository.delete(id);
    }

}

export default new EmployeeService();