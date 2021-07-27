//theme type
import {darkTheme, lightTheme} from '../constants/theme';

export const toggleThemeSuccess = selectedTheme => {
  return {
    type: 'TOGGLE_THEME_SUCCESS',
    payload: {selectedTheme},
  };
};

export const toggleThemeFailure = error => {
  return {
    type: 'TOGGLE_THEME_FAILURE',
    payload: {error},
  };
};

export const toggleTheme = themeType => {
  return dispatch => {
    dispatch({
      type: 'TOGGLE_THEME_BEGIN',
    });

    switch (themeType) {
      case 'dark':
        dispatch(toggleThemeSuccess(darkTheme));
        break;
      case 'light':
        dispatch(toggleThemeSuccess(lightTheme));
        break;
      default:
        dispatch(toggleThemeFailure({error: 'Invalid Theme Type'}));
        break;
    }
  };
};
