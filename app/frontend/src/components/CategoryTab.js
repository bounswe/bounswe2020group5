import * as React from "react";
import {
  List,
  AppBar,
  Toolbar,
  Paper,
  Tabs,
  Tab,
  Popper,
  MenuList,
  MenuItem,
  InputBase,
  withStyles
} from "@material-ui/core";
import {Link} from "react-router-dom";


const styles = theme => {};

const subElectronic = ["PC & Tablet", "Smartphone", "White Appliances", "Photo & Camera", "Game&Game Console"];
const subFashion = ["Woman Clothing", "Accessory", "Sportswear", "Man Clothing", "Shoes&Bags"];
const subHome = ["Kitchenware", "Beds", "Decoration", "Office Furniture"];
const subSport = ["Sport Clothing", "Fitness"];
const subPersonal = ["Perfume", "Makeup", "Skin Care", "Oral Care", "Hair Care"];
const subHobbies = ["Book&Magazine", "Musical Instrument", "Art"];


class AppBarTop extends React.Component {
  state = {
    value: 0,
    open: false,
    open2:false,
    open3:false,
    open4:false,
    open5:false,
    open6:false,
    anchorEl: null,
    anchorEl2: null,
    anchorEl3: null,
    anchorEl4: null,
    anchorEl5: null,
    anchorEl6: null,
  };

  handleMenuClick = index => {};

  handleMenuOpen = (index, event) => {
    const { currentTarget } = event;
    this.setState({
      open: true,
      open2:false,
      anchorEl: currentTarget,
      value: index
    });
  };

  handleMenuOpen2 = (index, event) => {
    const { currentTarget } = event;
    this.setState({
      open2: true,
      open:false,
      open3:false,
      anchorEl2: currentTarget,
      value: index
    });
  };

  handleMenuOpen3 = (index, event) => {
    const { currentTarget } = event;
    this.setState({
      open3: true,
      open2:false,
      open4:false,
      anchorEl3: currentTarget,
      value: index
    });
  };
  handleMenuOpen4 = (index, event) => {
    const { currentTarget } = event;
    this.setState({
      open4: true,
      open3:false,
      open5:false,
      anchorEl4: currentTarget,
      value: index
    });
  };
  handleMenuOpen5 = (index, event) => {
    const { currentTarget } = event;
    this.setState({
      open5: true,
      open4:false,
      open6:false,
      anchorEl5: currentTarget,
      value: index
    });
  };
  handleMenuOpen6 = (index, event) => {
    const { currentTarget } = event;
    this.setState({
      open6: true,
      open5:false,
      anchorEl6: currentTarget,
      value: index
    });
  };

  handleMenuClose = () => {
    this.setState({
      open: false,
      anchorEl: null
    });
  };

  handleMenuClose2 = () => {
    this.setState({
      open2: false,
      anchorEl2: null
    });
  };

  handleMenuClose3 = () => {
    this.setState({
      open3: false,
      anchorEl3: null
    });
  };

  handleMenuClose4 = () => {
    this.setState({
      open4: false,
      anchorEl4: null
    });
  };

  handleMenuClose5 = () => {
    this.setState({
      open5: false,
      anchorEl5: null
    });
  };

  handleMenuClose6 = () => {
    this.setState({
      open6: false,
      anchorEl6: null
    });
  };

  handleMenuCloseAll = () =>{
    this.setState({
      open6:false,
      open5:false,
      open4:false,
      open3:false,
      open2:false,
      open:false,

    })
  }

  handleInputSearch = () => {};

  render() {
    const { classes } = this.props;
    const { anchorEl,anchorEl2,anchorEl3,anchorEl4,anchorEl5,anchorEl6 } = this.state;
    const {open, open2,open3, open4,open5,open6 } = this.state;
    return (
      <div
        className={classes.root}
      >
        <AppBar position="static">
          <Paper className={classes.grow} onMouseLeave={this.handleMenuCloseAll.bind(this)}>
            <Tabs
              value={this.state.value}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab
                key={0}
                onMouseEnter={this.handleMenuOpen.bind(this, 0)}
                data-key={0}
                classes={{ root: classes.tabItem }}
                component={Link}
                to={"/category"}
                label={"Electronics"}
                aria-owns={open ? "menu-list-grow-electronic" : undefined}
                aria-haspopup={"true"}
              >
                {localStorage.setItem("category", "Electronics")}
              </Tab>
              <Tab
                key={1}
                onMouseEnter={this.handleMenuOpen2.bind(this, 1)}
                data-key={1}
                classes={{ root: classes.tabItem }}
                component={Link}
                to={"/category"}
                label={"Fashion"}
                aria-owns={open2 ? "menu-list-grow-fashion" : undefined}
                aria-haspopup={"true"}
              >
                {localStorage.setItem("category", "Fashion")}
              </Tab>
              <Tab
                key={2}
                onMouseEnter={this.handleMenuOpen3.bind(this, 2)}
                data-key={2}
                classes={{ root: classes.tabItem }}
                component={Link}
                to={"/category"}
                label={"Home&Kitchen"}
                aria-owns={open2 ? "menu-list-grow-home" : undefined}
                aria-haspopup={"true"}
              >
                {localStorage.setItem("category", "Home&Kitchen")}
              </Tab>
              <Tab
                key={3}
                onMouseEnter={this.handleMenuOpen4.bind(this, 3)}
                data-key={3}
                classes={{ root: classes.tabItem }}
                component={Link}
                to={"/category"}
                label={"Sports&Outdoors"}
                aria-owns={open2 ? "menu-list-grow-sport" : undefined}
                aria-haspopup={"true"}
              >
                {localStorage.setItem("category", "Sports&Outdoors")}
              </Tab>
              <Tab
                key={4}
                onMouseEnter={this.handleMenuOpen5.bind(this, 4)}
                data-key={4}
                classes={{ root: classes.tabItem }}
                component={Link}
                to={"/category"}
                label={"Personal"}
                aria-owns={open2 ? "menu-list-grow-personal" : undefined}
                aria-haspopup={"true"}
              >
                {localStorage.setItem("category", "Personal")}
              </Tab>
              <Tab
                key={5}
                onMouseEnter={this.handleMenuOpen6.bind(this, 5)}
                data-key={5}
                classes={{ root: classes.tabItem }}
                component={Link}
                to={"/category"}
                label={"Hobbies"}
                aria-owns={open2 ? "menu-list-grow-hobbies" : undefined}
                aria-haspopup={"true"}
              >
                {localStorage.setItem("category", "Hobbies")}
              </Tab>
            </Tabs>
            <Popper open={open} anchorEl={anchorEl} id="menu-list-grow-electronic" >
              <Paper onMouseLeave={this.handleMenuClose.bind(this)}>
                <MenuList >
                  {subElectronic.map((item, index) => (
                    <MenuItem key={index} onClick={this.handleMenuClose}>
                      {item}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Popper>
            <Popper open={open2} anchorEl={anchorEl2} id="menu-list-grow-fashion">
              <Paper onMouseLeave={this.handleMenuClose2.bind(this)}>
                <MenuList>
                  {subFashion.map((item, index) => (
                    <MenuItem key={index} onClick={this.handleMenuClose2}>
                      {item}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Popper>
            <Popper open={open3} anchorEl={anchorEl3} id="menu-list-grow-home">
              <Paper onMouseLeave={this.handleMenuClose3.bind(this)}>
                <MenuList>
                  {subHome.map((item, index) => (
                    <MenuItem key={index} onClick={this.handleMenuClose3}>
                      {item}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Popper>
            <Popper open={open4} anchorEl={anchorEl4} id="menu-list-grow-sport">
              <Paper onMouseLeave={this.handleMenuClose4.bind(this)}>
                <MenuList>
                  {subSport.map((item, index) => (
                    <MenuItem key={index} onClick={this.handleMenuClose4}>
                      {item}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Popper>
            <Popper open={open5} anchorEl={anchorEl5} id="menu-list-grow-personal">
              <Paper onMouseLeave={this.handleMenuClose5.bind(this)}>
                <MenuList>
                  {subPersonal.map((item, index) => (
                    <MenuItem key={index} onClick={this.handleMenuClose5}>
                      {item}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Popper>
            <Popper open={open6} anchorEl={anchorEl6} id="menu-list-grow-hobbies">
              <Paper onMouseLeave={this.handleMenuClose6.bind(this)}>
                <MenuList>
                  {subHobbies.map((item, index) => (
                    <MenuItem key={index} onClick={this.handleMenuClose6}>
                      {item}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Popper>
          </Paper>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(AppBarTop);
