"use client";

import { useState } from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
    const router = useRouter();
    const { fetchUser } = useAuth(); // Refresh auth state after login

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            setLoading(true);

            // Login API call
            await api.post("/users/login", {
                email: form.email,
                password: form.password,
            });

            // Refresh auth state
            await fetchUser();

            // Redirect to dashboard (or intended private route)
            router.push("/dashboard");
        } catch (err: any) {
            setError(err?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-center">Login</h1>

                {error && <div className="text-red-500">{error}</div>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm text-center text-gray-500">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
