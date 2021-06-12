const config = {
  screens: {
    welcome:"welcome",
    oauthredirect: {
      path: "oauthredirect/:issingpass",
      parse: {
        issingpass: (issingpass) => `${issingpass}`,
      },
    },
    login: "login",
    signup: "signup",
    setting: "setting"
  },
};

const linking = {
  prefixes: ["io.identityserver.demo://app"],
  config,
};

export default linking;
