const { exec } = require('child_process');
const { join } = require('path');

const pjson = require('../../package.json');

const getIgnoredRulesCommandOpts = ignoredRules => {
  // the first option is a list of the number of ignored rules, e.g: e1,e2,e3
  const firstOptValue = ignoredRules.map((i, idx) => `e${idx + 1}`).join(',');
  const firstOpt = `-Dsonar.issue.ignore.multicriteria="${firstOptValue}"`;

  // for each ignored rule, the command requires a pair of options
  const restOpts = ignoredRules
    .map((item, idx) => {
      const num = idx + 1;

      return (
        `-Dsonar.issue.ignore.multicriteria.e${num}.resourceKey="${
          item.resourceKeyValue
        }" ` +
        `-Dsonar.issue.ignore.multicriteria.e${num}.ruleKey="${
          item.ruleKeyValue
        }"`
      );
    })
    .join(' ');

  return `${firstOpt} ${restOpts}`;
};

const sonarSources = ['src'].join(',');
const sonarExclusions = [
  join('src', 'static', '**'),
  join('**', '__tests__', '**'),
  '*.stories.js'
].join(',');

const sonarHost = 'https://sonarqube.ecs.accedo.tv';
const sonarProjectKey = 'myapp';
const sonarProjectName = 'myapp';
const sonarToken = 'SONAR_TOKEN';

const javascriptGlobals = [
  '__CLIENT__',
  '__DEBUG__',
  '__DEVELOPMENT__',
  '__DEVTOOLS__',
  '__FILTERED_CONFIG__',
  '__HISTORY_TYPE__',
  '__TEST__',
  '__TV__',
  'webpackIsomorphicTools'
].join(',');

const sonarJavascriptReportPath = join('coverage', 'lcov.info');
const sonarCoverageExclusions = [join('**', 'unused', '**')].join(',');

const ignoredRulesOpts = getIgnoredRulesCommandOpts([
  {
    resourceKeyValue: '**/*.scss',
    ruleKeyValue: 'scss:nosonar'
  },
  {
    resourceKeyValue: '**/*.scss',
    ruleKeyValue: 'scss:S1134' // this rule would add 20 minutes per fixme comment
  }
]);

const command =
  `${join('node_modules', 'sonar-scanner', 'bin', 'sonar-scanner')} ` +
  `-Dsonar.projectVersion="${pjson.version}" ` +
  `-Dsonar.login="${sonarToken}" ` +
  `-Dsonar.projectKey="${sonarProjectKey}" ` +
  `-Dsonar.projectName="${sonarProjectName}" ` +
  `-Dsonar.exclusions="${sonarExclusions}" ` +
  `-Dsonar.sources="${sonarSources}" ` +
  `-Dsonar.javascript.lcov.reportPath="${sonarJavascriptReportPath}" ` +
  `-Dsonar.javascript.globals="${javascriptGlobals}" ` +
  `-Dsonar.coverage.exclusions="${sonarCoverageExclusions}" ` +
  `${ignoredRulesOpts} ` +
  `-Dsonar.host.url="${sonarHost}"`;

console.log('parsing the project with Sonar');

console.log(`Sonar command:\n${command}\n`);

const sonar = exec(command);

sonar.on('close', code => {
  console.log(`sonar ended with: ${code}`);
});
sonar.on('error', err => {
  console.log(`sonar errd with: ${err}`);
});
sonar.stdout.on('data', d => {
  console.log(`sonar: ${d}`);
});
