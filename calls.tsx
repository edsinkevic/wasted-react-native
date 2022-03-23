import { Credentials } from "./models/Credentials";
import * as SecureStore from "expo-secure-store";

export const login = (creds: Credentials, uri: string) => {
  return fetch(uri, {
    method: "POST",
    body: JSON.stringify(creds),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status == 200) {
      const token = response.headers.get("set-cookie").split(";")[0];

      if (token != null) return token;
    } else {
      return Promise.reject("Unauthorized");
    }
  });
};

export const getUser = (uri, token) => {
  console.log("token " + token);
  return fetch(uri, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: token,
    },
  })
    .then((response) => {
      if (response.status == 200) return response.json();
      else return null;
    })
    .catch((e) => console.log("getUser error: " + e));
};

export const signup = (creds, uri: string) => {
  return fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  }).then((response) => {
    console.log(response.status);
    switch (response.status) {
      case 200:
        return response.json();
      case 400:
        return response.json().then((json) => {
          return Promise.reject(JSON.stringify(json));
        });
      default:
        return null;
    }
  });
};
