import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { profile } from '../data/profile.generated';

@Injectable({providedIn: 'root'})
export class SeoService {
  constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private document: Document) {}
  update(title: string, description: string, path = '/') {
    const url = profile.portfolio.replace(/\/$/, '') + path;
    this.title.setTitle(title);
    this.meta.updateTag({name: 'description', content: description});
    this.meta.updateTag({property: 'og:title', content: title});
    this.meta.updateTag({property: 'og:description', content: description});
    this.meta.updateTag({property: 'og:url', content: url});
    this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url);
  }
}
