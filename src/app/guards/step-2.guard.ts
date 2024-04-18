import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { SelectedCar } from '../models/SelectedCar';

export function step2Guard(): CanActivateFn {
  return () => {
  let router = inject(Router);
  let commonService = inject(CommonService);
  var isActive:boolean =false;
  commonService.SelectedCarObservable.subscribe((selectedCar : SelectedCar)=> isActive= !selectedCar.notSelectedModelAndColor());
  // console.log(isActive);
  if (!isActive){
    router.navigateByUrl('/Step1');
  }
  return isActive;
  };
}
