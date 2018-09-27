import { getConnectionOptions, createConnection } from "typeorm";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  console.log(connectionOptions);
  await createConnection({ ...connectionOptions, name: "default" });
};
