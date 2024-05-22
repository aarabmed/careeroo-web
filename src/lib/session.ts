export const sessionOptions = {
    password: process.env.USER_SESSION as string,
    cookieName: "AUTH-IRON-SESSION",
    ttl:0, 
    cookieOptions: {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60*60*24*7,
      // secure only works in `https` environments
      // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
        secure: false,
    },
}


export interface SessionData {
    data: object;
}