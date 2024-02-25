import useSettingsFilter from "@/shared/hooks/useSettingsFilter";
import { Tab, Tabs } from "@nextui-org/react";

const SettingsTab = () => {
  const { activeItem, setActiveItem } = useSettingsFilter();

  return (
    <Tabs
      variant={"underlined"}
      aria-label="Tabs variants"
      selectedKey={activeItem}
      onSelectionChange={setActiveItem}
    >
      <Tab key="API Access" title="API Access" />
      <Tab key="Customize Profile" title="Customize Profile" />
    </Tabs>
  );
};

export default SettingsTab;
