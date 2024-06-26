import withSession from "../../sessionConfig.js";

export default withSession(async (req: any, res: any) => {
  req.session.destroy();
  res.json({ isLoggedIn: false });
});
