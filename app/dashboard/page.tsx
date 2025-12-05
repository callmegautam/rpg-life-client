"use client";

//import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/axios";
import { Card, ProgressBar } from "pixel-retroui";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { demoUserSkills, demoRequiredXp, demoProgress } from "@/lib/demoSkills";

// Using CSS-only, removed import of fonts

type Skill = {
    id: number;
    name: string;
    category: string;
    xpPerTask: number;
    streakBonus: number;
    penaltyPerSkip: number;
    frequency: "DAILY" | "WEEKLY" | "MONTHLY";
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
};

type UserSkill = {
    id: number;
    userId: number;
    totalXp: number;
    currentStreak: number;
    bestStreak: number;
    lastCompleted: string;
    skill: {
        id: number;
        name: string;
        frequency: "DAILY" | "WEEKLY" | "MONTHLY";
        category: string;
        xpPerTask: number;
        streakBonus: number;
        penaltyPerSkip: number;
        createdAt?: Date | null | undefined;
        updatedAt?: Date | null | undefined;
    };
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
};

const page = () => {
    const { user, fetchUser, logout } = useAuth({ redirectToLogin: false });
    const [skills, setSkills] = useState<Skill[]>([]);
    const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
    const [requiredXp, setRequiredXp] = useState(0);
    const [progress, setProgress] = useState(10);
    const [loading, setLoading] = useState(true);

    const avatarUrl =
        user?.avatar || "https://i.pinimg.com/736x/ab/ef/82/abef82fddc6e3db86db23870f2a52277.jpg";

    useEffect(() => {
        // console.log(user);
        const fetchdata = async () => {
            setLoading(true);
            try {
                // const res = await api.get("/skills");
                const currentLevelID = user?.currentLevel?.id;
                const userSkill = await api.get("/users/skills");
                if (user) {
                    const nextLevel = await api.get(`/levels/${user?.currentLevel?.id}`);
                    setRequiredXp(nextLevel.data.data.xpRequired);
                    setProgress((user?.totalXp * 100) / nextLevel.data.data.xpRequired);
                }
                // const data: Skill[] = res.data.data;
                const userSkills: UserSkill[] = userSkill.data.data;
                // setSkills(data);
                setUserSkills(userSkills);
            } catch (error) {
                // If we're in dev, it'll automatically use demo data
                if (process.env.NODE_ENV === "development") {
                    console.log("API unavailable, using demo content (development mode)");
                    setUserSkills(demoUserSkills as any);
                    setRequiredXp(demoRequiredXp);
                    setProgress(demoProgress);
                } else {
                    console.error("Error fetching dashboard data:", error);
                }
            }
            setLoading(false);
        };
        fetchdata();
    }, [user]);

    // useEffect(() => {
    //     fetchUser();
    // }, []);

    async function handleComplete(id: number) {
        try {
            await api.post(`/quests/${id}/complete`);
            fetchUser();
            console.log("completed");
        } catch (error) {
            if (process.env.NODE_ENV === "development") {
                console.log("API unavailable, demo mode: quest marked as completed locally");
                fetchUser();
            } else {
                console.error("Error completing quest:", error);
            }
        }
    }

    async function handleSkip(id: number) {
        try {
            await api.post(`/quests/${id}/skip`);
            fetchUser();
            console.log("skipped");
        } catch (error) {
            if (process.env.NODE_ENV === "development") {
                console.log("API unavailable, demo mode: quest skipped locally");
                fetchUser();
            } else {
                console.error("Error skipping quest:", error);
            }
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
       // <PrivateRoute>
            <div className={`font-minecraft w-screen h-screen flex flex-col justify-center items-center`}>
                <Card
                    bg="#ffffff"
                    borderColor="#e5e7eb"
                    className="w-1/2 h-full flex flex-col justify-start items-center gap-6 "
                >
                    <div className="w-full flex flex-row justify-center items-center gap-6">
                        <div className="w-1/2 h-full flex flex-col justify-start items-center">
                            <Card
                                borderColor="#d1d5db"
                                className={`h-80 w-80 p-0 m-0 relative overflow-hidden`}
                                style={{ padding: "0px" }}
                            >
                                {/* <img src={avatarUrl} alt="avatar" className="" /> */}
                                {/* <Image
                                src={avatarUrl}
                                alt="avatar"
                                width={999}
                                height={999}
                                // fill

                                className="w-full h-full m-0"
                            /> */}
                                <Image
                                    src={avatarUrl}
                                    alt="avatar"
                                    fill // 👈 this makes the image stretch to fill parent
                                    className="object-cover" // or object-contain if you want to see full image
                                />
                            </Card>
                            {/* <div className="flex flex-col justify-center items-center w-full">
                            <div className="flex flex-row justify-center items-center w-full">
                                <Card
                                    className="w-[30%]"
                                    borderColor="#94a661"
                                    bg="#94a661"
                                    shadowColor="#94a661"
                                >
                                    XP
                                    <br />
                                    10
                                </Card>
                                <Card
                                    className="w-[30%]"
                                    borderColor="#94a661"
                                    bg="#94a661"
                                    shadowColor="#94a661"
                                >
                                    XP
                                    <br />
                                    10
                                </Card>
                                <Card
                                    className="w-[30%]"
                                    borderColor="#94a661"
                                    bg="#94a661"
                                    shadowColor="#94a661"
                                >
                                    XP
                                    <br />
                                    10
                                </Card>
                            </div>
                        </div> */}
                        </div>
                        <div className="w-1/2 h-full flex flex-col justify-start items-center gap-3">
                            <Card
                                borderColor="#3b82f6"
                                bg="#f0f9ff"
                                shadowColor="#93c5fd"
                                className="h-20 w-3/4 flex flex-col justify-center items-center"
                            >
                                <p className="text-2xl font-semibold text-gray-900">{user?.username}</p>
                                <p className="text-sm text-gray-600">{user?.email}</p>
                            </Card>
                            <Card
                                borderColor="#8b5cf6"
                                bg="#f8f6ff"
                                shadowColor="#d8b4fe"
                                className=" w-3/4 flex flex-col justify-center items-center font-semibold text-gray-800"
                            >
                                {user?.currentArc?.name}
                            </Card>
                            <Card
                                borderColor="#f59e0b"
                                bg="#fef3c7"
                                shadowColor="#fcd34d"
                                className="w-3/4 flex flex-col justify-center items-center"
                            >
                                <div className="w-full px-2 font-semibold text-gray-900">Level {user?.currentLevel?.level}</div>
                                <ProgressBar
                                    size="sm"
                                    color="#3b82f6"
                                    borderColor="#d1d5db"
                                    className="w-full"
                                    progress={progress}
                                />
                            </Card>
                            <div className="flex flex-col justify-center items-center w-[80%]">
                                <div className="flex flex-row justify-center items-center w-full gap-2">
                                    <Card
                                        className="w-[30%] text-center font-semibold text-gray-900"
                                        borderColor="#10b981"
                                        bg="#ecfdf5"
                                        shadowColor="#a7f3d0"
                                    >
                                        Total XP {user?.totalXp}
                                    </Card>
                                    <Card
                                        className="w-[30%] text-center"
                                        borderColor="#6b7280"
                                        bg="#f3f4f6"
                                        shadowColor="#d1d5db"
                                    >
                                        <button onClick={logout} className="font-medium text-gray-700 hover:text-gray-900 transition">Logout</button>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Card
                        bg="#f9fafb"
                        borderColor="#e5e7eb"
                        className="w-4/5 h-full flex flex-col justify-start items-center gap-3"
                    >
                        <div className="w-full flex justify-center items-center gap-2 flex-row font-bold text-gray-900 bg-gray-100 px-4 py-3 rounded">
                            <div className="w-[20%] text-center">Skill</div>
                            <div className="w-[12%] text-center">XP</div>
                            <div className="w-[12%] text-center">Penalty</div>
                            <div className="w-[12%] text-center">Total</div>
                            <div className="w-[12%] text-center">Streak</div>
                            <div className="w-[12%] text-center">Done</div>
                            <div className="w-[12%] text-center">Skip</div>
                        </div>
                        {userSkills.map((skill) => (
                            <div
                                className="w-full flex justify-center items-center gap-2 flex-row text-gray-700 px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100"
                                key={skill.id}
                            >
                                <div className="w-[20%] font-medium">{skill.skill.name}</div>
                                <div className="w-[12%] text-center text-gray-600">{skill.skill.xpPerTask}</div>
                                <div className="w-[12%] text-center text-red-600">{skill.skill.penaltyPerSkip}</div>
                                <div className="w-[12%] text-center font-semibold text-blue-600">{skill.totalXp}</div>
                                <div className="w-[12%] text-center font-semibold text-purple-600">{skill.currentStreak}</div>
                                <div className="w-[12%] text-center">
                                    <button
                                        onClick={() => {
                                            handleComplete(skill.skill.id);
                                        }}
                                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
                                    >
                                        Done
                                    </button>
                                </div>
                                <div className="w-[12%] text-center">
                                    <button onClick={() => handleSkip(skill.skill.id)} className="px-3 py-1 bg-gray-400 text-white rounded text-sm hover:bg-gray-500 transition">Skip</button>
                                </div>
                            </div>
                        ))}
                    </Card>
                </Card>
            </div>
       // </PrivateRoute>
    );
};

export default page;
