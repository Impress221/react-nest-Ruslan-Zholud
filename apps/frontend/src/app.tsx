import { AppBar, Tab, Tabs } from "@mui/material";
import TabPanel from "./components/tab-panel";
import Form from "./components/form";
import { useState } from "react";
import User from "./components/user";

export const App = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs style={{ background: 'white' }} value={value} onChange={handleChange}>
          <Tab label="Form" />
          <Tab label="User" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Form />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <User />
      </TabPanel>
    </div>
  );
}

export default App;
