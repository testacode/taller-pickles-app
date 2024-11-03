import {
  Flex,
  Highlight,
  Input,
  Separator,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox";
import { CloseButton } from "../ui/close-button";
import { Dropzone } from "./dropzone";
import { LuImage, LuPalette, LuSettings2 } from "react-icons/lu";
import { useCallback, useMemo } from "react";
import { useDataContext } from "../../context/DataContext";

const TabTrigger = ({ value, icon: Icon, label }) => (
  <Tabs.Trigger value={value} justifyContent="center">
    <Icon />
    {label}
  </Tabs.Trigger>
);

export const RightPanel = () => {
  const { data, updateData } = useDataContext();
  const tabItems = useMemo(
    () => [
      { value: "image", icon: LuImage, label: "Imagen/Texto" },
      { value: "colores", icon: LuPalette, label: "Colores" },
      { value: "settings", icon: LuSettings2, label: "Settings" },
    ],
    []
  );

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
    <Tabs.Root defaultValue="image" variant="plain">
      <Tabs.List
        bg="bg.muted"
        rounded="l3"
        p="1"
        gap="1em"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        {tabItems.map(({ value, icon, label }) => (
          <TabTrigger key={value} value={value} icon={icon} label={label} />
        ))}
      </Tabs.List>
      <Tabs.Content value="image">
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
            type="text"
            placeholder="Texto de arriba"
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
      </Tabs.Content>
      <Tabs.Content value="colores">
        Selecciona color y talle de remera
      </Tabs.Content>
      <Tabs.Content value="edicion">Tunea tu remera</Tabs.Content>
    </Tabs.Root>
  );
};
