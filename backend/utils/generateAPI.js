import crypto from "crypto";

export const generateApiKey = () => {
  return crypto.randomBytes(24).toString("hex");
};