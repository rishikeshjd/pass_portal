mport express from "express";
import {
  forgotPasswordRouteHandler,
  getUsersRouteHandler,
  loginRouteHandler,
  registerRouteHandler,
  resetPasswordRouteHandler,
  sendRequestRouteHandler,
} from "../../services/auth/index.js";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body.data.attributes;
  //console.log("Login Inputs:",email, password);
  await loginRouteHandler(req, res, email, password);
});

router.post("/logout", (req, res) => {
  return res.sendStatus(204);
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body.data.attributes;
  await registerRouteHandler(req, res, name, email, password);
});

router.post("/password-forgot", async (req, res) => {
  const { email } = req.body.data.attributes;
  await forgotPasswordRouteHandler(req, res, email);
});

router.post("/password-reset", async (req, res) => {
  await resetPasswordRouteHandler(req, res);
});

router.post("/send-request", async (req, res) => {
  await sendRequestRouteHandler(req, res);
});

router.post("/get-users", async (req, res) => {
  await getUsersRouteHandler(req, res);
})

export default router;



