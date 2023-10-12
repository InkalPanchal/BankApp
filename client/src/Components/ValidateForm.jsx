const ValidateForm = ({ userData, setErrors }) => {
  const newErrors = {};

  if (!userData.Name) {
    newErrors.Name = "Name is required";
  } else if (userData.Name.length < 3) {
    newErrors.Name = "Name should be atleast 3 characters long.";
  }

  if (!userData.Email) {
    newErrors.Email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(userData.Email)) {
    newErrors.Email = "Invalid email address";
  }

  if (!userData.Password) {
    newErrors.Password = "Password is required";
  } else if (userData.Password.length < 8) {
    newErrors.Password = "Password must be at least 8 characters long";
  }

  if (!userData.MobileNo) {
    newErrors.MobileNo = "Mobile Number is required";
  } else if (userData.MobileNo.length !== 10) {
    newErrors.MobileNo = "Mobile number must be 10 digits long";
  }

  if (!userData.DOB) {
    newErrors.DOB = "Date of birth is required";
  }
  setErrors(newErrors);
  // console.log("newErrors", newErrors);
  return Object.keys(newErrors).length === 0;
};

export default ValidateForm;
