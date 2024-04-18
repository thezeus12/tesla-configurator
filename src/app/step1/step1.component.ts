import { Component, OnInit } from '@angular/core';
import { Model } from '../models/Model';
import { Color } from '../models/Color';
import { SelectedCar } from '../models/SelectedCar';
import { FormsModule } from '@angular/forms';
import { CarDetailsService } from '../services/car-details.service';
import { CommonService } from '../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component implements OnInit {
  
  carModels: Array<Model> =[];

  selectedModel?:Model;
  selectedColor?:Color;

  selectedCar:SelectedCar=new SelectedCar();

  constructor(private carDetailsService:CarDetailsService, private commonService:CommonService){}
 
  ngOnInit(){
    this.commonService.SelectedCarObservable.subscribe(
      (selectedCar:SelectedCar) =>
      { 
        this.selectedCar=selectedCar;
        this.carDetailsService.getCarModels().subscribe(
          data =>
          {
            this.carModels=data;
            this.selectedModel=this.carModels.find(x=> x.code == this.selectedCar.model?.code);
            this.selectedColor=this.selectedModel?.colors.find(x=>x.code == this.selectedCar.color?.code); 
          }
        );
      }
    );
  }

  onSelectColorChange(){
    this.selectedCar.color=this.selectedColor;
    this.commonService.SelectedCar(this.selectedCar);
  }

  onSelectModelChange(){
    this.selectedColor=undefined;
    this.selectedCar=new SelectedCar();
    this.selectedCar.model=this.selectedModel;
    this.commonService.SelectedCar(this.selectedCar);
  }
}