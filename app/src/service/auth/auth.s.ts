import type { TUser } from "../../@types/user/user.t";
import useUserStore from "../../hook/user/use-user-store.h";
import { jwt } from "../../data/util/jwt.util";

export const authService = {
  loginUser(token: string | null) {
    if (!token) {
      this.sState("loggedOut");
      return;
    }

    this.sState("loggedIn", token);
  },
  logoutUser() {
    this.sState("loggedOut");
  },
  gState() {
    const userStore = useUserStore.getState();
    return {
      user: userStore.gUser(),
      token: userStore.gToken(),
      loggedIn: !!userStore.gUser() && !!userStore.gToken(),
    };
  },
  sState(type: "loggedIn" | "loggedOut", token: string | null = null) {
    const userStore = useUserStore.getState();

    if (type === "loggedIn") {
      if (!token) {
        this.sUser(null);
        this.sToken(null);
      } else {
        userStore.sToken(token);
        userStore.sUser(this.gUser());
      }

      return;
    }

    this.sUser(null);
  },
  gUser() {
    const userStore = useUserStore.getState();
    const token = userStore.gToken() || null;

    if (!token) return null;

    return jwt.decode<TUser>(token);
  },
  sUser(user: TUser | null) {
    const userStore = useUserStore.getState();
    userStore.sUser(user);
  },
  gToken() {
    const userStore = useUserStore.getState();
    const valid = jwt.decode<TUser>(userStore.gToken());

    if (!valid) return null;

    return userStore.gToken();
  },
  sToken(token: string | null) {
    const userStore = useUserStore.getState();
    userStore.sToken(token);
  },
};
