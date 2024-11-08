import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTaskComponent } from './main-task.component';
import { AuthGuard } from '../guards/auth.guard';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { AdministratorsComponent } from './pages/administrators/administrators.component';
import { EmailsComponent } from './pages/emails/emails.component';
import { ManageTemplateComponent } from './pages/manage-template/manage-template.component';

const routes: Routes = [
  {
    path: '',
    component: MainTaskComponent,
    children: [
      {
        path: 'teachers',
        component: TeachersComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'administrators',
        component: AdministratorsComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'emails',
        component: EmailsComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'manageTemplate',
        component: ManageTemplateComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'teachers',
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
