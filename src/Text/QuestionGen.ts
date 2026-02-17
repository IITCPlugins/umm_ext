import { MissionNumberQuestions, NoobQuestions } from "./Text";

export interface Question {
    question: string, answer: string
}

export const generateQuestion = (missionId: number, isStart: boolean): Question => {

    if (isStart) {
        return missionNumberQuestion(missionId);
    }

    return standardQuestion();
}


// helpers
const sample = <T>(data: T[]): T => data[Math.floor(Math.random() * data.length)];
const shuffle = <T>(data: T[]): T[] => {
    const a = [...data];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};


const missionNumberQuestion = (missionId: number): Question => {
    return {
        question: sample(MissionNumberQuestions),
        answer: (missionId + 1).toString()
    }
}


const standardQuestion = (): Question => {
    const quest = sample(NoobQuestions);

    if (quest.m) {
        const rawChoices = quest.m.split(",");
        if (rawChoices.length === 0) return { question: quest.q, answer: "" };

        const answer = rawChoices.splice(0, 1);
        const shuffled = shuffle(rawChoices);
        const correctIndex = Math.floor(Math.random() * 4);
        shuffled.splice(correctIndex, 0, ...answer).slice(0, 4);

        const lines = shuffled.map((c, i) => `${String.fromCodePoint(65 + i)}) ${c}`).join(" ");

        const correctLetter = correctIndex >= 0 ? String.fromCodePoint(65 + correctIndex) : "";

        return {
            question: `${quest.q}\n${lines}`,
            answer: correctLetter
        };

    } else {
        return { question: quest.q, answer: quest.a! }
    }
}