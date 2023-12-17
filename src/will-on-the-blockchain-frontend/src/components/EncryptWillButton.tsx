import {Button} from "@chakra-ui/button";

interface EncryptWillButtonProps {
  onEncryptWillClick: () => void;
  isSecretKeySettled: boolean;
  isWillCompleted: boolean;
}

const EncryptWillButton = ({
  onEncryptWillClick,
  isSecretKeySettled,
  isWillCompleted,
}: EncryptWillButtonProps) => {
  return (
    <Button
      w="fit-content"
      isDisabled={!isSecretKeySettled || !isWillCompleted}
      onClick={onEncryptWillClick}
    >
      Encrypt Will
    </Button>
  );
};

export default EncryptWillButton;
