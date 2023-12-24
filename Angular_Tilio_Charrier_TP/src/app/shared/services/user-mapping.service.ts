import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { User, UserDto } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserMappingService {
  public constructor() {}
  public fromUserDtoToUser(userDto: UserDto): User {
    return {
      userId: userDto.userId,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      occupation: userDto.occupation,
      bio: userDto.bio,
      birthDate: DateTime.fromISO(userDto.birthDate),
    };
  }
  public fromUserDtoListToUserList(userDtoList: UserDto[]): User[] {
    return userDtoList.map((userDto) => this.fromUserDtoToUser(userDto));
  }
  public fromUserToUserDto(user: User): UserDto {
    return {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      occupation: user.occupation,
      bio: user.bio,
      birthDate: user.birthDate.toISO() as string,
    };
  }
  public fromUserListToUserDtoList(userList: User[]): UserDto[] {
    return userList.map((user) => this.fromUserToUserDto(user));
  }
}
