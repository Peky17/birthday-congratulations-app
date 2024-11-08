import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskRoutingModule } from './task-routing.module';
import { MainTaskComponent } from './main-task.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EmailsComponent } from './pages/emails/emails.component';
import { AdministratorsComponent } from './pages/administrators/administrators.component';
import { ManageTemplateComponent } from './pages/manage-template/manage-template.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { AddModalComponent } from './pages/teachers/modals/add-modal/add-modal.component';
import { UpdateModalComponent } from './pages/teachers/modals/update-modal/update-modal.component';
import { AddAdminModalComponent } from './pages/administrators/modals/add-admin-modal/add-admin-modal.component';
@NgModule({
  declarations: [
    MainTaskComponent,
    NavbarComponent,
    FooterComponent,
    AddModalComponent,
    TeachersComponent,
    EmailsComponent,
    AdministratorsComponent,
    ManageTemplateComponent,
    UpdateModalComponent,
    AddAdminModalComponent,
  ],
  imports: [CommonModule, TaskRoutingModule, ReactiveFormsModule],
  exports: [MainTaskComponent, NavbarComponent, FooterComponent],
})
export class TaskModule {}
