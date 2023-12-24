import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.getUserDetails(userId);
    });
  }

  getUserDetails(userId: string) {
    this.user = this.userService.getUser(userId);
    if (!this.user) {
      console.error(`User with id ${userId} not found`);
      // Gérer l'erreur de manière appropriée (affichage d'un message d'erreur, redirection, etc.)
    }
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
