import { generateImageUrls, genericImages } from "./utils";
const imageCount = 17;
const lessonId = "recognizing-emotions-1to4";
export const RecognizingEmotions1to3 = {
    title: "Recognizing Emotions (Grades 1–3)",
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
                    "Emotions are the feelings we have inside.\n\nThey help us understand how we feel about things that happen around us.",
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
                    "Everyone has emotions - kids, adults, and even babies!\n\nSome common emotions are happy, sad, angry, scared, excited, and proud.",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-activity-recognize-sad",
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
                    correctText: "That’s right! That was Sad.",
                    incorrectText: "Try again — look at the expression closely!",
                },
            },
        },
        // Page 6
        {
            id: "p6-activity-happy",
            content: {
                title: "What Emotion Is This?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Excited", isCorrect: false },
                        { label: "Mad", isCorrect: false },
                        { label: "Happy", isCorrect: true },
                    ],
                    correctText: "Nice work! That was Happy!",
                    incorrectText: "Try again — notice the smile!",
                },
            },
        },
        // Page 7
        {
            id: "p7-activity-proud",
            content: {
                title: "What Emotion Is This?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Jealous", isCorrect: false },
                        { label: "Bored", isCorrect: false },
                        { label: "Proud", isCorrect: true },
                    ],
                    correctText: "Awesome! That was Proud!",
                    incorrectText: "Try again — look at the confident face!",
                },
            },
        },
        // Page 8
        {
            id: "p8-all-emotions-normal",
            content: {
                title: "All Emotions Are Normal",
                body:
                    "All emotions are normal, even the hard ones.\n\nThey’re a big part of being human!",
                interaction: { type: "next" },
            },
        },
        // Page 9
        {
            id: "p9-happy-description",
            content: {
                title: "Happy",
                body:
                    "You feel good inside.\nYou might smile or laugh.\nHappens when you do something fun or kind.",
                interaction: { type: "next" },
            },
        },
        // Page 10
        {
            id: "p10-sad-description",
            content: {
                title: "Sad",
                body:
                    "You feel down or upset.\nYou might cry or want to be alone.\nHappens when something is lost or hurts your feelings.",
                interaction: { type: "next" },
            },
        },
        // Page 11
        {
            id: "p11-angry-description",
            content: {
                title: "Angry",
                body:
                    "You feel hot or tense.\nYou might want to yell or stomp.\nHappens when something feels unfair or upsetting.",
                interaction: { type: "next" },
            },
        },
        // Page 12
        {
            id: "p12-scared-description",
            content: {
                title: "Scared",
                body:
                    "Your heart beats fast.\nYou might freeze or hide.\nHappens when you feel unsafe or surprised.",
                interaction: { type: "next" },
            },
        },
        // Page 13
        {
            id: "p13-embarrassed-description",
            content: {
                title: "Embarrassed",
                body:
                    "You feel shy or nervous.\nYour face might turn red.\nHappens when people are looking at you or you make a mistake.",
                interaction: { type: "next" },
            },
        },
        // Page 14
        {
            id: "p14-proud-description",
            content: {
                title: "Proud",
                body:
                    "You feel strong and confident.\nYou might smile big.\nHappens when you work hard or do something great.",
                interaction: { type: "next" },
            },
        },
        // Page 15
        {
            id: "p15-love-description",
            content: {
                title: "Love",
                body:
                    "You feel warm and kind.\nYou want to help or be close to someone.\nHappens with friends, family, or pets.",
                interaction: { type: "next" },
            },
        },
        // Page 16
        {
            id: "p16-emotions-help",
            content: {
                title: "Emotions Give You Clues",
                body:
                    "Emotions give you clues about what you need.\n\nMaybe you need a break, to talk to someone, or to do something fun.",
                interaction: { type: "next" },
            },
        },
        // Page 17
        {
            id: "p17-doodle-intro",
            content: {
                title: "Let’s Doodle!",
                body:
                    "Let’s do something fun and doodle!\n\nDoodling can help us manage our emotions and feel more balanced.\n\nIt gives our minds a chance to relax and reset.",
                interaction: { type: "next" },
            },
        },
        // Page 18
        {
            id: "p18-doodle-activity",
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
