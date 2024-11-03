import { ColorModeButton } from "../ui/color-mode";
import { Flex, Heading } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex
      className="header"
      justify="space-between"
      width="100%"
      align="center"
    >
      <Heading
        size="4xl"
        mb="1em"
        mt="1em"
        color={{ base: "black", _dark: "white" }}
      >
        Bienvenido al creador de remeras del Taller de Pickles!
      </Heading>
      <ColorModeButton
        color={{ _dark: "white", base: "black" }}
        bg={{ base: "white", _dark: "black" }}
      />
    </Flex>
  );
};
