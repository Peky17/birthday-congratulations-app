import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemplateService } from 'src/app/services/template.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-template',
  templateUrl: './manage-template.component.html',
  styleUrls: ['./manage-template.component.css'],
})
export class ManageTemplateComponent implements OnInit {
  templateForm: FormGroup;
  templateId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private templateService: TemplateService
  ) {
    this.templateForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      logoSrc: ['', Validators.required],
      rectorName: ['', Validators.required],
      rectorSignatureSrc: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTemplate();
  }

  loadTemplate(): void {
    this.templateService.getTemplates().subscribe((data) => {
      if (data && data.length > 0) {
        const template = data[0];
        this.templateId = template.id;
        this.templateForm.patchValue(template);
      }
    });
  }

  onSubmit(): void {
    if (this.templateForm.valid) {
      const templateData = this.templateForm.value;
      if (this.templateId) {
        this.templateService
          .updateTemplate(this.templateId.toString(), templateData)
          .subscribe((response) => {
            console.log('Template updated', response);
            Swal.fire(
              'Operación Éxitosa',
              'Plantilla actualizada correctamente',
              'success'
            );
          });
      } else {
        this.templateService
          .createTemplate(templateData)
          .subscribe((response) => {
            console.log('Template created', response);
            Swal.fire(
              'Operación Éxitosa',
              'Plantilla creada correctamente',
              'success'
            );
          });
      }
    } else {
      Swal.fire('Error', 'Porfavor llene el formulario', 'error');
    }
  }
}
