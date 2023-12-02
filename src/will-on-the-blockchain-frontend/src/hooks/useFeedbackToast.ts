import {useToast} from "@chakra-ui/react";
import {useState, useEffect} from "react";

type ToastState = {
  title: string;
  description?: string;
  status: "info" | "warning" | "success" | "error";
  position?:
    | "top"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
};

export function useFeedbackToast() {
  const [state, setState] = useState<ToastState>();
  const toast = useToast();

  useEffect(() => {
    if (state) {
      const {title, description, status, position} = state;

      toast({
        title: title,
        description: description,
        status: status,
        duration: 9000,
        position: position || "bottom",
        isClosable: true,
      });
    }
  }, [state]);

  return [setState] as const;
}
