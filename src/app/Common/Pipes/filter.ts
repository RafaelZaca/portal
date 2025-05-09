import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchvalue: number): any[] {
    if (!items) return [];
    if (items.length === 0) return [];
    if (!searchvalue) return items;
    return items.filter(item => {
      if (!item.insumoID) return
      return item.insumoID.toString() === searchvalue.toString();
    });
  }

}
