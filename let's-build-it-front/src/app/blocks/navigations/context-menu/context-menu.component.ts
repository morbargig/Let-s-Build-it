import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '@core';

@Component({
  selector: 'prx-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent extends BaseComponent implements OnInit, AfterViewInit {
  iconHidden: boolean;

  @ViewChild('iconView', { static: false })
  iconView: ElementRef;

  @Input()
  appendToBody: boolean = false;

  @Input()
  icon: string = 'more-horizontal';

  @Input()
  placement: string = 'bottom right';

  constructor(private cdRef: ChangeDetectorRef) {
    super('context-menu');
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.iconHidden = this.iconView.nativeElement.children.length === 0;

    this.cdRef.detectChanges();
  }
}
