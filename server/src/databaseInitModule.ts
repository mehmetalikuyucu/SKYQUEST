import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@db:27017/admin'),
  ],
})
export class DatabaseInitModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    try {
    const db = this.connection.db;
    const dbList = await db.admin().listDatabases();
    const dbExists = dbList.databases.some((db) => db.name === 'appfellas');
    if (!dbExists) {
      await db.admin().command({ create: 'appfellas' });
    }} catch (error) {
        console.log('Error while creating database');
    }
    console.log('Database and collections have been initialized');
  }
}