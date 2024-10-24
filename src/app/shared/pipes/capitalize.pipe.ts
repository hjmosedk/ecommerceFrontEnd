import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize',
    standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const lowerCaseStatus = value.toLowerCase();
    return lowerCaseStatus.charAt(0).toUpperCase() + lowerCaseStatus.slice(1);
  }
}
