import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly baseImageUrl: string;
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.baseImageUrl = `/assets/images`;
  }

  public handleImageLoadError(event: any, fallbackImageUrl?: string): void {
    if (!event) {
      return;
    }

    this.renderer.addClass(event.target, 'is-fallback');
    // this.renderer.addClass(event.currentTarget.parentNode, 'is-fallback-parent');

    if (fallbackImageUrl) {
      event.target.src = fallbackImageUrl;
      return;
    }

    event.target.src = `${this.baseImageUrl}/transparent.png`;
  }
}
