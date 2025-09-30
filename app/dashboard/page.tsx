"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/axios";
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

const page = () => {
    const { user, fetchUser, logout } = useAuth({ redirectToLogin: true });
    const [skills, setSkills] = useState<Skill[]>([]);
    // console.log(user);

    useEffect(() => {
        // console.log(user);
        const fetchdata = async () => {
            const res = await api.get("/skills");
            console.log(res.data.data);
            const data: Skill[] = res.data.data;
            setSkills(data);
        };
        fetchdata();
    }, []);

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

    return (
        <PrivateRoute>
            <div>
                <h1>Current Arc : {user?.currentArc?.name}</h1>
                <h1>Current Level : {user?.currentLevel?.level}</h1>
                <h1>Total XP : {user?.totalXp}</h1>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>____</th>
                            <th>XP</th>
                            <th>____</th>
                            <th>Complete</th>
                            <th>Skip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((skill) => (
                            <tr key={skill.id}>
                                <td>{skill.name}</td>
                                <td>____</td>
                                <td>{skill.xpPerTask}</td>
                                <td>____</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            handleComplete(skill.id);
                                        }}
                                    >
                                        Complete
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleSkip(skill.id)}>Skip</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={logout}>Logout</button>
            </div>
        </PrivateRoute>
    );
};

export default page;
