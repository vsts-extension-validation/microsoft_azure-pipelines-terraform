import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let tp = path.join(__dirname, './GCPPlanSuccessAdditionalArgsL0.js');
let tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(tp);

tr.setInput('provider', 'gcp');
tr.setInput('command', 'plan');
tr.setInput('workingDirectory', 'DummyWorkingDirectory');
tr.setInput('environmentServiceNameGCP', 'GCP');
tr.setInput('commandOptions', '-no-color');

process.env['ENDPOINT_AUTH_SCHEME_GCP'] = 'Jwt';
process.env['ENDPOINT_DATA_GCP_PROJECT'] = 'DummyProject';
process.env['ENDPOINT_AUTH_PARAMETER_GCP_ISSUER'] = 'Dummyissuer';
process.env['ENDPOINT_AUTH_PARAMETER_GCP_AUDIENCE'] = 'DummyAudience';
process.env['ENDPOINT_AUTH_PARAMETER_GCP_PRIVATEKEY'] = 'DummyPrivateKey';
process.env['ENDPOINT_AUTH_PARAMETER_GCP_SCOPE'] = 'DummyScope';

let a: ma.TaskLibAnswers = <ma.TaskLibAnswers> {
    "which": {
        "terraform": "terraform"
    },
    "checkPath": {
        "terraform": true
    },
    "exec": {
        "terraform providers": {
            "code": 0,
            "stdout": "provider gcp"
        },
        "terraform plan -no-color -detailed-exitcode": {
            "code": 0,
            "stdout": "Executed successfully"
        }
    }
}

tr.setAnswers(a);
tr.run();