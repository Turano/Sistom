/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7v8ksybcx1ko28")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jl2bqjj0",
    "name": "escolaridade",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Ausente",
        "Ensino Fundamental",
        "Ensino Médio",
        "Ensino Superior"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7v8ksybcx1ko28")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jl2bqjj0",
    "name": "escolaridade",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "ausente",
        "fundamental",
        "medio",
        "superior"
      ]
    }
  }))

  return dao.saveCollection(collection)
})