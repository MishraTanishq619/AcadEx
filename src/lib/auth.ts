"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

interface TokenPayload {
	userId: string;
	// Add other token payload properties as needed
}

export const auth = async () => {
	const token = (await cookies()).get("auth-token")?.value;

	if (!token) {
		return null;
	}

	try {
		const decoded: TokenPayload = jwtDecode(token);
		return decoded.userId || null;
	} catch (error) {
		console.error("Error decoding token or fetching user:", error);
		return null;
	}
};
