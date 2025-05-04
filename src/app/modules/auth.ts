export interface AuthLogin {
  email: string;
  password: string;
}

export interface AuthRegister {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  userId: string;
  name: string;
  email: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}
