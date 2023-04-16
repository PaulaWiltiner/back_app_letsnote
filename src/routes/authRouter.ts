import { Router } from "express";
import { signIn,signUp , signOut} from "../controllers/authController";
import { validateSchema } from "../middlewares/schemaValidate";
import { signInSchema } from "../schemas/signInSchema";
import { signupSchema } from "../schemas/signUpSchema";
const authRouter = Router();

authRouter.post("/signUp",validateSchema(signupSchema), signUp);
authRouter.post("/signIn",validateSchema(signInSchema),signIn );
authRouter.put("/signOut", signOut );


export default authRouter;