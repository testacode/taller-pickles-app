import { Checkbox } from "../../ui/checkbox";
import { ColorSelection } from "./color-selection";
import { Flex, Text } from "@chakra-ui/react";
import { useDataContext } from "../../../context/DataContext";

export const TextCheckbox = ({ title, textType }) => {
  const { data, updateData } = useDataContext();
  const { shirt_side } = data;

  const shirtData = data[shirt_side];
  const isTextSideUp = textType === "up";
  const isChecked = isTextSideUp
    ? shirtData.agrega_texto_arriba
    : shirtData.agrega_texto_abajo;
  const textSide = isTextSideUp ? "arriba" : "abajo";

  return (
    <Flex className={`texto-${textSide}`} gap="1em" align="center">
      <Text>{title}</Text>
      <Checkbox
        checked={isChecked}
        onCheckedChange={({ checked }) => {
          updateData({
            [shirt_side]: {
              ...shirtData,
              [`agrega_texto_${textSide}`]: !!checked,
            },
          });
        }}
      />
      {isChecked && <ColorSelection textType={textType} />}
    </Flex>
  );
};
