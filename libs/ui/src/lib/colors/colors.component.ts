import { AfterViewInit, Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

interface IColorItem {
  name: string,
  className: string
}

@Component({
  selector: 'gitcode-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
})
export class ColorsComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'colors';

  public identityColors: IColorItem[];
  public grayColors: IColorItem[];
  public indigoColors: IColorItem[];
  public greenColors: IColorItem[];

  constructor() {
    this.identityColors = [
      { name: 'Charcoal', className: 'color-id-charcoal' },
      { name: 'Yellow', className: 'color-id-yellow' },
      { name: 'Pink', className: 'color-id-pink' },
      { name: 'Green', className: 'color-id-green' },
      { name: 'Blue', className: 'color-id-blue' },
    ];

    this.grayColors = [
      { name: '100', className: 'color-gray-100' },
      { name: '200', className: 'color-gray-200' },
      { name: '300', className: 'color-gray-300' },
      { name: '400', className: 'color-gray-400' },
      { name: '500', className: 'color-gray-500' },
      { name: '600', className: 'color-gray-600' },
      { name: '700', className: 'color-gray-700' },
      { name: '800', className: 'color-gray-800' },
      { name: '900', className: 'color-gray-900' },
    ];

    this.indigoColors = [
      { name: '100', className: 'color-indigo-100' },
      { name: '200', className: 'color-indigo-200' },
      { name: '300', className: 'color-indigo-300' },
      { name: '400', className: 'color-indigo-400' },
      { name: '500', className: 'color-indigo-500' },
      { name: '600', className: 'color-indigo-600' },
      { name: '700', className: 'color-indigo-700' },
      { name: '800', className: 'color-indigo-800' },
      { name: '900', className: 'color-indigo-900' },
    ];

    this.greenColors = [
      { name: '100', className: 'color-green-100' },
      { name: '200', className: 'color-green-200' },
      { name: '300', className: 'color-green-300' },
      { name: '400', className: 'color-green-400' },
      { name: '500', className: 'color-green-500' },
      { name: '600', className: 'color-green-600' },
      { name: '700', className: 'color-green-700' },
      { name: '800', className: 'color-green-800' },
      { name: '900', className: 'color-green-900' },
    ];
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}
}
