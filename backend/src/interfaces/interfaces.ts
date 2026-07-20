
  export interface AuthResponse {
    message: string;
    success: boolean;

  }
  export interface signinResult extends AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
      name: string;
      email: string;
    };
    image:string;

  }
