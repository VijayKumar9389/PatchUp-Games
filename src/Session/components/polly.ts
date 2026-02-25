import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import.meta.env
import { APIUtils } from "../../utils/apiUtils";
const polly = new PollyClient({
    region: "us-east-1", // Change if needed
    credentials: {
        accessKeyId: import.meta.env.VITE_POLLY_TEST_ACCESS,
        secretAccessKey: import.meta.env.VITE_POLLY_TEST_SECRET,
    },
});

const replaceUnderscoresWithBlanks = (text: string) => {
    return text.replace(/_+/g, ' blank ');
};

export async function speakWithPolly(text: string, isSpeaking: boolean, setIsSpeaking: (speaking: boolean) => void) {
    if (text.includes("54321")) {
        text = text.replace("54321", "5 4 3 2 1");
    }
    try {
        setIsSpeaking(true);
        const modifiedText = replaceUnderscoresWithBlanks(text);
        const audioBlob = await APIUtils.POST_AUDIO(APIUtils.getAPI_URL() + 'api/synthesize_speech/', { text: modifiedText });
        if (!audioBlob) throw new Error("No audio stream");

        // Convert the audio stream to a playable format
        const audioUrl = URL.createObjectURL(audioBlob);

        // Play the generated speech
        const audio = new Audio(audioUrl);
        audio.play();

        audio.onended = () => {
            setIsSpeaking(false);
        }
    } catch (error) {
        console.error("Error with Polly:", error);
        setIsSpeaking(false);
    }

}



