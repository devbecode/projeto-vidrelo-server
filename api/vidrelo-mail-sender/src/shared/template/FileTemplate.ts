import * as fs from 'fs';

import {
  IBudgetAccessories,
  IBudgetHTMLMapper,
  IBudgetProducts,
  ITemplate,
} from './ITemplate';

export class FileTemplate implements ITemplate {
  private params: any;
  private content: string;
  private template_type: string;

  public render(): string {
    this.getContent();
    this.interpolate();
    if (this.params?.products) this.interpolateProducts();

    return this.content;
  }

  public getContent(): string {
    return fs
      .readFileSync(`${__dirname}/templates/${this.template_type}.html`)
      .toString()
      .replace(/\n/g, '');
  }

  public interpolate(): void {
    const { params } = this;
    params.host = process.env.HOST;

    this.content = this.content.replace(
      new RegExp(Object.keys(this.params).join('|'), 'gi'),
      matched => params[matched.toLocaleLowerCase()],
    );
  }

  private interpolateAccessories(
    accessory: {
      itemName: string;
      itemCategory: string;
    }[],
    accessoriesHTML: string,
  ): string {
    const accessories = accessory.reduce((acc: string, accessory) => {
      const accessoryTemplate = accessoriesHTML.replace(
        new RegExp(IBudgetAccessories.join('|'), 'gi'),
        (match: string) => accessory[match],
      );
      return acc + accessoryTemplate;
    }, '');

    return accessories;
  }

  private findHTML(mapper: { start: string; end: string }): string {
    const indexStartHTML =
      this.content.indexOf(mapper.start) + mapper.start.length;
    const indexEndHTML = this.content.indexOf(mapper.end);

    return this.content.substring(indexStartHTML, indexEndHTML);
  }

  private interpolateProducts(): void {
    const productHTML = this.findHTML(IBudgetHTMLMapper.product);
    const accessoriesHTML = this.findHTML(IBudgetHTMLMapper.accessory);

    const products = this.params.products.reduce((acc: string, prod: any) => {
      const accessory = this.interpolateAccessories(
        prod.accessories,
        accessoriesHTML,
      );

      let productTemplate = productHTML.replace(
        new RegExp(IBudgetProducts.join('|'), 'gi'),
        (match: string) => {
          return prod[match];
        },
      );

      productTemplate = productTemplate.replace(
        `${IBudgetHTMLMapper.accessory.start}${accessoriesHTML}${IBudgetHTMLMapper.accessory.end}`,
        accessory,
      );

      return acc + productTemplate;
    }, '');

    this.content = this.content.replace(
      `${IBudgetHTMLMapper.product.start}${productHTML}${IBudgetHTMLMapper.product.end}`,
      products,
    );
  }

  public setParams(params: any, template_type: string): void {
    this.params = params;
    this.template_type = template_type;
    this.content = this.getContent();
  }
}
