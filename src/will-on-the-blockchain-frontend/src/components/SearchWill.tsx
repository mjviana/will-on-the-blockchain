import {Input} from "@chakra-ui/react";

interface SearchWillProps {
  onCitizenshipIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchWill = ({onCitizenshipIdChange}: SearchWillProps) => {
  return (
    <Input
      w={"fit-content"}
      type="number"
      placeholder="Citizenship Id"
      onChange={onCitizenshipIdChange}
    ></Input>
  );
};

export default SearchWill;
