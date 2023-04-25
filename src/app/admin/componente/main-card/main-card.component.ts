import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QueryService} from "../../services/query.service";

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss']
})
export class MainCardComponent implements OnInit{
  clientForm: FormGroup;
  client: any = null;
  transanctions: any = null;
  page = 1;
  perPage = 10;
  rechargeForm: FormGroup;
  banks: any = [];
  channels: any = [];
  currencies: any = [];
  editing = false;
  constructor(
    private fb: FormBuilder,
    private query: QueryService,
  ) {
    this.clientForm = this.fb.group({
      playerID: [null, Validators.required],
    })
    this.rechargeForm = this.fb.group({
      id:[0, Validators.required],
      wallet_id:[0, Validators.required],
      type:["deposit", Validators.required],
      bank_id:[1, Validators.required],
      channel_id:[1, Validators.required],
      promoter_id:[0, Validators.required],
      currency_id:[1, Validators.required],
      date: [this.getToday()],
      amount: [0, Validators.required],
      observation: [null],
    })
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.query.getBanks().subscribe(
      (res: any) => {
        this.banks = res.data;
        console.log(this.banks);
      },
      (error) => {
        alert("Error al buscar bancos")
      }
    );
    this.query.getChannels().subscribe(
      (res: any) => {
        this.channels = res.data;
        console.log(this.channels);
      },
      (error) => {
        alert("Error al buscar canales")
      }
    );
    this.query.getCurrencies().subscribe(
      (res: any) => {
        this.currencies = res.data;
        console.log(this.currencies);
      },
      (error) => {
        alert("Error al buscar monedas")
      }
    );
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  searchPlayer() {
    this.query.searchClient(this.clientForm.value.playerID).subscribe(
      (res: any) => {
        this.client = res.data;
        console.log(this.client);
        this.rechargeForm.patchValue({
          wallet_id: this.client.wallet.id,
          promoter_id: 1,
        })
      },
      (error) => {
        alert("Error al buscar jugador")
      },
      () => {
        this.query.getTransactions(this.client.wallet.id).subscribe(
          (res: any) => {
            this.transanctions = res.data;
            console.log(this.transanctions);
          },
          (error) => {
            alert("Error al buscar transacciones")
          }
        );
      });
  }

  updateRecharge(t:any) {
    this.editing = true;
    console.log(t)
    this.rechargeForm.patchValue({
      id: t.id,
      type: t.type,
      bank_id: t.bank.id,
      channel_id: t.channel.id,
      currency_id: t.currency.id,
      date: t.date,
      amount: t.amount,
    })
  }

  cancelEdit() {
    this.editing = false;
    this.rechargeForm.reset();
  }

  showNewTransactions() {
    if (this.rechargeForm.invalid){
      alert("Formulario invalido");
    }
    if (this.rechargeForm.value.amount <= 0){
      alert("Monto invalido");
    }
    if (this.editing){
      this.query.updateTransaction(this.rechargeForm.value,this.rechargeForm.value.id).subscribe(
        (res: any) => {
          alert("Transaccion actualizada");
          this.searchPlayer();
          this.editing = false;
        },
        (error) => {
          alert("Error al actualizar transaccion")
        });
    }
    if (!this.editing) {
      this.query.saveTransaction(this.rechargeForm.value).subscribe(
        (res: any) => {
          alert("Transaccion guardada");
          this.searchPlayer();
        },
        (error) => {
          alert("Error al guardar transaccion")
        }
      );
    }
  }

}
