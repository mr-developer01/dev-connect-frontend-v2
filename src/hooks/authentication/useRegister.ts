type TUserData = {
  name: string;
  email: string;
  password: string;
};

async function registerUser(userData: TUserData) {
  if (userData.name) {
    const response = await fetch(
      "https://dev-connect-service.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const jsonData = await response.json();

    return jsonData;
  }

  if (!userData.name) {
    const { email, password } = userData;
    const response = await fetch(
      "https://dev-connect-service.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const jsonData = await response.json();
    
    return jsonData;
  }
}

export default registerUser;
