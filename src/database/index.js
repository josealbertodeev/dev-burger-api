import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';

const models = [User, Product, Category];

class Database {
	constructor() {
		this.init();
		this.connectMongo();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);
		models
			.map((model) => model.init(this.connection))
			.map(
				(model) => model.associate && model.associate(this.connection.models),
			);
	}

	async connectMongo() {
		try {
			await mongoose.connect(process.env.MONGO_URL, {
				serverSelectionTimeoutMS: 5000,
			});
			console.log('MongoDB conectado');
		} catch (error) {
			console.log('MongoDB não conectado:', error.message);
		}
	}
}

export default new Database();
