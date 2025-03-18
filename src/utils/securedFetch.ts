const securedFetch = async (url: string, options: any) => {
  return fetch(url, {
    ...options,
  });
};
export default securedFetch;

// const securedFetch = async (url: string, options: any) => {
//   const token = window.localStorage.getItem("token");
//   return fetch(url, {
//     ...options,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       ...options.headers,
//     },
//   });
// };
// export default securedFetch;

// export const securedFetch2 = (url: string, options: any) => {
//   let userData;
//   async function apiFetch() {
//     const response = await fetch(url, {
//       ...options,
//     });

//     const jsonData = response.json();
//     return jsonData;
//   }
//   apiFetch().then((data) => {
//     return userData = data;
//   });
// };
