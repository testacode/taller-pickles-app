import { Checkbox } from "../ui/checkbox";
import { CloseButton } from "../ui/close-button";
import { Dropzone } from "./dropzone";
import { Flex, Highlight, Input, Separator, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDataContext } from "../../context/DataContext";

export const ImageTab = () => {
  const { data, updateData } = useDataContext();
  const { shirt_side } = data;

  const removeImage = useCallback(() => {
    updateData({
      [shirt_side]: {
        ...data[shirt_side],
        imagen: null,
      },
    });
  }, [data, shirt_side, updateData]);

  return (
    <Flex flexDir="column">
      <Flex justify="space-between">
        <Text>Subi una imagen y/o agrega un texto</Text>
        {data[shirt_side].imagen && (
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
      <Separator size="lg" mb="1em" />
      <Flex flexDir="column" gap="0.5em">
        <Flex gap="1em">
          <Text>Agrega un texto arriba</Text>
          <Checkbox
            checked={data[shirt_side].agrega_texto_arriba}
            onCheckedChange={({ checked }) => {
              updateData({
                [shirt_side]: {
                  ...data[shirt_side],
                  agrega_texto_arriba: !!checked,
                },
              });
            }}
          />
        </Flex>
        <Input
          placeholder="Texto de arriba"
          type="text"
          value={data[shirt_side].texto_arriba}
          onChange={(e) =>
            updateData({
              [shirt_side]: {
                ...data[shirt_side],
                texto_arriba: e.target.value,
              },
            })
          }
        />
        <Flex gap="1em">
          <Text>Agrega un texto abajo</Text>
          <Checkbox
            checked={data[shirt_side].agrega_texto_abajo}
            onCheckedChange={({ checked }) => {
              updateData({
                [shirt_side]: {
                  ...data[shirt_side],
                  agrega_texto_abajo: !!checked,
                },
              });
            }}
          />
        </Flex>
        <Input
          type="text"
          placeholder="Texto de abajo"
          value={data[shirt_side].texto_abajo}
          onChange={(e) =>
            updateData({
              [shirt_side]: {
                ...data[shirt_side],
                texto_abajo: e.target.value,
              },
            })
          }
        />
      </Flex>
    </Flex>
  );
};
