module.exports.tables = tables
module.exports.table = table

function tables(db, cb) {
  db.connection.all("select name from sqlite_master where type = 'table';", cb)  
}

function table(db, name, cb) {
  db.connection.all("PRAGMA table_info(" + name + ");", function(err, rows) {
    if (err) return cb(err)
    var columns = rows.map(function(d) { return d.name })
    var table = db.table(name, {
      fields: columns
    })
    cb(null, table)
  })  
}
