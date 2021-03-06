import fetch from "isomorphic-fetch";

export const UPDATE_NAME = "SET_NAME";
export const UPDATE_COMPANY_DOMAIN = "UPDATE_COMPANY_DOMAIN";
export const REQUEST_EMAIL_ADDRESS = "REQUEST_EMAIL_ADDRESS";
export const RECEIVE_EMAIL_ADDRESS = "RECEIVE_EMAIL_ADDRESS";
export const RECEIVE_ERROR = "RECEIVE_ERROR";

export function updateName(name) {
  return {
    type: UPDATE_NAME,
    name
  };
}

export function updateCompanyDomain(domain) {
  return {
    type: UPDATE_COMPANY_DOMAIN,
    domain
  };
}

export function sendError(error){
  return {
    type: RECEIVE_ERROR,
    error
  };
}

function receiveEmail(email) {
  return {
    type: RECEIVE_EMAIL_ADDRESS,
    email
  };
}

function requestEmail(name, domain) {
  return {
    type: REQUEST_EMAIL_ADDRESS,
    name,
    domain
  };
}

function receiveError(error) {
  return {
    type: RECEIVE_ERROR,
    error
  };
}

export function fetchEmail(name, domain) {
  return dispatch => {
    dispatch(requestEmail(name, domain));
    return fetch(`http://localhost:4567/email?name=${name}&domain=${domain}`)
      .then(response => response.json())
      .then(json => dispatch(receiveEmail(json.email)))
      .catch(error => dispatch(receiveError(error.message)));
  };
}

const initialValues = {
  error: null,
  name: '',
  domain: ''
};

export default function (state = initialValues, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return { ...state, name: action.name, error: null };
    case UPDATE_COMPANY_DOMAIN:
      return { ...state, domain: action.domain, error: null };
    case REQUEST_EMAIL_ADDRESS:
      return { ...state, loading: true, error: null };
    case RECEIVE_EMAIL_ADDRESS:
      return { ...state, loading: false, email: action.email };
    case RECEIVE_ERROR:
      return { ...state, loading: false, error: action.error, email: null };
    default:
      return state;
  }
};
