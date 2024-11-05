import { ContactForm } from "./contact-form";
import { Flex } from "@chakra-ui/react";
// import { useDataContext } from "../../../context/DataContext";

export const SettingsTab = () => {
  // const { data, updateData } = useDataContext();
  // const { shirt_side } = data;

  return (
    <Flex flexDir="column">
      <ContactForm />
    </Flex>
  );
};
