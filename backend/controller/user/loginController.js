import bcrypt from "bcrypt";
import { usersModel } from "../../models/usersModel.js";


export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginUser = await usersModel.findOne({ email }).lean();

    if (loginUser) {
      const comparePassword = await bcrypt.compare(
        password,
        loginUser.password
      );

      if (loginUser && comparePassword) {
        const { password, ...rest } = loginUser;
        req.session.userId = rest._id.toString();
        res.json({ user: rest });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
