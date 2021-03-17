export const getUser = () => {
  return fetch("/user", {
    method: "get",
  });
};

export const postUser = () => {
  return fetch("/user", {
    method: "POST",
  });
};
