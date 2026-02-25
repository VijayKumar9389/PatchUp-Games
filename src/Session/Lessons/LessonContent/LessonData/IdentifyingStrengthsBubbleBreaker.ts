const lessonId = "identifying-strengths-bubble-breaker";
import { generateImageUrls, genericImages } from "./utils";
const imageCount = 11;
const imageUrls = generateImageUrls(
    Array.from({ length: imageCount }, (_, i) => i.toString() + ".png"),
    lessonId
);
export const PersonalStrengthsBubbleBreaker = {
    title: "Identifying Personal Strengths & Values - Bubble Breaker",
    id: lessonId,
    imageUrls: imageUrls,
    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Identifying Personal Strengths & Values",
                image: imageUrls[0],
                interaction: { type: "next" },
            },
        },
        // Page 2
        {
            id: "p2-personal-strengths",
            content: {
                title: "Personal Strengths",
                image: imageUrls[1],
                sideBySide: true,
                body:
                    "Personal strengths are the qualities that make you unique and special. ",
                interaction: { type: "next" },
            },
        },
        // Page 3
        {
            id: "p3-activity-drag-qualities",
            content: {
                title: "Activity: My Qualities",
                body:
                    "Drag over the qualities that you have!",
                interaction: {
                    type: "dndBucket",
                    categories: ["My qualities"],
                    items: [
                        { id: 1, label: "Kindness", correctCategory: null },
                        { id: 2, label: "Curiosity", correctCategory: null },
                        { id: 3, label: "Creativity", correctCategory: null },
                        { id: 4, label: "Honesty", correctCategory: null },
                        { id: 5, label: "Teamwork", correctCategory: null },
                        { id: 6, label: "Problem-solving", correctCategory: null },
                        { id: 7, label: "Leadership", correctCategory: null },
                    ],
                },
            },
        },
        // Page 4
        {
            id: "p4-why-strengths-matter",
            content: {
                title: "Why Strengths Matter",
                image: imageUrls[2],
                body:
                    "Knowing your strengths helps you feel proud of who you are.\n\nIt guides you to choose activities and friends that fit you best. When you use your strengths, you can solve problems, help others, and reach your goals more easily.",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-big-word-qualities",
            content: {
                title: "Activity: Qualities Match",
                body: "Try your best to match the definition to the quality ",
                interaction: {
                    type: "dndMatch",
                    labels: [
                        "Bouncing back after a tough time or mistake.",
                        "Understanding how someone else feels.",
                        "Doing the right thing, even when no one is watching.",
                        "Starting things on your own without being asked.",
                    ],
                    items: [
                        { id: 1, label: "Resilience", correctMatch: "Bouncing back after a tough time or mistake." },
                        { id: 2, label: "Integrity", correctMatch: "Doing the right thing, even when no one is watching." },
                        { id: 3, label: "Initiative", correctMatch: "Starting things on your own without being asked." },
                        { id: 4, label: "Empathy", correctMatch: "Understanding how someone else feels." },
                    ],
                },
            },
        },
        // Page 6
        {
            id: "p6-how-to-know-strengths",
            content: {
                title: "How Do I Know My Strengths?",
                image: imageUrls[4],
                sideBySide: true,
                body:
                    "Here are some fun ways to discover your strengths:\n1. Ask friends or family what they think you are good at.\n2. Think about times when you felt proud of yourself.\n3. Try new activities and see what you enjoy.",
                interaction: { type: "next" },
            },
        },
        // Page 7
        {
            id: "p7-values-intro",
            content: {
                title: "Personal Values",
                image: imageUrls[6],
                sideBySide: true,
                body:
                    "Values are the beliefs and principles that guide your actions.\n\nExamples include:\n• Honesty\n• Respect\n• Responsibility\n• Fairness",
                interaction: { type: "next" },
            },
        },
        // Page 8
        {
            id: "p8-fill-values",
            content: {
                title: "Activity: Fill in the Blanks",
                // body:
                //     "Fill in the blanks using the word box.\n\nCourage: __________ when you see someone being left out.\nGratitude: __________ a classmate who helps you.\nPatience: __________ your turn during a group activity.\nInclusion: __________ a new student to join your game at recess.\n\nWord Box: Speaking up, Thanking, Waiting, Inviting",
                interaction: {
                    type: "fillBlank",
                    rows: [
                        { id: '1', left: "Courage: ", right: "when you see someone being left out.", answer: "Speaking up" },
                        { id: '2', left: "Gratitude: ", right: " a classmate who helps you.", answer: "Thanking" },
                        { id: '3', left: "Patience: ", right: "your turn during a group activity.", answer: "Waiting" },
                        { id: '4', left: "Inclusion: ", right: "a new student to join your game at recess.", answer: "Inviting" },
                    ],
                    wordBank: ["Thanking", "Waiting", "Inviting", "Speaking up",],
                },
            },
        },
        // Page 9
        {
            id: "p9-finding-values",
            content: {
                title: "Finding Your Values",
                image: imageUrls[7],
                sideBySide: true,
                body:
                    "To identify your values, you must consider:\n\n1. What makes you happy?\n2. What do you believe is important in life?\n3. How do you want to treat others?",
                interaction: { type: "next" },
            },
        },
        // Page 10
        {
            id: "p10-putting-together",
            content: {
                title: "Putting It All Together",
                image: imageUrls[8],
                body:
                    "Remember: your strengths and values help shape who you are.\n\nEmbrace your uniqueness and use it to make a positive impact!",
                interaction: { type: "next" },
            },
        },
        // Page 11
        {
            id: "p11-when-poor-choices",
            content: {
                title: "When I Start to Make Poor Choices",
                image: imageUrls[9],
                body:
                    "Students need to pause and think about their choices, talk to a trusted adult for advice, set small goals to change, and remember it’s okay to start over.\n\nEveryone can improve and grow with support!",
                interaction: { type: "next" },
            },
        },
        // Page 12
        {
            id: "p12-reset-activity",
            content: {
                title: "Bubble Breaker Reset Activity",
                body:
                    "Take a deep breath and think about one strength or value you want to use today.\n\nPicture yourself using it in a real situation. This pause helps you feel calm and ready to make positive choices.\n\nThis activity is called Bubble Breaker.",
                interaction: { type: "next" },
            },
        },
        // Page 13
        {
            id: "p13-how-to-use",
            content: {
                title: "How to Use Bubble Breaker",
                body:
                    "Pop each bubble, each one shrinks to its smallest size.",
                interaction: { type: "activity", activity: "bubble_popper" },
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
