import { NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  arr = ['+', '—', 'x', '/', '7', '8', '9', 'C', '4', '5', '6', '±', '1', '2', '3', '%', '0', ','];

  // html conditional
  white = ['+', '—', 'x', '/', 'C', '±', '%', '+'];

  test = ['+', '—', 'x', '/']

  Result: string = '';
  numResult: number = 0;

  clearer: boolean = false;

  start: boolean = false;



  tastCreater(OP: string) {

    if (this.clearer === true && !this.test.includes(OP)) {
      this.Result = '';
      this.clearer = false;
    }
    else {
      this.clearer = false
    }

    if (OP === '%') {
      this.numResult /= 100;
      this.Result = '';
      return;
    }

    if (OP === 'C') {
      this.Result = '';
      this.numResult = 0;
      return;
    }

    if (OP === ',') {
      this.Result += '.';
      return;
    }

    if (
      OP === '±' && this.Result[this.Result.length - 1] !== '-' && !/\d+/.test(this.Result[this.Result.length - 1])
    ) {
      this.Result += '-';
      return;
    }




    if (this.Result.length == 0 && !/\d+/.test(OP)) {
      return;
    }

    if (
      this.test.includes(this.Result[this.Result.length - 1])
      &&
      !/\d+/.test(OP)
    ) {

      this.Result = this.Result.slice(0, -3);
    }

    if (/\d+/.test(OP)) {
      this.Result += OP;
    } else if (OP !== '±') {
      this.Result += ' ' + OP + ' ';
    }
  }



  num: string[] = [];
  calculator() {

    this.numResult = 0;

    let numbers: number[] = [];
    let op: any = [];

    if (this.test.includes(this.Result[this.Result.length - 2])) {
      this.Result = this.Result.slice(0, -3);
    }
    this.num = this.Result.split(' ');


    for (var i = 0; i < this.num.length; i++){

      if (/\d+(.\d+)?/.test(this.num[i])) {
        numbers.push(parseFloat(this.num[i]));
      } else {
        op.push(this.num[i]);
      }

    }





    for (var i = 0; i < op.length; i++){
      if (i == 0) {

        switch (op[i]) {
          case 'x':
            this.numResult += numbers[i] * numbers[i + 1];
            break;
          case '/':
            this.numResult += numbers[i] / numbers[i + 1];
            break;
          case '+':
            this.numResult += numbers[i] + numbers[i + 1];
            break;
          case '—':
            this.numResult += numbers[i] - numbers[i + 1];
            break;
        }

        continue;
      }

      switch (op[i]) {
        case 'x':
          this.numResult *= numbers[i + 1];
          break;
        case '/':
          this.numResult /= numbers[i + 1];
          break;
        case '+':
          this.numResult += numbers[i + 1];
          break;
        case '—':
          this.numResult -= numbers[i + 1];
          break;
      }


    }

    if (this.clearer == false) {
      this.clearer = true;
    }
  }

}
