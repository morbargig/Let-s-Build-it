import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BaseFieldDirective } from '../../@core/directives/base-field.directive';
import { Field, FieldConfig } from '../../@core/interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { FormTable } from './form-table';
import { Subject, of, Observable } from 'rxjs';
import { takeWhile, switchMap, catchError, map } from 'rxjs/operators';
import { PagedResponse } from '../../../@ideo/components/table/models/paged-response';
import { LazyLoadEvent } from '../../../@ideo/components/table/events/lazy-load.event';

@Component({
  selector: 'ideo-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTableComponent extends BaseFieldDirective<FormControl> implements Field<FormTable> {
  private dataSubject: Subject<LazyLoadEvent> = new Subject<LazyLoadEvent>();
  @ViewChild('tc', { static: false }) public tc: FormTableComponent;
  public config: FieldConfig<FormTable>;
  public group: FormGroup;
  public id: string;
  public resultSubject: Subject<PagedResponse<any[]>> = new Subject<PagedResponse<any[]>>();
  public items$: Observable<any[]> = this.resultSubject.pipe(map((res) => res.data));
  public totalRecords$: Observable<number> = this.resultSubject.pipe(map((res) => res.total));
  public loadingData: boolean;

  constructor() {
    super();
    this.initDataSubject();
  }

  getData() {
    this.tc.getData();
  }

  private initDataSubject() {
    this.dataSubject
      .pipe(
        takeWhile((x) => this.isAlive),
        switchMap((evt) => {
          return this.config.data.getDataProvider(evt).pipe(catchError((err) => of(err)));
        })
      )
      .subscribe((res) => {
        if (!res.error) {
          this.resultSubject.next(res);
        }
        this.loadingData = false;
      });
  }

  public onLazyLoad(evt: LazyLoadEvent): void {
    this.loadingData = true;
    this.dataSubject.next(evt);
  }
}
