import { role } from "src/Auth/role.enum"

export class UserDtos{
    id : number
    name : string
    email : string
    password : string
    roles : role[]
}