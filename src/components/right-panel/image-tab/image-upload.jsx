import { CloseButton } from "../../ui/close-button";
import { Dropzone } from "../dropzone";
import { Flex, Highlight, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDataContext } from "../../../context/DataContext";

export const ImageUpload = () => {
  const { data, updateData } = useDataContext();
  const { shirt_side } = data;
  const image = data[shirt_side].imagen;

  const removeImage = useCallback(() => {
    updateData({
      [shirt_side]: {
        ...data[shirt_side],
        imagen: null,
      },
    });
  }, [data, shirt_side, updateData]);

  return (
    <>
      <Flex className="tab-header" justify="space-between">
        <Text>Subi una imagen y/o agrega un texto</Text>
        {image && (
          <CloseButton
            colorPalette="red"
            onClick={removeImage}
            size="2xs"
            variant="solid"
          />
        )}
      </Flex>
      {/* Dropzone */}
      <Dropzone />
      <Text textStyle="xs" mb="1em" color="fg.subtle">
        <Highlight
          query={[".jpg", ".jpeg", ".gif", ".png"]}
          styles={{ color: "orange.fg" }}
        >
          Solo podes subir imagenes con extension .jpg, .jpeg, .gif y .png
        </Highlight>
      </Text>
    </>
  );
};
