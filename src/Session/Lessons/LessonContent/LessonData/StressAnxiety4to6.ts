import { generateImageUrls, genericImages } from "./utils";
const imageCount = 10;
const lessonId = "stress-anxiety";
const imageUrls = generateImageUrls(
    Array.from({ length: imageCount }, (_, i) => i.toString() + ".png"),
    lessonId
);

export const StressAnxietyBreathingSquare = {
    title: "Stress & Anxiety (Grades 4–6)",
    id: lessonId,
    imageUrls: imageUrls,
    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Stress & Anxiety",
                // body: "Grades 4–6\nActivity: Breathing Square",
                image: imageUrls[0],
                interaction: { type: "next" },
            },
        },
        // Page 2
        {
            id: "p2-have-you-felt-nervous",
            content: {
                title: "Have You Felt Nervous?",
                body: "Have you ever felt nervous before a test or worried about something bad happening?",
                interaction: {
                    type: "yesno",
                    correctAnswer: "yes",
                    style: "text",
                    correctText: "That’s normal! Everyone gets nervous sometimes.",
                    incorrectText: "Wow! You must be really calm under pressure!",
                },
            },
        },
        // Page 3
        {
            id: "p3-that-feeling-anxiety",
            content: {
                title: "What Is Anxiety?",
                body: "That feeling is called anxiety.",
                interaction: { type: "next" },
            },
        },
        // Page 4
        {
            id: "p4-brain-reacts",
            content: {
                title: "Why Your Body Reacts",
                body: "When we feel scared or stressed, our brains think we might be in danger, even if it’s just a test or a big game. Our bodies quickly get ready to protect us.",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-three-responses",
            content: {
                title: "Three Common Responses",
                body: "Our bodies often do 1 of 3 things when we are anxious.",
                interaction: { type: "next" },
            },
        },
        // Page 6
        {
            id: "p6-fight",
            content: {
                title: "Fight",
                body: "We get ready to stand up to the problem.",
                interaction: { type: "next" },
            },
        },
        // Page 7
        {
            id: "p7-flight",
            content: {
                title: "Flight",
                body: "We want to get away as fast as we can.",
                interaction: { type: "next" },
            },
        },
        // Page 8
        {
            id: "p8-freeze",
            content: {
                title: "Freeze",
                body: "Our bodies stop moving, almost like we’re invisible.",
                interaction: { type: "next" },
            },
        },
        // Page 9
        {
            id: "p9-ancient-dangers",
            content: {
                title: "Where It Comes From",
                body: "These reactions helped people a long time ago when they had to stay safe from real dangers, like wild animals.",
                interaction: { type: "next" },
            },
        },
        // Page 10
        {
            id: "p10-still-happens-today",
            content: {
                title: "Why It Still Happens",
                body: "Today, our brains still use these reactions, even when the danger isn’t life-threatening.",
                interaction: { type: "next" },
            },
        },
        // Page 11
        {
            id: "p11-which-one-are-you",
            content: {
                title: "Which One Are You Most Likely to Do?",
                body: "When you are feeling stressed, which reaction do you notice most often?",
                interaction: {
                    type: "mc",
                    options: [{ label: "Fight" }, { label: "Flight" }, { label: "Freeze" }],
                },
            },
        },
        // Page 12
        {
            id: "p12-anxiety-normal",
            content: {
                title: "Anxiety Is Normal",
                body: "Anxiety is a normal emotion that everyone feels sometimes.",
                interaction: { type: "next" },
            },
        },
        // Page 13
        {
            id: "p13-like-an-alarm",
            content: {
                title: "Like an Alarm",
                body: "It’s like an alarm system in your body that helps you stay alert.",
                interaction: { type: "next" },
            },
        },
        // Page 14
        {
            id: "p14-false-alarms",
            content: {
                title: "Sometimes It’s a False Alarm",
                body: "Sometimes the alarm goes off when it doesn’t need to, like when you’re safe but just nervous.",
                interaction: { type: "next" },
            },
        },
        // Page 15
        {
            id: "p15-what-makes-you-anxious",
            content: {
                title: "What Makes You Anxious?",
                body: "Which of these would make you feel anxious or worried? (Choose all that apply)",
                interaction: {
                    type: "ms",
                    options: [
                        { label: "Giving a presentation in front of the class", isCorrect: true },
                        { label: "Taking a big test or quiz", isCorrect: true },
                        { label: "Starting at a new school", isCorrect: true },
                        { label: "Being picked last for a team", isCorrect: true },
                        { label: "Forgetting to finish your homework", isCorrect: true },
                    ],
                    correctText: "These are all common things to feel nervous about!",
                    incorrectText: "There are no wrong answers — everyone feels differently.",
                },
            },
        },
        // Page 16
        {
            id: "p16-thank-you",
            content: {
                title: "Thank You for Sharing!",
                body: "",
                interaction: { type: "next" },
            },
        },
        // Page 17
        {
            id: "p17-breathing-helps",
            content: {
                title: "Breathing Helps",
                body: "An easy way to help decrease your anxiety or stress level is by breathing.",
                interaction: { type: "next" },
            },
        },
        // Page 18
        {
            id: "p18-why-breathing-helps",
            content: {
                title: "Why Breathing Helps",
                body: "Breathing helps calm your mind and body by slowing your breath and focusing your thoughts. It signals your brain to relax, which can lower stress and anxiety.",
                interaction: { type: "next" },
            },
        },
        // Page 19
        {
            id: "p19-introduce-square",
            content: {
                title: "Let’s Try a Breathing Activity",
                body: "This activity is called The Breathing Square.",
                interaction: { type: "next" },
            },
        },
        // Page 20
        {
            id: "p20-step-breathe-in",
            content: {
                title: "Step 1",
                body: "BREATHE IN as you follow one side of the square.",
                interaction: { type: "next" },
            },
        },
        // Page 21
        {
            id: "p21-step-hold-1",
            content: {
                title: "Step 2",
                body: "HOLD your breath as you follow the next side.",
                interaction: { type: "next" },
            },
        },
        // Page 22
        {
            id: "p22-step-breathe-out",
            content: {
                title: "Step 3",
                body: "BREATHE OUT while following the third side.",
                interaction: { type: "next" },
            },
        },
        // Page 23
        {
            id: "p23-step-hold-2",
            content: {
                title: "Step 4",
                body: "HOLD your breath as you follow the last side.",
                interaction: { type: "next" },
            },
        },
        // Page 24
        {
            id: "p24-repeat",
            content: {
                title: "Repeat",
                body: "Repeat!",
                interaction: { type: "next" },
            },
        },
        // Page 25
        {
            id: "p25-try-on-your-own",
            content: {
                title: "Try It On Your Own",
                body: "Let’s try it on our own.",
                interaction: { type: "next" },
            },
        },
        // Page 26
        {
            id: "p26-wrap-up",
            content: {
                title: "Use It Anytime",
                body: "Use this Breathing Square anytime you are feeling stressed or anxious. It might just help!",
                interaction: { type: "activity", activityType: "breathing" },
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
