import { generateImageUrls, genericImages } from "./utils";
const lessonId = "managing-distractions-coloring";
const imageCount = 9;
const imageUrls = generateImageUrls(
    Array.from({ length: imageCount }, (_, i) => i.toString() + ".png"),
    lessonId
);
export const ManagingDistractionsColoring = {
    title: "Managing Distractions and Staying Focused",
    id: lessonId,
    imageUrls: imageUrls,
    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Managing Distractions and Staying Focused",
                image: imageUrls[0],
                interaction: { type: "next" },
            },
        },
        // Page 2
        {
            id: "p2-intro",
            content: {
                title: "Taking Charge of Distractions",
                image: imageUrls[1],
                body:
                    "Have you ever tried to pay attention in class, but your mind just wouldn’t listen?\n\nLet’s explore why it happens and how you can take charge!",
                interaction: { type: "next" },
            },
        },
        // Page 3
        {
            id: "p3-what-is-distraction",
            content: {
                title: "What Do You Think a Distraction Is?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Something that lets you finish your work faster", isCorrect: false },
                        { label: "Something that takes your attention away from your goal", isCorrect: true },
                        { label: "Something teachers give you to help you focus", isCorrect: false },
                        { label: "Something that helps you concentrate", isCorrect: false },
                    ],
                    correctText: "That’s right! A distraction takes your attention away from your goal.",
                    incorrectText: "Try again — distractions make it harder to focus.",
                },
            },
        },
        // Page 4
        {
            id: "p4-definition",
            content: {
                title: "What Are Distractions?",
                image: imageUrls[2],
                body:
                    "Distractions are things that pull your attention away from what you’re supposed to be doing.\n\nThey can sneak up on anyone, even teachers!",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-checkmark-distractions",
            content: {
                title: "Common Distractions",
                interaction: {
                    type: "dndBucket",
                    categories: ["My Distractions"],
                    items: [
                        { id: "d1", label: "Staring out the window" },
                        { id: "d2", label: "Thinking about lunch" },
                        { id: "d3", label: "Chatting with a friend" },
                        { id: "d4", label: "Playing with desk items" },
                        { id: "d5", label: "Scrolling through device" },
                        { id: "d6", label: "Fidgeting with pencil" },
                    ],
                },
                body:
                    "Which distractions affect you:",

            },
        },
        // Page 6
        {
            id: "p6-questions",
            content: {
                title: "Questions You Might Wonder",
                image: imageUrls[4],
                body:
                    "• Is it bad if I can’t focus for a long time?\n• Is it weird to feel frustrated or bored at school?\n• Am I the only one who thinks about other stuff when I’m supposed to be working?",
                interaction: { type: "next" },
            },
        },
        // Page 7
        {
            id: "p7-is-it-normal",
            content: {
                title: "Is It Normal to Feel Distracted?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Yes, everyone feels distracted sometimes", isCorrect: true },
                        { label: "No, only teachers do", isCorrect: false },
                        { label: "No, it’s never normal", isCorrect: false },
                        { label: "Yes, but only kids do", isCorrect: false },
                    ],
                    correctText: "That’s right! Everyone feels distracted sometimes.",
                    incorrectText: "Try again — everyone’s brain gets distracted sometimes.",
                },
            },
        },
        // Page 8
        {
            id: "p8-why-normal",
            content: {
                title: "Why It’s Normal",
                image: imageUrls[3],
                body:
                    "Everyone feels distracted sometimes — kids, teens, and adults! Our brains have a lot going on, and it’s totally normal to lose focus now and then.",
                interaction: { type: "next" },
            },
        },
        // Page 9
        {
            id: "p9-why-lose-focus",
            content: {
                title: "Why Do We Lose Focus?",
                body:
                    "Fill in the blanks:",
                interaction: {
                    type: "fillBlank",
                    rows: [
                        { id: '1', left: "There might be a lot of", right: "or activity around you.", answer: "Noise" },
                        { id: '2', left: "You might be tired,", right: "or worried about something.", answer: "Hungry" },
                        { id: '3', left: "The lesson might feel", right: "or you don’t understand it.", answer: "Boring" },
                        { id: '4', left: "You might just have a lot on your", right: ".", answer: "Mind" },
                    ],
                    wordBank: ["Noise", "Hungry", "Boring", "Mind"]
                },
            },
        },
        // Page 10
        {
            id: "p10-good-vs-bad",
            content: {
                title: "Not All Distractions Are Bad",
                image: imageUrls[5],
                body:
                    "Some distractions can actually help when we’re worried, because they give our minds a break from stressful thoughts.\n\nDoing something fun or different can help us calm down and feel better.",
                interaction: { type: "next" },
            },
        },
        // Page 11
        {
            id: "p11-coloring-strategy",
            content: {
                title: "Try a Strategy to Reset Your Brain",
                image: imageUrls[6],
                body:
                    "Sometimes, pausing to colour or draw can help your mind calm down and get ready to focus again.\n\nColouring or drawing gives your hands and mind something peaceful to do, it’s a mini-break without leaving your seat.",
                interaction: { type: "next" },
            },
        },
        // Page 12
        {
            id: "p12-how-coloring-helps",
            content: {
                title: "How Colouring Helps",
                // image: imageUrls[6],
                body:
                    "When you draw or colour, your brain gets a chance to relax. This can help you feel less worried or bored, and more ready to learn.\n\n1. Choose a picture\n2. Choose a colour\n3. Click the space you’d like to fill with that colour\n4. Click a new colour and repeat\n\nYou can use realistic colours or get creative!",
                interaction: { type: "next" },
            },
        },
        // Page 13
        {
            id: "p13-coloring-activity",
            content: {
                title: "Colouring Activity",
                interaction: { type: "activity", activity: "colouring" },
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
