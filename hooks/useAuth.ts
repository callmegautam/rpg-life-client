"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

export type User = {
    currentLevel: {
        id: number;
        level: number;
        arcId: number;
        xpRequired: number;
        reward: string;
        createdAt?: Date | null | undefined;
        updatedAt?: Date | null | undefined;
    };
    currentArc: {
        id: number;
        name: string;
        levelRequired: number;
        createdAt?: Date | null | undefined;
        updatedAt?: Date | null | undefined;
    };
    totalXp: number;
    username: string;
    email: string;
    avatar?: string | null | undefined;
    bio?: string | null | undefined;
    id: number;
    isAdmin: boolean;
};

export function useAuth({ redirectToLogin = false } = {}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const fetchUser = useCallback(async () => {
        setLoading(true);
        setError(null);
        let mounted = true;

        try {
            const res = await api.get("/users/me");
            // if (mounted) {
            setUser(res.data.data);
            // }
        } catch (err: any) {
            if (mounted) {
                setUser(null);
                setError(err?.response?.data?.message || "Failed to fetch user");
                if (redirectToLogin) router.push("/login");
            }
        } finally {
            if (mounted) setLoading(false);
        }

        return () => {
            mounted = false;
        };
    }, [router, redirectToLogin]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const logout = async () => {
        try {
            await api.post("/users/logout");
            setUser(null);
            router.push("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return { user, loading, error, fetchUser, logout };
}
