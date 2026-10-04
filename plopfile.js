import componentGenerator from './plop/generators/component.js';
import pageGenerator from './plop/generators/page.js';
import hookGenerator from './plop/generators/hook.js';
import serviceGenerator from './plop/generators/service.js';
import modelGenerator from './plop/generators/model.js';
import featureGenerator from './plop/generators/feature.js';

export default function (plop) {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('page', pageGenerator);
  plop.setGenerator('hook', hookGenerator);
  plop.setGenerator('service', serviceGenerator);
  plop.setGenerator('model', modelGenerator);
  plop.setGenerator('feature', featureGenerator);
}
