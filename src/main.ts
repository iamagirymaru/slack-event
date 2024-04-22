import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  	const PORT = process.env.PORT || 3000;
	const app = await NestFactory.create(AppModule);

	app.use(async (req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
		res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		next();
	});

	await app.listen(PORT, () => console.log('Server started on port: ', PORT));
}

start();