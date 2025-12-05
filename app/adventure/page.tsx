'use client';

import React, { useState } from 'react';
import Background from '@/components/landing/Background';

export default function Adventure() {
    const [adventureLog, setAdventureLog] = useState<string[]>([]);

    const startAdventure = () => {
        const adventures = [
            'You encounter a mysterious forest...',
            'A dragon appears in the distance!',
            'You discover a hidden treasure chest!',
            'A wise wizard offers you a quest...',
        ];

        const randomAdventure =
            adventures[Math.floor(Math.random() * adventures.length)];

        setAdventureLog((prev) => [...prev, randomAdventure]);
    };

    return (
        <div className="relative min-h-screen w-full">
            <Background />

            <div className="p-6 font-sans">
                <p className="text-5xl sm:text-7xl font-bold text-white text-center font-minecraft">
                    RPG Adventure
                </p>

                <button
                    onClick={startAdventure}
                    className="mt-6 px-6 py-2 bg-white text-black font-semibold rounded cursor-pointer"
                >
                    Start Adventure
                </button>

                <div className="mt-6 space-y-2">
                    {adventureLog.map((log, index) => (
                        <p key={index} className="text-base text-white">
                            {log}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
