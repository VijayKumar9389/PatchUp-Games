import { generateImageUrls, genericImages } from "./utils";
const imageCount = 14;
const lessonId = "identifying-distractions-star-finder";
const imageUrls = generateImageUrls(
    Array.from({ length: imageCount }, (_, i) => i.toString() + ".png"),
    lessonId
);
export const IdentifyingDistractionsStarHunter = {
    title: "Identifying Internal and External Distractions - Star Hunter",
    id: lessonId,
    imageUrls: imageUrls,
    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Identifying Internal and External Distractions",
                image: imageUrls[0],
                interaction: { type: "next" },
            },
        },
        // Page 2
        {
            id: "p2-understanding-distractions",
            content: {
                title: "Understanding Distractions",
                body:
                    "External distractions are outside influences, such as noise or people talking.\n\nInternal distractions come from within us and can feel like daydreaming or worrying.\n\nBoth types can affect our focus and learning.",
                interaction: { type: "next" },
            },
        },
        // Page 3
        {
            id: "p3-internal-daydreaming",
            content: {
                title: "Let's Explore Internal Distractions - Daydreaming",
                image: imageUrls[1],
                body:
                    "Daydreaming happens when your mind wanders away from the lesson. It can lead to missing important information during class.",
                interaction: { type: "next" },
            },
        },
        // Page 4
        {
            id: "p4-internal-worrying",
            content: {
                title: "Let's Explore Internal Distractions - Worrying",
                image: imageUrls[2],
                body:
                    "Worrying about tests or homework can distract you from learning. It’s important to find ways to calm your mind to stay focused.",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-internal-hungry",
            content: {
                title: "Let's Explore Internal Distractions - Feeling Hungry",
                image: imageUrls[3],
                body:
                    "When you're hungry, it can be hard to pay attention. Make sure to eat healthy snacks to keep your energy up and focus strong.",
                interaction: { type: "next" },
            },
        },
        // Page 6
        {
            id: "p6-other-internal",
            content: {
                title: "Other Internal Distractions",
                body:
                    "• Feeling tired or sleepy\n• Fidgeting or restlessness\n• Headache or feeling sick\n• Getting frustrated when stuck\n• Excitement about recess or after-school plans",
                interaction: { type: "next" },
            },
        },
        // Page 7
        {
            id: "p7-activity-internal-ranking",
            content: {
                title: "Activity: Order Internal Distractions",
                body: "Which of these are internal distractions?",
                interaction: {
                    type: "ms",
                    options: [
                        { label: "Feeling tired or sleepy", isCorrect: true },
                        { label: "Loud noises during reading time", isCorrect: false },
                        { label: "Getting frustrated when stuck", isCorrect: true },
                        { label: "Excitement about recess or after-school plans", isCorrect: true },
                    ],
                    correctText: "Great job! Those are all internal distractions.",
                    incorrectText: "Remember, internal distractions come from within you.",
                },
            },
        },
        // Page 8
        {
            id: "p8-easy-to-handle",
            content: {
                title: "Not All Internal Distractions Are Equal - Easy to Handle",
                sideBySide: true,
                image: imageUrls[4],
                body:
                    "Easy to Handle:\n• Random thoughts\n• Feeling a little tired or restless\n• Brief daydreams\n\nJust notice and gently return focus.",
                interaction: { type: "next" },
            },
        },
        // Page 9
        {
            id: "p9-more-challenging",
            content: {
                title: "Not All Internal Distractions Are Equal - More Challenging",
                sideBySide: true,
                image: imageUrls[5],
                body:
                    "More Challenging:\n• Worrying about upcoming tests\n• Feeling hungry or thirsty\n• Friendship drama or family stress\n• Feeling overwhelmed\n\nAcknowledge it, then take action! Write it down, ask for a break, or talk to your teacher.",
                interaction: { type: "next" },
            },
        },
        // Page 10
        {
            id: "p10-recognition-is-power",
            content: {
                title: "Recognition is Power!",
                image: imageUrls[6],
                body:
                    "Think of your mind like a phone with notifications constantly popping up.\n\nMost people just react to every 'ping.' But when you start noticing the pings, you can choose which ones to answer.",
                interaction: { type: "next" },
            },
        },
        // Page 11
        {
            id: "p11-magic-moment",
            content: {
                title: "The Magic Moment!",
                image: imageUrls[7],
                body:
                    "That split second when you realize 'Wait, I'm distracted' is actually your brain working perfectly! You just caught yourself and can gently guide attention back.",
                interaction: { type: "next" },
            },
        },
        // Page 12
        {
            id: "p12-external-intro",
            content: {
                title: "External Distractions",
                image: imageUrls[8],
                body:
                    "External distractions come from outside sources that can make it hard to focus.\n\n• Noisy classmates talking during lessons\n• Phones buzzing with notifications\n• Loud music playing nearby\n• Other sounds or sights that pull attention away from work",
                interaction: { type: "next" },
            },
        },
        // Page 13
        {
            id: "p13-activity-external",
            content: {
                title: "Activity: External Distractions",
                body: "Drag the distractions that bother you into the box.",
                interaction: {
                    type: "dndBucket",
                    categories: [
                        'Distracting',
                        'Not Distracting',
                    ],
                    items: [
                        { id: '1', label: "Someone eating snacks nearby", correctCategory: null },
                        { id: '2', label: "Strong perfume or smells", correctCategory: null },
                        { id: '3', label: "Temperature being too hot or cold", correctCategory: null },
                        { id: '4', label: "Uncomfortable seating", correctCategory: null },
                        { id: '5', label: "Colorful posters or bulletin boards", correctCategory: null },
                        { id: '6', label: "Someone dropping papers or books", correctCategory: null },
                        { id: '7', label: "Birds outside the window", correctCategory: null },
                        { id: '8', label: "Flickering lights or bright sunlight", correctCategory: null },
                    ],
                },
            },
        },
        // Page 14
        {
            id: "p14-understanding-external",
            content: {
                title: "Understanding External Distractions",
                image: imageUrls[9],
                body:
                    "They're everywhere and you can't control them all.\n\nOther people will make noise. The environment won't always be perfect.\n\nTrying to eliminate everything is impossible and exhausting.",
                interaction: { type: "next" },
            },
        },
        // Page 15
        {
            id: "p15-your-response",
            content: {
                title: "Your Response is What Matters",
                image: imageUrls[10],
                body:
                    "The same sound might distract you one day, not the next.\n\nYour attention is like a spotlight — you choose where to aim it.\n\nPractice helps you get better at filtering distractions.",
                interaction: { type: "next" },
            },
        },
        // Page 16
        {
            id: "p16-adjust-busy-classroom",
            content: {
                title: "How to Adjust to a Busy Classroom",
                image: imageUrls[11],
                body:
                    "1. Position yourself wisely (away from high-traffic areas)\n2. Use tools when allowed (noise-canceling headphones, fidgets)\n3. Communicate needs to your teacher\n4. Accept that some distraction is normal",
                interaction: { type: "next" },
            },
        },
        // Page 17
        {
            id: "p17-goal",
            content: {
                title: "The Goal Isn't Silence",
                image: imageUrls[12],
                body:
                    "The goal is learning to work with your environment, not against it.\n\nBrain breaks are an easy way to reset your focus and get back to learning.\n\nLet’s try one!",
                interaction: { type: "next" },
            },
        },
        // Page 18
        {
            id: "p18-star-finder",
            content: {
                title: "Star Finder!",
                body:
                    "Use your finger to scratch away the layer and uncover the hidden stars.",
                interaction: { type: "activity", activity: "star_finder" },
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
