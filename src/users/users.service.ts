import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "email": "Sincere@april.biz",
        "role": "INTERN",
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "email": "Shanna@melissa.tv",
        "role": "INTERN",
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "email": "Nathan@yesenia.net",
        "role": "ENGINEER",
    },
    {
        "id": 4,
        "name": "Patricia Lebsack",
        "email": "Julianne.OConner@kory.org",
        "role": "ENGINEER",
    },
    {
        "id": 5,
        "name": "Chelsey Dietrich",
        "email": "Lucio_Hettinger@annie.ca",
        "role": "ADMIN",
    }
  ]

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
    if(role){
      const listOfUsers = this.users.filter(user => user.role === role)
      if(!listOfUsers.length)
        throw new NotFoundException('No users with this role found.')

      return listOfUsers
    }
    return { users: this.users }
  }

  findOne(id: number){
    const user = this.users.find(user => user.id === id)

    if(!user)
      throw new NotFoundException('User Not Found')

    return 
  }

  // We are also swapping the type definition(i.e user: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'})
  // with a dto here, which is defined as per the imported class at the top
  store(user: CreateUserDto){
    // this is because we don't want to sort the original array of users so we make a shallow copy of it by using the spread operator
    const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)

    const newUser = {
      id: (usersByHighestId[0].id + 1),
      ...user
    }

    this.users.push(newUser)
    return newUser
  }

  // We are also swapping the type definition(i.e updateUser: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'})
  // with a dto here, which is defined as per the imported class at the top
  update(id: number, updateUser: UpdateUserDto){
    // let findUser = this.users.find(user => user.id === id)
    // findUser = { id: findUser.id, ...updateUser}
    // return {users: this.users, findUser: findUser}

    this.users = this.users.map((user) => {
      if(user.id === id){
        return {...user, ...updateUser}
      }
      return user
    })

    return this.findOne(id)
  }

  delete(id: number){
    const removedUser = this.findOne(id)

    this.users = this.users.filter(user => user.id !== id)

    return removedUser
  }
}
