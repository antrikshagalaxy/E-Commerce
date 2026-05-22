import express from "express";
import { login, register, adminlogin } from "../controllers/UserController.js";

const UserRoute = express.Router();

UserRoute.post("/login", login);
UserRoute.post("/register", register);
UserRoute.post("/adminlogin", adminlogin);

export default UserRoute;