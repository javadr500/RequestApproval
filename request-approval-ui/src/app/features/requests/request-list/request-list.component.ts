import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { RequestService } from '../request.service';
import {
  RequestItem,
  RequestStatus
} from '../../../core/models/request.model';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './request-list.component.html'
})
export class RequestListComponent implements OnInit {

  private requestService = inject(RequestService);
  private router = inject(Router);

  requests: RequestItem[] = [];

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.requestService.getAll().subscribe(result => {
      this.requests = result;
    });
  }

  approve(id: string): void {
    this.requestService.approve(id).subscribe(() => {
      this.load();
    });
  }

  reject(id: string): void {
    this.requestService.reject(id).subscribe(() => {
      this.load();
    });
  }

  create(): void {
    this.router.navigate(['/requests/new']);
  }

  getStatus(status: RequestStatus): string {
    switch (status) {
      case RequestStatus.Pending:
        return 'Pending';

      case RequestStatus.Approved:
        return 'Approved';

      case RequestStatus.Rejected:
        return 'Rejected';

      default:
        return '';
    }
  }
}

