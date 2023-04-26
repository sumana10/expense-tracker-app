export const validation = (name, value, errors) => {
    switch (name) {
      case "username":
        errors.username =
          value.length < 5 ? "Name must be at least 5 characters long!" : "";
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
      default:
        break;
    }
   
    return errors;
  };