import Sequelize from 'sequelize';
import DataConnector from '~/src/common/dataConnector';
import Q from 'q';
import _ from 'lodash';

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


const getConvertedMap = metaDataReturn => {
    return _.reduce(metaDataReturn, (res, curMetaData) => {
        let {id, commit, type, content} = curMetaData.dataValues;
        type = type.toLowerCase();//normalized the keyname

        if (type !== 'aura_upstream_pom.xml'){
            content = JSON.parse(content);
        }

        res[type] = {id, commit, type, content};
        return res;
    }, {//the body
        'aura_upstream_pom.xml' : null,
        'autocompletecontrolmap.json' : null,
        'controlcountmap.json' : null,
        'controllocationmap.json' : null,
        'dependenciesmap.json' : null,
        'namespacecountmap.json' : null,
        'usagemap.json' : null
    });
};


const promiseWrap = (curPromise, resolver) => {
    const defer = Q.defer();

    curPromise.then(( returnData ) => {
        defer.resolve( getConvertedMap(returnData) );
    }).catch(
        e => console.log('promiseWrap Error', e)
    );

    return defer.promise;
}

const databaseDriver = {
    init(){
        return metaDataDb.sync({
            force: false
        }).then(() => {
            console.log('Initting metaDataDb...');
        });
    },
    getMetaByCommitId(commit){
        return promiseWrap(
            metaDataDb.findAll({
                commit
            })
        );
    },
    getMetaByCommitIdAndType(commit, type){
        return promiseWrap(
            metaDataDb.findOne({
                commit,
                type
            })
        );
    },
    upsert(commit, type, content) {
        return metaDataDb.upsert({
            id: `${commit}.${type}`,
            commit,
            type,
            content
        });
    }
};



const driverToUse = databaseDriver;//fileDriver

export default driverToUse;