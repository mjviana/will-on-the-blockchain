import {InputGroup, Input, InputRightElement, Button} from "@chakra-ui/react";
import {useState} from "react";

interface SecretCodeProps {
  onSecretCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  isDisabled: boolean;
}

const SecretCode = ({
  onSecretCodeChange,
  value,
  isDisabled,
}: SecretCodeProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <InputGroup size="md">
        <Input
          value={value}
          isDisabled={isDisabled}
          id="secret-code"
          type={show ? "text" : "password"}
          pr="4.5rem"
          placeholder="Enter secret code"
          onChange={onSecretCodeChange}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default SecretCode;
