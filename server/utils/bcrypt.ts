import bcrypt from "bcryptjs";

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hash: string = bcrypt.hashSync(password, salt);
  return hash;
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
