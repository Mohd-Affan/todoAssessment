import {LOGIN, SIGNUP, GETNOTES} from './types';
import {loginUrl} from '../../config/apiConfig';
import {signinUrl} from '../../config/apiConfig';
import {addNotesUrl} from '../../config/apiConfig';

export const loginUser = (data) => async (dispatch) => {
  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    dispatch({
      type: LOGIN,
      payload: newData.id,
    });
  } catch (error) {}
};

export const signupUser = (data) => async (dispatch) => {
  try {
    const response = await fetch(signinUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
  } catch (error) {}
};

export const Notes = (data, id) => async (dispatch) => {
  try {
    const response = await fetch(`${addNotesUrl}${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notes: [
          {
            title: data.title,
            data: data.description,
          },
        ],
      }),
    });
    const result = await response.json();

    dispatch({
      type: GETNOTES,
      payload: result.data,
    });
  } catch (error) {}
};
export const NotesGet = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${addNotesUrl}${id}`, {
      method: 'GET',
    });
    const result = await response.json();
    dispatch({
      type: GETNOTES,
      payload: result.response,
    });
  } catch (error) {}
};

export const Delete = (id, noteid) => async (dispatch) => {
  const url = addNotesUrl + id + '/' + noteid;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    const result = await response.json();

    if (result.status === true) {
      dispatch({
        type: DELETENOTES,
        payload: result,
      });
    } else {
    }
  } catch (error) {}
};
