import { IsInt, IsNotEmpty, IsString, IsEnum } from "class-validator";

export enum EmployeeSex {
    MALE = 'male',
    FEMALE = 'female',
    UNKOWN = 'unknown',
}

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsInt()
    @IsNotEmpty()
    age: number;

    @IsEnum(EmployeeSex)
    @IsNotEmpty()
    sex: EmployeeSex;
}
