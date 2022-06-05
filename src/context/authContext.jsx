// import React from 'react'

// function authContext() {
//   return (
//     <div>authContext</div>
//   )
// }

// export default authContext

import React from "react";

export const authContext = React.createContext({
  isAuthenditcated: false,
  login: () => {},
  logout: () => {},
});
