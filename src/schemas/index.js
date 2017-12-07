import { schema } from 'normalizr';

export const post = new schema.Entity('posts');

// you need to export a default module
// or it would be undefined when import module from 'path/to/module'
export default module.exports;
