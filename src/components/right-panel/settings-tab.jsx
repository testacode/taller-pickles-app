import { Flex } from "@chakra-ui/react";
import { useDataContext } from "../../context/DataContext";

export const SettingsTab = () => {
  const { data, updateData } = useDataContext();
  const { shirt_side } = data;

  return <Flex>Tunea tu remera</Flex>;
};
