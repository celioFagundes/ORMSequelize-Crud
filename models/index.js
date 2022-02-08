const Sequelize = require('sequelize')
const sequelize = new Sequelize('cadastro-orm', 'root', '', {
  dialect: 'mysql',
  host: '127.0.0.1',
})
const models = {}
const path = require('path')
const fs = require('fs')
    fs
        .readdirSync(__dirname)
        .filter(file => file !== 'index.js')
        .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize)
        console.log(model)
        models[model.name] = model
        })

    Object.keys(models).forEach(modelName =>{
      if('associate' in models[modelName]){
        models[modelName].associate(models)
      }
    })

module.exports = {
  sequelize,
  models
}
