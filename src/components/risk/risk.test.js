import {module, inject} from './../../../test/test-helper';
import template from './risk.html';
require('../components.module');

describe('Components - Risk', function () {

  let $compile;
  let $rootScope;
  let modules = ['si.components'];

  beforeEach(() => {
    module(...modules);

    inject((_$compile_, _$rootScope_) => {
      $compile   = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  it('Component compiled and returned the expected markup', function () {

    const scope     = $rootScope.$new();
    const directive = '<si-risk></si-risk>';
    const className = 'label';

    const linkFn = $compile(directive);             // Compile the template
    const content = linkFn(scope);                  // Link the compiled template with the scope

    const markup = content.html();

    expect(markup).to.contains(className);
  });

  it('Pre-compiled template & compiled content returns the same markup', function () {

    const scope              = $rootScope.$new();
    const directive          = '<si-risk></si-risk>';
    const innerDirectiveName = '<si-slider';
    const className          = 'label';

    const linkFn = $compile(directive);             // Compile the template
    const content = linkFn(scope);                  // Link the compiled template with the scope

    const markup = content.html();

    expect(markup).to.contains(className);
    expect(template).to.contains(innerDirectiveName);

  });

});