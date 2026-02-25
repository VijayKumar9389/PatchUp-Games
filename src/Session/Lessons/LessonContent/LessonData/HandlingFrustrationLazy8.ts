import { generateImageUrls, genericImages } from "./utils";
const lessonId = "handling-frustration-infinity-breathing";
const imageCount = 19;
const imageUrls = [
    ...generateImageUrls(['student fight.png', ...Array.from({ length: imageCount }, (_, i) => i.toString() + ".png")], lessonId), "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/building-strong-friendships/4.png"];

export const HandlingFrustrationInfinityBreathing = {
    title: "Handling Frustration - Infinity Breathing",
    id: lessonId,
    imageUrls: imageUrls,
    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Handling Frustration",
                image: imageUrls[0],
                // body: "Activity: Infinity Breathing",
                interaction: { type: "next" },
            },
        },
        // Page 2
        // {
        //     id: "p2-intro",
        //     content: {
        //         title: "Handling Frustration Using Figure 8 Breathing",
        //         body: "",
        //         interaction: { type: "next" },
        //     },
        // },
        // Page 3
        {
            id: "p3-recognizing-emotions",
            content: {
                title: "Recognizing Emotions",
                image: imageUrls[1],
                body:
                    "Identifying emotions helps us understand our feelings and respond appropriately.",
                interaction: { type: "next" },
            },
        },
        // Page 4
        {
            id: "p4-naming-frustration",
            content: {
                title: "Naming Frustration",
                image: imageUrls[2],
                body:
                    "Saying 'I feel frustrated' allows us to express ourselves and seek help when needed.",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-finding-solutions",
            content: {
                title: "Finding Solutions",
                image: imageUrls[3],
                body:
                    "Focusing on solutions can reduce frustration and help us feel more in control of situations.",
                interaction: { type: "next" },
            },
        },
        // Page 6
        {
            id: "p6-what-it-feels-like",
            content: {
                title: "What It Feels Like!",
                image: imageUrls[4],
                body:
                    "Frustration can feel like anger, sadness, or just being stuck. It’s okay to feel this way sometimes.",
                interaction: { type: "next" },
            },
        },
        // Page 7
        {
            id: "p7-activity-what-does-it-feel-like",
            content: {
                title: "What does frustration feel like to you?",
                body: "Choose all that apply:",
                interaction: {
                    type: "ms",
                    options: [
                        { label: "I feel like screaming", isCorrect: true },
                        { label: "I feel like I need a break", isCorrect: true },
                        { label: "I feel sad", isCorrect: true },
                        { label: "I feel stuck", isCorrect: true },
                    ],
                    correctText:
                        "There’s no wrong answer, frustration can feel different for everyone!",
                    incorrectText:
                        "There’s no wrong answer, frustration can feel different for everyone!",
                },
            },
        },
        // Page 8
        {
            id: "p8-why-it-happens",
            content: {
                title: "Why It Happens",
                image: imageUrls[5],
                body:
                    "Frustration often occurs when we face obstacles or when things take longer than we want.",
                interaction: { type: "next" },
            },
        },
        // Page 9
        {
            id: "p9-how-to-manage",
            content: {
                title: "How to Manage",
                image: imageUrls[6],
                body:
                    "Understanding frustration helps us find ways to cope, like talking it out or using breathing techniques.",
                interaction: { type: "next" },
            },
        },
        // Page 10
        {
            id: "p10-common-triggers",
            content: {
                title: "Common Triggers",
                image: imageUrls[7],
                body:
                    "Having too many assignments can feel overwhelming and lead to frustration.",
                interaction: { type: "next" },
            },
        },
        // Page 11
        {
            id: "p11-waiting-too-long",
            content: {
                title: "Waiting Too Long",
                image: imageUrls[8],
                body:
                    "Waiting for something, like a turn or a response, can make us feel impatient and frustrated.",
                interaction: { type: "next" },
            },
        },
        // Page 12
        {
            id: "p12-issues-with-friends",
            content: {
                title: "Issues with Friends",
                image: imageUrls[9],
                body:
                    "When classmates don't work together, it can create conflict and lead to frustrating situations.",
                interaction: { type: "next" },
            },
        },
        // Page 13
        {
            id: "p13-activity-common-triggers",
            content: {
                title: "What is a common trigger for you?",
                body: "Choose all that apply:",
                interaction: {
                    type: "ms",
                    options: [
                        { label: "Feeling left out by friends", isCorrect: true },
                        { label: "Being blamed for something", isCorrect: true },
                        { label: "Getting a bad grade", isCorrect: true },
                        { label: "Getting teased", isCorrect: true },
                        { label: "Losing a game", isCorrect: true },
                        { label: "Having homework", isCorrect: true },
                    ],
                    correctText:
                        "Everyone has different triggers, recognizing yours is the first step to managing them.",
                    incorrectText:
                        "There’s no wrong answer! Think about what usually frustrates you.",
                },
            },
        },
        // Page 14
        {
            id: "p14-everyone-experiences-it",
            content: {
                title: "Everyone Experiences It",
                image: imageUrls[10],
                body:
                    "People of all ages can feel frustration; it's a common part of life.",
                interaction: { type: "next" },
            },
        },
        // Page 15
        {
            id: "p15-control-your-choices",
            content: {
                title: "Control Your Choices",
                image: imageUrls[11],
                body:
                    "When feeling frustrated, it's important to remember that you have the power to choose your response and actions in any situation.",
                interaction: { type: "next" },
            },
        },
        // Page 16
        {
            id: "p16-seeking-help",
            content: {
                title: "Seeking Help",
                image: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/building-strong-friendships/4.png",
                body:
                    "Asking for support from friends or adults can give you new perspectives and solutions.",
                interaction: { type: "next" },
            },
        },
        // Page 17
        {
            id: "p17-taking-breaks",
            content: {
                title: "Taking Breaks",
                image: imageUrls[12],
                body:
                    "Taking short breaks allows your mind to reset and helps you manage your feelings effectively.",
                interaction: { type: "next" },
            },
        },
        // Page 18
        {
            id: "p18-smart-coping",
            content: {
                title: "Smart Coping",
                image: imageUrls[13],
                body:
                    "When feeling frustrated, it's important to know that there are helpful actions we can take, and some that might not help at all.",
                interaction: { type: "next" },
            },
        },
        // Page 19
        {
            id: "p19-helpful-actions",
            content: {
                title: "Helpful Actions",
                image: imageUrls[15],
                body:
                    "Taking deep breaths or talking to a friend can reduce frustration and make you feel better.",
                interaction: { type: "next" },
            },
        },
        // Page 20
        {
            id: "p20-positive-outlets",
            content: {
                title: "Positive Outlets",
                image: imageUrls[14],
                body:
                    "Engaging in a hobby or physical activity can redirect your energy and improve your mood.",
                interaction: { type: "next" },
            },
        },
        // Page 21
        {
            id: "p21-unhelpful-actions",
            content: {
                title: "Unhelpful Actions",
                image: imageUrls[16],
                body:
                    "Yelling or ignoring your feelings may escalate the problem and lead to more frustration.",
                interaction: { type: "next" },
            },
        },
        // Page 22
        {
            id: "p22-activity-helpful-vs-unhelpful",
            content: {
                title: "Activity: Helpful or Unhelpful?",
                body: "Which of these examples are helpful ways to deal with frustration?",
                interaction: {
                    type: "ms",
                    options: [
                        { label: "Taking a deep breath", isCorrect: true },
                        { label: "Yelling or screaming", isCorrect: false },
                        { label: "Talking to a teacher or friend", isCorrect: true },
                        { label: "Physical aggression", isCorrect: false },
                        { label: "Throwing objects", isCorrect: false },
                        { label: "Going for a walk or break", isCorrect: true },
                    ],
                    correctText:
                        "Well done! Healthy actions like breathing, talking, and walking help manage frustration.",
                    incorrectText:
                        "Try again. Choose actions that calm you down and keep you safe.",
                },
            },
        },
        // Page 23
        {
            id: "p23-what-is-it",
            content: {
                title: "Infinity Breathing Exercise",
                image: imageUrls[19],
                body:
                    "Infinity breathing uses a figure 8 shape to guide your breathing, making it easy to remember and practice.",
                interaction: { type: "next" },
            },
        },
        // Page 24
        // {
        //     id: "p24-figure-8-breathing",
        //     content: {
        //         title: "Figure 8 Breathing",
        //         body:
        //             "Learning how to use Figure 8 Breathing can help you manage frustration and calm down when you're feeling overwhelmed or upset.",
        //         interaction: { type: "next" },
        //     },
        // },
        // Page 25
        {
            id: "p25-step-one",
            content: {
                title: "Step One",
                image: imageUrls[17],
                body:
                    "Start by breathing in as you trace the right side of the figure 8.",
                interaction: { type: "next" },
            },
        },
        // Page 26
        {
            id: "p26-step-two",
            content: {
                title: "Step Two",
                image: imageUrls[18],
                body:
                    "Then breathe out while tracing the bottom of the figure 8.",
                interaction: { type: "next" },
            },
        },
        // Page 27
        {
            id: "p27-repeat",
            content: {
                title: "Repeat",
                body:
                    "Continue this pattern until you feel more relaxed and in control of your feelings.",
                interaction: { type: "activity", activity: "lazy_8" },
            },
        },
        {
            id: "activity-completed",
            content: {
                title: "Great Job!",
                image: genericImages().celebrating,
                body: "You did great! The lazy 8 breathing exercise can help you feel calm when you get frustrated.",
                interaction: { type: "next" },
            },
        },
        {
            id: "lesson-completed",
            content: {
                title: "Great Job!",
                image: genericImages().celebrating_with_balloons,
                body: "You've completed this lesson! Next time you feel frustrated, remember to try the lazy 8 breathing technique.",
                interaction: { type: "next" },
            },
        },
    ],
};
