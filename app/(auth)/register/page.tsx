"use client";

import { useState } from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
    const router = useRouter();
    const { fetchUser } = useAuth();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            await api.post("/users/register", {
                username: form.username,
                email: form.email,
                password: form.password,
            });

            await fetchUser();

            router.push("/dashboard");
        } catch (err: any) {
            console.log(err.response.data.error);
            setError(err?.response?.data?.error?.message || "Registration failed");
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
                <h1 className="text-2xl font-bold text-center">Register</h1>

                {error && <div className="text-red-500">{error}</div>}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

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

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="text-sm text-center text-gray-500">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}
