const lessonId = "building-routines-54321";
import { generateImageUrls, genericImages } from "./utils";
const imageCount = 22;
const imageUrls = generateImageUrls(
    Array.from({ length: imageCount }, (_, i) => i.toString() + ".png"),
    lessonId
);
export const BuildingRoutines54321 = {
    title: "Building Routines - 5-4-3-2-1 Activity",
    id: lessonId,
    imageUrls: imageUrls,
    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Building Healthy Routines",
                image: imageUrls[21],
                interaction: { type: "next" },
            },
        },
        // Page 2
        {
            id: "p2-what-is-routine",
            content: {
                title: "What Is a Routine?",
                image: imageUrls[0],
                body: "A routine is a set of actions or steps that you do regularly and in the same order.",
                interaction: { type: "next" },
            },
        },
        // Page 3
        {
            id: "p3-home-routines",
            content: {
                title: "Home Routines",
                image: imageUrls[1],
                body:
                    "Home routines might include brushing your teeth, packing your lunch, doing chores, or reading before bed.",
                interaction: { type: "next" },
            },
        },
        {
            id: "p3-home-and-school-routines",
            content: {
                title: "School Routines",
                image: imageUrls[2],
                body:
                    "School routines might include hanging up your backpack, following directions, finishing work on time, or transitioning between subjects.",
                interaction: { type: "next" },
            },
        },
        // Page 4
        {
            id: "p4-key-difference",
            content: {
                title: "Key Difference",
                image: imageUrls[3],
                body:
                    "Home routines are more about daily life and self-care.\nClassroom routines help learning run smoothly and respectfully.\n\nBoth types help you feel ready and responsible!",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-why-we-need-routines",
            content: {
                title: "Why Do We Need Routines?",
                image: imageUrls[4],
                body:
                    "Routines help you feel prepared and calm.\nThey keep you organized and focused.\nThey save time and reduce stress.\nThey help you build independence and confidence.\n\nFun Fact: Your brain loves routines because they use less energy than starting from scratch every time!",
                interaction: { type: "next" },
            },
        },
        {
            id: "p6-fun-fact",
            content: {
                title: "Fun Fact",
                image: imageUrls[5],
                body:
                    "Your brain loves routines because they use less energy than starting from scratch every time!",
                interaction: { type: "next" },
            },
        },
        // Page 6
        {
            id: "p6-helpful-routines",
            content: {
                title: "What Do Helpful Routines Look Like?",
                image: imageUrls[6],
                body:
                    "• Waking up and getting ready in the same order every morning\n• Starting work right after instructions without reminders\n• Cleaning up your space when you're finished\n• Going to bed at a regular time and winding down without screens\n\nRoutines help your day feel smooth and predictable.",
                interaction: { type: "next" },
            },
        },
        // Page 7
        {
            id: "p7-fill-blank",
            content: {
                title: "Fill in the Blank",
                body: "A helpful routine can make your day feel more _______ and calm.",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "tired", isCorrect: false },
                        { label: "lazy", isCorrect: false },
                        { label: "stressed", isCorrect: false },
                        { label: "organized", isCorrect: true },
                    ],
                    correctText: "Yes! Routines help you feel organized and calm.",
                    incorrectText: "Try again — think about what routines help you feel.",
                },
            },
        },
        // Page 8
        {
            id: "p8-brain-question",
            content: {
                title: "Why does your brain like routines?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "They are boring", isCorrect: false },
                        { label: "They make things confusing", isCorrect: false },
                        { label: "They use less brain energy", isCorrect: true },
                        { label: "They help you skip responsibilities", isCorrect: false },
                    ],
                    correctText: "Correct! Routines use less brain energy to perform.",
                    incorrectText: "Try again — your brain loves to save energy!",
                },
            },
        },
        // Page 9
        {
            id: "p9-healthy-habits",
            content: {
                title: "What Are Healthy Habits?",
                image: imageUrls[8],
                body:
                    "Healthy habits are small actions you do often that make your day better.\n\nThey can help your body , e.g., staying hydrated.\nThey also help your mind , e.g., taking deep breaths.\nAnd your learning , e.g., checking your work.\n\nThey can be physical, mental, or social.",
                interaction: { type: "next" },
            },
        },
        // Page 10
        {
            id: "p10-healthy-habit-question",
            content: {
                title: "Which of these is a healthy habit?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Leaving things messy", isCorrect: false },
                        { label: "Drinking water", isCorrect: true },
                        { label: "Interrupting others", isCorrect: false },
                        { label: "Staying up all night", isCorrect: false },
                    ],
                    correctText: "That's right! Drinking water is a healthy habit.",
                    incorrectText: "Try again — think about habits that keep you healthy.",
                },
            },
        },
        // Page 11
        {
            id: "p11-fill-blank-habits",
            content: {
                title: "Healthy Habits Help You...",
                body: "Healthy habits help you feel better, stay focused, and _______ well with others.",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Argue", isCorrect: false },
                        { label: "Work", isCorrect: true },
                        { label: "Distract", isCorrect: false },
                        { label: "Routine", isCorrect: false },
                    ],
                    correctText: "Yes! Healthy habits help you work well with others.",
                    incorrectText: "Try again — think about teamwork and cooperation.",
                },
            },
        },
        // Page 12
        {
            id: "p12-why-it-matters",
            content: {
                title: "Why Do Routines and Habits Matter?",
                image: imageUrls[10],
                body:
                    "They help you stay on track and complete tasks.\nThey make transitions easier and less stressful.\nThey help you feel more in control of your day.\nThey build responsibility and good decision-making skills.",
                interaction: { type: "next" },
            },
        },
        // Page 13
        {
            id: "p13-brain-science",
            content: {
                title: "Brain Science Behind Habits",
                image: imageUrls[14],
                body:
                    "Your brain learns habits by following three steps:\n\n1. Cue: Something reminds you (like seeing your backpack).\n2. Routine: You do something (check homework).\n3. Reward: You feel good (proud and ready).\n\nDoing this over and over makes it easier!",
                interaction: { type: "next" },
            },
        },
        // Page 14
        {
            id: "p14-repetition-question",
            content: {
                title: "What happens the more you repeat a helpful habit?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "It becomes easier", isCorrect: true },
                        { label: "It becomes harder", isCorrect: false },
                        { label: "You forget it", isCorrect: false },
                        { label: "Your brain ignores it", isCorrect: false },
                    ],
                    correctText: "Correct! Repetition makes habits easier over time.",
                    incorrectText: "Try again — practice makes progress!",
                },
            },
        },
        // Page 15
        {
            id: "p15-common-challenges",
            content: {
                title: "Common Challenges with Routines",
                image: imageUrls[13],
                body:
                    "• Waking up late or rushing\n• Forgetting to complete steps (like cleaning up or turning in work)\n• Getting distracted or off-task\n• Starting things but not finishing them\n\nThese are normal struggles , what matters is noticing and trying again!",
                interaction: { type: "next" },
            },
        },
        // Page 16
        {
            id: "p16-tips",
            content: {
                title: "Tips to Build Strong Routines",
                sideBySide: true,
                image: imageUrls[15],
                body:
                    "• Use a visual schedule or checklist\n• Set reminders, timers, or alarms\n• Keep your supplies or space organized\n• Practice doing things in the same order\n• Start with one small habit at a time and stick with it",
                interaction: { type: "next" },
            },
        },
        // Page 17
        {
            id: "p17-new-habit-question",
            content: {
                title: "What's one way to make a new habit stick?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Change it every day", isCorrect: false },
                        { label: "Do it once and forget it", isCorrect: false },
                        { label: "Practice it the same way each day", isCorrect: true },
                        { label: "Ask someone else to do it for you", isCorrect: false },
                    ],
                    correctText: "Exactly! Repetition and consistency help new habits stick.",
                    incorrectText: "Try again — consistency is key to building habits.",
                },
            },
        },
        // Page 18
        // {
        //     id: "p18-checkmark-challenges",
        //     content: {
        //         title: "Checkmark the Common Challenges You Have",
        //         body:
        //             "Staying up too late\nNot completing homework\nIgnoring classroom routines or instructions\nLosing or misplacing school supplies often\nBeing late for school\nSpending too much time on screens\n\nRushing through schoolwork\nLeaving messes for others\nForgetting to use kind words\nNot asking for help\nIgnoring responsibilities\nReacting with anger\nSaying 'I can’t' instead of trying",
        //         interaction: { type: "checklist" },
        //     },
        // },
        // Page 19
        // {
        //     id: "p19-checkmark-routines",
        //     content: {
        //         title: "Checkmark the Routines You Already Follow!",
        //         body:
        //             "Star the routines and habits you’d like to work on:\n\nWaking up on time with an alarm\nFinishing your homework before supper\nTaking deep breaths when feeling frustrated\nChecking your work before handing it in\nFollowing classroom routines (listening, participating, cleaning up)\nAsking for help when needed\nUsing kind, respectful language\nBeing on time for class or activities",
        //         interaction: { type: "checklist" },
        //     },
        // },
        // Page 20
        {
            id: "p20-summary",
            content: {
                title: "Routines and Healthy Habits",
                image: imageUrls[12],
                body:
                    "Routines and healthy habits help your brain stay focused, your body stay ready, and your mind feel calm.\n\nThe more you practice them, the easier they become.\n\nYou are in charge of your routine , and that’s powerful!",
                interaction: { type: "next" },
            },
        },
        // Page 21
        {
            id: "p21-intro-grounding",
            content: {
                title: "Healthy Habits Start Small!",
                body:
                    "Let’s start small by taking a few minutes to reset our brains with a grounding exercise called 5-4-3-2-1.",
                interaction: { type: "next" },
            },
        },
        // Page 22
        {
            id: "p22-step-1",
            content: {
                title: "Step 1: Find a Comfortable Position",
                body:
                    "Begin by finding a comfortable and quiet spot to sit or stand where you can focus on your surroundings without distractions.\n\nTake a deep breath in through your nose and out through your mouth, allowing yourself to relax.",
                interaction: { type: "next" },
            },
        },
        // Page 23
        {
            id: "p23-step-2",
            content: {
                title: "Step 2: Identify 5 Things You Can See",
                image: imageUrls[16],
                body:
                    "Look around you and identify 5 things that you can see. These can be objects, people, or anything else in your visual field.",
                interaction: { type: "next" },
            },
        },
        // Page 24
        {
            id: "p24-step-3",
            content: {
                title: "Step 3: Identify 4 Things You Can Touch",
                image: imageUrls[17],
                body:
                    "Identify 4 things that you can touch or feel. This could be your feet on the ground, the chair beneath you, the air on your skin, or the fabric of your clothes.",
                interaction: { type: "next" },
            },
        },
        // Page 25
        {
            id: "p25-step-4",
            content: {
                title: "Step 4: Identify 3 Things You Can Hear",
                image: imageUrls[18],
                body:
                    "These might be sounds from outside, like birds chirping or traffic, or internal sounds, like your breathing or your stomach growling.",
                interaction: { type: "next" },
            },
        },
        // Page 26
        {
            id: "p26-step-5",
            content: {
                title: "Step 5: Identify 2 Things You Can Smell",
                image: imageUrls[19],
                body:
                    "This could be the scent of a candle, the smell of fresh air, or the aroma of food. Take a deep breath, inhaling each scent fully.",
                interaction: { type: "next" },
            },
        },
        // Page 27
        {
            id: "p27-step-6",
            content: {
                title: "Step 6: Identify 1 Thing You Can Taste",
                image: imageUrls[20],
                body:
                    "This might be a piece of gum, a sip of water, or the residual taste of a recent meal. Allow yourself to fully experience the flavor.",
                interaction: { type: "next" },
            },
        },
        // Page 28
        {
            id: "p28-conclusion",
            content: {
                title: "Your turn! The 5-4-3-2-1 Exercise",
                // body:
                //     "The 5-4-3-2-1 grounding exercise is a powerful tool for managing stress and anxiety by bringing your focus to the present moment.\n\nBy following these steps and engaging your five senses, you can calm your mind and regain control over your emotions.\n\nLet’s give it a try!",
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
