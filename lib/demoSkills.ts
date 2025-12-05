export const demoUserSkills = [
    {
        id: 1,
        userId: 1,
        totalXp: 150,
        currentStreak: 5,
        bestStreak: 12,
        lastCompleted: new Date().toISOString(),
        skill: {
            id: 1,
            name: "Reading",
            frequency: "DAILY",
            category: "Learning",
            xpPerTask: 50,
            streakBonus: 10,
            penaltyPerSkip: 5,
        },
    },
    {
        id: 2,
        userId: 1,
        totalXp: 220,
        currentStreak: 8,
        bestStreak: 20,
        lastCompleted: new Date().toISOString(),
        skill: {
            id: 2,
            name: "Exercise",
            frequency: "DAILY",
            category: "Health",
            xpPerTask: 75,
            streakBonus: 15,
            penaltyPerSkip: 10,
        },
    },
    {
        id: 3,
        userId: 1,
        totalXp: 100,
        currentStreak: 3,
        bestStreak: 7,
        lastCompleted: new Date().toISOString(),
        skill: {
            id: 3,
            name: "Coding",
            frequency: "DAILY",
            category: "Development",
            xpPerTask: 100,
            streakBonus: 20,
            penaltyPerSkip: 15,
        },
    },
];

export const demoRequiredXp = 1000;
export const demoProgress = 45;
