import { withIronSession } from "next-iron-session";
import withSession from "../../sessionConfig";
import client from "@/client/client";

export default withSession(async (req: any, res: any) => {
  const { username, password } = req.body;
  console.log("in login");

  const response = await client.post("/auth/authenticate", {
    username,
    password,
  });
  console.log("respoooooonse in login api: ", response.data);
  if (response.data && response.data.accessToken) {
    // req.session.user = { token: response.data.accessToken };
    req.session.set("user", { token: response.data.accessToken });
    console.log("reeq.session.user: ", req.session.user);
    await req.session.save();
    res.status(200).json({ message: "Logged in" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});
