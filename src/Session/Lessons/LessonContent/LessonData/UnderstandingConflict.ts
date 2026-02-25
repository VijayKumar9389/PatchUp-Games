import { generateImageUrls, genericImages } from "./utils";
const imageCount = 11;
const lessonId = "understanding-conflict-counting";
const imageUrls = generateImageUrls(
    Array.from({ length: imageCount }, (_, i) => i.toString() + ".png"),
    lessonId
);
export const UnderstandingConflictCounting = {
    title: "Understanding Conflict - Counting to 10",
    id: lessonId,
    imageUrls: imageUrls,
    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Understanding Conflict",
                image: imageUrls[10],
                // body: "Learning to De-escalate Conflicts in the Classroom\n\nActivity: Counting to 10",
                interaction: { type: "next" },
            },
        },
        // Page 2
        {
            id: "p2-conflict-is-natural",
            content: {
                title: "Conflict Is Natural",
                image: imageUrls[0],
                body:
                    "Conflict happens when people disagree or have different opinions. It can lead to arguments or fights if not managed well.\n\nRecognizing conflict early can help us find peaceful solutions and maintain friendships.",
                interaction: { type: "next" },
            },
        },
        // Page 3
        {
            id: "p3-how-conflict-makes-us-feel",
            content: {
                title: "How Conflict Makes Us Feel",
                image: imageUrls[1],
                body:
                    "Angry — when we feel hurt or disrespected by others.",
                interaction: { type: "next" },
            },
        },
        {
            id: "p4-how-conflict-makes-us-feel",
            content: {
                title: "How Conflict Makes Us Feel",
                image: imageUrls[2],
                body:
                    "Frustrated — when things don’t go the way we want them to.",
                interaction: { type: "next" },
            },
        },
        {
            id: "p5-how-conflict-makes-us-feel",
            content: {
                title: "How Conflict Makes Us Feel",
                image: imageUrls[3],
                body:
                    "Sad — when we lose something important or feel alone.",
                interaction: { type: "next" },
            },
        },
        // Page 4
        {
            id: "p4-why-conflicts-happen",
            content: {
                title: "Why Do Conflicts Happen?",
                image: imageUrls[4],
                body:
                    "1. People don’t agree\n2. People don’t understand each other\n3. People are competing, like both wanting to win a game or be the line leader.\n\nThat’s normal! When we understand why conflicts happen, it helps us solve problems in a calm and fair way.",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-types-of-conflict",
            content: {
                title: "Types of Conflict",
                body:
                    "• Physical conflicts – when people fight or use their bodies to hurt each other\n• Verbal conflicts – when people argue or use unkind words\n• Social conflicts – when someone feels left out or excluded\n• Emotional conflicts – when strong feelings like jealousy or frustration cause a problem",
                interaction: { type: "next" },
            },
        },
        // Page 6
        {
            id: "p6-choose-conflict-type",
            content: {
                title: "What Type of Conflict Have You Experienced Recently?",
                interaction: {
                    type: "ms",
                    options: [
                        { label: "Physical conflicts", isCorrect: true },
                        { label: "Verbal conflicts", isCorrect: true },
                        { label: "Social conflicts", isCorrect: true },
                        { label: "Emotional conflicts", isCorrect: true },
                    ],
                    correctText: "There are many types of conflict, and it's important to recognize them.",
                    incorrectText: "There are many types of conflict, and it's important to recognize them.",
                },
            },
        },
        // Page 7
        {
            id: "p7-activity-intro",
            content: {
                title: "Let’s Look at Some Situations Together!",
                body: "What is the best way to handle each conflict?",
                interaction: { type: "next" },
            },
        },
        // Page 8
        {
            id: "p8-problem-1",
            content: {
                title: "Problem 1",
                body:
                    "You and another student both want to use the same basketball during recess, but there’s only one. How could you handle it?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Grab the ball and run to the court before they can", isCorrect: false },
                        { label: "Walk away frustrated and sit out of the game", isCorrect: false },
                        { label: "Argue loudly about who had it first", isCorrect: false },
                        { label: "Suggest taking turns or playing a game that includes both of you", isCorrect: true },
                    ],
                    correctText: "Good choice! Solving it calmly keeps recess fun for everyone.",
                    incorrectText: "Try again — which choice keeps the peace?",
                },
            },
        },
        // Page 9
        {
            id: "p9-problem-2",
            content: {
                title: "Problem 2",
                body:
                    "Your group is working on a class project, but no one can agree on what to do. How could you handle it?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Let one person decide everything to avoid arguing", isCorrect: false },
                        { label: "Refuse to do the project until people agree with your idea", isCorrect: false },
                        { label: "Ask each person to share their idea, then vote or make a plan together", isCorrect: true },
                        { label: "Complain to the teacher without trying to solve it first", isCorrect: false },
                    ],
                    correctText: "That’s right! Teamwork and listening make projects go smoother.",
                    incorrectText: "Try again — which option helps everyone feel heard?",
                },
            },
        },
        // Page 10
        {
            id: "p10-problem-3",
            content: {
                title: "Problem 3",
                body:
                    "You see your friends playing a game at recess, but they didn’t ask you to join. How could you handle it?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Calmly ask your friends if you can join, or find a new game and invite others", isCorrect: true },
                        { label: "Sit alone and feel upset the whole recess", isCorrect: false },
                        { label: "Tell a teacher right away without talking to your friends", isCorrect: false },
                        { label: "Say something mean to your friends because you’re hurt", isCorrect: false },
                    ],
                    correctText: "Exactly! Speaking kindly helps turn a tough moment into a better one.",
                    incorrectText: "Try again — which answer helps solve the problem kindly?",
                },
            },
        },
        // Page 11
        {
            id: "p11-prevent-conflict",
            content: {
                title: "The Best Way to Handle Conflict Is to Prevent It!",
                image: imageUrls[6],
                body:
                    "• Take a deep breath if you’re upset\n• Think before you speak, words can solve or start a problem\n• Be respectful of others’ space, ideas, and belongings\n• Walk away or take a break if you feel annoyed\n• Use kind words and a calm tone when asking for something",
                interaction: { type: "next" },
            },
        },
        // Page 12
        {
            id: "p12-when-conflict-starts",
            content: {
                title: "The Conflict Has Already Started. Now What?",
                image: imageUrls[7],
                body:
                    "• Stay calm, yelling or blaming makes things worse\n• Listen to the other person’s side without interrupting\n• Try to find a solution that works for both people\n• Ask for help from an adult if you can’t solve it\n• Avoid name-calling or bringing up old problems",
                interaction: { type: "next" },
            },
        },
        // Page 13
        {
            id: "p13-preventing-handling",
            content: {
                title: "Preventing and Handling Conflict",
                image: imageUrls[8],
                body:
                    "Communicate Openly: sharing your feelings helps everyone understand each other.\n\nTake Deep Breaths: pausing to breathe helps calm your mind and reduce anger.\n\nTalk It Out: discussing feelings together helps solve problems and build friendships.",
                interaction: { type: "next" },
            },
        },
        // Page 14
        {
            id: "p14-final-message",
            content: {
                title: "It’s Normal to Have Disagreements",
                image: imageUrls[9],
                body:
                    "What matters most is how we handle them.\n\nSolving problems with kindness and calm words helps us get along better and makes school a happier place.",
                interaction: { type: "next" },
            },
        },
        // Page 15
        {
            id: "p15-counting-intro",
            content: {
                title: "Let’s Handle Conflict Together!",
                body:
                    "Breathing can help us prevent conflict, during conflict, and after conflict has already happened.\n\nThis activity is called Count to 10.",
                interaction: { type: "next" },
            },
        },
        // Page 16
        {
            id: "p16-counting-steps",
            content: {
                title: "Count to 10 — Steps",
                body:
                    "1. Close your eyes and take a deep breath in through your nose and exhale.\n2. Begin counting to 10.\n3. Each number, take a deep breath in and a deep breath out.\n4. When you reach 10, take a long deep breath and a long exhale.\n5. When you're ready, open your eyes and look around. You might feel more calm and centered.",
                interaction: { type: "activity", activity: "counting_activity" },
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
