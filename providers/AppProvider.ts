import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { Mongoose } from 'mongoose'
import Env from "@ioc:Adonis/Core/Env"

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // console.log("hi")
    const mongoose = new Mongoose()

    // const options = {
    //   autoIndex: false, // Don't build indexes
    //   maxPoolSize: 10, // Maintain up to 10 socket connections
    //   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    //   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    //   family: 4 // Use IPv4, skip trying IPv6
    // };
    mongoose.connect(Env.get('MONGO_URL'), {
      autoIndex: true, //  build indexes
      maxPoolSize: 100, // Maintain up to 200 socket connections
      minPoolSize: 10,
      serverSelectionTimeoutMS: 30000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 //  Use IPv4, skip trying IPv6
    })

    mongoose.set('debug', true);
    // Attach it to IOC container as singleton
    this.app.container.singleton('Mongoose', () => mongoose)
    console.log("connected")
    // Register your own bindings
  }

  public async boot () {
    // IoC container is ready
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}