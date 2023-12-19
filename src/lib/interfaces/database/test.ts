export interface IDependence {
    id: number;
    employeeNumber: string;
    name: string;
    age: number;
    relationship: string;
}

export class Dependant {
    private id: number;
    private employeeNumber: string;
    private name: string;
    private age: number;
    private relationship: string;

    public constructor(
        id: number,
        employeeNumber: string,
        name: string,
        age: number,
        relationship: string
    ) {
        this.id = id == null ? id : 0;
        this.employeeNumber = employeeNumber == null ? employeeNumber : "";
        this.name = name == null ? name : "";
        this.age = age == null ? age : 0;
        this.relationship = relationship == null ? relationship : "";

    }

    public getId(): number {
        return this.id;
    }
}
