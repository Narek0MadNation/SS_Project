const EMAIL_REGEX: RegExp =
  /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

const PASSWORD_REGEX: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/;

interface SignUpInputs {
  email: string;
  password: string;
}

interface ValidationResult {
  success: boolean;
  message: string;
}

const validateSignUp = (inputs: SignUpInputs): ValidationResult => {
  let invalidInputCount: number = 0;

  const isEmailValid: boolean = EMAIL_REGEX.test(inputs.email);
  const isPasswordValid: boolean = PASSWORD_REGEX.test(inputs.password);

  if (!isEmailValid) invalidInputCount++;
  if (!isPasswordValid) invalidInputCount++;

  const success: boolean = invalidInputCount === 0;
  const message: string = success
    ? "No errors detected"
    : `${invalidInputCount} errors detected`;

  return { success, message };
};

export default validateSignUp;
