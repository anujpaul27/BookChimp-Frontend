export const getData = async (api) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${api}`);
  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    return null;
  }
};
