// you need to install "class-validator" & "class-transformer" validation to work here using "npm i class-validator class-transformer"
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
  // notice that we didn't use commas at the end of each line below. This is because this is not a js object. It is rather a class.
  @IsString()
  @IsNotEmpty()
  name: string
  @IsEmail() // All decorators from class-validator is declared above the field like this
  email: string
  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Valid role required'
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}