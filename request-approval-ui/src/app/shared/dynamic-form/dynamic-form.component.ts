import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

export interface FieldSchema {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select';
  required?: boolean;
  options?: string[];
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

  @Input({ required: true })
  schema: FieldSchema[] = [];

  @Output() formSubmit = new EventEmitter<any>();
  form!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {

    const controls: Record<string, FormControl> = {};

    for (const field of this.schema) {

      controls[field.name] =
        this.fb.control(
          '',
          field.required
            ? Validators.required
            : []
        );
    }

    this.form = this.fb.group(controls);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.form.getRawValue());
  }
}