import { ADD_ORDER } from './types';

export const addOrder = (data) => dispatch => {
	dispatch({
		type: ADD_ORDER,
		payload: data
	})
}