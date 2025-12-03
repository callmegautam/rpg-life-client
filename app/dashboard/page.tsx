"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/axios";
import { Card, ProgressBar } from "pixel-retroui";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
    const { user, fetchUser, logout } = useAuth({ redirectToLogin: true });
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
            setLoading(false);
        };
        fetchdata();
    }, [user]);

    // useEffect(() => {
    //     fetchUser();
    // }, []);

    async function handleComplete(id: number) {
        await api.post(`/quests/${id}/complete`);
        fetchUser();
        console.log("completed");
    }

    async function handleSkip(id: number) {
        await api.post(`/quests/${id}/skip`);
        fetchUser();
        console.log("skipped");
    }

    if (loading) return <div>Loading...</div>;

    return (
        <PrivateRoute>
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <Card
                    bg="#4a6c4b"
                    borderColor="#dcb07c"
                    className="w-1/2 h-full flex flex-col justify-start items-center gap-6 "
                >
                    <div className="w-full flex flex-row justify-center items-center gap-6">
                        <div className="w-1/2 h-full flex flex-col justify-start items-center">
                            <Card
                                borderColor="#dcb07c"
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
                                borderColor="#94a661"
                                bg="#94a661"
                                shadowColor="#94a661"
                                className="h-20 w-3/4 flex flex-col justify-center items-center"
                            >
                                <p className="text-2xl">{user?.username}</p>
                                <p className="">{user?.email}</p>
                            </Card>
                            <Card
                                borderColor="#5f42ab"
                                bg="#5f42ab"
                                shadowColor="#5f42ab"
                                className=" w-3/4 flex flex-col justify-center items-center"
                            >
                                {user?.currentArc?.name}
                            </Card>
                            <Card
                                borderColor="#fec149"
                                bg="#fec149"
                                shadowColor="#fec149"
                                className="w-3/4 flex flex-col justify-center items-center"
                            >
                                <div className="w-full px-2">Level {user?.currentLevel?.level}</div>
                                <ProgressBar
                                    size="sm"
                                    color="#5f42ab"
                                    borderColor="black"
                                    className="w-full"
                                    progress={progress}
                                />
                            </Card>
                            <div className="flex flex-col justify-center items-center w-[80%]">
                                <div className="flex flex-row justify-center items-center w-full gap-2">
                                    <Card
                                        className="w-[30%] text-center"
                                        borderColor="#94a661"
                                        bg="#94a661"
                                        shadowColor="#94a661"
                                    >
                                        Total XP {user?.totalXp}
                                    </Card>
                                    <Card
                                        className="w-[30%] text-center"
                                        borderColor="#94a661"
                                        bg="#94a661"
                                        shadowColor="#94a661"
                                    >
                                        <button onClick={logout}>Logout</button>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Card
                        bg="#fefcd0"
                        className="w-4/5 h-full flex flex-col justify-start items-center gap-3"
                    >
                        <div className="w-full flex justify-center items-center gap-2 flex-row font-bold">
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
                                className="w-full flex justify-center items-center gap-2 flex-row"
                                key={skill.id}
                            >
                                <div className="w-[20%] ">{skill.skill.name}</div>
                                <div className="w-[12%] text-center">{skill.skill.xpPerTask}</div>
                                <div className="w-[12%] text-center">{skill.skill.penaltyPerSkip}</div>
                                <div className="w-[12%] text-center">{skill.totalXp}</div>
                                <div className="w-[12%] text-center">{skill.currentStreak}</div>
                                <div className="w-[12%] text-center">
                                    <button
                                        onClick={() => {
                                            handleComplete(skill.skill.id);
                                        }}
                                    >
                                        Done
                                    </button>
                                </div>
                                <div className="w-[12%] text-center">
                                    <button onClick={() => handleSkip(skill.skill.id)}>Skip</button>
                                </div>
                            </div>
                        ))}
                    </Card>
                </Card>
            </div>
        </PrivateRoute>
    );
};

export default page;
