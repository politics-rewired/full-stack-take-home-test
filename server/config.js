import envalid from "envalid";
const { str, port } = envalid;

export const env = envalid.cleanEnv(process.env, {
  SESSION_SECRET: str({ default: "ChangeMe" }),
  PORT: port({ default: 3000 }),
});
