/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DataStore } = require("aws-amplify");

const getReminders = async () => {
  try {
    const models = await DataStore.query(Reminders);

    console.log(models);
  } catch (err) {
    console.log(err);
  }
};

exports.handler = async (event) => {
  getReminders();
};
