export const initialAuth = {
  authToken: null,
};

export const initialUserData = {
  group: null,
  id: null,
  nombre: null,
  username: null,
};

export const initialState = {
  ...initialAuth,
  ...initialUserData,
}