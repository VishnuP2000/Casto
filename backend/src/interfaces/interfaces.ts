
  export interface AuthResponse {
    message: string;
    success: boolean;
    // token?: string;
    // email?: string;
    // otp?: string;
  }
  export interface signinResult extends AuthResponse {
    accessToken: string;
    refreshToken: string;
    // name?: string;
    // role?: string;
    // userId?: string;
    // pic?: string;
    user: {
      // id: string;
      name: string;
      email: string;
    };

  }
