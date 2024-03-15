import { Injectable } from '@nestjs/common';

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
  ],

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
    if(role){
      return this.users.filter(user => user.role === role)
    }
    return { this.users }
  }

  findOne(id: number){
    return this.users.find(user => user.id === id)
  }

  store(user: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
    // this is because we don't want to sort the original array of users so we make a shallow copy of it by using the spread operator
    const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)

    const newUser = {
      id: usersByHighestId[0].id,
      ...user
    }

    this.users.push(newUser)
    return newUser
  }

  update(id: number, updateUser: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
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
