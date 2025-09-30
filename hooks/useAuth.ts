"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/users/me");
                setUser(res.data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await api.post("/users/logout");
            setUser(null);
            router.push("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return { user, loading, logout };
}
