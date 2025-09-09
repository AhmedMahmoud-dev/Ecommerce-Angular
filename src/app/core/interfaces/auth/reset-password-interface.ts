// Step 1: user asks to reset (by email)
export interface ForgotPasswordInterface {
  email: string;
}

// Step 2: user provides the reset code
export interface VerifyResetCodeInterface {
  resetCode: string;
}

// Step 3: user sets a new password
export interface ResetPasswordInterface extends ForgotPasswordInterface {
  newPassword: string;
}