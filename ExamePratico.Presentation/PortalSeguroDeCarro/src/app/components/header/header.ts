import { Component } from '@angular/core';

import { PainelCentral } from "../painel-central/painel-central";

@Component({
  selector: 'app-header',
  imports: [PainelCentral],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
