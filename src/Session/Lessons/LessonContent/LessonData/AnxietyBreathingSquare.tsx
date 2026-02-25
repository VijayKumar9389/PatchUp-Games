import { generateImageUrls } from "./utils";
import { genericImages } from "./utils";
const lessonId = "understanding-emotions";
const imageUrls = generateImageUrls([
    "0.png",
    "student_wondering.png",
    "student_anxiety.png",
    "student_thumbsup.png",
    "students_brainsstillusereactionsplayground.png",
    "flight.png",
    "students_whichoneareyou.png",
    "wild_animals.png",
    "student_breathing.png",
    "student_calm.png",
    "breathing_square.png",
    "student_breathin.png",
    "student_holdingbreath.png",
    "student_breathout.png",
    "student_holdingbreathtwo.png",
], lessonId);
export const AnxietyBreathingSquare = {
    title: "Understanding Anxiety & Breathing",
    id: lessonId,
    imageUrls: imageUrls,
    pages: [
        {
            id: "intro",
            content: {
                title: "Have You Felt Nervous?",
                body: "Have you ever felt nervous before a test or worried about something bad happening?",
                image: imageUrls[0],
                interaction: {
                    type: "yesno",
                    correctAnswer: "yes",
                    style: "text",
                    correctText: "That's normal! Everyone gets nervous sometimes.",
                    incorrectText: "Wow! You must be really brave!",
                },
            },
        },
        {
            id: "what-is-anxiety",
            content: {
                title: "What Is Anxiety?",
                image: imageUrls[1],
                body: "That feeling is called anxiety. It’s our brain’s way of trying to protect us, even when we’re actually safe.",
                interaction: { type: "next" },
            },
        },
        {
            id: "normal-emotion",
            content: {
                title: "Anxiety Is Normal",
                image: imageUrls[2],
                body: "Anxiety is a normal emotion. It’s like an alarm system that helps you stay alert, but sometimes it goes off when you’re safe.",
                interaction: { type: "next" },
            },
        },
        {
            id: "multi-anxiety-scenarios",
            content: {
                title: "What Makes You Anxious?",
                body: "Which of these would make you feel anxious or worried? (Choose all that apply)",
                interaction: {
                    type: "ms",
                    options: [
                        { label: "Giving a presentation in front of the class", isCorrect: true },
                        { label: "Taking a big test or quiz", isCorrect: true },
                        { label: "Being picked last for a team", isCorrect: true },
                        { label: "Forgetting to finish your homework", isCorrect: true },
                    ],
                    correctText: "These are all common things to feel nervous about!",
                    incorrectText: "There are no wrong answers! Everyone feels differently.",
                },
            },
        },
        {
            id: "thanks-sharing",
            content: {
                title: "Thanks for Sharing!",
                image: imageUrls[3],
                body: "Everyone gets anxious sometimes. You're not alone.",
                interaction: { type: "next" },
            },
        },
        {
            id: "body-response-1",
            content: {
                title: "What Happens in Our Bodies?",
                image: imageUrls[4],
                body: "When we feel scared or stressed, our brains think we’re in danger, even if it’s just a test or game.",
                interaction: { type: "next" },
            },
        },
        {
            id: "body-response-2",
            content: {
                title: "Get Ready to React!",
                image: imageUrls[5],
                body: "Our bodies get ready to protect us very quickly, even when we’re not in real danger.",
                interaction: { type: "next" },
            },
        },
        {
            id: "fight-flight-freeze",
            content: {
                title: "Fight, Flight, or Freeze",
                image: imageUrls[6],
                body: "Fight means we face the problem. Flight means we run away. Freeze means we stop like we’re invisible!",
                interaction: { type: "next" },
            },
        },
        {
            id: "past-danger",
            content: {
                title: "Why We React",
                image: imageUrls[7],
                body: "These reactions helped people long ago avoid real danger. Today, our brains still use them, even when it's just stress.",
                interaction: { type: "next" },
            },
        },
        {
            id: "breathing-intro",
            content: {
                title: "What Helps?",
                image: imageUrls[8],
                body: "An easy way to lower stress is by breathing slowly and calmly.",
                interaction: { type: "next" },
            },
        },
        {
            id: "why-breathing-works",
            content: {
                title: "Why Breathing Helps",
                image: imageUrls[9],
                body: "Breathing calms your mind and body. It tells your brain you're safe.",
                interaction: { type: "next" },
            },
        },
        {
            id: "lets-try",
            content: {
                title: "Let’s Try Together!",
                image: imageUrls[10],
                body: "This activity is called The Breathing Square. Follow the square and match your breathing!",
                interaction: { type: "next" },
            },
        },
        {
            id: "breathing-step-1",
            content: {
                title: "Step 1: Breathe In!",
                image: imageUrls[11],
                body: "Inhale along one side of the square.",
                interaction: { type: "next" },
            },
        },
        {
            id: "breathing-step-2",
            content: {
                title: "Step 2: Hold!",
                image: imageUrls[12],
                body: "Hold your breath along the next side.",
                interaction: { type: "next" },
            },
        },
        {
            id: "breathing-step-3",
            content: {
                title: "Step 3: Breathe Out!",
                image: imageUrls[13],
                body: "Exhale along the third side of the square.",
                interaction: { type: "next" },
            },
        },
        {
            id: "breathing-step-4",
            content: {
                title: "Step 4: Hold Again!",
                image: imageUrls[14],
                body: "Hold again along the final side. Then repeat the square!",
                interaction: { type: "next" },
            },
        },
        {
            id: "try-yourself",
            content: {
                title: "Your Turn!",
                body: "Let’s try the breathing square on your own. Breathe slowly as you follow each side.",
                interaction: { type: "next" },
            },
        },
        {
            id: "breathing-square",
            content: {
                title: "Your Turn!",
                interaction: {
                    type: "activity",
                    activity: "breathing_square",
                },
            },
        },
        {
            id: "activity-completed",
            content: {
                title: "Great Job!",
                image: genericImages().celebrating,
                body: "You did great! The breathing square can help you feel calm when you're anxious.",
                interaction: { type: "next" },
            },
        },
        {
            id: "lesson-completed",
            content: {
                title: "Great Job!",
                image: genericImages().celebrating_with_balloons,
                body: "You've completed this lesson! Next time you feel anxious, remember to try the breathing square technique.",
                interaction: { type: "next" },
            },
        },
    ],
};
