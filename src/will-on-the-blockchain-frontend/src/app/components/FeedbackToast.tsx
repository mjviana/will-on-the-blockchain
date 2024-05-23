"use client";

import {Box, Link, useToast, Text} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import {useEffect, useMemo, useState} from "react";

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
  link?: string;
};

interface FeedbackToastProps {
  toastState: ToastState;
}

const FeedbackToast = ({
  toastState: {title, description, status, position, link},
}: FeedbackToastProps) => {
  const toast = useToast();
  const [active, setActive] = useState(true);

  const getBackgroundColor = () => {
    switch (status) {
      case "info":
        return "blue.500";
      case "warning":
        return "yellow.500";
      case "success":
        return "green.500";
      case "error":
        return "red.500";
      default:
        return "gray.500";
    }
  };

  const toastStatus = useMemo(() => {
    return {title, description, status, position, link};
  }, [title, description, status, position, link]);

  useEffect(() => {
    setActive(false);
  }, []);

  return (
    <>
      {active &&
        toast({
          title: toastStatus.title,
          description: toastStatus.description,
          status: toastStatus.status,
          duration: 9000,
          position: toastStatus.position || "bottom",
          isClosable: true,
          render: () => (
            <Box color="white" p={3} bg={getBackgroundColor()}>
              <Text>{toastStatus.description}</Text>
              {toastStatus.link && (
                <Link href={toastStatus.link} isExternal>
                  <Text>
                    Transaction Data <ExternalLinkIcon mx="2px" />
                  </Text>
                </Link>
              )}
            </Box>
          ),
        })}
    </>
  );
};

export default FeedbackToast;
