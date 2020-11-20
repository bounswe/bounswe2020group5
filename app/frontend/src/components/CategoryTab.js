import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    backgroundColor:"#a71325",
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs className={classes.tab} value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="Electronic" {...a11yProps(0)} />
          <Tab label="Fashion" {...a11yProps(1)} />
          <Tab label="Home & Kitchen" {...a11yProps(2)} />
          <Tab label="Sports & Outdoors" {...a11yProps(3)} />
          <Tab label="Personal Care" {...a11yProps(4)} />
          <Tab label="Hobbies & Books" {...a11yProps(5)} />

        </Tabs>
      </AppBar>
      {/*<TabPanel value={value} index={0}>*/}
      {/*  Electronic*/}
      {/*</TabPanel>*/}
      {/*<TabPanel value={value} index={1}>*/}
      {/*  Fashion*/}
      {/*</TabPanel>*/}
      {/*<TabPanel value={value} index={2}>*/}
      {/*  Home & Kitchen*/}
      {/*</TabPanel>*/}
      {/*<TabPanel value={value} index={3}>*/}
      {/*  Sports & Outdoors*/}
      {/*</TabPanel>*/}
      {/*<TabPanel value={value} index={4}>*/}
      {/*  Personal Care*/}
      {/*</TabPanel>*/}
      {/*<TabPanel value={value} index={5}>*/}
      {/*  Hobbies & Books*/}
      {/*</TabPanel>*/}

    </div>
  );
}
