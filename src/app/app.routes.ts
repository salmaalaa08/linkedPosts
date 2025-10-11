import { Routes } from '@angular/router';
import { authGuardGuard } from './core/guards/auth/auth-guard-guard';

export const routes: Routes = [
    {path:'', loadComponent:()=>import('./core/layouts/main-layout/main-layout').then((c)=>c.MainLayout), children:[
        {path:'', redirectTo:'timeline', pathMatch:'full'},
        {path:'timeline', loadComponent:()=>import('./features/timeline/timeline').then((c)=>c.Timeline), title:'Timeline', canActivate:[authGuardGuard]},
        {path:'profile', loadComponent:()=>import('./features/profile/profile').then((c)=>c.Profile), title:'Profile', canActivate:[authGuardGuard],children:[
            {path:'', redirectTo:'posts', pathMatch:'full'},
            {path:'posts', loadComponent:()=>import('./features/user-posts/user-posts').then((c)=>c.UserPosts)},
            {path:'userInfo', loadComponent:()=>import('./features/user-info/user-info').then((c)=>c.UserInfo)},
            {path:'changePass', loadComponent:()=>import('./features/auth/change-password/change-password').then((c)=>c.ChangePassword)},
            {path:'profilePic', loadComponent:()=>import('./features/profile-pic/profile-pic').then((c)=>c.ProfilePic)}
        ]}
    ]},
    {path:'', loadComponent:()=>import('./core/layouts/auth-layout/auth-layout').then((c)=>c.AuthLayout), children:[
        {path:'signin', loadComponent:()=>import('./features/auth/signin/signin').then((c)=>c.Signin), title:'SignIn'},
    ]},
    {path:'**', loadComponent:()=>import('./features/not-found/not-found').then((c)=>c.NotFound), title:'Not Found'}
];
