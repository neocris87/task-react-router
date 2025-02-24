import 'dotenv/config';

import { createCookieSessionStorage } from "react-router";

type SessionData = {
  userId: string | number;
  token : string;
};

type SessionFlashData = {
  error: string;
};


const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      cookie: {
        name: "__session",
        domain: process.env.DOMAIN || "localhost",
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "lax",
        secrets: [process.env.COOKIE_SECRET || "secret"],
        secure: true,
      },
    }
  );

export { getSession, commitSession, destroySession };
