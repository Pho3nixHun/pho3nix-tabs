import { LitElement, html, css, property, customElement, CSSResult, TemplateResult } from 'lit-element';

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

@customElement('pho3nix-tabs')
export class Pho3nixTabs extends LitElement {
  @property({ type: String, reflect: true, attribute: true })
  tabLocation = 'top'
  @property({ type: Number, reflect: true, attribute: true })
  selected = 0

  static get styles(): CSSResult[] {
    return [
      css`
        slot[name="tabs"] {
          display: flex;
        }
        ::slotted(a) { 
          display: inline-block;
          text-align: center;
          cursor: pointer;
          text-decoration: none;
        }
        ::slotted(section) {
          display: none;
        }  
      `
    ];
  }

  firstUpdated(): void {
    const slot = this.slotElement('tabs');
    slot && slot.addEventListener('slotchange', this.slotChanged)
  }

  private refreshSelection(): void {
    const tabs = this.slotted('tabs');
    tabs.forEach(tab => {
      tab.classList[tabs[this.selected] === tab ? 'add' : 'remove']('selected')
    })
  }

  private slotChanged: (evt: Event) => void = () => {
    this.slotted('tabs').forEach(tab =>{
      tab.removeEventListener('click', this.tabClicked)
      tab.addEventListener('click', this.tabClicked)
    });
    this.refreshSelection();
  }

  private tabClicked: (evt: Event) => void = (evt: Event) => {
    const target: HTMLAnchorElement | null = <HTMLAnchorElement>evt.target;
    const sectionFor = target && target.getAttribute('for');
    this.slotted('tabs').forEach(tab => tab.classList[tab === target ? 'add' : 'remove']('selected'))
    this.selected = this.slotted().findIndex(section => (<HTMLElement>section).getAttribute('name') === sectionFor );
  }

  private slotElement(name?: string): HTMLSlotElement | null {
    const slot: HTMLSlotElement | null = this.renderRoot && this.renderRoot.querySelector(name ? `slot[name="${name}"]` : 'slot:not([name])');
    return slot;
  }

  private slotted(slotName?: string): Element[] {
    const slot = this.slotElement(slotName);
    return slot ? slot.assignedElements() : [];
  }

  private get tabLocationToFlexDirection(): FlexDirection {
    switch(this.tabLocation) {
      case 'left':
        return 'row';
      case 'right':
        return 'row-reverse';
      case 'bottom':
        return 'column-reverse';
      case 'top':
      default:
        return 'column';
    }
  }

  protected render(): TemplateResult {
   this.refreshSelection();
   return html`
   <style>
    ::slotted(section:nth-of-type(${this.selected + 1})) {
      display: block;
    }
    :host {
      display: flex;
      flex-direction: ${this.tabLocationToFlexDirection};
    }
    slot[name="tabs"] {
      flex-direction: ${['left', 'right'].includes(this.tabLocation) ? 'column' : 'row'}; 
    }
   </style>
    <slot name="tabs"></slot>
    <slot></slot>
   `;
  }
}
