export default () => ({
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
});
