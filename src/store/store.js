const initialState = {
  login: {
    userName: "",
    userId: "",
    password: "",
    invalidLogin: "",
    loggedIn: false,
    loading: false,
  },
  chatbot: {
    prompt: "",
    response: "",
    loading: false,
    error: "",
  },
};

export default initialState;
