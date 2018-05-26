import { User, connect } from 'human-connection-api-nodejs-client';
import mongoose from 'mongoose';

export async function contributeProcedure(data) {
  connect(process.env.HC_BACKEND_URL || 'http://localhost:3030');
  const ProcedureModel = mongoose.model('Procedure');
  const { procedureId, email, password } = data || {};
  if (procedureId && email && password) {
    const procedure = await ProcedureModel.findOne({ procedureId });
    if (procedure) {
      const user = new User({ email, password });
      await user.contribute({
        title: procedure.title,
        content: `<p>${procedure.abstract}</p>`,
        contentExcerpt: procedure.abstract,
        type: 'post',
        language: 'de',
        categoryIds: ['5ac7768f8d655d2ee6d48fe4'], // politics & democracy
      });
      return procedure;
    }
    throw Error('No procedure found.');
  } else {
    throw Error('Please provide procedureId, email and password.');
  }
}
export default contributeProcedure;
