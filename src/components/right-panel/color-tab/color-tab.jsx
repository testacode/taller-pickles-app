import { REMERA_TELA_COLOR } from "../../../constants";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useDataContext } from "../../../context/DataContext";

export const ColorTab = () => {
  const { data, updateData } = useDataContext();
  const { shirt_side, color } = data;

  return (
    <Flex flexDir="column">
      <Text mb="2em">No seas trolo man y elegí un color de remera</Text>
      <Flex
        bg="rgba(129, 131, 129, 0.1)"
        flexDir="row"
        gap={["4", "6"]}
        p={["0.5em", "1em"]}
        rounded="l3"
        width="100%"
        wrap="wrap"
      >
        {Object.keys(REMERA_TELA_COLOR).map((ITEM) => {
          const { VALUE, LABEL, STYLE } = REMERA_TELA_COLOR[ITEM];
          const isColorSelected = color === VALUE;

          return (
            <Flex
              align="center"
              border={isColorSelected ? "2px solid" : "2px solid transparent"}
              p="2"
              flexDir="column"
              gap="0.5em"
              justify="center"
              key={VALUE}
              onClick={() => updateData({ color: VALUE })}
              position="relative"
            >
              <IconButton
                bg={STYLE}
                role="radio"
                rounded="full"
                size="2xl"
                filter={{
                  _dark: "drop-shadow(0px 0px 3px white",
                  base: "drop-shadow(0px 0px 3px black",
                }}
              />
              <Text
                filter={{
                  _dark: "drop-shadow(0px 0px 3px black)",
                  base: "drop-shadow(0px 0px 3px white",
                }}
              >
                {LABEL}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
