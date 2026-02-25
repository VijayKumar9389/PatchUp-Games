// lessonList.ts
export interface LessonSummary {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
}

export const lessonList: LessonSummary[] = [
    { //done
        id: "understanding-emotions",
        title: "Understanding Emotions",
        description: "Learn to recognize and name different feelings in yourself.",
        thumbnail: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/understanding-emotions/student_thumbsup.png",
    },
    {
        id: "anxiety-triggers-count-to-10",
        title: "Anxiety Triggers: Becoming Self-Aware",
        description: "Identify common anxiety triggers and learn to recognize your own.",
        thumbnail: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/anxiety-triggers-count-to-10/0.png",
    },
    {
        id: "building-strong-friendships",
        title: "Building Strong Friendships",
        description: "Learn how to make and keep good friends.",
        thumbnail: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/building-strong-friendships/0.png",
    },
    {
        id: "handling-frustration-infinity-breathing",
        title: "Managing Frustration",
        description: "Discover ways to stay calm when things don’t go your way.",
        thumbnail: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/handling-frustration-infinity-breathing/student%20fight.png",
    },
    {
        id: "building-routines-54321",
        title: "Build Healthy Routines",
        description: "Create daily habits that help you feel your best.",
        thumbnail: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/building-routines-54321/5.png",
    },
    {
        id: "constructive-anger-breathing-square",
        title: "Constructive Ways to Express Anger",
        description: "Explore tools to help express anger in a healthy way.",
        thumbnail: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/constructive-anger-breathing-square/0.png",

    },
    {
        id: "identifying-distractions-star-finder",
        title: "Identifying Distractions",
        description: "Learn to recognize and manage distractions in your environment.",
        thumbnail: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/identifying-distractions-star-finder/0.png",

    },
    {
        id: "identifying-strengths-bubble-breaker",
        title: "Identifying Personal Strengths",
        description: "Discover your unique strengths and how to use them.",
        thumbnail: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/identifying-strengths-bubble-breaker/0.png",

    },
    {
        id: "managing-distractions-coloring",
        title: "Managing Distractions",
        description: "Practice techniques to stay focused and attentive.",
        thumbnail: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/managing-distractions-coloring/0.png",
    },
    {
        id: "mixed-emotions-complex",
        title: "Understanding Mixed Emotions",
        description: "Explore the complexity of mixed emotions and how to navigate them.",
        thumbnail: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/mixed-emotions-complex/9.png",

    },
    // {
    //     id: "recognizing-emotions-1to3",
    //     title: "Recognizing Emotions",
    //     description: "Help young children identify and understand their emotions.",
    //     thumbnail: "/happy.png",
    // },
    // {
    //     id: "recognizing-emotions-4to6",
    //     title: "Recognizing Emotions",
    //     description: "Help older children recognize and understand their emotions.",
    //     thumbnail: "/happy.png",
    // },
    {
        id: "reframing-negative-thinking",
        title: "Reframing Negative Thinking",
        description: "Learn to challenge and change negative thought patterns.",
        thumbnail: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/reframing-negative-thinking/0.png",

    },
    // {
    //     id: "stress-anxiety",
    //     title: "Managing Stress and Anxiety",
    //     description: "Techniques to help children aged 4-6 manage stress and anxiety.",
    //     thumbnail: "/worried.png",
    // },
    {
        id: "understanding-conflict-counting",
        title: "Understanding Conflict Resolution",
        description: "Learn strategies to resolve conflicts peacefully.",
        thumbnail: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/understanding-conflict-counting/6.png",

    }
];
