// Upload image to ImageBB
export const uploadToImageBB = async (file) => {
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!IMGBB_API_KEY) {
    toast.error("Image upload service not configured");
    return null;
  }

  const form = new FormData();
  form.append("image", file);

  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      { method: "POST", body: form },
    );

    const data = await res.json();

    if (data.status === 200 && data.data?.url) {
      return data.data.url;
    } else {
      throw new Error(data.error?.message || "Upload failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Image upload failed");
    return null;
  }
};
