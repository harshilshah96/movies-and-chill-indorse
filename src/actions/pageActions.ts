import { dispatch } from '../utilities/generalUtils';

export const SAVE_PAGE_NUMBER = 'SAVE_PAGE_NUMBER';

export const savePageDetails = (
  type: string,
  currentPage: number,
  totalPages: number
) =>
  dispatch({
    type: SAVE_PAGE_NUMBER,
    payload: { ...(type ? { [type]: { currentPage, totalPages } } : {}) }
  });
