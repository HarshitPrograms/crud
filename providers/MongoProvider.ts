import { ApplicationContract } from '@ioc:Adonis/Core/Application'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/

import { Mongoose } from 'mongoose'
import Env from "@ioc:Adonis/Core/Env"
export default class MongoProvider {
  constructor(protected app: ApplicationContract) { }

  public register() {
    // Register your own bindings
    const mongoose = new Mongoose()

    // const options = {
    //   autoIndex: false, // Don't build indexes
    //   maxPoolSize: 10, // Maintain up to 10 socket connections
    //   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    //   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    //   family: 4 // Use IPv4, skip trying IPv6
    // };
    mongoose.connect(Env.get("MONGO_URL"), {
      autoIndex: true, // build indexes
      maxPoolSize: 100, // Maintain up to 200 socket connections
      minPoolSize: 10,
      serverSelectionTimeoutMS: 30000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 //  Use IPv4, skip trying IPv6
    })

    mongoose.set('debug', true);
    // mongoose.set('strictQuery', false)
    // Attach it to IOC container as singleton
    this.app.container.singleton('Mongoose', () => mongoose)
    console.log("hi")
   
}
  

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
    await this.app.container.use('Mongoose').disconnect()
  }
}
