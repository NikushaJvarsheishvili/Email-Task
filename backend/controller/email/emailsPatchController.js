import { emailsModel } from "../../models/emailsModel.js";

export const emailPatchController = async (req, res) => {
  const { emailId } = req.params;
  const archived = req.body;

  try {
    const updateEmail = await emailsModel
      .findByIdAndUpdate(emailId, archived, {
        new: true,
      })
      .populate({ path: "sender", select: "-password" });

    await updateEmail.save();

    res.json({ email: updateEmail });
  } catch (err) {
    console.log(err.message);
    res.json({ message: null });
  }
};
