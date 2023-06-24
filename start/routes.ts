import Route from '@ioc:Adonis/Core/Route'
//const Route=use('Route')
// Route.get('/', async () => {
//   return { hello: 'world' }
// })
//get user details
Route.get('/users', 'UserController.read')
//create a user
Route.post('users', "UserController.create")
// update the user to the database
Route.put('users/:_id', 'UserController.update')
// delete the user from the database
Route.delete('users/:_id', 'UserController.remove')