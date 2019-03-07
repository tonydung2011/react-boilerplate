/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles';
import { adminLogin } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChangePassword = e => {
    this.setState({
      password: e.target.value,
    });
  };

  onChangeEmail = e => {
    this.setState({
      email: e.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Description of Login" />
        </Helmet>
        <Grid container>
          <Grid item sm={4} />
          <Grid item sm={4}>
            <form className="margin-top-30vh">
              <Typography variant="title" className={classes.title}>
                <FormattedMessage {...messages.authenticatedRequired} />
              </Typography>
              <TextField
                className={classes.textField}
                id="email-admin"
                label="Email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                margin="normal"
                fullWidth
                helperText={
                  this.props.authenticated === 'fail' ? '' : 'email required'
                }
              />
              <br />
              <TextField
                className={classes.textField}
                id="password-admin"
                label="Password"
                value={this.state.password}
                type="password"
                onChange={this.onChangePassword}
                margin="normal"
                fullWidth
                onSubmit={() =>
                  this.props.adminLogin({
                    password: this.state.password,
                    email: this.state.email,
                  })
                }
                helperText={
                  this.props.authenticated === 'fail'
                    ? 'Incorrect Admin credential'
                    : 'password required'
                }
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  this.props.adminLogin({
                    password: this.state.password,
                    email: this.state.email,
                  })
                }
              >
                <FormattedMessage {...messages.submit} />
              </Button>
            </form>
          </Grid>
          <Grid item sm={4} />
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  adminLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    adminLogin: p => dispatch(adminLogin(p)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(Login);
