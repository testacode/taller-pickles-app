import { ImageTab } from "./image-tab";
import { LuImage, LuPalette, LuSettings2 } from "react-icons/lu";
import { Box, Tabs } from "@chakra-ui/react";
// import { useDataContext } from "../../context/DataContext";
import { useMemo } from "react";
import { ColorTab } from "./color-tab";
import { SettingsTab } from "./settings-tab";

const TabTrigger = ({ value, icon: Icon, label }) => (
  <Tabs.Trigger value={value} justifyContent="center">
    <Box display={["none", "block"]}>
      <Icon />
    </Box>
    {label}
  </Tabs.Trigger>
);

export const RightPanel = () => {
  // const { data, updateData } = useDataContext();
  // const { shirt_side } = data;

  const tabItems = useMemo(
    () => [
      { value: "image", icon: LuImage, label: "Imagen/Texto" },
      { value: "colores", icon: LuPalette, label: "Colores" },
      { value: "settings", icon: LuSettings2, label: "Settings" },
    ],
    []
  );

  return (
    <Tabs.Root defaultValue="image" variant="enclosed">
      <Tabs.List
        alignItems="center"
        bg="bg.muted"
        gap={["none", "1em"]}
        p={[0.5, 1]}
        rounded="l3"
        width="100%"
      >
        {tabItems.map(({ value, icon, label }) => (
          <TabTrigger key={value} value={value} icon={icon} label={label} />
        ))}
      </Tabs.List>
      <Tabs.Content value="image">
        <ImageTab />
      </Tabs.Content>
      <Tabs.Content value="colores">
        <ColorTab />
      </Tabs.Content>
      <Tabs.Content value="settings">
        <SettingsTab />
      </Tabs.Content>
    </Tabs.Root>
  );
};
