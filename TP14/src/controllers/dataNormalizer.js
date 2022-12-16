import normalizr from 'normalizr';
const normalize = normalizr.normalize;
const schema = normalizr.schema;

const schemaAuthor = new schema.Entity('author', {}, {idAttribute: '_id'});
const schemaMessage = new schema.Entity('message', {author: schemaAuthor}, {idAttribute: '_id'} );
const schemaMessages = new schema.Entity('messages', {messages: [schemaMessage], id: 'messages'}, {idAttribute: 'id'});

const normalizeMessage = (message) => {
    return normalize(message, schemaMessages)
}

export { normalizeMessage }