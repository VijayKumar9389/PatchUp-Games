export interface Student {
  id?: string | number;
  uuid?: string;
  name: string;
  grade?: number | string;
}

export interface ActivityProps {
  onComplete?: () => void;
  onSend?: (text: string, userSelected?: boolean, activity?: string) => void;
  completeActivity?: () => void;
  handleSpeak?: (text: string) => void;
}
