const db = require('../../data/dbConfig.js');

module.exports = {
  get(id) {
    if (id) {
        return db('accounts')
            .where('id', id)
            .first();
    }
    return db('accounts');
  },
  post(account) {
      return db('accounts')
        .insert(account, 'id')
        .then(([id]) => this.get(id));
  },
  update(id, account) {
      return db('accounts')
        .where("id", id)
        .update(account)
        .then((_) => this.get(id));
  },
  delete(id) {
      return db('accounts')
        .where("id", id)
        .delete();
  }

}
