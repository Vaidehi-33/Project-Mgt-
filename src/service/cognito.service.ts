import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, signUp } from 'aws-amplify/auth';
import { confirmSignUp } from 'aws-amplify/auth';
import { signIn } from 'aws-amplify/auth';
import { signOut } from 'aws-amplify/auth';
import { getCurrentUser,resetPassword,
  confirmResetPassword,
  ResetPasswordInput,
  ResetPasswordOutput,
  ConfirmResetPasswordInput,} from 'aws-amplify/auth';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: 'ca-central-1_j0buT0gKX',
          userPoolClientId: 'ivnfilu1ugronvj3j7h5jmgcv',
          // userPoolId: 'ca-central-1_iQSGcsct3',
          // userPoolClientId: '5i8o1mon9e4noeg4t1vpfb2crb',
        },
      },
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return signUp({
      username: user.email,
      password: user.password,
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return confirmSignUp({
      username: user.email,
      confirmationCode: user.code,
    });
  }

  public signIn(user: IUser): Promise<any> {
    return signIn({
      username: user.email,
      password: user.password,
    }).then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    }
  }

  public getUser(): Promise<any> {
    return getCurrentUser();
  }

  // public updateUser(user: IUser): Promise<any> {
  //   return currentUserPoolUser()
  //   .then((cognitoUser: any) => {
  //     return updateUserAttributes(cognitoUser, user);
  //   });
  // }

  public async getJwt() {
    const { idToken } =
      (await fetchAuthSession({ forceRefresh: true })).tokens ?? {};
    return idToken?.toString();
  }

  public resetPassword(user: IUser): Promise<ResetPasswordOutput> {
    const resetPasswordInput: ResetPasswordInput = {
      username: user.email,
    };
    return resetPassword(resetPasswordInput);
  }

  public confirmResetPassword(user: IUser, new_pass: string): Promise<void> {
    const confirmResetPasswordInput: ConfirmResetPasswordInput = {
      username: user.email,
      confirmationCode: user.code,
      newPassword: new_pass,
    };
    return confirmResetPassword(confirmResetPasswordInput);
  }
}
