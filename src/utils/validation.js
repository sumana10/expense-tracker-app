export const validation = (name, value, errors) => {
  switch (name) {
    case "username":
      errors.username =
      /^[A-Za-z]\w*/.test(value) ? "" : "Invalid Username!";
      break;
    case "email":
      errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Invalid email format!";
      break;
    case "password":
      errors.password =
        value.length < 6 ? "Password must be at least 6 characters long!" : "";
      break;
    case "phone":
      errors.phone = /^\d{10}$/.test(value)
        ? ""
        : "Please enter a valid phone number!";
      break;
    case "description":
      errors.description = /^[A-Za-z]\w*/.test(value)
        ? ""
        : "Invalid Expenses!";
      break;
    case "amount":
      errors.amount = /^[0-9]/.test(value) ? "" : "Amount must numbers!";
      break;

    default:
      break;
  }

  return errors;
};
