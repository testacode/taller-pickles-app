import { Flex } from "@chakra-ui/react";
import { useDataContext } from "../../context/DataContext";

export const ColorTab = () => {
  const { data, updateData } = useDataContext();
  const { shirt_side } = data;

  return <Flex>Selecciona color y talle de remera</Flex>;
};
