// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Reminders } = initSchema(schema);

export {
  Reminders
};