import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService } from '../../services/pizza.service';
import { Pizza } from '../../models/pizza.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  username: string = '';
  pizze: Pizza[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private pizzaService: PizzaService, private router: Router) {
    this.username = localStorage.getItem('username') || 'Utente';
  }

  ngOnInit(): void {
    this.caricaPizze();
  }

  caricaPizze(): void {
    this.loading = true;
    this.pizzaService.getPizze().subscribe({
      next: (pizze) => {
        this.pizze = pizze;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Errore nel caricamento delle pizze';
        this.loading = false;
        console.error('Errore:', err);
      },
    });
  }

  modificaPizza(pizza: Pizza): void {
    console.log('Modifica pizza:', pizza);
  }

  aggiungiNuovaPizza(): void {
    console.log('Aggiungi nuova pizza');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
