module.exports.tables = tables
module.exports.table = table
module.exports.columns = columns

function tables(db, cb) {
  db.connection.all("select name from sqlite_master where type = 'table';", cb)  
}

function table(db, name, cb) {
  columns(db, name, function(err, columns) {
    if (err) return cb(err)
    var names = columns.map(function(c) { return c.name })
    var pkey = 'id'
    if (!(pkey in columns)) pkey = names[0]
    var table = db.table(name, {
      fields: names,
      primaryKey: pkey
    })
    cb(null, table)
  })
}

function columns(db, name, cb) {
  db.connection.all("PRAGMA table_info(" + name + ");", cb)
}
