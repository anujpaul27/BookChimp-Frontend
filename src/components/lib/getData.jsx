import { sendTokenClient } from "./getSession";

const url = process.env.NEXT_PUBLIC_SERVER_URL;

export const getData = async (api) => {
  const res = await fetch(`${url}/${api}`, {
    headers: { authorization: "Hello token =" },
  });
  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    console.log(res.data.message);
    return null;
  }
};

export const UpdateOrDelete = async (api, option) => {
  try {
    const response = await fetch(`${url}${api}`, {
      method: option,
      headers: {authorization: 'Hello'}
    });
    return response.ok;
  } catch (err) {
    console.error(err.message)
    return false 
  }
};
