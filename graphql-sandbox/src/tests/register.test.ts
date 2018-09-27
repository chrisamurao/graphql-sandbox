//import { startServer } from "..";
import { request } from "graphql-request";
import { createConnection } from "typeorm";

import { host } from "./constants";
import { User } from "../entity/User";

function sum(a: number, b: number) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

//test: start server

const email = "hey@hello.com";
const password = "hellomydudes";

const mutation = `
mutation {
  register(email: "${email}", password:"${password}")
}`;

test("Register user", async () => {
  //await startServer();
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
  await createConnection();
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
});

//to do:
//use a test database
//drop all data once the test is over
//when I run yarn test it also starts the server

//separate these?
//before test hooks for createConnection
