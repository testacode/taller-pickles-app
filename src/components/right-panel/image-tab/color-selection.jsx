import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { LuCheckCircle, LuPalette } from "react-icons/lu";
import { REMERA_TEXT_COLOR } from "../../../constants";
import { useDataContext } from "../../../context/DataContext";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "../../ui/popover";

export const ColorSelection = ({ textType }) => {
  const { data, updateData } = useDataContext();
  const { shirt_side } = data;

  const shirtData = data[shirt_side];
  const isTextSideUp = textType === "up";
  const textColor = isTextSideUp
    ? shirtData.texto_arriba_color
    : shirtData.texto_abajo_color;
  const textSide = isTextSideUp ? "arriba" : "abajo";
  const { label } = REMERA_TEXT_COLOR[textColor?.toUpperCase()];

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <IconButton
          aria-label={`Elegi un color para el texto de ${textSide}`}
          size="2xs"
        >
          <LuPalette color={textColor} title={`Color elegido: ${label}`} />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent bg="bg.muted">
        <PopoverBody>
          <PopoverTitle color="red" mb="1em">
            <Heading as="h2" size="md">
              Color del texto
            </Heading>
          </PopoverTitle>
          <Flex color="red" wrap="wrap" gap="4">
            {Object.keys(REMERA_TEXT_COLOR).map((color) => {
              const { label: colorLabel, value: colorValue } =
                REMERA_TEXT_COLOR[color];
              const isSelected = textColor === colorValue;

              return (
                <Flex
                  key={color}
                  flexDir="column"
                  onClick={() =>
                    updateData({
                      [shirt_side]: {
                        ...shirtData,
                        [`texto_${textSide}_color`]: colorValue,
                      },
                    })
                  }
                >
                  <Flex position="relative">
                    {isSelected && (
                      <Box
                        position="absolute"
                        transform="translate(-50%, -50%)"
                        shadow="2xl"
                        top="50%"
                        left="50%"
                      >
                        <LuCheckCircle
                          color={colorValue === "white" ? "green" : "white"}
                        />
                      </Box>
                    )}
                    <Box h="30px" w="30px" bgColor={colorValue} p="2em" />
                  </Flex>
                  <Text>{colorLabel}</Text>
                </Flex>
              );
            })}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};
