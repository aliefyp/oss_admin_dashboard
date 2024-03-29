const resource = {
  title: "Welcome to React and react-i18next",
  auth: {
    back: 'Back',
  },
  login: {
    title: "Welcome Back",
    subtitle: "Please login to your account.",
    label_email: "Email",
    label_password: "Password",
    cta_submit: "Login",
    cta_forgot: "Forget Password?"
  },
  forgot_password: {
    title: "Forgot Password?",
    subtitle: "Please input your email, and get the link for reset your password",
    label_email: "Email",
    cta_submit: "Request Reset Password ",
    resend_code: "You can request resend code in {{time}}s",
  },
  reset_password: {
    title: "Reset Your Password",
    label_password: "Password",
    label_confirm_password: "Confirm Password",
    cta_submit: "Submit",
    validation: {
      title: "Make sure your password contains it",
      uppercase: "Uppercase",
      lowercase: "Lowercase",
      number: "Number",
      special_character: "Special Character",
    },
  },
};

export default resource;