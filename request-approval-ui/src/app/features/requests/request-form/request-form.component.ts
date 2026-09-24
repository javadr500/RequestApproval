import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FieldSchema, DynamicFormComponent } from '../../../shared/dynamic-form/dynamic-form.component';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './request-form.component.html'
})
export class RequestFormComponent {

  private requestService = inject(RequestService);
  private router = inject(Router);

  schema: FieldSchema[] = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true
    },
    {
      name: 'amount',
      label: 'Amount',
      type: 'number',
      required: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea'
    },
    {
      name: "urgency",
      label: "فوریت",
      type: "select",
      required: true,
      options: ["کم", "متوسط", "زیاد"]
    }

  ];

  submit(data: any): void {
    debugger;
    this.requestService.create(data)
      .subscribe({
        next: () => {
          this.router.navigate(['/requests']);
        }
      });
  }
}
