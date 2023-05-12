import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IForm, IFormFields } from 'src/app/models/form.model';
import {
  IComplexCard,
  ISimpleCard,
  IHTMLText,
  IAccordion,
} from 'src/app/models/static-pages.model';

@Injectable({
  providedIn: 'root',
})
export class StaticPagesTransformService {
  colorArray: string[];

  constructor(private domSanitizer: DomSanitizer) {}

  complexCardsStructure(raw: any): IComplexCard[] {
    let result: IComplexCard[] = [];
    this.colorArray = [
      'orange',
      'black-light',
      'purple',
      'green',
      'blue',
      'yellow',
    ];

    for (let i = 0; i < raw.value.length; i++) {
      for (let j = 0; j < raw.value[i].length; j++) {
        // Add an empty card to the result if the index is new
        // TODO maybe use a class instead?
        if (j >= result.length) {
          result.push({
            iconURL: '',
            url: '',
            subtitle: null,
            title: null,
            color: this.colorArray[j % this.colorArray.length],
            description: {
              text: null,
              title: null,
            },
          });
        }

        // Tried to make it somewhat more readable
        // TODO find a way to make less the pyramids
        let _card = result[j];
        switch (raw.value[i][j].type) {
          case 'image':
            _card.iconURL = raw.value[i][j].value || '';
            _card.url = raw.value[i][j].url_attachment || '';
            raw.value[i][j].attribute.forEach((attr) => {
              switch (attr.field) {
                case 'Title':
                  _card.title = attr.value;
                  break;
                case 'Subtitle':
                  _card.subtitle = attr.value;
                  break;
                case 'Button':
                  _card.button = attr.value;
                  break;
                case 'ButtonUrl':
                  _card.buttonUrl = attr.value;
                  break;
                case 'SubButton':
                  _card.subButton = attr.value;
                  break;
                case 'SubButtonUrl':
                  _card.subButtonUrl = attr.value;
                  break;
              }
            });
            break;
          case 'text':
            // If there are other values use a switch
            if (raw.value[i][j].value === 'Description') {
              raw.value[i][j].attribute.forEach((attr) => {
                switch (attr.field) {
                  case 'Title':
                    _card.description.title = attr.value;
                    break;
                  case 'Detail':
                    _card.description.text = attr.value;
                    break;
                }
              });
            }
            break;
        }
        // Just in case, it shouldn't need it though
        result[j] = _card;
      }
    }
    return result;
  }

  simpleCardsStructure(raw: any): ISimpleCard[] {
    let result: ISimpleCard[] = [];
    let singleCard: ISimpleCard;
    this.colorArray = ['blue', 'purple', 'green', 'orange', 'yellow'];
    for (let i = 0, j = 0; i < (raw.value[0] && raw.value[0].length); i++) {
      singleCard = {
        iconURL: raw.value[0][i].value || '',
        title: null,
        url: raw.value[0][i].url_attachment || '',
        color: this.colorArray[j],
      };
      if (raw.value[0][i].attribute && raw.value[0][i].attribute[0]) {
        singleCard.title = raw.value[0][i].attribute[0].value;
      }
      result.push(singleCard);
      j++;
      if (j > this.colorArray.length) j = 0;
    }
    return result;
  }

  textHTMLStructure(raw: any): SafeHtml {
    let result: IHTMLText;
    result = {
      content: raw.value,
    };
    return this.domSanitizer.bypassSecurityTrustHtml(result.content);
  }

  accordionStructure(raw: any): IAccordion[] {
    let result: IAccordion[] = [];
    let singleQuestion: IAccordion;
    for (let i = 0; i < (raw.value && raw.value.length); i++) {
      singleQuestion = {
        question: raw.value[i].name,
        answer: raw.value[i].content[0].value,
        opened: false,
      };
      result.push(singleQuestion);
    }
    result[0].opened = true;
    return result;
  }

  // TODO weird response, why is it even an accordion?
  accordionSimpleCardStructure(raw: any): ISimpleCard[] {
    let result: ISimpleCard[] = [];
    for (let i = 0; i < (raw.value && raw.value.length); i++) {
      let card: ISimpleCard = { title: '', subtitle: '', images: [] };
      raw.value[i].content.forEach((attr) => {
        switch (attr.title_rest) {
          case 'title':
            card.title = attr.value;
            break;
          case 'description':
            card.subtitle = attr.value;
            break;
          case 'logos':
            attr.value[0].forEach(element => {
              card.images.push(element.url_attachment+element.value)
            });
            break;
        }
      });
      result.push(card);
    }
    return result;
  }

  formStructure(
    raw: any,
    title: string = null,
    buttonText: string = null
  ): IForm {
    let result: IForm;
    result = {
      id: raw.id_form_email,
      formFields: [],
      button_text: buttonText,
      title: title,
    };
    let singleField: IFormFields;
    for (let i = 0; i < raw.value.length; i++) {
      singleField = {
        field: raw.value[i].field,
        name: raw.value[i].name,
        required: raw.value[i].required,
        size: raw.value[i].size || 100,
        type: raw.value[i].type,
        subType: raw.value[i].sub_type || 'text',
        list: raw.value[i].list
      };
      result.formFields.push(singleField);
    }
    return result;
  }
}
