import type { TUser } from "../../@types/user/user.t";
import useUserStore from "../../hook/user/use-user-store.h";
import { jwt } from "../../data/util/jwt.util";

export const authService = {
  loginUser(token: string | null) {
    if (!token) {
      this.setState("loggedOut");
      return;
    }

    this.setState("loggedIn", token);
  },
  logoutUser() {
    this.setState("loggedOut");
  },
  getState() {
    const userStore = useUserStore.getState();
    return {
      user: userStore.getUser(),
      token: userStore.getToken(),
      loggedIn: !!userStore.getUser() && !!userStore.getToken(),
    };
  },
  setState(type: "loggedIn" | "loggedOut", token: string | null = null) {
    const userStore = useUserStore.getState();

    if (type === "loggedIn") {
      if (!token) {
        this.setUser(null);
        this.setToken(null);
      } else {
        userStore.setToken(token);
        userStore.setUser(this.getUser());
      }

      return;
    }

    this.setUser(null);
  },
  getUser() {
    const userStore = useUserStore.getState();
    const token = userStore.getToken() || null;

    if (!token) return null;

    return jwt.decode<TUser>(token);
  },
  setUser(user: TUser | null) {
    const userStore = useUserStore.getState();
    userStore.setUser(user);
  },
  getToken() {
    const userStore = useUserStore.getState();
    const valid = jwt.decode<TUser>(userStore.getToken());

    if (!valid) return null;

    return userStore.getToken();
  },
  setToken(token: string | null) {
    const userStore = useUserStore.getState();
    userStore.setToken(token);
  },
};
