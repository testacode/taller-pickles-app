import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { COLOR_REMERA, SHIRT_SIDE } from "../../constants";
import { useCallback } from "react";
import { useDataContext } from "../../context/DataContext";
import remeraEspalda from "../../assets/remera-espalda.png";
import remeraFrente from "../../assets/remera-frente.png";

export const ImagePreview = () => {
  const { data } = useDataContext();
  const { shirt_side, color } = data;

  const isShirtSideFront = useCallback((side) => side === SHIRT_SIDE.FRONT, []);
  const getShirtColorStyle = (value) => {
    const STYLE = value.toUpperCase();

    return COLOR_REMERA[STYLE].STYLE;
  };

  return (
    <Flex className="image-preview" flexDir="column" position="relative">
      {data[shirt_side].agrega_texto_arriba && (
        <Texto texto={data[shirt_side].texto_arriba} position="top" />
      )}
      {data[shirt_side].imagen && <Imagen src={data[shirt_side].imagen} />}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background={getShirtColorStyle(color)}
        opacity={0.7}
        mixBlendMode="multiply"
      />
      <Image
        src={isShirtSideFront(shirt_side) ? remeraFrente : remeraEspalda}
      />
      {data[shirt_side].agrega_texto_abajo && (
        <Texto texto={data[shirt_side].texto_abajo} position="bottom" />
      )}
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
      className="texto"
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

const Imagen = ({ src }) => {
  const preview = URL.createObjectURL(src);

  return (
    <Flex
      className="imagen"
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
