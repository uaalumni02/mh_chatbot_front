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
  register: {
    userName: "",
    email: "",
    password: "",
    userId: "",
    invalidRegister: "",
    loggedIn: false,
    loading: false,
  },
  moodTrends: {
    moodEntries: [],
    showModal: false,
  },
};

export default initialState;
