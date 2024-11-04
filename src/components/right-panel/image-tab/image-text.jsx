import { Flex, Input } from "@chakra-ui/react";
import { TextCheckbox } from "./texto-checkbox";
import { useDataContext } from "../../../context/DataContext";

export const ImageText = () => {
  const { data, updateData } = useDataContext();
  const { shirt_side } = data;

  return (
    <Flex flexDir="column" gap="0.5em">
      {/* Texto de arriba */}
      <TextCheckbox title="Agrega un texto arriba" textType="up" />
      {/* Input texto de arriba */}
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
      {/* Texto de abajo */}
      <TextCheckbox title="Agrega un texto abajo" textType="down" />
      {/* Input de texto de abajo */}
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
  );
};
