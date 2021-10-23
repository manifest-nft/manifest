import React from 'react';
import { Layout } from 'components/sections/layout';
import { useMoralis } from 'react-moralis';
import Profile from 'components/user/profile';

const App = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  // if (!isAuthenticated) {
  //   return (
  //     <div>
  //       <button onClick={() => authenticate({  })}>Authenticate</button>
  //     </div>
  //   );
  // }

  return (
    <Layout>
      <h1>Welcome {user ? user.get("username") : "anon  "}</h1>

      <Profile />
    </Layout>
  );
};



export default App;