import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/toserba", async (req, res) => {
  passport.authenticate("google", (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const token = user.getJwtToken();

      const options = {
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res
        .status(200)
        .cookie("token", token, options)
        .redirect(`${process.env.DOMAIN}`);
    }
  })(req, res);
});

export default router;
