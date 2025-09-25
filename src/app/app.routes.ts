import { Routes } from '@angular/router';
import { NotFound } from './features/not-found/not-found';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { Timeline } from './features/timeline/timeline';
import { Profile } from './features/profile/profile';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { Signin } from './features/auth/signin/signin';
import { Signup } from './features/auth/signup/signup';
import { ChangePassword } from './features/auth/change-password/change-password';

export const routes: Routes = [
    {path:'', component:MainLayout, children:[
        {path:'', redirectTo:'timeline', pathMatch:'full'},
        {path:'timeline', component:Timeline, title:'Timeline'},
        {path:'profile', component:Profile, title:'Profile'}
    ]},
    {path:'', component:AuthLayout, children:[
        {path:'signin', component:Signin, title:'SignIn'},
        {path:'signup', component:Signup, title:'SignUp'},
        {path:'changePassword', component:ChangePassword, title:'Change Password'}
    ]},
    {path:'**', component:NotFound, title:'Not Found'}
];
