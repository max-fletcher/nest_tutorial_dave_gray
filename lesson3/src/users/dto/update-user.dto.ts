import { CreateUserDto } from "./create-user.dto"
// YOu need to install this for it to work using "npm i @nestjs/mapped-types  -D"
import { PartialType } from '@nestjs/mapped-types'
// you need to install "class-validator" & "class-transformer" validation to work here using "npm i class-validator class-transformer"

// This is extended from "CreateUserDto" so it is inheriting all the field properties from there, but all of them are nullable.
export class UpdateUserDto extends PartialType(CreateUserDto) {}