import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewCardResolver } from 'src/app/resolvers/static-pages/new-card.resolver';
import { IStaticPageBackend } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as INewCardResolver;
  }
  content: IStaticPageBackend;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.content = this.resolvedData.content;
  }

}
