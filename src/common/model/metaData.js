import Sequelize from 'sequelize';
import DataConnector from '~/src/common/dataConnector';

//definitions
//schema
const metaDataDb = DataConnector.define(
    'metaData',//table name
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        commit: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true // Model tableName will be the same as the model name
    }
);

export default {
    init(){
        return metaDataDb.sync({
            force: false
        }).then(() => {
            console.log('Initting metaDataDb...');
        });
    },
    getMetaByCommitId(commit){
        return metaDataDb.findAll({
            commit
        });
    },
    getMetaByCommitIdAndType(commit, type){
        return metaDataDb.findOne({
            commit,
            type
        });
    },
    upsert(commit, type, content) {
        return metaDataDb.upsert({
            id: `${commit}.${type}`,
            commit,
            type,
            content
        });
    }
}