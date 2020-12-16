import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";

function Copyright() {
  return (
    <h5 style={{fontWeight:"400",color:"#585555",marginLeft:"3rem"}}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        BUPAZAR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </h5>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    width:"100%"
  },
  main: {
    //marginTop: theme.spacing(8),
    //marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: '0rem',
    backgroundColor: '#F3DE8A',
    width:"100%",
  },
  logoImg:{
    maxWidth: "sm",
    display:"flex",
    minHeight: "15vh",
    flexDirection: "column",
    marginLeft:"3rem",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <footer className={classes.footer}>
        <Container className={classes.logoImg}>
          <Box display="flex" flexDirection="row">
            <Box>
              <a href="/" >
                <img  style={{width:"6rem",height:"6rem",marginLeft:"5rem"}} src="/img/logo.png" alt="BUPAZAR" />
              </a>
              <h5 style={{fontWeight:"400",color:"#585555",marginLeft:"5rem"}}>All rights reserved.</h5>
              <Copyright/>
            </Box>

            <Box p={0} marginLeft={"10rem"}>
              <h3 style={{fontWeight:"500",color:"#585555", marginLeft:"8rem"}}>About US</h3>
              <h4 style={{fontWeight:"400",color:"#585555"}}> You can follow up your orders, edit your addresses,
                <br/> save or  remove credit cards, revise your assessments,<br/>  and change your user settings.</h4>
            </Box>
            <Box style={{marginLeft:"10rem"}}>
              <h3 style={{fontWeight:"500",color:"#585555", marginLeft:"7rem"}}>Contact Info</h3>
              <h4 style={{fontWeight:"400",color:"#585555"}}> If you have any request or complain and <br/>need to communicate,
                you can contact us via <br/> <br/>
                Phone: <span style={{paddingLeft: '20px'}}>(555)-123-45-67</span> <br/>
                E-mail: <span style={{paddingLeft: '20px'}}>bupazar@contactus.com </span></h4>
            </Box>

          </Box>
        </Container>
      </footer>
    </div>
  );
}
