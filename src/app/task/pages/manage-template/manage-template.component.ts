import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-template',
  templateUrl: './manage-template.component.html',
  styleUrls: ['./manage-template.component.css'],
})
export class ManageTemplateComponent implements OnInit {
  templateForm: FormGroup;
  templateId: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
    this.http.get<any>('API_ENDPOINT/templates').subscribe((data) => {
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
        this.http
          .put(`API_ENDPOINT/templates/${this.templateId}`, templateData)
          .subscribe((response) => {
            console.log('Template updated', response);
          });
      } else {
        this.http
          .post('API_ENDPOINT/templates', templateData)
          .subscribe((response) => {
            console.log('Template created', response);
          });
      }
    }
  }
}
