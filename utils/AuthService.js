import { NUTRINA_API } from "../utils/config";

export const login = async (data) => {
  try {
    const user = await fetch(NUTRINA_API.apiUsers + "/auth/login", {
      method: "POST",
      body: JSON.stringify({ ...data }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resUser = await user.json();
    return resUser;
  } catch (error) {
    console.log(error);
  }

  return resUser;
};

export const getPatientByUuid = async (uuid, token) => {
  try {
    const data = await fetch(NUTRINA_API.apiUsers + "/users/" + uuid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const getData = await data.json();
    return getData;
  } catch (error) {
    console.log(error);
  }
  return getData;
};

export const getMedicalRes = async (uuid, type, token) => {
  if (type == "finalConsultation") {
    try {
      const data = await fetch(
        NUTRINA_API.apiNutrina + "/medical-consultation/One/" + uuid,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const getData = await data.json();
      return getData;
    } catch (error) {
      console.log(error);
    }

    return getData;
  } else if (type == "history") {
    try {
      const data = await fetch(
        NUTRINA_API.apiNutrina + "/medical-consultation/" + uuid,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const getData = await data.json();
      return getData;
    } catch (error) {
      console.log(error);
    }

    return getData;
  }
};

export const logOut = async (token) => {
  try {
    const user = await fetch(NUTRINA_API.apiUsers + "/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export function isAuthenticated() {
  const getCookie = document.cookie.split("=");
  const token = getCookie[1];

  // const user = localStorage.getItem("user");
  if (!token) {
    console.log("token invalid");
    // return res.status(401).json({ error: "invalid token" });
  }
  return token;
}
