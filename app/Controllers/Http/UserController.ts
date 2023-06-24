import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserModel from 'App/Models/User'

export default class UserControllers {
  public async read({ response} : HttpContextContract) {
    // Fetch all users
    const users = await UserModel.find().maxTimeMS(20000); // Increase timeout to 20 seconds
    if(!users){
      return response.status(404).json({msg : "not fount"})
    }
    return response.json(users)
  }

  public async create({ request, response }) {
    // Create a new user
    const requiredData = request.all()
    const user = await UserModel.create(requiredData)
    
    return response.json(user)
    // console.log(user)
  }

  public async update({ params, request }: HttpContextContract) {
    // Update an user
    
    const user = await UserModel.findOneAndUpdate(params.id, request.all(), { new: true })

    return user
  }

  public async remove({ params }: HttpContextContract) {
    // Delete a user
    
    const user = await UserModel.findOneAndDelete(params.id)
    
    return user
  }
}

//