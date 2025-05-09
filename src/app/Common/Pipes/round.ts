import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'round'
})
@Injectable()
export class RoundPipe implements PipeTransform {
  transform(input: number) {
    if (isFinite(input)) {
      return Math.ceil(input);
    }
    else {
      return '-';
    }
  }

}
