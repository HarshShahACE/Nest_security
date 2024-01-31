import { Module } from "@nestjs/common";
import { UserModule } from "src/Users/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./role.guard";


@Module({
    imports : [UserModule,JwtModule.register({
        secret:'secret',
        signOptions:{expiresIn:'60s'}
    })],
    controllers : [AuthController],
    providers : [{
        provide:APP_GUARD,
        useClass : AuthGuard
    },{
        provide : APP_GUARD,
        useClass : RolesGuard
    },AuthService]
})

export class AuthModule {}  