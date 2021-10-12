import User from "../Model/User";

export const getChickenRanking = async (req, res) => {
  try {
    const users = await User.find({}).sort("-rankPoint");
    const filterData = users.map((data) => ({
      id: data.discordId,
      username: data.username,
      nickname: data.nickname,
      rankPoint: data.rankPoint,
    }));
    return res.json(filterData);
  } catch (err) {
    console.log(err);
  }
};
