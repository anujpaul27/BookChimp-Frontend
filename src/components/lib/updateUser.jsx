import { authClient } from "@/app/(auth)/lib/auth-client";

export const changeRoleByAdmin = async (id, newRole) => {
  const { data, error } = await authClient.admin.setRole({
    userId: id,
    role: newRole, // e.g., "admin" or "user"
  });

  if (error) {
    console.error("Failed to update role:", error.message);
    return { success: false, error };
  }

  return { success: true, data };
};