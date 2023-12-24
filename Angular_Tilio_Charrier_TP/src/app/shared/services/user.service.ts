import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User, UserDto, UserFilters } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserMappingService } from './user-mapping.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly users: BehaviorSubject<User[]>;
  private readonly apiURL;

  constructor(
    private readonly http: HttpClient,
    private readonly userMapper: UserMappingService
  ) {
    this.users = new BehaviorSubject<User[]>([]);
    this.apiURL = 'https://6586f920468ef171392f10a2.mockapi.io/user';

    this.fetchUsers().subscribe((users) => {
      this.users.next(users);
    });
  }
  private fetchUsers(): Observable<User[]> {
    return this.http
      .get<UserDto[]>(this.apiURL)
      .pipe(
        map((userDto: UserDto[]) =>
          this.userMapper.fromUserDtoListToUserList(userDto)
        )
      );
  }
  private postUser(user: User): Observable<User> {
    return this.http
      .post<UserDto>(this.apiURL, this.userMapper.fromUserToUserDto(user))
      .pipe(
        map((userDto: UserDto) => this.userMapper.fromUserDtoToUser(userDto))
      );
  }
  private putUser(user: User): Observable<User> {
    return this.http
      .put<UserDto>(
        `${this.apiURL}/${user.userId}`,
        this.userMapper.fromUserToUserDto(user)
      )
      .pipe(
        map((userDto: UserDto) => this.userMapper.fromUserDtoToUser(userDto))
      );
  }
  private deleteUser(userId: string): Observable<User> {
    return this.http
      .delete<UserDto>(`${this.apiURL}/${userId}`)
      .pipe(
        map((userDto: UserDto) => this.userMapper.fromUserDtoToUser(userDto))
      );
  }
  public getUsers(): BehaviorSubject<User[]> {
    return this.users;
  }
  public getUser(userId: string): User {
    const users = this.users.getValue();
    const user = users.find((user) => user.userId === userId);
    if (user === undefined) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user;
  }
  public addUser(user: User): void {
    const users = this.users.getValue();
    this.postUser(user).subscribe((user) => {
      users.push(user);
      this.users.next(users);
    });
  }
  public removeUser(userId: string): void {
    const users = this.users.getValue();
    this.deleteUser(userId).subscribe((user) => {
      const userIndex = users.findIndex((u) => u.userId === userId);
      users.splice(userIndex, 1);
      this.users.next(users);
    });
  }
  public updateUser(user: User): void {
    const users = this.users.getValue();
    const userId = user.userId;
    this.putUser(user).subscribe((user) => {
      const userIndex = users.findIndex((u) => u.userId === userId);
      users[userIndex] = user;
      this.users.next(this.users.getValue());
    });
  }
  public get filterPredicate(): (data: User, filter: string) => boolean {
    return (data: User, filter: string): boolean => {
      const searchTerms: UserFilters = JSON.parse(filter);
      return (
        (searchTerms.firstName
          ? data.firstName
              .toLowerCase()
              .includes(searchTerms.firstName.toLowerCase())
          : true) &&
        (searchTerms.lastName
          ? data.lastName
              .toLowerCase()
              .includes(searchTerms.lastName.toLowerCase())
          : true) &&
        (searchTerms.email
          ? data.email.toLowerCase().includes(searchTerms.email.toLowerCase())
          : true) &&
        (searchTerms.bio
          ? data.bio.toLowerCase().includes(searchTerms.bio.toLowerCase())
          : true) &&
        (searchTerms.occupation
          ? data.occupation
              .toLowerCase()
              .includes(searchTerms.occupation.toLowerCase())
          : true)
      );
    };
  }
}
