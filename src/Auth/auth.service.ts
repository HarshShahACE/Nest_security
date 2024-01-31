import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/Users/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserDtos } from "src/Users/userDtos";


@Injectable()
export class AuthService{

    constructor(
        private appService: UserService,
       private jwtService: JwtService
      ) {}


    // Simple Signin End Point

    // async signIn(username: string, pass: string): Promise<any> {
    //     const user = await this.appService.findOne(username);
    //     if (user?.password !== pass) {
    //       throw new UnauthorizedException();
    //     }
    //     const { password, ...result } = user;
    //     return result;
    // }

    // JWT Based Login
    async signIn(username: string,pass: string,): Promise<any> {
        const user = await this.appService.findOne(username);
        if (user.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, username: user.username };
        return {
          access_token: await this.jwtService.sign(payload),
        };
      }

    // Create USer
    private users = [];
    createUser(createUserDto: UserDtos): string {
      const { name, email, password } = createUserDto;
      const newUser = {
        id: this.users.length + 1,
        name,
        email,
        password,
      };
      this.users.push(newUser);
      return `User ${newUser.name} created with ID ${newUser.id}`;
    }
}