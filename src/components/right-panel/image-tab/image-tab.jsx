import { Flex, Separator } from "@chakra-ui/react";
import { ImageText } from "./image-text";
import { ImageUpload } from "./image-upload";
// import { useDataContext } from "../../../context/DataContext";

export const ImageTab = () => {
  // const { data, updateData } = useDataContext();
  // const { shirt_side } = data;

  return (
    <Flex className="image-tab" flexDir="column">
      <ImageUpload />
      <Separator size="lg" mb="1em" />
      <ImageText />
    </Flex>
  );
};
