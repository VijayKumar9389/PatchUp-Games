import { generateImageUrls } from "./utils";
const lessonId = "anxiety-triggers-count-to-10";
const imageCount = 11;
const imageUrls = generateImageUrls(Array.from({ length: imageCount }, (_, i) => i.toString() + '.png'), lessonId);
export const AnxietyTriggersCountTo10 = {
    title: "Anxiety Triggers: Becoming Self-Aware",
    id: lessonId,
    imageUrls: imageUrls,
    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Anxiety Triggers: Becoming Self-Aware",
                body: "",
                image: imageUrls[0],
                interaction: { type: "next" },
            },
        },
        // Page 2
        {
            id: "p2-what-is-anxiety",
            content: {
                title: "What Is Anxiety?",
                image: imageUrls[1],
                body:
                    "Anxiety is a feeling of worry or fear. It can happen when we face new situations or challenges.",
                interaction: { type: "next" },
            },
        },
        // Page 3
        {
            id: "p3-what-is-a-trigger",
            content: {
                title: "What Is a Trigger?",
                image: imageUrls[2],
                body:
                    "A trigger is something that causes a strong emotional reaction, like anxiety or stress. It can be a situation, a word, a sound, or even a memory.\n\nTriggers are different for everyone and can make anxious feelings start or get stronger.",
                interaction: { type: "next" },
            },
        },
        // Page 4
        {
            id: "p4-common-triggers",
            content: {
                title: "Common Triggers for Students",
                image: imageUrls[10],
                sideBySide: true,
                body:
                    "• Tests and exams\n• Speaking in front of the class\n• Meeting new people\n• Changes in routine\n• Family problems\n• Noisy classroom\n• Conflict with friends",
                interaction: { type: "next" },
            },
        },
        // Page 5
        {
            id: "p5-brain-protects",
            content: {
                title: "Your Brain Is Protecting You",
                image: imageUrls[3],
                body:
                    "Our brains are designed to protect us. When we feel anxious, it’s our body’s way of saying, \"Be careful!\"",
                interaction: { type: "next" },
            },
        },
        // Page 6
        {
            id: "p6-signs-of-anxiety",
            content: {
                title: "Signs I Am Feeling Anxious",
                sideBySide: true,
                image: imageUrls[4],
                body:
                    "• Fast heartbeat\n• Sweaty palms\n• Stomach aches\n• Trouble sleeping\n• Feeling restless",
                interaction: { type: "next" },
            },
        },
        // Page 7
        {
            id: "p7-what-not-to-do",
            content: {
                title: "What NOT to Do When I Notice a Trigger",
                image: imageUrls[5],
                body:
                    "1. Ignore your feelings or pretend they aren’t there.\n2. Keep everything bottled up inside.\n3. Take your feelings out on others.",
                interaction: { type: "next" },
            },
        },
        // Page 8
        {
            id: "p8-what-to-do",
            content: {
                title: "What TO Do When I Notice a Trigger",
                image: imageUrls[6],
                body:
                    "1. Pay attention to when you feel worried or nervous.\n2. Think about what just happened or where you were.\n3. Tell an adult or write it down to spot what makes you feel that way.",
                interaction: { type: "next" },
            },
        },
        // Page 9
        {
            id: "p9-normalize",
            content: {
                title: "Good News",
                image: imageUrls[7],
                body:
                    "These triggers are normal and might not disappear instantly. But once you start to feel anxious, there are lots of helpful strategies you can try to feel better.",
                interaction: { type: "next" },
            },
        },
        // Page 10
        {
            id: "p10-helpful-strategies",
            content: {
                title: "Strategies That Will Help",
                sideBySide: true,
                image: imageUrls[8],
                body:
                    "Take deep breaths to calm down.\nTalk to someone you trust about your feelings.\nKeep a journal to write down your thoughts.\nStay active by playing sports or going for walks.\nCreate a routine to feel more secure.",
                interaction: { type: "next" },
            },
        },
        // Page 11
        {
            id: "p11-review-intro",
            content: {
                title: "Let’s Review",
                image: imageUrls[9],
                body:
                    "These are multiple choice questions. Choose the answer that fits best.",
                interaction: { type: "next" },
            },
        },
        // Page 12
        {
            id: "p12-q1-what-is-anxiety",
            content: {
                title: "Activity: What Is Anxiety?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Feeling worried or nervous", isCorrect: true },
                        { label: "Feeling excited", isCorrect: false },
                        { label: "Feeling sleepy", isCorrect: false },
                        { label: "Feeling hungry", isCorrect: false },
                    ],
                    correctText: "Yes! Anxiety is feeling worried or nervous.",
                    incorrectText: "Try again — think about worry or fear.",
                },
            },
        },
        // Page 13
        {
            id: "p13-q2-trigger-at-school",
            content: {
                title: "Activity: Which Is Most Likely a Trigger at School?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Reading your favorite book", isCorrect: false },
                        { label: "Being called on unexpectedly", isCorrect: true },
                        { label: "Walking to class", isCorrect: false },
                        { label: "Packing your backpack", isCorrect: false },
                    ],
                    correctText: "Right — being called on unexpectedly can trigger anxiety.",
                    incorrectText: "Try again — which one might suddenly spike worry?",
                },
            },
        },
        // Page 14
        {
            id: "p14-q3-recognizing-anxiety",
            content: {
                title: "Activity: One Step to Recognizing Anxiety",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Ignore your feelings", isCorrect: false },
                        { label: "Act out in anger", isCorrect: false },
                        { label: "Talk over others", isCorrect: false },
                        { label: "Notice when you feel worried", isCorrect: true },
                    ],
                    correctText: "Exactly — noticing worry is the first step.",
                    incorrectText: "Try again — which answer builds awareness?",
                },
            },
        },
        // Page 15
        {
            id: "p15-q4-what-not-to-do",
            content: {
                title: "Activity: What Should You NOT Do When You Feel Anxious?",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "Tell an adult", isCorrect: false },
                        { label: "Pretend nothing is wrong", isCorrect: true },
                        { label: "Write down your feelings", isCorrect: false },
                        { label: "Take deep breaths", isCorrect: false },
                    ],
                    correctText: "Correct — pretending nothing is wrong doesn’t help.",
                    incorrectText: "Try again — which one is unhelpful?",
                },
            },
        },
        // Page 16
        {
            id: "p16-q5-if-not-managed",
            content: {
                title: "Activity: If Anxiety Isn’t Managed Over Time…",
                interaction: {
                    type: "mc",
                    options: [
                        { label: "It could get stronger and harder to handle", isCorrect: true },
                        { label: "It disappears on its own", isCorrect: false },
                        { label: "You become less self-aware", isCorrect: false },
                        { label: "You always feel happy", isCorrect: false },
                    ],
                    correctText: "Yes — it can build up without strategies and support.",
                    incorrectText: "Try again — which outcome is most realistic?",
                },
            },
        },
        // Page 17
        {
            id: "p17-great-job",
            content: {
                title: "Great Job!",
                body:
                    "Let’s try an activity that might help when we’re feeling anxious.",
                interaction: { type: "next" },
            },
        },
        // Page 18
        {
            id: "p18-activity-count-to-10",
            content: {
                title: "Activity — Count to 10",
                body:
                    "1. Close your eyes and take a deep breath in through your nose and exhale.\n2. Begin counting to 10.\n3. Each number, take a deep breath in and a deep breath out.\n4. When you reach 10, take a long deep breath and a long exhale.\n5. When you're ready, open your eyes and look around — you might feel more calm and centered.",
                interaction: { type: "next", },
            },
        },
        {
            id: "p18-activity-count-to-10",
            content: {
                title: "Activity — Count to 10",
                interaction: { type: "activity", activityType: "breathing" },
            },
        },
        {
            id: "activity-completed",
            content: {
                title: "Great Job!",
                image: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/general/students_celebrating.png",
                body: "You did great! Counting to 10 can help you feel calm when you're anxious.",
                interaction: { type: "next" },
            },
        },
        {
            id: "lesson-completed",
            content: {
                title: "Great Job!",
                image: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/general/students_celebrating_balloons.png",
                body: "You've completed this lesson! Next time you feel anxious, remember to try counting to 10.",
                interaction: { type: "next" },
            },
        },
    ],
};
