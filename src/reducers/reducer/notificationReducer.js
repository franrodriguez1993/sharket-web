import TYPES_NOTIFICACION from "../types/notificationTypes";

/**   INITIAL STATES  **/

export const initialStates = {
  loading: false,
  errorFetch: "",
  notifications: [],
  unseen: [],
  page: 0,
  currentPage: 1,
  totalPages: 1,
  msg: "",
};

/**   REDUCER  **/
export const notificationReducer = (state, action) => {
  switch (action.type) {
    /** SET LOADING  **/
    case TYPES_NOTIFICACION.setloading:
      return { ...state, loading: true };

    /** SET NOTIFICATIONS  **/
    case TYPES_NOTIFICACION.setNotifications:
      return {
        ...state,
        loading: false,
        errorFetch: "",
        notifications: action.payload.notifications,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    /** CHECK UNSEEN:  **/
    case TYPES_NOTIFICACION.checkUnseen:
      return {
        ...state,
        loading: false,
        errorFetch: "",
        unseen: action.payload.notifications,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    /** SET BACK PAGE  **/
    case TYPES_NOTIFICACION.backPage:
      return { ...state, page: state.page - 1 };

    /** SET NEXT PAGE  **/
    case TYPES_NOTIFICACION.nextPage:
      return { ...state, page: state.page + 1 };

    /** SET MSG  **/
    case TYPES_NOTIFICACION.setMsg:
      return { ...state, msg: action.payload };

    /** MORE NOTIS  **/
    case TYPES_NOTIFICACION.moreNotifs:
      return {
        ...state,
        loading: false,
        notifications: [
          ...state.notifications,
          ...action.payload.notifications,
        ],
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    default:
      return state;
  }
};
