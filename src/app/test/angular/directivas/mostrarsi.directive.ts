import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mostrarSi]',
  standalone: true
})
export class MostrarsiDirective implements OnInit{
@Input('mostrarSi') show = false;
@Input('mostrarSiElse') otherTemplate:TemplateRef<any> | null = null;

  constructor(private viewContainerRef:ViewContainerRef,
              private template: TemplateRef<any> ) { }

              ngOnInit(): void {
                if(this.show){this.viewContainerRef.createEmbeddedView(this.template);} 
                else if(this.otherTemplate){this.viewContainerRef.createEmbeddedView(this.otherTemplate);} 
              }

}
