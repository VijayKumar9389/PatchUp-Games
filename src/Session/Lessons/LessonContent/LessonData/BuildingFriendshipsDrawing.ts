import { generateImageUrls, genericImages } from "./utils";
const lessonId = "building-strong-friendships";
const imageCount = 11;
const imageUrls = generateImageUrls(Array.from({ length: imageCount }, (_, i) => i.toString() + '.png'), lessonId);
export const BuildingStrongFriendshipsDrawing = {
    title: "Building Strong Friendships",
    id: lessonId,
    imageUrls: imageUrls,
    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Building Strong Friendships",
                // body: "Activity : Drawing",
                image: imageUrls[0],
                interaction: { type: "next" },
            },
        },
        // Page 2
        {
            id: "p2-what-is-friendship",
            content: {
                title: "Building Strong Friendships",
                image: imageUrls[1],
                body:
                    "Friendship is having people you trust, care about, and enjoy being with. Friends encourage you, help you through challenges, and teach you about teamwork. For students, strong friendships boost confidence, social skills, and a sense of belonging.",
                interaction: { type: "next" },
            },
        },
        // Page 3
        {
            id: "p3-strong-friendship-header",
            content: {
                image: imageUrls[2],
                title: "What a Strong Friendship Looks Like",
                body: "",
                interaction: { type: "next" },
            },
        },
        // Page 4
        {
            id: "p4-friends-share",
            content: {
                image: imageUrls[3],
                title: "Friends share",
                body:
                    "Sharing is important in friendship because it shows care and builds trust. For example, sharing your snacks or letting a friend borrow a pencil helps both people feel included and valued.",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-friends-care",
            content: {
                title: "Friends care",
                image: imageUrls[4],
                body:
                    "Caring means asking how your friend feels and helping them when they are sad or upset.",
                interaction: { type: "next" },
            },
        },
        // Page 6
        {
            id: "p6-friends-listen",
            content: {
                title: "Friends listen",
                image: imageUrls[5],
                body:
                    "Listening to each other helps friends understand and support one another, making the friendship stronger.",
                interaction: { type: "next" },
            },
        },
        // Page 7
        {
            id: "p7-weak-friendship-header",
            content: {
                title: "What a Weak Friendship Looks Like",
                image: imageUrls[6],
                body: "",
                interaction: { type: "next" },
            },
        },
        // Page 8
        {
            id: "p8-lack-of-support",
            content: {
                title: "Lack of Support",
                image: imageUrls[7],
                body:
                    "Friends who don’t support each other can feel lonely and sad. They don't cheer each other on during tough times.",
                interaction: { type: "next" },
            },
        },
        // Page 9
        {
            id: "p9-not-communicating",
            content: {
                title: "Not Communicating",
                image: imageUrls[8],
                body:
                    "If friends don’t talk or share their feelings, they may drift apart. Talking helps friends understand each other better.",
                interaction: { type: "next" },
            },
        },
        // Page 10
        {
            id: "p10-no-fun-together",
            content: {
                title: "No Fun Together",
                image: imageUrls[9],
                body:
                    "Weak friendships often mean less time spent playing together. Friends should enjoy happy moments, but in a weak friendship, that may not happen.",
                interaction: { type: "next" },
            },
        },
        // Page 11
        {
            id: "p11-emotions-affect-friendship",
            content: {
                title: "Emotions can affect friendship",
                image: imageUrls[10],
                body:
                    "When we feel sad or mad, being kind to others becomes really hard. By sharing our feelings out loud, we help everyone understand what's happening and find ways to feel better together.",
                interaction: { type: "next" },
            },
        },
        // Page 12
        {
            id: "p12-activity-sad-friend-question",
            content: {
                title: "Activity: I notice my friend is sad. How do I approach this problem?",
                body: "Choose all that apply.",
                interaction: {
                    type: "ms",
                    options: [
                        { label: "Give them space", isCorrect: true },
                        { label: "Ask them what is wrong", isCorrect: true },
                        { label: "Ask them if they want to talk", isCorrect: true },
                        { label: "Ask them if they want to play", isCorrect: true },
                    ],
                    // Keep feedback separate on the next page to match PDF pagination.
                    correctText:
                        // "The correct answer is all of them! Some friends need space, others want to talk, and some prefer to play. The key is to pay attention to what helps them feel better.",
                        "The correct answer is all of them!",
                    incorrectText:
                        // "There are no wrong answers! Everyone has different needs when they’re upset. The key is to pay attention to what helps them feel better.",
                        "There are no wrong answers!",
                },
            },
        },

        // Page 14
        {
            id: "p14-fun-ways-to-make-friends",
            content: {
                title: "Here are some fun ways to make friends!",
                image: imageUrls[11],
                body:
                    "• Share your toys and games\n• Say kind words to each other\n• Help each other with tasks\n• Play together during recess",
                interaction: { type: "next" },
            },
        },
        // Page 15
        {
            id: "p15-fill-in-the-boxes",
            content: {
                title: "Fill in the boxes",
                body: "Sort each example into 'A good friend' or 'A bad friend'.",
                interaction: {
                    type: "dndBucket",
                    categories: ["A good friend", "A bad friend"],
                    items: [
                        { id: 1, label: "Refusing to help when a friend needs it", correctCategory: "A bad friend" },
                        { id: 2, label: "Including others in group activities", correctCategory: "A good friend" },
                        { id: 3, label: "Ignoring or excluding someone", correctCategory: "A bad friend" },
                        { id: 4, label: "Spreading rumors or gossip", correctCategory: "A bad friend" },
                        { id: 5, label: "Listening when a friend is upset", correctCategory: "A good friend" },
                        { id: 6, label: "Sharing supplies or snacks", correctCategory: "A good friend" },
                    ],
                },

            },
        },
        // Page 16
        {
            id: "p16-four-ways-maintain",
            content: {
                title: "4 ways to maintain friendships",
                body:
                    "UNDERSTAND FEELINGS: Talk about how we feel when we're happy or sad.\n\nSHARE TOGETHER: Spend time playing and having fun with friends.\n\nBE KIND: Show kindness by helping friends when they are upset.\n\nKEEP TALKING: Always talk openly about what you need in a friendship.",
                interaction: { type: "next" },
            },
        },
        // Page 17
        {
            id: "p17-drawing-calm",
            content: {
                title: "Drawing to Reset After a Conflict",
                body:
                    "Drawing is a great way to calm down and reset after a conflict with a friend. It helps you relax, express your feelings, and sometimes even find a new perspective to solve the problem together.",
                interaction: { type: "next" },
            },
        },
        // Page 18
        {
            id: "p18-drawing-activity",
            content: {
                title: "Let’s draw a picture",
                image: imageUrls[12],
                body: "Use drawing to express your feelings or show how friends can solve a problem together.",
                interaction: { type: "activity", activity: "drawing" },
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
