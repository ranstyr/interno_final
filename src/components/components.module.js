import {siBoxes}              from './boxes/boxes' ;
import {siHeader}             from './header/header';
import {siRisk}               from './risk/risk';
import {siAccordion}          from './accordion/accordion';
import {siSlider}             from './slider/slider';
import {siAccordionItem}      from './accordion/accordion-item';
import {siInvestmentInfo}     from './investment-info/investment-info';
import {siHeaderDropdown}     from './header-dropdown/header-dropdown' ;

import modals from './modals/modals.module';
import loader from './loader/loader.module';

export default angular.module('si.components', [
    modals.name,
    loader.name
  ])
  .directive({
    siRisk,
    siBoxes,
    siHeader,
    siSlider,
    siAccordion,
    siAccordionItem,
    siInvestmentInfo,
    siHeaderDropdown
  });