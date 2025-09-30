"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, FC } from "react";

export function withAuth(Component: FC<any>) {
    return function ProtectedComponent(props: any) {
        const { user, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                router.push(`/login?redirect=${window.location.pathname}`);
            }
        }, [user, loading]);

        if (loading) return <p>Loading...</p>;
        if (!user) return null;

        return <Component {...props} user={user} />;
    };
}
