import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{

    constructor(private readonly appservice : UserService) {}

    @Get()
    getall() : string{
        return this.appservice.getall();
    }

    
}