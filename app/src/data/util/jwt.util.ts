export const jwt = {
  decode: <T>(token: string | null) => {
    if (!token) return null;

    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("err: invalid token");

      return JSON.parse(atob(parts[1])) ?? (null as T);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  },
};
