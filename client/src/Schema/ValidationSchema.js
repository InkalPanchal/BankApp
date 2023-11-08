import * as yup from "yup";

export const loginSchema = yup.object({
  Email: yup
    .string()
    .email("Enter valid email address")
    .required("Email is required"),
  Password: yup
    .string()
    .max(8, "Password must be 8 characters long.")
    .required("Password is required"),
});

export const registerSchema = yup.object({
  Name: yup
    .string()
    .min(3, "Name should be atleast 3 characters long.")
    .required("Name is required."),
  Email: yup
    .string()
    .email("Enter valid email address")
    .required("Email is required"),
  Password: yup
    .string()
    .max(8, "Password must be 8 characters long")
    .required("Password is required"),
  MobileNo: yup
    .number()
    .positive()
    //.min(10, "Mobile number must be 10 digits.")
    //.max(10, "Mobile number must be 10 digits.")
    .required("Mobile number is required"),
  DOB: yup.date().required("DOB is required"),
});

export const accountSchema = yup.object({
  AccountType:yup.string().required("Account type is required."),
  Branch:yup.string().required("Branch is required."),
  // UserId:yup.string().required("User id is required"),
})
