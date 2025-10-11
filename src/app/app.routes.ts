import { Routes } from '@angular/router';
import { NotFound } from './features/not-found/not-found';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { Timeline } from './features/timeline/timeline';
import { Profile } from './features/profile/profile';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { Signin } from './features/auth/signin/signin';
import { Signup } from './features/auth/signup/signup';
import { ChangePassword } from './features/auth/change-password/change-password';
import { authGuardGuard } from './core/guards/auth/auth-guard-guard';
import { UserPosts } from './features/user-posts/user-posts';
import { UserInfo } from './features/user-info/user-info';
import { ProfilePic } from './features/profile-pic/profile-pic';

export const routes: Routes = [
    {path:'', component:MainLayout, children:[
        {path:'', redirectTo:'timeline', pathMatch:'full'},
        {path:'timeline', component:Timeline, title:'Timeline', canActivate:[authGuardGuard]},
        {path:'profile', component:Profile, title:'Profile', canActivate:[authGuardGuard],children:[
            {path:'', redirectTo:'posts', pathMatch:'full'},
            {path:'posts', component:UserPosts},
            {path:'userInfo', component:UserInfo},
            {path:'changePass', component:ChangePassword},
            {path:'profilePic', component:ProfilePic}
        ]}
    ]},
    {path:'', component:AuthLayout, children:[
        {path:'signin', component:Signin, title:'SignIn'},
        // {path:'signup', component:Signup, title:'SignUp'},
        // {path:'changePassword', component:ChangePassword, title:'Change Password'}
    ]},
    {path:'**', component:NotFound, title:'Not Found'}
];
