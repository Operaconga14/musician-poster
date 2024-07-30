import { Routes } from '@angular/router';
import { HomeComponent } from './components/core/home/home.component';
import { MarketPlaceComponent } from './components/core/market-place/market-place.component';
import { GigsComponent } from './components/core/gigs/gigs.component';
import { VacanciesComponent } from './components/core/vacancies/vacancies.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'market-place',
        component: MarketPlaceComponent
    },
    {
        path: 'gigs',
        component: GigsComponent
    },
    {
        path: 'vacancies',
        component: VacanciesComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
