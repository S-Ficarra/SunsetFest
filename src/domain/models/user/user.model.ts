import { Role } from './role.model'

export class User {

    private _id: number;
    private _name: string;
    private _firstName: string;
    private _email: string;
    private _password: string;
    private _role: Role;

    constructor(id: number, name: string, firstName: string, email: string, password: string, role: Role) {
        this._id = id;
        this._name = name;
        this._firstName = firstName;
        this._email = email;
        this._password = password;
        this._role = role;
    }


    setId(id: number): void {
        this._id = id;
    };

    getId(): number {
        return this._id;
    };

    setName(name: string): void {
        this._name = name;
    };

    getName(): string {
        return this._name;
    };

    setFirstName(firstName: string): void {
        this._firstName = firstName;
    };

    getFirstName(): string {
        return this._firstName;
    };

    setEmail(email: string): void {
        this._email = email;
    };

    getEmail(): string {
        return this._email;
    };

    setPassword(password: string): void {
        this._password = password;
    };

    getPassword(): string {
        return this._password;
    };

    setRole(role: Role): void {
        this._role = role;
    }

    getRole(): Role {
        return this._role;
    };

};
