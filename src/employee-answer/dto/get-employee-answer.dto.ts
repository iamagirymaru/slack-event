export class GetEmployeeAnswerDto {
    readonly id?: number;
    readonly name: string;
    readonly lastName: string;
    readonly email: string;
    readonly answer: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
}