import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent {
  @Input() label?: string;
  @Input() modifiers: string[] = [];
  @Input() to?: string;
  @Input() disabled: boolean = false;

  constructor(private router: Router) { }

  onClick(_event: Event) {
    if (this.to && !this.disabled) {
      this.router.navigateByUrl(this.to);
    }
  }

}