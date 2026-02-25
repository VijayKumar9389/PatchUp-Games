import { generateImageUrls, genericImages } from "./utils";
const lessonId = "constructive-anger-breathing-square";
const imageCount = 17;
const imageUrls = generateImageUrls(
    Array.from({ length: imageCount }, (_, i) => i.toString() + ".png"),
    lessonId
);
export const ConstructiveAngerBreathingSquare = {
    title: "Constructive Anger Expression - Breathing Square",
    id: lessonId,
    imageUrls: imageUrls,

    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Constructive Anger Expression",
                image: imageUrls[0],
                // body: "Activity: Breathing Square",
                interaction: { type: "next" },
            },
        },
        // Page 2
        {
            id: "p2-what-is-anger",
            content: {
                title: "Understanding Anger",
                image: imageUrls[1],
                body:
                    "Anger is a strong feeling we all have sometimes. It can happen when we feel hurt, frustrated, or treated unfairly.",
                interaction: { type: "next" },
            },
        },
        // Page 3
        {
            id: "p3-steps-to-help",
            content: {
                title: "Constructive Anger Management",
                image: imageUrls[2],
                sideBySide: true,
                body:
                    "Steps to help me:\n\n• Identifying triggers for anger\n• Using 'I Can' statements effectively\n• Seeking help from teachers or friends\n• Finding fun ways to release energy\n• Taking deep breaths to calm down",
                interaction: { type: "next" },
            },
        },
        // Page 4
        {
            id: "p4-knowing-triggers",
            content: {
                title: "Knowing What Makes You Angry Helps You:",
                sideBySide: true,
                image: imageUrls[3],
                body:
                    "1. Understand your feelings\n2. Find better ways to cope\n3. Avoid getting too upset",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-expressing-anger",
            content: {
                title: "Expressing Anger Constructively",
                image: imageUrls[4],
                body:
                    "Learning to express anger constructively helps us build strong friendships and resolve conflicts positively at school.",
                interaction: { type: "next" },
            },
        },
        // Page 6
        {
            id: "p6-activity-triggers",
            content: {
                title: "Activity: What Makes You Angry?",
                body: "Click on all the answers that apply:",
                interaction: {
                    type: "ms",
                    options: [
                        { label: "Being teased or bullied by classmates", isCorrect: true },
                        { label: "Getting in trouble for something you didn't do", isCorrect: true },
                        { label: "Losing a game or not winning a competition", isCorrect: true },
                        { label: "Having your belongings taken or broken by someone else", isCorrect: true },
                        { label: "Being left out of activities or friend groups", isCorrect: true },
                        { label: "Getting a bad grade on something you worked hard on", isCorrect: true },
                    ],
                    correctText:
                        "These are all common things that make people angry. Knowing your triggers helps you manage your feelings better!",
                    incorrectText:
                        "There’s no wrong answer — everyone’s triggers are different.",
                },
            },
        },
        // Page 7
        {
            id: "p7-i-can-statements",
            content: {
                title: "“I Can” Statements",
                image: imageUrls[5],
                body:
                    "An 'I Can' statement is a positive way to tell yourself what you're able to do when you're feeling angry or upset.",
                interaction: { type: "next" },
            },
        },
        {
            id: "p7b-i-can-examples",
            content: {
                title: "I can!",
                image: imageUrls[6],
                body: "Instead of thinking 'I can't control this' or 'I'm so mad,' you focus on what you CAN do to help yourself feel better.",
                interaction: { type: "next" },
            },
        },
        // Page 8
        {
            id: "p8-activity-calm-down",
            content: {
                title: "Activity: When I Feel Angry...",
                body: "When I feel angry, I can _____ to calm down.",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Take a deep breath", isCorrect: true },
                        { label: "Yell", isCorrect: false },
                        { label: "Stay angry", isCorrect: false },
                        { label: "Cry", isCorrect: false },
                    ],
                    correctText: "Correct! Taking a deep breath helps you calm down.",
                    incorrectText: "Try again — which one helps you relax?",
                },
            },
        },
        // Page 9
        {
            id: "p9-activity-use-my-words",
            content: {
                title: "Activity: When Someone Upsets Me...",
                body: "If someone upsets me, I can _____ instead of yelling.",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Eat a snack", isCorrect: false },
                        { label: "Get really mad", isCorrect: false },
                        { label: "Use my words", isCorrect: true },
                        { label: "Kick", isCorrect: false },
                    ],
                    correctText:
                        "Right! Using your words helps you express your feelings safely.",
                    incorrectText:
                        "Try again — what response helps solve problems instead of making them worse?",
                },
            },
        },
        // Page 10
        {
            id: "p10-activity-release-energy",
            content: {
                title: "Activity: Too Much Energy",
                body: "When I have too much energy from being angry, I can _____ to feel better.",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Punch", isCorrect: false },
                        { label: "Be silent", isCorrect: false },
                        { label: "Run away from everyone", isCorrect: false },
                        { label: "Go for a walk", isCorrect: true },
                    ],
                    correctText:
                        "Yes! Taking a walk helps your body release energy and calm down.",
                    incorrectText:
                        "Try again — which one helps you relax safely?",
                },
            },
        },
        // Page 11
        {
            id: "p11-seeking-help",
            content: {
                title: "Seeking Help When Needed",
                image: imageUrls[7],
                body:
                    "Sometimes our angry feelings are really big and hard to handle on our own. When taking deep breaths or using our words doesn't help enough, it's important to ask for help from a trusted adult like a parent or teacher.",
                interaction: { type: "next" },
            },
        },
        // Page 12
        {
            id: "p12-fun-ways-to-release",
            content: {
                title: "Fun Ways to Release Energy",
                sideBySide: true,
                image: imageUrls[8],
                body:
                    "Physical Activities:\n• Jump on a trampoline or do jumping jacks\n• Dance to your favorite music\n\nCreative Outlets:\n• Draw or scribble your feelings on paper\n• Play with slime or a fidget",
                interaction: { type: "next" },
            },
        },
        {
            id: "p12-fun-ways-to-release",
            content: {
                title: "More Ways to Release Energy",
                sideBySide: true,
                image: imageUrls[9],
                body:
                    "Outdoor Fun:\n• Kick a soccer ball against a wall\n• Run around the yard or track\n\nCalming Activities:\n• Listen to music with headphones\n• Color in a coloring book",
                interaction: { type: "next" },
            },
        },
        // Page 13
        {
            id: "p13-breathing-benefits",
            content: {
                title: "The Fastest Way to Release Emotion!",
                image: imageUrls[10],
                body:
                    "Breathing is best when you’re angry because it helps your body and mind slow down. Deep breaths send a signal to your brain to calm down, making it easier to think clearly and react in a safe, healthy way.",
                interaction: { type: "next" },
            },
        },
        // Page 14
        {
            id: "p14-breathing-square-intro",
            content: {
                title: "Let’s Try The Breathing Square",
                image: imageUrls[11],
                body:
                    "This is called the Breathing Square. Follow along as you breathe in, hold, breathe out, and hold again.",
                interaction: { type: "next" },
            },
        },
        // Page 15
        {
            id: "breathing-step-1",
            content: {
                title: "Step 1: Breathe In!",
                image: imageUrls[12],
                body: "Inhale along one side of the square.",
                interaction: { type: "next" },
            },
        },
        {
            id: "breathing-step-2",
            content: {
                title: "Step 2: Hold!",
                image: imageUrls[13],
                body: "Hold your breath along the next side.",
                interaction: { type: "next" },
            },
        },
        {
            id: "breathing-step-3",
            content: {
                title: "Step 3: Breathe Out!",
                image: imageUrls[14],
                body: "Exhale along the third side of the square.",
                interaction: { type: "next" },
            },
        },
        {
            id: "breathing-step-4",
            content: {
                title: "Step 4: Hold Again!",
                image: imageUrls[15],
                body: "Hold again along the final side. Then repeat the square!",
                interaction: { type: "next" },
            },
        },
        {
            id: "try-yourself",
            content: {
                title: "Your Turn!",
                body: "Let’s try the breathing square on your own. Breathe slowly as you follow each side.",
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
                body: "You did great! The breathing square can help you feel calm when you're angry.",
                interaction: { type: "next" },
            },
        },
        {
            id: "lesson-completed",
            content: {
                title: "Great Job!",
                image: genericImages().celebrating_with_balloons,
                body: "You've completed this lesson! Next time you feel angry, remember to try the breathing square technique.",
                interaction: { type: "next" },
            },
        },
    ],
};
