import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { REMERA_TELA_COLOR, SHIRT_SIDE } from "../../constants";
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

    return REMERA_TELA_COLOR[STYLE].STYLE;
  };

  return (
    <Flex className="image-preview" flexDir="column" position="relative">
      {data[shirt_side].agrega_texto_arriba && (
        <Texto
          color={data[shirt_side].texto_arriba_color}
          position="top"
          texto={data[shirt_side].texto_arriba}
        />
      )}
      {data[shirt_side].imagen && <Imagen src={data[shirt_side].imagen} />}
      <Box
        background={getShirtColorStyle(color)}
        bottom={0}
        left={0}
        mixBlendMode="multiply"
        opacity={0.7}
        position="absolute"
        right={0}
        top={0}
      />
      <Image
        src={isShirtSideFront(shirt_side) ? remeraFrente : remeraEspalda}
      />
      {data[shirt_side].agrega_texto_abajo && (
        <Texto
          color={data[shirt_side].texto_abajo_color}
          position="bottom"
          texto={data[shirt_side].texto_abajo}
        />
      )}
    </Flex>
  );
};

const Texto = ({ texto, position, color }) => {
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
      <Text fontWeight="bold" color={color || "black"}>
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
