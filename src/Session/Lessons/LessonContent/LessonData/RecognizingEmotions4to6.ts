import { generateImageUrls, genericImages } from "./utils";
const imageCount = 11;
const lessonId = "recognizing-emotions-5to8";
export const RecognizingEmotions46 = {
    title: "Recognizing Emotions",
    id: lessonId,
    imageUrls: generateImageUrls(
        Array.from({ length: imageCount }, (_, i) => i.toString() + ".png"),
        lessonId
    ),
    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Recognizing Emotions",
                body: "Not yet implemented",
                interaction: { type: "next" },
            },
        },
        // Page 2
        {
            id: "p2-what-are-emotions",
            content: {
                title: "What Are Emotions?",
                body:
                    "Emotions are strong feelings you experience every day.\n\nThey shape how you see things, react to situations, and understand yourself and others.",
                interaction: { type: "next" },
            },
        },
        // Page 3
        {
            id: "p3-click-emotion",
            content: {
                title: "What Emotion Are You Feeling Right Now?",
                body: "Click the emotion you’re feeling right now!",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Happy" },
                        { label: "Sad" },
                        { label: "Angry" },
                        { label: "Excited" },
                        { label: "Nervous" },
                    ],
                },
            },
        },
        // Page 4
        {
            id: "p4-everyone-has-emotions",
            content: {
                title: "Everyone Has Emotions",
                body:
                    "It’s okay to feel a certain way, everyone has emotions!\n\nKids, teens, adults, and even babies.",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-common-emotions",
            content: {
                title: "Common Emotions",
                body:
                    "Some common emotions are happy, sad, angry, scared, excited, and proud.",
                interaction: { type: "next" },
            },
        },
        // Page 6
        {
            id: "p6-activity-sad",
            content: {
                title: "Can You Recognize Different Emotions?",
                body: "What emotion is this?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Sad", isCorrect: true },
                        { label: "Happy", isCorrect: false },
                        { label: "Angry", isCorrect: false },
                    ],
                    correctText: "Correct! That was Sad.",
                    incorrectText: "Try again — look closely at the expression!",
                },
            },
        },
        // Page 7
        {
            id: "p7-activity-excited",
            content: {
                title: "What Emotion Is This?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Excited", isCorrect: true },
                        { label: "Cheerful", isCorrect: false },
                        { label: "Disgust", isCorrect: false },
                    ],
                    correctText: "Nice work! That was Excited.",
                    incorrectText: "Try again — look for energy in the expression.",
                },
            },
        },
        // Page 8
        {
            id: "p8-activity-proud",
            content: {
                title: "What Emotion Is This?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Jealous", isCorrect: false },
                        { label: "Bored", isCorrect: false },
                        { label: "Proud", isCorrect: true },
                    ],
                    correctText: "Great job! That was Proud.",
                    incorrectText: "Try again — this one shows confidence!",
                },
            },
        },
        // Page 9
        {
            id: "p9-activity-worried",
            content: {
                title: "Last One! Which Emotion Is This?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Worried", isCorrect: true },
                        { label: "Anxious", isCorrect: false },
                        { label: "Nervous", isCorrect: false },
                    ],
                    correctText: "That’s right — Worried!",
                    incorrectText: "Try again — notice the eyebrows and eyes.",
                },
            },
        },
        // Page 10
        {
            id: "p10-similar-emotions",
            content: {
                title: "Worried, Anxious, Nervous",
                body:
                    "Sometimes recognizing emotions can be hard.\n\nEmotions like worried, anxious, and nervous might look the same, but each one feels a little different.",
                interaction: { type: "next" },
            },
        },
        // Page 11
        {
            id: "p11-happy-cheerful-jolly",
            content: {
                title: "Happy, Cheerful, Jolly",
                body:
                    "Sometimes emotions can feel and look the same, but we use different words to describe them — like happy, cheerful, and jolly.",
                interaction: { type: "next" },
            },
        },
        // Page 12
        {
            id: "p12-match-emojis",
            content: {
                title: "Activity: Match the Emotion to the Emoji",
                body:
                    "Excited\nAnnoyed\nProud\nGloomy\nFrustrated\nSad\nCheerful\nAngry\nDisappointed",
                interaction: { type: "match" },
            },
        },
        // Page 13
        {
            id: "p13-emotions-change",
            content: {
                title: "Emotions Can Change Quickly",
                body:
                    "Emotions can change quickly!\n\nYou might feel great one minute and frustrated the next, and that’s totally normal.",
                interaction: { type: "next" },
            },
        },
        // Page 14
        {
            id: "p14-emotions-help",
            content: {
                title: "Emotions Give You Clues",
                body:
                    "Emotions give you clues about what you need.\n\nMaybe you need a break, to talk to someone, or to do something fun.",
                interaction: { type: "next" },
            },
        },
        // Page 15
        {
            id: "p15-doodle-intro",
            content: {
                title: "Let’s Doodle!",
                body:
                    "Let’s do something fun and doodle!\n\nDoodling can help us manage our emotions and feel more balanced.\n\nIt gives our minds a chance to relax and reset.",
                interaction: { type: "next" },
            },
        },
        // Page 16
        {
            id: "p16-doodle-activity",
            content: {
                title: "Doodle Activity",
                body: "Choose a prompt to draw or make your own creation!",
                interaction: { type: "activity", activityType: "drawing" },
            },
        },
        {
            id: "activity-completed",
            content: {
                title: "Great Job!",
                image: genericImages().celebrating,
                body: "You did great!",
                interaction: { type: "next" },
            },
        },
        {
            id: "lesson-completed",
            content: {
                title: "Great Job!",
                image: genericImages().celebrating_with_balloons,
                body: "You've completed this lesson!",
                interaction: { type: "next" },
            },
        },
    ],
};
