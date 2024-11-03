import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { DataContextProvider, useDataContext } from "../../context/DataContext";
import { SHIRT_SIDE } from "../../constants";
import { Switch } from "../ui/switch";
import { useCallback } from "react";
import remeraEspalda from "../../assets/remera-espalda.png";
import remeraFrente from "../../assets/remera-frente.png";

export const LeftPanel = () => {
  const { data, updateData } = useDataContext();
  const { shirt_side } = data;

  const isShirtSideFront = useCallback((side) => side === SHIRT_SIDE.FRONT, []);
  const getShirtSide = useCallback(
    (isSideFront) => (isSideFront ? SHIRT_SIDE.FRONT : SHIRT_SIDE.BACK),
    []
  );

  return (
    <DataContextProvider>
      <Center flexDirection="column" gap="1em">
        <Flex gap="1em">
          <Text fontWeight="bold">Elegi el lado de la estampa</Text>
          {/* Switch del frente y espalda de la remera */}
          <Switch
            disabled={!updateData}
            checked={isShirtSideFront(shirt_side)}
            onCheckedChange={(e) => {
              updateData({
                shirt_side: getShirtSide(e.checked),
              });
            }}
          />
        </Flex>
        <Flex>
          <Text fontWeight="bold" textTransform="capitalize">
            {shirt_side}
          </Text>
        </Flex>
      </Center>
      <Flex flexDir="column" position="relative">
        {/* Foto de la remera con los textos e imagen */}
        {data[shirt_side].agrega_texto_arriba && (
          <Texto texto={data[shirt_side].texto_arriba} position="top" />
        )}
        {data[shirt_side].imagen && <Imagen image={data[shirt_side].imagen} />}
        <Image
          src={isShirtSideFront(shirt_side) ? remeraFrente : remeraEspalda}
        />
        {data[shirt_side].agrega_texto_abajo && (
          <Texto texto={data[shirt_side].texto_abajo} position="bottom" />
        )}
      </Flex>
    </DataContextProvider>
  );
};

const Imagen = ({ image }) => {
  const preview = URL.createObjectURL(image);

  return (
    <Flex
      left="50%"
      maxWidth="30%"
      position="absolute"
      top="48%"
      transform="translate(-50%, -50%)"
    >
      <Image src={preview} />
    </Flex>
  );
};

const Texto = ({ texto, position }) => {
  const positions = {
    top: { top: "30%", bottom: "auto" },
    bottom: { top: "auto", bottom: "30%" },
  };

  return (
    <Box
      left="50%"
      position="absolute"
      transform="translate(-50%, -50%)"
      {...positions[position]}
    >
      <Text fontWeight="bold" color="black">
        {texto}
      </Text>
    </Box>
  );
};
