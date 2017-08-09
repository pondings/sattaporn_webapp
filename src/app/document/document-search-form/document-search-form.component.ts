import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-search-form',
  templateUrl: './document-search-form.component.html',
  styleUrls: ['./document-search-form.component.scss']
})
export class DocumentSearchFormComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.form = this.fb.group({
      searchKeyword: '',
      findMethod: ['', Validators.required]
    });
  }

  public onsubmit(form: any) {
    console.log(form);
  }

  public resetForm() {
    this.form.reset();
  }

}
