import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { RegisterRequest } from './register.service';
import { map } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Controller('register')
export class RegisterController {
  keycloakUrl: string = this.configService.get<string>('KEYCLOAK_URL');
  keycloakRealm: string = this.configService.get<string>('KEYCLOAK_REALM');
  keycloakClient: string = this.configService.get<string>(
    'KEYCLOAK_ADMIN_CLIENT_ID',
  );
  keycloakSecret: string = this.configService.get<string>(
    'KEYCLOAK_ADMIN_CLIENT_SECRET',
  );
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  @Post()
  async register(@Body() request: RegisterRequest): Promise<any> {
    const token = this.getToken();
    if (token) {
      return this.createUser(await token, request);
    }
    return null;
  }

  async getToken(): Promise<any> {
    const url = `${this.keycloakUrl}/realms/master/protocol/openid-connect/token`;
    return await this.httpService
      .post<any>(
        url,
        {
          client_id: this.keycloakClient,
          grant_type: 'client_credentials',
          client_secret: this.keycloakSecret,
        },
        {
          headers: {
            'Content-Type': `application/x-www-form-urlencoded`,
          },
        },
      )
      .pipe(
        map(async (response) => {
          return response.data.access_token;
        }),
      )
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      )
      .toPromise();
  }

  async createUser(token: string, request: RegisterRequest): Promise<any> {
    const params = JSON.stringify({
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      username: request.email,
      emailVerified: true,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: request.password,
          temporary: false,
        },
      ],
    });

    return this.httpService
      .post(
        `${this.keycloakUrl}/admin/realms/${this.keycloakRealm}/users`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(
        map((resp) => {
          return resp.data;
        }),
      )
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      )
      .toPromise();
  }

  //   @Get()
  //   findAll(): string {
  //     return 'This action returns all cats';
  //   }
}
