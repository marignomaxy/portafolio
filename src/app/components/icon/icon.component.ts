import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-icon', standalone: true,
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    @switch (name) {
      @case ('arrow-up-right') {<path d="M5 19 19 5M5 5h14v14"/>}
      @case ('arrow-right') {<path d="M4 12h16m-7-7 7 7-7 7"/>}
      @case ('arrow-left') {<path d="M20 12H4m7-7-7 7 7 7"/>}
      @case ('arrow-down') {<path d="M12 4v16m-7-7 7 7 7-7"/>}
      @case ('menu') {<path d="M4 8h16M4 16h16"/>}
      @case ('close') {<path d="m6 6 12 12M6 18 18 6"/>}
      @case ('sun') {<circle cx="12" cy="12" r="4"/><path d="M12 2v1m0 18v1M2 12h1m18 0h1M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>}
      @case ('moon') {<path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z"/>}
      @case ('download') {<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>}
      @case ('check') {<path d="m5 12 4 4L19 6"/>}
      @case ('copy') {<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M15 8V4H4v11h4"/>}
      @case ('mail') {<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>}
      @case ('location') {<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2"/>}
      @case ('code') {<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16"/>}
      @case ('spark') {<path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8Z"/>}
      @case ('plus') {<path d="M12 5v14M5 12h14"/>}
      @case ('linkedin') {<path d="M5 9v11M5 4v.5M10 20V9h5a4 4 0 0 1 4 4v7m-9-6a4 4 0 0 1 4-4"/>}
    }
  </svg>`,
  styles: [':host{display:inline-flex;flex-shrink:0;width:1.25em;height:1.25em}svg{width:100%;height:100%}'],
})
export class IconComponent { @Input() name = 'arrow-up-right'; }
