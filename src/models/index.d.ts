import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type RemindersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Reminders {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly recipients: string;
  readonly message: string;
  readonly scheduledOn: string;
  readonly status: string;
  readonly userId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Reminders, RemindersMetaData>);
  static copyOf(source: Reminders, mutator: (draft: MutableModel<Reminders, RemindersMetaData>) => MutableModel<Reminders, RemindersMetaData> | void): Reminders;
}