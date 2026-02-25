export const generateImageUrls = (imageList: string[], lessonID: string) => {
    return imageList.map(image => `https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/${lessonID}/${image}`);
};

export const genericImages = () => {
    return {
        celebrating: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/general/students_celebrating.png",
        celebrating_with_balloons: "https://patch-up-assets.s3.ca-west-1.amazonaws.com/lessons/general/students_celebrating_balloons.png",
    };
} 