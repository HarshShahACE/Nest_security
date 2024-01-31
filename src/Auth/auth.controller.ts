import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { Roles } from "./role.decorator";
import { role } from "./role.enum";
import { UserDtos } from "src/Users/userDtos";


@Controller()
export class AuthController{

    constructor(private readonly appservice: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.appservice.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }


    // Example Of Role Based Authorization
    @Roles(role.Admin)
    @Get('Roles')
    roles(@Body()Userdto:UserDtos):string{
        return this.appservice.createUser(Userdto);
    }


    // Example Of Claim Based Authorization
    // @Post('ClaimPer')
    // @RequirePermissions(Permission.CREATE_CAT)
    // create(@Body() createCatDto: UserDtos) {
    // this.appservice.createUser(createCatDto);
    // }

    

}
