import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Box from "@material-ui/core/Box";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="/">
        BUPAZAR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Box display="flex" flexDirection="row" p={1} m={1}>
            <Box p={1}>
              <a href="/">
                <img style={{width:"5rem",height:"5rem"}} src="/img/logo.png" alt="BUPAZAR" />
              </a>
            </Box>
            <Box p={1} >
              <Typography color="textSecondary" variant="body1">All rights reserved.</Typography>
              <Copyright/>
            </Box>
          </Box>
        </Container>
      </footer>
    </div>
  );
}
