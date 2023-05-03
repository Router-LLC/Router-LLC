const { PrismaClient, UserCreateInput } = require('@prisma/client');

const prisma = new PrismaClient();

const testController = {};

testController.createUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: 'Hadar',
        password: 'Password'
      }
    });
    const train = await prisma.train.create({
      data: {
        name: 'A',
        data: UserCreateInput
      }
    });
    await prisma.complaint.create({
      data: {
        message: 'data',
        user: {
          connect: {
            id: user.id
          }
        },
        train: {
          connect: {
            id: train.id
          }
        }
      }
    });
    return next();
  } catch (err) {
    console.log(err);
  }
};

testController.findUsers = async (req, res, next) => {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        complaint: true
      }
    });
    res.locals.users = allUsers;
    return next();
  } catch (err) {
    console.log(err);
  };
};

testController.findTrains = async (req, res, next) => {
  try {
    const allTrains = await prisma.train.findMany({
      include: {
        complaint: true
      }
    });
    res.locals.trains = allTrains;
    return next();
  } catch (err) {
    console.log(err);
  }
};

testController.findComplaints = async (req, res, next) => {
  try {
    const allComplaints = await prisma.complaint.findMany({
      include: {
        user: true,
        train: true
      }
    });
    res.locals.complaints = allComplaints;
    return next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = testController;
