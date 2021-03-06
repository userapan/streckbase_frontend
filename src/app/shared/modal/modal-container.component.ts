import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";

import { AppComponent } from "./../../app.component";
import { ModalService } from "./modal.service";
import { ModalComponent } from "./modal.component";

@Component({
  selector: "app-modal-container",
  template: `
    <div class="modals-container" [class.to-front]="modals.length > 0">
      <div class="dim-background" (click)="close($event)"></div>
      <div *ngFor="let modal of modals; let i = index" class="modal-outer slideUp" [class.hidden]="i !== modals.length - 1">
        <ng-container *ngTemplateOutlet="modal.template"></ng-container>
      </div>
    </div>
  `,
  styleUrls: ["./modal.component.scss"]
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  private modalsSubscription: Subscription
  public modals: ModalComponent[] = [];

  constructor(private parent: AppComponent, private modalService: ModalService) { }

  ngOnInit() {
    this.modalsSubscription = this.modalService.getModals()
      .subscribe((modals: ModalComponent[]) => {
        this.modals = modals;
        this.parent.blurred = this.modals.length > 0;
      });
  }

  ngOnDestroy() {
    this.modalsSubscription.unsubscribe();
  }

  close(event?: Event) {
    if (this.modals.length > 0) {
      const modal: ModalComponent = this.modals[this.modals.length - 1];

      if (modal.allowOutsideClick) {
        modal.toggle(false);
        modal.confirmClick(event);
      }
    }
  }

}