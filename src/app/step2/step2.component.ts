import { Component, OnInit } from '@angular/core';
import { Option } from '../models/Option';
import { Config } from '../models/Config';
import { SelectedCar } from '../models/SelectedCar';
import { CarDetailsService } from '../services/car-details.service';
import { CommonService } from '../services/common.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component implements OnInit{

  carOption?: Option;

  selectedConfig?:Config;
  towHitchChecked:boolean=false;
  yokeChecked:boolean=false;

  selectedCar:SelectedCar=new SelectedCar();

  constructor(private carDetailsService:CarDetailsService,private commonService: CommonService){}

  ngOnInit()
  {
    this.commonService.SelectedCarObservable.subscribe(
      (selectedCar:SelectedCar) =>
      {
        this.selectedCar=selectedCar;
        this.carDetailsService.getCarOptions(this.selectedCar.model?.code!).subscribe(
          (options:Option) => 
          {
            this.carOption=options;
            this.selectedConfig=this.carOption?.configs.find(x=> x.id==this.selectedCar.config?.id);
            this.yokeChecked=this.selectedCar.yoke;
            this.towHitchChecked=this.selectedCar.tow;
          }
        );
      } 
    );
  }

  onSelectConfigChange(){
     this.selectedCar.config=this.selectedConfig;
     this.commonService.SelectedCar(this.selectedCar);
  }

  onTowHitchChange(){
    this.selectedCar.tow=this.towHitchChecked;
    this.commonService.SelectedCar(this.selectedCar);
  }

  onYokeChange(){
    this.selectedCar.yoke=this.yokeChecked;
    this.commonService.SelectedCar(this.selectedCar);
  }
  
}
