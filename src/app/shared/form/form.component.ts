import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';
import { IForm } from 'src/app/models/form.model';
import { StaticPageService } from 'src/app/services/static-page.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() form: IForm;
  @Input() claimBook: boolean;
  formBody: FormGroup;

  constructor(
    private staticPageService: StaticPageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    let formGroup: any = {};
    this.form.formFields.forEach((element) => {
      formGroup[element.field] = new FormControl(
        null,
        element.required ? [Validators.required] : []
      );
    });
    this.formBody = new FormGroup(formGroup);
  }

  sendForm(): void {
    if (this.formBody.valid) {
      let formInfo: any = {
        id_form_email: this.form.id,
        data: this.formBody.value,
      };
      this.staticPageService.sendFormInfo(formInfo).subscribe((result: any) => {
        this.formBody.reset();
        if(this.claimBook){
          this.toastrService.success(Messages.successFormComplaintsBook, Messages.successTitle);
        }else {
          this.toastrService.success(Messages.successFormContact, Messages.successTitle);
        }
      });
    } else {
      this.toastrService.warning(Messages.errorForm, Messages.warningTitle);
    }
  }
}
