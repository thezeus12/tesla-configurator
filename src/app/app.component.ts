import {Component, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SelectedCar } from './models/SelectedCar';
import { CommonService } from './services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './app.component.html',
    
})
export class AppComponent implements OnInit{

  isStep2Disabled: boolean =true;
  isStep3Disabled: boolean =true;

  imgUrl?:string;

  selectedCar:SelectedCar=new SelectedCar();

  constructor(private commonService:CommonService){}

  ngOnInit() {
    this.commonService.SelectedCarObservable.subscribe(
      (selectedCar:SelectedCar) => 
      { 
        this.selectedCar=selectedCar;
        this.isStep2Disabled = this.selectedCar.notSelectedModelAndColor();
        this.isStep3Disabled = this.selectedCar.notSelectedConfig();
        this.imgUrl="assets/images/"+this.selectedCar.model?.code+"/"+this.selectedCar.color?.code+".jpg";
      }
    ); 
  }
  
}