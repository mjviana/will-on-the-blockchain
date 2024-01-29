import {Input} from "@chakra-ui/react";

interface SearchWillProps {
  onCitizenshipIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchWill = ({onCitizenshipIdChange, value}: SearchWillProps) => {
  return (
    <Input
      w={"fit-content"}
      type="number"
      placeholder="Citizenship Id"
      onChange={onCitizenshipIdChange}
      value={value}
    ></Input>
  );
};

export default SearchWill;
