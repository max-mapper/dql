#!/usr/bin/env node

var streamSQL = require('streamsql')
var ldj = require('ldjson-stream')
var dql = require('./')

var filename = process.argv[2]
var name = process.argv[3]

main()

function main() {
  if (!filename) return console.error('Usage: dql <path-to-sqlite-db> [tablename]')
  
  var db = streamSQL.connect({
    driver: 'sqlite3',
    filename: filename
  })

  if (!name) {
    dql.tables(db, function(err, tables) {
      if (err) return console.error(err)
      tables.map(function(t) { console.log(t.name) })
    })
  } else {
    dql.table(db, name, function(err, table) {
      if (err) return console.error(err)
      table.createReadStream().pipe(ldj.serialize()).pipe(process.stdout)
    })
  }  
}

// db.connection.all("PRAGMA foreign_key_list(bees)", function(err, data) {
//   console.log('FOREIGNS', err, data)
// })
