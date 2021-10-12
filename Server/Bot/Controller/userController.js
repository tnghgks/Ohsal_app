import User from "../../Model/User";

export const memberCheck = async (memberId, username) => {
  const alreadyUser = await User.findOne({ discordID: memberId });
  console.log(alreadyUser);
  if (!alreadyUser) {
    await User.create({
      username: username,
      discordID: memberId,
    });
    console.log(`${username} 맴버추가`);
  }
};

export const setAllMembers = async (collection) => {
  await User.create({
    name: collection.user.username,
  });
  console.log(`${collection.user.username} 맴버추가`);
};
