const initialState = {
  teachers: [],
  loading: false,
  error: null,
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TEACHERS_SUCCESS":
      return {
        ...state,
        teachers: action.payload,
        loading: false,
      };
    case "FETCH_TEACHERS_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "FETCH_TEACHERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default teacherReducer;
