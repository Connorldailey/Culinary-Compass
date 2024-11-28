import UserAttributes from './/config/models/UserAttributes';

export const seedUsers = async () => {
  await UserAttributes.bulkCreate(
    [
      { id: 1259637, username: 'JollyGuru', email: 'jolly@guru.com', password: 'password' },
      {
        id: 1259638,
        username: 'SunnyScribe',
        email: 'sunny@scribe.com',
        password: 'password',
      },
      {
        id: 1259639,
        username: 'RadiantComet',
        email: 'radiant@comet.com',
        password: 'password',
      },
    ],
    { individualHooks: true }
  );
};

export default seedUsers;