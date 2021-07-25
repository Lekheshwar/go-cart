import axios from "axios";
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERROR,
} from "../constants/productConstants";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/v1/products");

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
