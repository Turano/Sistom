/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hcegxaph1e039d1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dxygvzqv",
    "name": "paciente",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "p7v8ksybcx1ko28",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hcegxaph1e039d1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dxygvzqv",
    "name": "paciente",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "p7v8ksybcx1ko28",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
