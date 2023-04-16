import { init } from "../../src/app";
import { prisma } from "../../src/config/prisma";
import * as authenticationService  from "../../src/services/authService";
import {faker} from "@faker-js/faker";
import { createSession, createUser } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe("signIn", () => {
  const generateParams = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(6)
  });

  it("should throw InvalidCredentialError if there is no user for given email", async () => {
    const params = generateParams();

    try {
      await authenticationService.signIn(params.email, params.password);
      fail("should throw InvalidCredentialError");
    } catch (error) {
      expect(error).toEqual({"code": "NotFound", "message": "user not found"});
    }
  });

  it("should throw InvalidCredentialError if given password is invalid", async () => {
    const params = generateParams();
    await createUser({
      email: params.email,
      password: "invalid-password",
    });

    try {
      await authenticationService.signIn(params.email, params.password);
      fail("should throw InvalidCredentialError");
    } catch (error) {
      expect(error).toEqual({"code": "NotFound", "message": "incorrect password"});
    }
  });

  describe("when email and password are valid", () => {
    it("should return user data if given email and password are valid", async () => {
      const params = generateParams();
      const user = await createSession(params);

      const signInUser = await authenticationService.signIn(params.email, params.password);
      expect(user).toEqual(
        expect.objectContaining({
          token: signInUser.token,
          userId: signInUser.userId,
          username: signInUser.username
        }),
      );
    });

    it("should create new session and return given token", async () => {
      const params = generateParams();
      const user = await createUser(params);

      const { token: createdSessionToken } = await authenticationService.signIn(params.email, params.password);

      expect(createdSessionToken).toBeDefined();
      const session = await prisma.sessions.findFirst({
        where: {
          token: createdSessionToken,
          userId: user.id
        },
      });
      expect(session).toBeDefined();
    });
  });
});