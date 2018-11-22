import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly baseAppUrl: string = 'http://localhost/api/';
    readonly loginAPIUrl: string = 'account/login';
    readonly registrationAPIUrl: string = 'account/register';
    readonly UserAPIUrl: string = 'user/user';
    readonly ChangePasswordAPIUrl: string = 'account/change-password';
}