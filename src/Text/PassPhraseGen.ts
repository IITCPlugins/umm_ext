import { MissionNumberQuestions } from "./Text";

export const getPassphraseQuestion = () => {
    return MissionNumberQuestions[Math.floor(Math.random() * MissionNumberQuestions.length)]
}

/**
 * or generate by:
 * “What number is this mission?” 
 * 
 * Rotate word groups:
 *     number / index / position / slot / step
 *     banner / series / sequence
 *     
 */