import { createSchema, Type, ExtractDoc, ExtractProps } from 'ts-mongoose';
import DeputyContact from '../3-schemas/Deputy/Contact';
import DeputyVote from './Deputy/Vote';

const DeputySchema = createSchema(
  {
    webId: Type.string({ required: true, unique: true, index: true }),
    imgURL: Type.string(),
    name: Type.string(),
    party: Type.string(),
    job: Type.string(),
    biography: Type.string(),
    constituency: Type.string(),
    directCandidate: Type.boolean(),
    contact: Type.schema().of(DeputyContact),
    votes: Type.array().of(DeputyVote),
  },
  { timestamps: true },
);

export type DeputyDoc = ExtractDoc<typeof DeputySchema>;
export type DeputyProps = ExtractProps<typeof DeputySchema>;

DeputySchema.index({ webId: 1, 'votes.procedureId': 1 }, { unique: true });

export default DeputySchema;