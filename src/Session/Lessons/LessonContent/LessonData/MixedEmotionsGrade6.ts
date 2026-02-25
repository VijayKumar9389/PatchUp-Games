import { generateImageUrls, genericImages } from "./utils";
const imageCount = 15;
const lessonId = "mixed-emotions-complex";
const imageUrls = generateImageUrls(
    Array.from({ length: imageCount }, (_, i) => i.toString() + ".png"),
    lessonId
);
export const MixedEmotionsComplex = {
    title: "Mixed Emotions & Complex Emotions",
    id: lessonId,
    imageUrls: imageUrls,
    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Mixed Emotions & Complex Emotions",
                image: imageUrls[0],

                interaction: { type: "next" },
            },
        },
        // Page 2
        {
            id: "p2-basic-vs-mixed",
            content: {
                title: "Recognizing Emotions",
                image: imageUrls[1],
                body:
                    "We all recognize basic emotions, like feeling sad when something upsetting happens or getting angry when something frustrates us.\n\nBut what about when we experience several emotions at once, leaving us unsure how to feel?\n\nThat’s called having *mixed emotions*.",
                interaction: { type: "next" },
            },
        },
        // Page 3
        {
            id: "p3-examples",
            content: {
                image: imageUrls[2],
                title: "Examples of Mixed Emotions",
                body:
                    "1. Feeling relieved but worried after finishing a difficult test.\n2. Feeling grateful and guilty when someone helps you but you couldn't help them back.\n3. Feeling excited and anxious when starting at a new school.",
                interaction: { type: "next" },
            },
        },
        // Page 4
        {
            id: "p4-how-it-feels",
            content: {
                title: "How Mixed Emotions Feel",
                image: imageUrls[3],
                body:
                    "Mixed emotions can leave us feeling confused, overwhelmed, or unsure about how to react.\n\nSometimes it’s hard to know what to do or say, and we might feel stuck or conflicted.",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-activity-pool",
            content: {
                title: "Activity: Which 2 Emotions Do You Feel?",
                body:
                    "A friend invited you to their birthday party, but it’s at a swimming pool and you aren’t a confident swimmer.",
                interaction: {
                    type: "ms",
                    options: [
                        { label: "Excited to be invited", isCorrect: true },
                        { label: "Nervous about swimming", isCorrect: true },
                        { label: "Embarrassed about not being a strong swimmer", isCorrect: true },
                        { label: "Worried about missing out", isCorrect: true },
                    ],
                    correctText: "Good job! Many emotions can happen at the same time — that’s normal.",
                    incorrectText: "There’s no wrong answer! Everyone’s mix of feelings is unique.",
                },
            },
        },
        // Page 6
        {
            id: "p6-growing-complexity",
            content: {
                title: "Growing Up and Complex Feelings",
                image: imageUrls[4],
                body:
                    "As we grow up, our emotions become more complex and are often triggered by new, relatable experiences.",
                interaction: { type: "next" },
            },
        },
        // Page 7
        {
            id: "p7-activity-match",
            content: {
                title: "Activity: Match the Mixed Emotion",
                body:
                    "Match the mixed emotion pair to the situation:",
                interaction: {
                    type: "dndMatch",
                    labels: [
                        "Wanting something to work out but unsure if it will",
                        "When things don’t go as planned and you care about the outcome",

                        "Wishing you had what someone else has and feeling unsure about yourself",
                    ],
                    items: [
                        { id: 1, label: "Disappointed and frustrated", correctMatch: "When things don’t go as planned and you care about the outcome" },
                        { id: 2, label: "Hopeful and doubtful", correctMatch: "Wanting something to work out but unsure if it will" },
                        { id: 3, label: "Jealous and insecure", correctMatch: "Wishing you had what someone else has and feeling unsure about yourself" },
                    ],
                },
            },
        },
        // Page 8
        {
            id: "p8-naming-feelings",
            content: {
                title: "Dealing with Mixed Emotions",
                image: imageUrls[6],
                body:
                    "When dealing with mixed emotions, try to name each feeling you have.\n\nTalking to someone you trust can help you process what you’re experiencing.\n\nTaking deep breaths and remembering that it’s normal to feel this way will make a difference.",
                interaction: { type: "next" },
            },
        },
        // Page 9
        {
            id: "p9-transition-to-complex",
            content: {
                title: "Complex Emotions",
                image: imageUrls[5],
                body:
                    "We’ve seen how mixed emotions can be confusing. Along with these, we also experience *complex emotions* such as jealousy, guilt, or pride are feelings that aren’t always easy to figure out.\n\nLet’s take a closer look at these next!",
                interaction: { type: "next" },
            },
        },
        // Page 10
        {
            id: "p10-what-are-complex",
            content: {
                title: "What Are Complex Emotions?",
                image: imageUrls[7],
                body:
                    "Complex emotions are feelings made up of different parts and can be tricky to understand.\n\nThey usually happen when we think deeply about something or have strong experiences with other people.",
                interaction: { type: "next" },
            },
        },
        // Page 11
        {
            id: "p11-happy-vs-proud",
            content: {
                title: "Basic vs Complex: Happy and Proud",
                body:
                    "Basic Emotion: Happy — Feeling good or joyful about something.\n\nComplex Emotion: Proud — Feeling really good about something you did or achieved.\n\nBoth feel good! Happy is enjoying something, while proud is feeling good about an achievement.",
                interaction: { type: "next" },
            },
        },
        // Page 12
        {
            id: "p12-sad-vs-jealous",
            content: {
                title: "Basic vs Complex: Sad and Jealous",
                body:
                    "Basic Emotion: Sad — Feeling upset or down because something bad happened.\n\nComplex Emotion: Jealous — Feeling upset because someone else has something you want.\n\nBoth can make you feel down. Sad is about loss, jealous is about comparison.",
                interaction: { type: "next" },
            },
        },
        // Page 13
        {
            id: "p13-how-mix-happens",
            content: {
                title: "How They Connect",
                image: imageUrls[8],
                body:
                    "You can feel both types of emotions!\n\nBasic emotions, like happy or sad, happen quickly and are easy to notice.\n\nComplex emotions often start with basic ones and mix together, making feelings stronger or harder to understand.",
                interaction: { type: "next" },
            },
        },
        // Page 14
        {
            id: "p14-identify-activity",
            content: {
                title: "Activity: Identify Basic and Complex Emotions",
                body:
                    "Sort these emotions into the correct box:",
                interaction: {
                    type: "dndBucket",
                    categories: [
                        "Basic Emotions",
                        "Complex Emotions",
                    ],
                    items: [
                        { id: 1, label: "Shame", correctCategory: "Complex Emotions" },
                        { id: 6, label: "Disgust", correctCategory: "Basic Emotions" },
                        { id: 3, label: "Embarrassment", correctCategory: "Complex Emotions" },
                        { id: 4, label: "Disappointment", correctCategory: "Complex Emotions" },
                        { id: 5, label: "Surprise", correctCategory: "Basic Emotions" },

                        { id: 7, label: "Fear", correctCategory: "Basic Emotions" },
                        { id: 2, label: "Confusion", correctCategory: "Complex Emotions" },
                        { id: 8, label: "Calm", correctCategory: "Basic Emotions" },
                    ],
                },
            },
        },
        // Page 15
        {
            id: "p15-when-it-happens",
            content: {
                title: "When Dealing with Complex Emotions",
                image: imageUrls[9],
                body:
                    "When dealing with complex emotions, try to notice what you’re feeling and give yourself time to think about why.\n\nTalk to someone you trust, and remember it’s okay to ask for help if you need it.",
                interaction: { type: "next" },
            },
        },
        // Page 16
        {
            id: "p16-grounding-intro",
            content: {
                title: "When You’re Not Ready to Talk",
                body:
                    "When we’re struggling to understand emotions and not ready to talk, taking deep breaths and grounding ourselves can help in the moment.\n\nLet’s try an exercise together!",
                interaction: { type: "next" },
            },
        },
        // Page 17
        {
            id: "p17-step1",
            content: {
                title: "Step 1: Find a Comfortable Position",
                body:
                    "Find a quiet spot to sit or stand where you can focus on your surroundings without distractions.\n\nTake a deep breath in through your nose and out through your mouth, allowing yourself to relax.",
                interaction: { type: "next" },
            },
        },
        // Page 18
        {
            id: "p18-step2",
            content: {
                title: "Step 2: Identify 5 Things You Can See",
                image: imageUrls[11],
                body:
                    "These can be objects, people, or anything else in your visual field.",
                interaction: { type: "next" },
            },
        },
        // Page 19
        {
            id: "p19-step3",
            content: {
                title: "Step 3: Identify 4 Things You Can Touch",
                image: imageUrls[10],
                body:
                    "This could be your feet on the ground, the chair beneath you, the air on your skin, or the fabric of your clothes.",
                interaction: { type: "next" },
            },
        },
        // Page 20
        {
            id: "p20-step4",
            content: {
                title: "Step 4: Identify 3 Things You Can Hear",
                image: imageUrls[12],
                body:
                    "These might be sounds from outside, like birds or traffic, or internal sounds, like your breathing or your stomach growling.",
                interaction: { type: "next" },
            },
        },
        // Page 21
        {
            id: "p21-step5",
            content: {
                title: "Step 5: Identify 2 Things You Can Smell",
                image: imageUrls[13],
                body:
                    "This could be the scent of a candle, fresh air, or the aroma of food. Take a deep breath, inhaling each scent fully.",
                interaction: { type: "next" },
            },
        },
        // Page 22
        {
            id: "p22-step6",
            content: {
                title: "Step 6: Identify 1 Thing You Can Taste",
                image: imageUrls[14],
                body:
                    "This might be gum, a sip of water, or the taste of a recent meal. Allow yourself to fully experience the flavor.",
                interaction: { type: "next" },
            },
        },
        // Page 23
        {
            id: "p23-let’s-try",
            content: {
                title: "Let’s Give It a Try!",
                body:
                    "Use the 5-4-3-2-1 grounding steps to bring your focus back to the present.",
                interaction: { type: "activity", activity: "54321_grounding" },
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
