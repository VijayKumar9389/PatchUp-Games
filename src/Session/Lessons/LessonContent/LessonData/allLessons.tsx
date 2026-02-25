import { AnxietyBreathingSquare } from "./AnxietyBreathingSquare";
import { AnxietyTriggersCountTo10 } from "./AnxietyBecomingSelfAware";
import { BuildingStrongFriendshipsDrawing } from "./BuildingFriendshipsDrawing";
import { HandlingFrustrationInfinityBreathing } from "./HandlingFrustrationLazy8";
import { BuildingRoutines54321 } from "./BuildingRoutines54321";
import { ConstructiveAngerBreathingSquare } from "./ConstructiveAngerBreathingSquare";
import { IdentifyingDistractionsStarHunter } from "./IdentifyingDistractionsStarFinder";
import { PersonalStrengthsBubbleBreaker } from "./IdentifyingStrengthsBubbleBreaker";
import { ManagingDistractionsColoring } from "./ManagingDistractions";
import { MixedEmotionsComplex } from "./MixedEmotionsGrade6";
import { RecognizingEmotions1to3 } from "./RecognizingEmotions1to3";
import { RecognizingEmotions46 } from "./RecognizingEmotions4to6";
import { ReframingNegativeThinking } from "./ReframingNegativeThinking";
import { StressAnxietyBreathingSquare } from "./StressAnxiety4to6";
import { UnderstandingConflictCounting } from "./UnderstandingConflict";
// export const allLessons = {
//     'understanding-emotions': AnxietyBreathingSquare,
//     'anxiety-triggers-count-to-10': AnxietyTriggersCountTo10,
//     'building-strong-friendships': BuildingStrongFriendshipsDrawing,
//     'handling-frustration-infinity-breathing': HandlingFrustrationInfinityBreathing,
//     'building-routines-54321': BuildingRoutines54321,
//     'constructive-anger-breathing-square': ConstructiveAngerBreathingSquare,
//     'identifying-distractions-star-finder': IdentifyingDistractionsStarHunter,
//     'identifying-strengths-bubble-breaker': PersonalStrengthsBubbleBreaker,
//     'managing-distractions-coloring': ManagingDistractionsColoring,
//     'mixed-emotions-complex': MixedEmotionsComplex,
//     'recognizing-emotions-1to4': RecognizingEmotions1to3,
//     'recognizing-emotions-5to8': RecognizingEmotions46,
//     'reframing-negative-thinking': ReframingNegativeThinking,
//     'stress-anxiety': StressAnxietyBreathingSquare,
//     'understanding-conflict-counting': UnderstandingConflictCounting,
// };

export const lessonImporters: Record<string, () => Promise<any>> = {
    "understanding-emotions": () => import("./AnxietyBreathingSquare"),
    'anxiety-triggers-count-to-10': () => import("./AnxietyBecomingSelfAware"),
    'building-strong-friendships': () => import("./BuildingFriendshipsDrawing"),
    'handling-frustration-infinity-breathing': () => import("./HandlingFrustrationLazy8"),
    'building-routines-54321': () => import("./BuildingRoutines54321"),
    'constructive-anger-breathing-square': () => import("./ConstructiveAngerBreathingSquare"),
    'identifying-distractions-star-finder': () => import("./IdentifyingDistractionsStarFinder"),
    'identifying-strengths-bubble-breaker': () => import("./IdentifyingStrengthsBubbleBreaker"),
    'managing-distractions-coloring': () => import("./ManagingDistractions"),
    'mixed-emotions-complex': () => import("./MixedEmotionsGrade6"),
    'recognizing-emotions-1to4': () => import("./RecognizingEmotions1to3"),
    'recognizing-emotions-5to8': () => import("./RecognizingEmotions4to6"),
    'reframing-negative-thinking': () => import("./ReframingNegativeThinking"),
    'stress-anxiety': () => import("./StressAnxiety4to6"),
    'understanding-conflict-counting': () => import("./UnderstandingConflict"),
};

