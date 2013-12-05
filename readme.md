# dql

work in progress, supports only sqlite right now

### usage

```
npm install dql -g

# list tables
dql foo.sqlitedb

# list schema
dql foo.sqlitedb tablename

# stream table as json
dql foo.sqlitedb tablename json
```