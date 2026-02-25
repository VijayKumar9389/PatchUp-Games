import { generateImageUrls, genericImages } from "./utils";
const imageCount = 21;
const lessonId = "reframing-negative-thinking";
const imageUrls = generateImageUrls(
    Array.from({ length: imageCount }, (_, i) => i.toString() + ".png"),
    lessonId
);
export const ReframingNegativeThinking = {
    title: "Reframing from Negative Thinking",
    id: lessonId,
    imageUrls: imageUrls,
    pages: [
        // Page 1
        {
            id: "p1-cover",
            content: {
                title: "Reframing from Negative Thinking",
                // body: "Activity: Infinity Breathing",
                image: imageUrls[0],
                interaction: { type: "next" },
            },
        },
        // Page 2
        {
            id: "p2-what-is-negative-thinking",
            content: {
                title: "What Is Negative Thinking?",
                image: imageUrls[1],
                body:
                    "Negative thinking is when we focus on the bad things instead of the good.\n\nIt can make us feel sad, worried, or even angry.",
                interaction: { type: "next" },
            },
        },
        // Page 3
        {
            id: "p3-what-is-negative-thought",
            content: {
                title: "What are Negative Thoughts?",
                image: imageUrls[5],
                sideBySide: true,
                body:
                    "The following are examples of negative thoughts. \n\n “I’m terrible at math, I’ll never get it.”\n“Nobody likes me.”\n“I'm not good at anything.”\n“I'll embarrass myself if I raise my hand.”\n“Something bad is going to happen.”",
                interaction: {
                    type: "next",
                },
            },
        },
        // Page 4

        // Page 5
        // {
        //     id: "p5-social-concerns",
        //     content: {
        //         title: "Activity: Social Concerns",
        //         body:
        //             "“Nobody likes me.”\n“I don't have any real friends.”",
        //         interaction: { type: "yesno" },
        //     },
        // },
        // Page 6
        // {
        //     id: "p6-self-doubt",
        //     content: {
        //         title: "Activity: Self-Doubt",
        //         body:
        //             "“I'm not good at anything.”\n“I always mess everything up.”",
        //         interaction: { type: "yesno" },
        //     },
        // },
        // // Page 7
        // {
        //     id: "p7-performance-anxiety",
        //     content: {
        //         title: "Activity: Performance Anxiety",
        //         body:
        //             "“I'll embarrass myself if I raise my hand.”\n“Everyone will laugh at my presentation.”",
        //         interaction: { type: "yesno" },
        //     },
        // },
        // // Page 8
        // {
        //     id: "p8-future-worries",
        //     content: {
        //         title: "Activity: Future Worries",
        //         body:
        //             "“Something bad is going to happen.”\n“My parents will be disappointed in me.”",
        //         interaction: { type: "yesno" },
        //     },
        // },
        // Page 9
        {
            id: "p9-dealing-with-negative-thoughts",
            content: {
                title: "Dealing with Negative Thoughts",
                image: imageUrls[6],
                body:
                    "If you've had those thoughts before, you've dealt with negative thoughts, and that’s okay!\n\nWe are going to learn how to reframe our thoughts.",
                interaction: { type: "next" },
            },
        },
        // Page 10
        {
            id: "p10-where-it-comes-from",
            content: {
                title: "Where Do These Thoughts Come From?",
                image: imageUrls[8],
                sideBySide: true,
                body:
                    "Negative thinking often stems from:\n\n• Past experiences\n• Peer pressure\n• Pressure we put on ourselves to do well\n• Family expectations\n• Social media influence",
                interaction: { type: "next" },
            },
        },
        // Page 11
        {
            id: "p11-how-it-affects-me",
            content: {
                title: "How Does It Affect Me?",
                image: imageUrls[9],
                sideBySide: true,
                body:
                    "Negative thinking can:\n1. Lower self-esteem\n2. Cause stress and anxiety\n3. Affect friendships and social interactions\n4. Impact academic performance",
                interaction: { type: "next" },
            },
        },
        // Page 12
        {
            id: "p12-the-alternative",
            content: {
                title: "The Alternative!",
                image: imageUrls[12],
                body:
                    "We can use positive thinking to combat negative thoughts.",
                interaction: { type: "next" },
            },
        },
        // Page 13
        {
            id: "p13-interrupt-spiral",
            content: {
                title: "Interrupt the Negative Spiral",
                image: imageUrls[13],
                body:
                    "Negative thoughts feed on themselves and grow bigger.\n\nPositive thoughts act like a 'stop sign' that breaks the cycle.\n\nNegative spiral: “I don’t understand… I suck at everything.”\nPositive thinking: “I don’t understand… I’ll ask for help.”",
                interaction: { type: "next" },
            },
        },
        // Page 14
        {
            id: "p14-activity-sarah",
            content: {
                title: "Activity: Sarah’s Situation",
                body:
                    "Sarah didn’t get the grade she wanted on her spelling quiz but her friend did really well. Now she thinks, “I'm terrible at spelling and I'll never be as smart as my friend.”",
                interaction: {
                    type: "mc",
                    options: [
                        {
                            label:
                                "Stop trying in spelling and avoid studying because there’s no point.",
                            isCorrect: false,
                        },
                        {
                            label:
                                "Sarah can improve with practice and be proud of the words she got right!",
                            isCorrect: true,
                        },
                    ],
                    correctText: "That’s right! Effort and practice help us grow.",
                    incorrectText: "Try again — what helps Sarah improve?",
                },
            },
        },
        // Page 15
        {
            id: "p15-change-the-focus",
            content: {
                title: "Change the Focus",
                image: imageUrls[15],
                body:
                    "Negative thinking zooms in on problems and what's wrong.\nPositive thinking shifts focus to solutions and what's possible.\n\nNegative: “My friend ignored me. They must hate me.”\nPositive: “I should talk with my friend and see what’s wrong.”",
                interaction: { type: "next" },
            },
        },
        // Page 16
        {
            id: "p16-activity-lily",
            content: {
                title: "Activity: Lily’s Situation",
                body:
                    "Lily raised her hand to answer a question but got it wrong. Now she’s convinced, “I'm stupid and should never speak up again.”",
                interaction: {
                    type: "mc",
                    options: [
                        {
                            label:
                                "Stop participating in class and never raise her hand again.",
                            isCorrect: false,
                        },
                        {
                            label:
                                "Answering questions is how you learn. The teacher appreciates that you tried!",
                            isCorrect: true,
                        },
                    ],
                    correctText: "Exactly! Mistakes are part of learning.",
                    incorrectText: "Try again — what reaction helps Lily learn?",
                },
            },
        },
        // Page 17
        {
            id: "p17-build-confidence",
            content: {
                title: "Build Confidence",
                image: imageUrls[16],
                body:
                    "Positive self-talk reminds you of your strengths and past successes.\n\nIt helps you see challenges as chances to grow, not threats.",
                interaction: { type: "next" },
            },
        },
        // Page 18
        {
            id: "p18-activity-marcus",
            content: {
                title: "Activity: Marcus’s Situation",
                body:
                    "Marcus struck out during recess baseball and heard someone laugh. Now he believes, “I'm the worst player ever and everyone thinks I’m a joke.”",
                interaction: {
                    type: "mc",
                    options: [
                        {
                            label:
                                "Never play baseball again and avoid all sports to prevent embarrassment.",
                            isCorrect: false,
                        },
                        {
                            label:
                                "Acknowledge that everyone strikes out sometimes, even professional players!",
                            isCorrect: true,
                        },
                    ],
                    correctText:
                        "Correct! Everyone makes mistakes, what matters is trying again.",
                    incorrectText: "Try again — which answer builds confidence?",
                },
            },
        },
        // Page 19
        {
            id: "p19-take-a-breath",
            content: {
                title: "Take a Breath",
                image: imageUrls[17],
                body:
                    "When we’re caught in negative thinking, our minds race.\n\nFocusing on breathing forces us to slow down and be present.\n\nThis pause gives us space to choose different thoughts.",
                interaction: { type: "next" },
            },
        },
        // Page 20
        {
            id: "p20-what-is-infinity",
            content: {
                title: "What Is Infinity Breathing?",
                image: imageUrls[18],
                body:
                    "Infinity breathing uses a figure 8 shape to guide your breathing, making it easy to remember and practice.",
                interaction: { type: "next" },
            },
        },
        // Page 21
        {
            id: "p21-step-one",
            content: {
                title: "Step One",
                image: imageUrls[19],
                body:
                    "Start by breathing in as you trace the top of the figure 8.",
                interaction: { type: "next" },
            },
        },
        // Page 22
        {
            id: "p22-step-two",
            content: {
                title: "Step Two",
                image: imageUrls[20],
                body:
                    "Then breathe out while tracing the bottom of the figure 8.",
                interaction: { type: "next" },
            },
        },
        // Page 23
        {
            id: "p23-repeat",
            content: {
                title: "Repeat",
                body:
                    "Continue this pattern until you feel more relaxed and in control of your feelings.",
                interaction: { type: "next" },
            },
        },
        // Page 24
        {
            id: "p24-lets-try",
            content: {
                title: "Let’s Try Together!",
                body:
                    "Follow the infinity shape with your finger or eyes as you breathe: in, hold, out, hold.\n\nPractice until you feel calm and refreshed.",
                interaction: { type: "activity", activity: "lazy_8" },
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
