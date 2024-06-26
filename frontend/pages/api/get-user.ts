import client from "../../client/client";
import withSession from "../../sessionConfig.js";

export default withSession(async (req: any, res: any) => {
  const user = req.session.get("user");
  console.log("useeeeeeeer: ", user);
  console.log("geeeeeeet user: ", req.session.user);

  if (user?.token) {
    try {
      const response = await client.get("/auth/validate-token", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const userData = response.data;
      res.status(200).json(userData);
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(401).json({ message: "No token found" });
  }
});
