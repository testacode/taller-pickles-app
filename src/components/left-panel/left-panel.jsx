import { Center, Flex, Text } from "@chakra-ui/react";
import { useDataContext } from "../../context/DataContext";
import { Switch } from "../ui/switch";
import { ImagePreview } from "./image-preview";
import { useCallback } from "react";
import { SHIRT_SIDE } from "../../constants";

export const LeftPanel = () => {
  const { data, updateData } = useDataContext();
  const { shirt_side } = data;

  const isShirtSideFront = useCallback((side) => side === SHIRT_SIDE.FRONT, []);
  const getShirtSide = useCallback(
    (isSideFront) => (isSideFront ? SHIRT_SIDE.FRONT : SHIRT_SIDE.BACK),
    []
  );

  return (
    <Flex className="left-panel" flexDir="column">
      <Center className="left-panel-header" flexDirection="column" gap="1em">
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
      <ImagePreview />
    </Flex>
  );
};
