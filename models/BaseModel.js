const { Model } = require('objection');
const { v4: uuidv4 } = require('uuid');

class BaseModel extends Model {
  $beforeInsert() {
    super.$beforeInsert();

    const now = new Date().toISOString();
    this.created_at = now;
    this.updated_at = now;
    
    if (this.constructor.useUuid && !this.uuid) {
      this.uuid = uuidv4();
    }
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = BaseModel;
