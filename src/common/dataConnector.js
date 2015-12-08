import Sequelize        from 'sequelize';
import {databaseConfig} from '~/config.json';

const dataConnector = new Sequelize(
	databaseConfig.database,
	databaseConfig.username,
	databaseConfig.password,
	databaseConfig.options
);

export default dataConnector;