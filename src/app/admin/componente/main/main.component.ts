import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QueryService} from "../../services/query.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  promoterForm: FormGroup;
  promoter: any = {
    id: 0,
    name: "BIENVENIDO",
  };
  constructor(
    private fb: FormBuilder,
    private query: QueryService,
  ) {
    this.promoterForm = this.fb.group({
      id: [null, Validators.required],
    })
  }

  ngOnInit(): void {

  }

  initPromoterForm() {
    this.promoterForm = this.fb.group({
      id: [0, Validators.required],
    })
  }

  searchPromoter() {
    this.query.searchPromoter(this.promoterForm.value.id).subscribe(
      (res: any) => {
        this.promoter = res.data;
        console.log(this.promoter);
      },
      (error) => {
        alert("Error al buscar promotor")
      }
    )
  }
}
