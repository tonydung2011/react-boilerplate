import green from '@material-ui/core/colors/green';

export default theme => ({
  input: {
    color: 'white',
  },
  icon: {
    marginTop: 'auto',
    color: 'white',
  },
  tradeButton: {
    backgroundColor: '#4582A2',
    borderColor: '#4582A2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#11BCC2',
      borderColor: '#11BCC2',
    },
  },
  textFieldInput: {
    color: 'white',
  },
  textFieldLabel: {
    color: 'white',
    '&$formLabelFocused': {
      color: 'white',
    },
  },
  formLabelFocused: {
    color: 'white',
  },
  textFieldBottomLine: {
    borderBottom: '0.5px solid white',
    '&:focus': {
      borderBottom: '1px solid white',
    },
    '&:hover': {
      borderBottom: '1px solid white',
    },
  },
  selectControl: {
    width: '80%',
  },
  iconSelect: {
    color: 'white',
  },
  subTitle: {
    color: 'white',
  },
  h6: {
    color: 'white',
  },
  appBar: {
    backgroundColor: '#171d21',
  },
  fullSpace: {
    width: '100%',
    height: '100%',
  },
  bigAvatar: {
    width: 35,
    height: 35,
    border: '1px solid white',
  },
  steamNotloginText: {
    textAlign: 'center',
    color: 'white',
  },
  tradeWithMe: {
    flexGrow: 1,
  },
  helperTextDefault: {
    color: 'white',
  },
  helperTextError: {
    color: 'green',
  },
  username: {
    margin: 'auto 0',
    color: 'white',
  },
  modal: {
    marginTop: '7rem',
    marginLeft: '15rem',
    marginRight: '15rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    backgroundColor: '#04183F',
    opacity: '0.7',
  },
  capitalized: {
    textTransform: 'capitalize',
  },
  urlButton: {
    textDecoration: 'none',
  },
  getUrlButton: {
    color: 'white',
    backgroundColor: '#BCB4AC',
    borderColor: '#BCB4AC',
    '&:hover': {
      backgroundColor: '#DCDCDC',
      borderColor: '#DCDCDC',
    },
  },
  singleButtonClose: {
    margin: 'auto',
    color: 'white',
    backgroundColor: '#BCB4AC',
    borderColor: '#BCB4AC',
    '&:hover': {
      backgroundColor: '#DCDCDC',
      borderColor: '#DCDCDC',
    },
  },
  colorC9D5B5: {
    color: '#C9D5B5',
  },
  colorE7BBE3: {
    backgroundColor: '#E7BBE3',
  },
  color23C9FF: {
    backgroundColor: '#23C9FF',
  },
  colorABDF75: {
    backgroundColor: '#ABDF75',
  },
  colorA5668B: {
    backgroundColor: '#A5668B',
  },
  color84ACCE: {
    backgroundColor: '#84ACCE',
  },
  colorD33F49: {
    backgroundColor: '#1985A1',
  },
  color77BA99: {
    backgroundColor: '#77BA99',
  },
  colorD7816A: {
    backgroundColor: '#D7816A',
  },
  marketRate60: {
    backgroundColor: '#E7BBE3',
  },
  marketRate70: {
    backgroundColor: '#23C9FF',
  },
  marketRate80: {
    backgroundColor: '#ABDF75',
  },
  marketRate85: {
    backgroundColor: '#A5668B',
  },
  marketRate90: {
    backgroundColor: '#84ACCE',
  },
  marketRate95: {
    backgroundColor: '#1985A1',
  },
  marketRate100: {
    backgroundColor: '#77BA99',
  },
  marketRate105: {
    backgroundColor: '#D7816A',
  },
  snackbarSuccess: {
    backgroundColor: green[900],
  },
  snackbarError: {
    backgroundColor: theme.palette.error.dark,
  },
  snackbarInfo: {
    backgroundColor: theme.palette.primary.dark,
  },
  itemThumbnail: {
    borderColor: '#DCDCDC',
    borderWidth: 3,
  },
});
