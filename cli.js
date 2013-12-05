#!/usr/bin/env node

var streamSQL = require('streamsql')
var ldj = require('ldjson-stream')
var dql = require('./')

var filename = process.argv[2]
var name = process.argv[3]
var format = process.argv[4]

main()

function main() {
  if (!filename) return console.error('Usage: dql <path-to-sqlite-db> [tablename, format]')
  
  var db = streamSQL.connect({
    driver: 'sqlite3',
    filename: filename
  })

  if (format) {
    dql.table(db, name, function(err, table) {
      if (err) return console.error(err)
      if (format === 'json') table.createReadStream().pipe(ldj.serialize()).pipe(process.stdout)
      else console.error('supported formats: json')
    })
  } else if (name) {
    dql.columns(db, name, function(err, columns) {
      if (err) return console.error(err)
      console.log(columns)
    })
  } else {
    dql.tables(db, function(err, tables) {
      if (err) return console.error(err)
      tables.map(function(t) { console.log(t.name) })
    })
  }  
}

// db.connection.all("PRAGMA foreign_key_list(bees)", function(err, data) {
//   console.log('FOREIGNS', err, data)
// })
